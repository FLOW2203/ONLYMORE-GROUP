import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { IG_ACCOUNTS, KEYWORDS, detectKeyword, dmText } from "@/lib/tunnel";
import { createContact } from "@/lib/notion-communautes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VERSION = process.env.IG_GRAPH_VERSION || "v23.0";

// Token « EAA… » (connexion unifiee Facebook Login for Business, utilisateur systeme)
// -> graph.facebook.com ; token « IG… » (connexion Instagram) -> graph.instagram.com.
function graphBase(token: string): string {
  return token.startsWith("EAA")
    ? `https://graph.facebook.com/${VERSION}`
    : `https://graph.instagram.com/${VERSION}`;
}

// 1) Verification du webhook par Meta (une seule fois, a l'abonnement).
export function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams;
  if (
    p.get("hub.mode") === "subscribe" &&
    process.env.IG_VERIFY_TOKEN &&
    p.get("hub.verify_token") === process.env.IG_VERIFY_TOKEN
  ) {
    return new NextResponse(p.get("hub.challenge") ?? "", { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

function validSignature(raw: string, header: string | null): boolean {
  const secret = process.env.IG_APP_SECRET;
  if (!secret || !header?.startsWith("sha256=")) return false;
  const expected = crypto.createHmac("sha256", secret).update(raw).digest("hex");
  const given = header.slice("sha256=".length);
  if (given.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(given, "hex"), Buffer.from(expected, "hex"));
}

interface CommentValue {
  id?: string;
  text?: string;
  from?: { id?: string; username?: string };
  media?: { id?: string };
}

async function sendPrivateReply(igId: string, token: string, commentId: string, message: string) {
  const body = JSON.stringify({ recipient: { comment_id: commentId }, message: { text: message } });
  const base = graphBase(token);
  // 1er essai : /{ig-user-id}/messages ; repli : /me/messages.
  let lastError = "";
  for (const path of [`${igId}/messages`, "me/messages"]) {
    const res = await fetch(`${base}/${path}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body,
      cache: "no-store",
    });
    if (res.ok) return;
    lastError = `DM ${path} ${res.status} ${await res.text()}`;
  }
  throw new Error(lastError);
}

async function handleComment(igId: string, v: CommentValue) {
  const account = IG_ACCOUNTS[igId];
  if (!account || !v.id || !v.text) return;
  // Ignore nos propres reponses.
  if (v.from?.id === igId || v.from?.username === account.handle) return;

  const kw = detectKeyword(v.text);
  if (!kw) return;

  const token = process.env[account.tokenEnv];
  if (!token) {
    console.error(`[ig-webhook] ${account.tokenEnv} manquant`);
    return;
  }

  const username = v.from?.username || "inconnu";
  await sendPrivateReply(igId, token, v.id, dmText(kw, username));

  try {
    await createContact({
      prenom: `@${username}`,
      pseudo: username,
      reseau: "Instagram",
      motCle: KEYWORDS[kw].motCle,
      entite: KEYWORDS[kw].entite,
      langue: "FR",
      statut: "DM envoyé",
    });
  } catch (e) {
    // Le DM est parti : un echec Notion ne doit pas bloquer le tunnel.
    console.error("[ig-webhook] Notion", e);
  }
}

// 2) Reception des commentaires.
export async function POST(req: NextRequest) {
  const raw = await req.text();
  if (!validSignature(raw, req.headers.get("x-hub-signature-256"))) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  let body: { object?: string; entry?: Array<{ id?: string; changes?: Array<{ field?: string; value?: CommentValue }> }> };
  try {
    body = JSON.parse(raw);
  } catch {
    return new NextResponse("Bad JSON", { status: 400 });
  }

  const jobs: Promise<void>[] = [];
  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      if (change.field === "comments" && entry.id && change.value) {
        jobs.push(
          handleComment(entry.id, change.value).catch((e) => console.error("[ig-webhook]", e))
        );
      }
    }
  }
  await Promise.all(jobs);

  // Toujours 200 pour que Meta ne renvoie pas l'evenement en boucle.
  return NextResponse.json({ ok: true });
}
