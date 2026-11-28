// Tunnel communautes ONLYMORE : commentaire mot-cle -> DM automatique -> page /cercle -> Notion.
// Aucun secret ici : les tokens vivent dans les variables d'environnement Vercel (Sensitive).

export type Entite =
  | "ONLYMORE Group"
  | "COLHYBRI"
  | "CROWNIUM supporter"
  | "CROWNIUM club"
  | "DOJUKU SHINGI";

export type MotCle = "BRÈCHE" | "ENSEMBLE" | "PROXIMITÉ" | "SUPPORTER" | "CLUB" | "DOJO";

export type Profil =
  | "Habitant"
  | "Commerçant"
  | "Supporter"
  | "Dirigeant de club"
  | "Élu"
  | "Pratiquant"
  | "Parent";

// Comptes Instagram professionnels relies a l'app Meta « ONLYMORE Group Publication ».
// Les ID ne sont pas secrets (ils figurent dans le registre Post for Me).
export const IG_ACCOUNTS: Record<string, { handle: string; tokenEnv: string }> = {
  "17841432590783055": { handle: "onlymore.group", tokenEnv: "IG_TOKEN_ONLYMORE_GROUP" },
  "17841439007145688": { handle: "colhybri.vision", tokenEnv: "IG_TOKEN_COLHYBRI" },
  "17841436233217591": { handle: "crownium.club", tokenEnv: "IG_TOKEN_CROWNIUM" },
  "17841479660130880": { handle: "dojukushingi", tokenEnv: "IG_TOKEN_DOJUKU" },
};

// Mot-cle normalise (majuscules, sans accent) -> mot-cle Notion + entite.
export const KEYWORDS: Record<string, { motCle: MotCle; entite: Entite }> = {
  BRECHE: { motCle: "BRÈCHE", entite: "ONLYMORE Group" },
  ENSEMBLE: { motCle: "ENSEMBLE", entite: "ONLYMORE Group" },
  PROXIMITE: { motCle: "PROXIMITÉ", entite: "COLHYBRI" },
  SUPPORTER: { motCle: "SUPPORTER", entite: "CROWNIUM supporter" },
  CLUB: { motCle: "CLUB", entite: "CROWNIUM club" },
  DOJO: { motCle: "DOJO", entite: "DOJUKU SHINGI" },
};

export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase();
}

// Renvoie le premier mot-cle trouve comme mot entier dans le commentaire.
export function detectKeyword(text: string): string | null {
  const words = normalize(text).split(/[^A-Z0-9]+/).filter(Boolean);
  for (const w of words) {
    if (KEYWORDS[w]) return w;
  }
  return null;
}

// Aiguillage du profil choisi sur /cercle vers l'entite qui le concerne.
export const PROFIL_ROUTING: Record<Profil, { entite: Entite; path: string; label: string }> = {
  Habitant: { entite: "COLHYBRI", path: "/colhybri", label: "COLHYBRI, le commerce de proximite solidaire" },
  Commerçant: { entite: "COLHYBRI", path: "/colhybri/commercants", label: "COLHYBRI pour les commercants" },
  Supporter: { entite: "CROWNIUM supporter", path: "/crownium/fans", label: "CROWNIUM, agir concretement pour son club" },
  "Dirigeant de club": { entite: "CROWNIUM club", path: "/crownium/clubs", label: "CROWNIUM pour les clubs" },
  Élu: { entite: "CROWNIUM club", path: "/crownium/clubs", label: "CROWNIUM, faire vivre son territoire" },
  Pratiquant: { entite: "DOJUKU SHINGI", path: "/dojuku-shingi", label: "DOJUKU SHINGI, l'art martial augmente" },
  Parent: { entite: "DOJUKU SHINGI", path: "/dojuku-shingi", label: "DOJUKU SHINGI pour les familles" },
};

export const PROFILS = Object.keys(PROFIL_ROUTING) as Profil[];

const SITE = "https://www.onlymore.group";

export function cercleLink(kw: string, username: string): string {
  const u = new URLSearchParams({ src: "instagram", kw, u: username });
  return `${SITE}/fr/cercle?${u.toString()}`;
}

export function dmText(kw: string, username: string): string {
  const link = cercleLink(kw, username);
  if (kw === "BRECHE") {
    return `Bienvenue dans la brèche 💪 Voici ton accès au Cercle ONLYMORE : ${link}\nTu y choisis ton chemin : commerce de proximité, supporter, club ou pratique martiale. On avance ensemble.`;
  }
  return `Merci pour ton commentaire 🙌 Voici ton accès au Cercle ONLYMORE : ${link}\nChoisis ton profil, on t'envoie vers la communauté qui te concerne.`;
}
