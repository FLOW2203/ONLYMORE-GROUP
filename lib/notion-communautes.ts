// Ecriture dans la base Notion « Communautes ONLYMORE ».
// Variables Vercel : NOTION_TOKEN (integration interne partagee avec la base),
// NOTION_COMMUNAUTES_DB_ID (facultatif, valeur par defaut ci-dessous).

const NOTION_VERSION = "2022-06-28";
const DEFAULT_DB_ID = "42498dfff6a6814296d5c35543e2326d";

type Props = Record<string, unknown>;

function dbId(): string {
  return process.env.NOTION_COMMUNAUTES_DB_ID || DEFAULT_DB_ID;
}

async function notion(path: string, method: string, body?: unknown) {
  const token = process.env.NOTION_TOKEN;
  if (!token) throw new Error("NOTION_TOKEN manquant");
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Notion ${method} ${path} : ${res.status} ${await res.text()}`);
  }
  return res.json();
}

const text = (v: string) => ({ rich_text: [{ text: { content: v.slice(0, 1900) } }] });
const title = (v: string) => ({ title: [{ text: { content: v.slice(0, 200) } }] });
const select = (v: string) => ({ select: { name: v } });
const status = (v: string) => ({ status: { name: v } });

export interface ContactInput {
  prenom?: string;
  email?: string;
  entite?: string;
  profil?: string;
  motCle?: string;
  reseau?: string;
  pseudo?: string;
  club?: string;
  postUrl?: string;
  langue?: string;
  statut: "Nouveau" | "DM envoyé" | "Inscrit" | "Désinscrit";
  consentement?: boolean;
}

function toProps(c: ContactInput): Props {
  const p: Props = { Statut: status(c.statut) };
  if (c.prenom) p["Prénom"] = title(c.prenom);
  if (c.email) p["E-mail"] = { email: c.email };
  if (c.entite) p["Entité"] = select(c.entite);
  if (c.profil) p["Profil"] = select(c.profil);
  if (c.motCle) p["Mot-clé"] = select(c.motCle);
  if (c.reseau) p["Réseau"] = select(c.reseau);
  if (c.pseudo) p["Pseudo réseau"] = text(c.pseudo);
  if (c.club) p["Club"] = text(c.club);
  if (c.postUrl) p["Post d'origine"] = { url: c.postUrl };
  if (c.langue) p["Langue"] = select(c.langue);
  if (c.consentement) {
    p["Consentement RGPD"] = { checkbox: true };
    p["Date consentement"] = { date: { start: new Date().toISOString() } };
  }
  return p;
}

export async function createContact(c: ContactInput) {
  return notion("/pages", "POST", {
    parent: { database_id: dbId() },
    properties: toProps(c),
  });
}

// Retrouve la ligne creee par le DM (meme pseudo, statut « DM envoye ») pour la completer.
export async function findPendingByPseudo(pseudo: string): Promise<string | null> {
  const r = await notion(`/databases/${dbId()}/query`, "POST", {
    page_size: 1,
    filter: {
      and: [
        { property: "Pseudo réseau", rich_text: { equals: pseudo } },
        { property: "Statut", status: { equals: "DM envoyé" } },
      ],
    },
  });
  return r.results?.[0]?.id ?? null;
}

export async function updateContact(pageId: string, c: ContactInput) {
  return notion(`/pages/${pageId}`, "PATCH", { properties: toProps(c) });
}
