import { NextRequest, NextResponse } from "next/server";
import { KEYWORDS, PROFIL_ROUTING, Profil, normalize } from "@/lib/tunnel";
import { createContact, findPendingByPseudo, updateContact } from "@/lib/notion-communautes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RESEAUX = ["Instagram", "Facebook", "LinkedIn", "TikTok", "Threads", "X"];

export async function POST(req: NextRequest) {
  let d: Record<string, unknown>;
  try {
    d = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  // Pot de miel anti-robots : champ invisible qui doit rester vide.
  if (typeof d.website === "string" && d.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const prenom = String(d.prenom ?? "").trim().slice(0, 80);
  const email = String(d.email ?? "").trim().toLowerCase().slice(0, 200);
  const profil = String(d.profil ?? "") as Profil;
  const club = String(d.club ?? "").trim().slice(0, 120);
  const consent = d.consent === true;

  if (!prenom || !EMAIL_RE.test(email) || !PROFIL_ROUTING[profil] || !consent) {
    return NextResponse.json({ error: "Merci de remplir tous les champs et d'accepter." }, { status: 400 });
  }

  const kwRaw = normalize(String(d.kw ?? ""));
  const kw = KEYWORDS[kwRaw] ? kwRaw : "ENSEMBLE";
  const src = String(d.src ?? "");
  const reseau = RESEAUX.find((r) => r.toLowerCase() === src.toLowerCase());
  const pseudo = String(d.u ?? "").replace(/^@/, "").slice(0, 60);
  const route = PROFIL_ROUTING[profil];

  const contact = {
    prenom,
    email,
    profil,
    entite: route.entite,
    motCle: KEYWORDS[kw].motCle,
    reseau,
    pseudo: pseudo || undefined,
    club: club || undefined,
    langue: "FR",
    statut: "Inscrit" as const,
    consentement: true,
  };

  try {
    const pending = pseudo ? await findPendingByPseudo(pseudo) : null;
    if (pending) await updateContact(pending, contact);
    else await createContact(contact);
  } catch (e) {
    console.error("[cercle]", e);
    return NextResponse.json({ error: "Inscription momentanément indisponible, réessaie dans un instant." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, path: route.path, label: route.label });
}
