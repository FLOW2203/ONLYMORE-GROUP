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
  BASE_URL,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const lb = (t.colhybri_city_page as Record<string, any>) || {};
  return buildPageMetadata({
    locale,
    path: "/labels/colhybri-city",
    title: lb.meta_title || "COLHYBRI CITY, ONLYMORE Group",
    description:
      lb.meta_description ||
      "COLHYBRI CITY, le label francophone des centres-villes qui font leur part. Cellule ESS industriel deployee, 5 flux actives, gouvernance mutualiste.",
  });
}

export default async function ColhybriCityPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const lb = (t.colhybri_city_page as Record<string, any>) || {};
  const common = (t.common as Record<string, string>) || {};
  const isEn = locale === "en";
  const flows = isEn ? DEFAULT_FLOWS_EN : DEFAULT_FLOWS_FR;

  const convictions = [
    {
      n: "01",
      title:
        lb.c1_title ||
        (isEn
          ? "Local retail is public infrastructure"
          : "Le commerce de proximite est une infrastructure publique"),
      body:
        lb.c1_body ||
        (isEn
          ? "A downtown without bakeries, bookshops and cafes becomes a dormitory. COLHYBRI CITY treats local retail as a common good, deserving the same long-duration attention as schools and hospitals."
          : "Un centre-ville sans boulangerie, sans librairie, sans cafe devient un dortoir. COLHYBRI CITY traite le commerce de proximite comme un bien commun, meritant la meme attention longue duree que les ecoles et les hopitaux."),
    },
    {
      n: "02",
      title:
        lb.c2_title ||
        (isEn
          ? "Revitalization without mutualism is a disguised subsidy"
          : "La revitalisation sans mutualisme est une subvention deguisee"),
      body:
        lb.c2_body ||
        (isEn
          ? "Pouring public money into a downtown without restructuring the capital flow is a patch. COLHYBRI CITY requires a mutualist architecture so that each euro recirculates instead of leaking to extractive channels."
          : "Injecter de l'argent public dans un centre-ville sans restructurer le flux de capital est un pansement. COLHYBRI CITY exige une architecture mutualiste pour que chaque euro recircule au lieu de fuir vers des canaux extractifs."),
    },
    {
      n: "03",
      title:
        lb.c3_title ||
        (isEn
          ? "Cities that activate the 5 flows capture value locally"
          : "Les villes qui activent les 5 flux captent la valeur localement"),
      body:
        lb.c3_body ||
        (isEn
          ? "A functional ESS industrial cell keeps jobs, merchant revenues, supporter dividends and sports licenses inside the catchment area. Measurable outputs. Year over year."
          : "Une cellule ESS industriel operationnelle maintient emplois, revenus commercants, dividendes supporters et licences sportives dans le bassin de vie. Sorties mesurables. Annee apres annee."),
    },
  ];

  const steps = [
    {
      n: "01",
      title: lb.s1_title || (isEn ? "Application" : "Candidature"),
      body:
        lb.s1_body ||
        (isEn
          ? "The city submits a joint manifesto signed by the mayor, the local chamber of commerce, and at least one sports club operator."
          : "La ville depose un manifeste commun signe par le maire, la CCI locale et au moins un club sportif operateur."),
    },
    {
      n: "02",
      title: lb.s2_title || (isEn ? "5-flow scoring" : "Scoring des 5 flux"),
      body:
        lb.s2_body ||
        (isEn
          ? "The ONLYMORE team projects the 5-flow framework onto the territory, identifies gaps, and produces a feasibility note for the steering committee."
          : "L'equipe ONLYMORE projette le cadre des 5 flux sur le territoire, identifie les manques, et produit une note de faisabilite pour le comite de pilotage."),
    },
    {
      n: "03",
      title: lb.s3_title || (isEn ? "Independent audit" : "Audit independant"),
      body:
        lb.s3_body ||
        (isEn
          ? "After 6 months of operation, an independent committee (ESS France, BGE, France Active) audits the 5 flows against predefined thresholds."
          : "Apres 6 mois d'operation, un comite independant (ESS France, BGE, France Active) audite les 5 flux selon des seuils predefinis."),
    },
    {
      n: "04",
      title: lb.s4_title || (isEn ? "Annual ceremony" : "Ceremonie annuelle"),
      body:
        lb.s4_body ||
        (isEn
          ? "Labels are awarded at an annual ceremony. The city receives a physical plaque, a digital badge, and a referential entry in the ONLYMORE Group registry."
          : "Les labels sont remis lors d'une ceremonie annuelle. La ville recoit une plaque physique, un badge numerique et une entree dans le registre ONLYMORE Group."),
    },
    {
      n: "05",
      title: lb.s5_title || (isEn ? "Consolidated report" : "Rapport consolide"),
      body:
        lb.s5_body ||
        (isEn
          ? "All labeled cities are compiled in the group annual impact report, with transparent KPI: jobs, merchant revenues, dividends, sports licenses."
          : "Toutes les villes labellisees sont compilees dans le rapport d'impact annuel du groupe, avec KPI transparents : emplois, revenus commercants, dividendes, licences sportives."),
    },
  ];

  return (
    <main>
      <Header />
      <StructuredData
        locale={locale}
        breadcrumbs={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: "Labels", url: `${BASE_URL}/${locale}/labels/colhybri-city` },
          { name: "COLHYBRI CITY", url: `${BASE_URL}/${locale}/labels/colhybri-city` },
        ]}
        extra={[
          getLabelSchemas()[0],
          getArticleSchema({
            slug: "colhybri-city",
            title: isEn
              ? "COLHYBRI CITY, label for downtowns that play their part"
              : "COLHYBRI CITY, label des centres-villes qui font leur part",
            description:
              lb.meta_description ||
              "COLHYBRI CITY, francophone and European label for territories deploying an ONLYMORE Group ESS industrial cell.",
            datePublished: "2026-04-19",
            locale,
            path: "/labels/colhybri-city",
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
            <span>COLHYBRI CITY</span>
          </nav>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-6">
            {lb.eyebrow || (isEn ? "Territorial label, francophone + Europe" : "Label territorial, francophone et Europe")}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-white mb-6 leading-tight">
            COLHYBRI CITY
          </h1>
          <p className="font-display text-xl md:text-2xl italic text-gold mb-10 leading-relaxed">
            {isEn
              ? "The label for downtowns that play their part."
              : "Le label des centres-villes qui font leur part."}
          </p>
          <p className="font-body text-lg md:text-xl text-warm-white/70 max-w-2xl leading-relaxed">
            {lb.hero_lead ||
              (isEn
                ? "A COLHYBRI CITY is a territory that has deployed an ONLYMORE Group ESS industrial cell: 5 flows activated, mutualist governance in place, measurable outputs published year over year."
                : "Une COLHYBRI CITY est un territoire qui a deploye une cellule ESS industriel ONLYMORE Group : 5 flux actives, gouvernance mutualiste en place, sorties mesurables publiees d'annee en annee.")}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-10">
            {lb.convictions_title || (isEn ? "Three convictions" : "Trois convictions")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {convictions.map((c) => (
              <article key={c.n} className="border border-white/10 rounded-lg p-6">
                <p className="font-mono text-xs text-gold uppercase tracking-widest mb-3">{c.n}</p>
                <h3 className="font-display text-lg text-warm-white mb-3">{c.title}</h3>
                <p className="font-body text-sm text-warm-white/70 leading-relaxed">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FlowsGrid
        title={isEn ? "The 5 flows to activate" : "Les 5 flux a activer"}
        lead={
          isEn
            ? "An ESS industrial cell rests on five coordinated flows. None works in isolation. Together they form the redistribution loop."
            : "Une cellule ESS industriel repose sur cinq flux coordonnes. Aucun ne fonctionne seul. Ensemble, ils forment la boucle de redistribution."
        }
        flows={flows}
        variant="teal"
      />

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-10">
            {lb.process_title || (isEn ? "Labeling process" : "Processus de labellisation")}
          </h2>
          <ol className="space-y-6">
            {steps.map((s) => (
              <li key={s.n} className="grid grid-cols-[72px_1fr] gap-6 items-start">
                <span className="font-mono text-xl text-gold pt-1">{s.n}</span>
                <div>
                  <h3 className="font-display text-lg text-warm-white mb-1">{s.title}</h3>
                  <p className="font-body text-sm text-warm-white/70 leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-6">
            {lb.cta_title || (isEn ? "Candidate for your city" : "Candidater pour ma ville")}
          </h2>
          <p className="font-body text-base md:text-lg text-warm-white/70 mb-8 leading-relaxed">
            {lb.cta_body ||
              (isEn
                ? "Mayors, chambers of commerce, club operators and elected officials: write to us to open a diagnostic on your territory."
                : "Maires, CCI, operateurs de clubs, elus : ecrivez-nous pour ouvrir un diagnostic sur votre territoire.")}
          </p>
          <a
            href="mailto:labels@onlymore.group"
            className="inline-block px-6 py-3 bg-gold text-deep-black font-body font-medium hover:bg-gold/90 transition-colors"
          >
            labels@onlymore.group
          </a>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-warm-white/40 mb-4">
            {isEn ? "English-speaking twin label" : "Label jumeau anglophone"}
          </p>
          <Link
            href={`/${locale}/labels/goat-ame-city`}
            className="font-display text-2xl md:text-3xl text-warm-white hover:text-gold transition-colors"
          >
            GOAT AME CITY &rarr;
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
