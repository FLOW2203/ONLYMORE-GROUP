import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import FlowsGrid, { DEFAULT_FLOWS_EN, DEFAULT_FLOWS_FR } from "@/components/FlowsGrid";
import { getTranslations, Locale, defaultLocale } from "@/lib/i18n";
import {
  buildPageMetadata,
  getArticleSchema,
  getLabelSchemas,
  getDetroitContestEventSchema,
  BASE_URL,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const lb = (t.goat_ame_city_page as Record<string, any>) || {};
  return buildPageMetadata({
    locale,
    path: "/labels/goat-ame-city",
    title: lb.meta_title || "GOAT AME CITY, ONLYMORE Group",
    description:
      lb.meta_description ||
      "GOAT AME CITY, the English-speaking label for the greatest soul of all cities. Detroit Chapter 01 opens the program in 2026.",
  });
}

const CHAPTERS_2027 = [
  { city: "Pittsburgh", note: "Industrial heritage, walkable downtown" },
  { city: "Louisville", note: "Racing city, bourbon capital, underrated football market" },
  { city: "Indianapolis", note: "Indy 500, USL Championship presence, engaged civic base" },
  { city: "Milwaukee", note: "German-American mutualist DNA, brewing tradition" },
  { city: "Cleveland", note: "Rust Belt rebirth, lakefront revitalization" },
  { city: "Fort Wayne", note: "Mid-sized Midwest, strong minor-league sports" },
  { city: "Buffalo", note: "Sabres + Bills legacy, neighborhood-scale culture" },
];

