export type InsightMeta = {
  slug: string;
  title: string;
  excerpt: string;
  datePublished: string;
  readingTime: string;
  tag: string;
};

export const insights: InsightMeta[] = [
  {
    slug: "linfini-decode",
    title: "L'Infini Decode : comment un logo raconte 220 ans d'histoire",
    excerpt:
      "Deux glyphes, un circuit ferme, un moteur central. La lemniscate ONLYMORE compresse le mutualisme francais, le float de Buffett et la philosophie du colibri en une seule forme.",
    datePublished: "2026-03-10",
    readingTime: "10 min",
    tag: "Brand",
  },
  {
    slug: "le-caffe-sospeso-digitalise",
    title: "Du cafe suspendu napolitain a COLHYBRI : digitaliser la solidarite populaire",
    excerpt:
      "1800, Naples. Un client paie deux cafes, en laisse un au suivant. 2026, Occitanie. COLHYBRI digitalise le geste sans l'ebruiter. La philanthropie ordinaire reprend sa circulation.",
    datePublished: "2026-03-17",
    readingTime: "11 min",
    tag: "Subsidiary",
  },
  {
    slug: "le-berkshire-hathaway-du-sport",
    title: "Berkshire Hathaway, Bundesliga, Green Bay : les 3 modeles qui fondent CROWNIUM",
    excerpt:
      "Comment 60 ans de float model d'Omaha, la regle 50+1 de Bundesliga et 538 967 actionnaires des Packers forment l'ossature mutualiste de CROWNIUM.",
    datePublished: "2026-03-24",
    readingTime: "13 min",
    tag: "Thesis",
  },
];

export function getInsightBySlug(slug: string): InsightMeta | undefined {
  return insights.find((i) => i.slug === slug);
}