export default async function GoatAmeCityPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const lb = (t.goat_ame_city_page as Record<string, any>) || {};
  const common = (t.common as Record<string, string>) || {};
  const isEn = locale === "en";
  const flows = isEn ? DEFAULT_FLOWS_EN : DEFAULT_FLOWS_FR;

  const stands = [
    {
      code: "01",
      title: isEn ? "Post-industrial rebirth" : "Renaissance post-industrielle",
      body: isEn
        ? "The Rust Belt is not a graveyard. It is an infrastructure waiting for a new operating system. GOAT AME CITY is that system, powered by sport and local commerce."
        : "La Rust Belt n'est pas un cimetiere. C'est une infrastructure qui attend un nouveau systeme d'exploitation. GOAT AME CITY est ce systeme, propulse par le sport et le commerce local.",
    },
    {
      code: "02",
      title: isEn ? "Community ownership" : "Propriete communautaire",
      body: isEn
        ? "Green Bay Packers proved it in 1919: a city can own its pride without diluting the club. We don't copy, we compose, we adapt to local law. The principle travels."
        : "Green Bay Packers l'a prouve en 1919 : une ville peut posseder sa fierte sans diluer le club. Nous ne copions pas, nous composons, nous adaptons au droit local. Le principe voyage.",
    },
    {
      code: "03",
      title: isEn ? "Sport as entry vector" : "Le sport comme vecteur d'entree",
      body: isEn
        ? "Sport is not the product. The product is the redistribution loop. Sport opens the door, the ESS industrial cell closes it around the territory."
        : "Le sport n'est pas le produit. Le produit est la boucle de redistribution. Le sport ouvre la porte, la cellule ESS industriel la referme autour du territoire.",
    },
  ];

  const detroitBullets = [
    {
      title: "Detroit City FC, community-owned",
      body: isEn
        ? "Founded in 2012, currently in USL Championship, already organized as a supporter-invested club. Natural anchor for the Chapter 01."
        : "Fonde en 2012, actuellement en USL Championship, deja organise comme un club finance par les supporters. Ancre naturelle pour le Chapter 01.",
    },
    {
      title: "Stadium 2027, Corktown",
      body: isEn
        ? "New stadium project in Corktown, neighborhood of Michigan Central restoration. Walking-scale fan base, downtown reintegration."
        : "Projet de stade neuf a Corktown, quartier de la restauration de Michigan Central. Base fan a echelle piedestre, reintegration centre-ville.",
    },
    {
      title: "Mayor Sheffield",
      body: isEn
        ? "Mary Sheffield, elected mayor in 2025, strong civic-engagement platform, aligned with mutualist retention narratives."
        : "Mary Sheffield, elue mairesse en 2025, plateforme d'engagement civique forte, alignee avec les recits mutualistes de retention.",
    },
    {
      title: "Gilbert and Kresge foundations mapped",
      body: isEn
        ? "Dan Gilbert's Bedrock real-estate operations and the Kresge Foundation's neighborhood grants form an existing philanthropic lattice we plug into, not replace."
        : "Les operations immobilieres Bedrock de Dan Gilbert et les subventions de quartier de la Kresge Foundation forment une trame philanthropique existante que nous alimentons, sans la remplacer.",
    },
    {
      title: "USL Division One candidacy",
      body: isEn
        ? "Detroit City FC is a declared candidate for USL Division One tier. The Chapter 01 rollout is calibrated to accompany that candidacy, not gate it."
        : "Detroit City FC est candidat declare au palier USL Division One. Le deploiement Chapter 01 est calibre pour accompagner cette candidature, pas la conditionner.",
    },
  ];

  return (
    <main>
      <Header />
      <StructuredData
        locale={locale}
        breadcrumbs={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: "Labels", url: `${BASE_URL}/${locale}/labels/goat-ame-city` },
          { name: "GOAT AME CITY", url: `${BASE_URL}/${locale}/labels/goat-ame-city` },
        ]}
        extra={[
          getLabelSchemas()[1],
          getDetroitContestEventSchema(),
          getArticleSchema({
            slug: "goat-ame-city",
            title: "GOAT AME CITY, the greatest soul of all cities",
            description:
              lb.meta_description ||
              "GOAT AME CITY, English-speaking label for territories deploying an ONLYMORE Group ESS industrial cell. Detroit Chapter 01, 2026.",
            datePublished: "2026-04-19",
            locale,
            path: "/labels/goat-ame-city",
          }),
        ]}
      />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-deep-black">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <nav aria-label="breadcrumb" className="mb-8 text-sm text-warm-white/50 font-body">
            <Link href={`/${locale}`} className="hover:text-gold transition-colors">
              {common.home || (isEn ? "Home" : "Accueil")}
            </Link>
            <span className="mx-2">/</span>
            <span>{isEn ? "Labels" : "Labels"}</span>
            <span className="mx-2">/</span>
            <span>GOAT AME CITY</span>
          </nav>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-6">
            {lb.eyebrow || (isEn ? "Territorial label, US + English-speaking" : "Label territorial, US et anglophone")}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-white mb-6 leading-tight">
            GOAT &Acirc;ME CITY
          </h1>
          <p className="font-display text-xl md:text-2xl italic text-gold mb-10 leading-relaxed">
            {isEn
              ? "The greatest soul of all cities."
              : "La meilleure ame des villes de tous les temps."}
          </p>
          <p className="font-body text-lg md:text-xl text-warm-white/70 max-w-2xl leading-relaxed">
            {lb.hero_lead ||
              (isEn
                ? "GOAT AME CITY is the English-speaking twin label of COLHYBRI CITY. Same 5-flow criteria. Same independent committee. Different cultural register. Built for supporters, urban youth, diaspora communities and independent merchants."
                : "GOAT AME CITY est le label jumeau anglophone de COLHYBRI CITY. Memes criteres des 5 flux. Meme comite independant. Registre culturel different. Pense pour les supporters, la jeunesse urbaine, les diasporas et les commercants independants.")}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-10">
            {isEn ? "What it stands for" : "Ce que le label porte"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {stands.map((s) => (
              <article key={s.code} className="border border-white/10 rounded-lg p-6">
                <p className="font-mono text-xs text-gold uppercase tracking-widest mb-3">{s.code}</p>
                <h3 className="font-display text-lg text-warm-white mb-3">{s.title}</h3>
                <p className="font-body text-sm text-warm-white/70 leading-relaxed">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FlowsGrid
        title={isEn ? "The 5 flows of the ESS industrial cell" : "Les 5 flux de la cellule ESS industriel"}
        lead={
          isEn
            ? "Every GOAT AME CITY deployment rests on the same operational assembly as COLHYBRI CITY. The 5 flows are the criteria. The outputs are the proof."
            : "Tout deploiement GOAT AME CITY repose sur le meme assemblage operationnel que COLHYBRI CITY. Les 5 flux sont les criteres. Les sorties sont la preuve."
        }
        flows={flows}
        variant="gold"
      />

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-4">
            Chapter 01
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-10">
            Detroit, 2026
          </h2>
          <ul className="space-y-5">
            {detroitBullets.map((b) => (
              <li key={b.title} className="border border-white/10 rounded-lg p-5">
                <h3 className="font-display text-lg text-warm-white mb-2">{b.title}</h3>
                <p className="font-body text-sm text-warm-white/70 leading-relaxed">{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-4">
            {isEn ? "Chapters preparing 2027" : "Chapters prepares pour 2027"}
          </h2>
          <p className="font-body text-base text-warm-white/60 mb-10 max-w-3xl leading-relaxed">
            {isEn
              ? "Seven US cities actively evaluated for the 2027 edition. More candidacies welcome through the 2026 contest."
              : "Sept villes americaines activement evaluees pour l'edition 2027. D'autres candidatures sont bienvenues via le concours 2026."}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CHAPTERS_2027.map((c) => (
              <article key={c.city} className="border border-white/10 rounded-lg p-4">
                <h3 className="font-display text-lg text-gold mb-1">{c.city}</h3>
                <p className="font-body text-xs text-warm-white/60 leading-relaxed">{c.note}</p>
              </article>
            ))}
            <article className="border border-dashed border-white/15 rounded-lg p-4 flex items-center justify-center">
              <p className="font-body text-sm italic text-warm-white/50 text-center">
                {isEn ? "More candidacies welcome" : "Autres candidatures bienvenues"}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-6">
            {isEn ? "Engage your city" : "Engagez votre ville"}
          </h2>
          <p className="font-body text-base md:text-lg text-warm-white/70 mb-8 leading-relaxed">
            {isEn
              ? "The 2026 contest, 'It's my city, I'm in', opens the program. Detroit Chapter 01 is already active."
              : "Le concours 2026, 'C'est ma ville je m'engage', ouvre le programme. Detroit Chapter 01 est deja active."}
          </p>
          <Link
            href={`/${locale}/concours`}
            className="inline-block px-6 py-3 bg-gold text-deep-black font-body font-medium hover:bg-gold/90 transition-colors"
          >
            {isEn ? "Engage your city" : "Engagez votre ville"} &rarr;
          </Link>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-warm-white/40 mb-4">
            {isEn ? "Francophone twin label" : "Label jumeau francophone"}
          </p>
          <Link
            href={`/${locale}/labels/colhybri-city`}
            className="font-display text-2xl md:text-3xl text-warm-white hover:text-gold transition-colors"
          >
            COLHYBRI CITY &rarr;
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
