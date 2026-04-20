import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { getTranslations, Locale, defaultLocale } from "@/lib/i18n";
import { buildPageMetadata, getArticleSchema, BASE_URL } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const ip = (t.impact_page as Record<string, any>) || {};
  return buildPageMetadata({
    locale,
    path: "/impact",
    title: ip.meta_title || "Impact social, ONLYMORE Group",
    description:
      ip.meta_description ||
      "6 UN Global Goals, 3 principes ESS, indicateurs d'impact transparents. ONLYMORE Group mesure plutot que declame.",
  });
}

type SdgBlock = { n: number; color: string; label: string; body: string };

export default async function ImpactPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const ip = (t.impact_page as Record<string, any>) || {};
  const common = (t.common as Record<string, string>) || {};

  const sdgs: SdgBlock[] = [
    {
      n: 1,
      color: "#E5243B",
      label: ip.sdg1 || "No Poverty",
      body:
        ip.sdg1_body ||
        "COLHYBRI digitalise le cafe sospeso pour que la solidarite alimentaire circule au ras du quartier. CROWNIUM redistribue les revenus des abonnements aux clubs plutot qu'aux investisseurs speculatifs.",
    },
    {
      n: 4,
      color: "#C5192D",
      label: ip.sdg4 || "Quality Education",
      body:
        ip.sdg4_body ||
        "DOJUKU SHINGI transmet les arts martiaux intergenerationnels. Le systeme de notation SHINGAN de PLUMAYA structure les apprentissages longue duree.",
    },
    {
      n: 8,
      color: "#A21942",
      label: ip.sdg8 || "Decent Work",
      body:
        ip.sdg8_body ||
        "Les filiales operationnelles creent des revenus locaux decentralises, ancres dans les territoires, plutot que des profits extractifs concentres.",
    },
    {
      n: 10,
      color: "#DD1367",
      label: ip.sdg10 || "Reduced Inequalities",
      body:
        ip.sdg10_body ||
        "Le mutualisme est par definition inclusif. L'infrastructure ONLYMORE reduit les barrieres d'acces au capital sportif, commercial et educatif.",
    },
    {
      n: 11,
      color: "#FD9D24",
      label: ip.sdg11 || "Sustainable Cities",
      body:
        ip.sdg11_body ||
        "Chaque talent qui reste dans sa ville renforce l'economie locale. Stopper la fuite revient a construire des villes vivables sans etalement urbain force.",
    },
    {
      n: 17,
      color: "#19486A",
      label: ip.sdg17 || "Partnerships",
      body:
        ip.sdg17_body ||
        "Les 5 filiales fonctionnent en synapse. Les partenariats externes (ESS France, BGE Nimes, France Active, Winvesty) consolident la maille institutionnelle.",
    },
  ];

  return (
    <main>
      <Header />
      <StructuredData
        locale={locale}
        breadcrumbs={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: ip.breadcrumb || "Impact", url: `${BASE_URL}/${locale}/impact` },
        ]}
        extra={[
          getArticleSchema({
            slug: "impact",
            title: ip.hero_title || "Mesurer l'impact. Pas seulement le declamer.",
            description: ip.meta_description || "ESS metrics and 6 SDG transparent reporting.",
            datePublished: "2026-04-19",
            locale,
            path: "/impact",
          }),
        ]}
      />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-deep-black">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <nav aria-label="breadcrumb" className="mb-8 text-sm text-warm-white/50 font-body">
            <Link href={`/${locale}`} className="hover:text-gold transition-colors">
              {common.home || "Accueil"}
            </Link>
            <span className="mx-2">/</span>
            <span>{ip.breadcrumb || "Impact"}</span>
          </nav>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-6">
            {ip.eyebrow || "Transparence d'impact"}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-white mb-8 leading-tight">
            {ip.hero_title || "Mesurer l'impact. Pas seulement le declamer."}
          </h1>
          <p className="font-body text-lg md:text-xl text-warm-white/70 max-w-2xl leading-relaxed">
            {ip.hero_lead ||
              "ONLYMORE Group s'engage a publier, des le premier exercice complet en 2027, un rapport d'impact annuel aligne sur les principes ESS et les 6 UN Global Goals."}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-10">
            {ip.ess_title || "Trois principes ESS valides"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <article className="border border-white/10 rounded-lg p-6">
              <p className="font-mono text-xs text-gold uppercase tracking-widest mb-3">01</p>
              <h3 className="font-display text-lg text-warm-white mb-2">
                {ip.ess1_title || "Primaute de la personne"}
              </h3>
              <p className="font-body text-sm text-warm-white/70 leading-relaxed">
                {ip.ess1_body ||
                  "Les decisions du groupe sont prises en fonction de l'impact sur les beneficiaires finaux, pas sur la rentabilite court-terme."}
              </p>
            </article>
            <article className="border border-white/10 rounded-lg p-6">
              <p className="font-mono text-xs text-gold uppercase tracking-widest mb-3">02</p>
              <h3 className="font-display text-lg text-warm-white mb-2">
                {ip.ess2_title || "Gouvernance democratique"}
              </h3>
              <p className="font-body text-sm text-warm-white/70 leading-relaxed">
                {ip.ess2_body ||
                  "Le pacte d'actionnaires prevoit un reporting ESS annuel et une information trimestrielle des investisseurs alignes sur l'impact."}
              </p>
            </article>
            <article className="border border-white/10 rounded-lg p-6">
              <p className="font-mono text-xs text-gold uppercase tracking-widest mb-3">03</p>
              <h3 className="font-display text-lg text-warm-white mb-2">
                {ip.ess3_title || "Reinvestissement majoritaire"}
              </h3>
              <p className="font-body text-sm text-warm-white/70 leading-relaxed">
                {ip.ess3_body ||
                  "Les benefices sont reinjectes a plus de 50% dans le developpement des filiales et l'infrastructure, conformement au cadre ESUS."}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-10">
            {ip.sdg_title || "6 UN Global Goals, 6 contributions concretes"}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {sdgs.map((s) => (
              <article key={s.n} className="border border-white/10 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold font-body"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.n}
                  </span>
                  <h3 className="font-display text-lg text-warm-white">{s.label}</h3>
                </div>
                <p className="font-body text-sm text-warm-white/70 leading-relaxed">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-10">
            {ip.kpi_title || "Indicateurs cibles"}
          </h2>
          <p className="font-body text-base text-warm-white/70 mb-8 leading-relaxed">
            {ip.kpi_lead ||
              "Ces indicateurs seront mesures et publies a partir du premier exercice complet (2027). Les valeurs initiales sont des cibles, pas des resultats."}
          </p>
          <dl className="grid sm:grid-cols-2 gap-6 font-body text-sm">
            {[
              { k: ip.kpi1 || "Commerces COLHYBRI actifs", v: "Cible 2027 : 50 points" },
              { k: ip.kpi2 || "Clubs CROWNIUM deployes", v: "Cible 2028 : 3 clubs" },
              { k: ip.kpi3 || "Supporters CROWNIUM mutualises", v: "Cible 2028 : 10 000 abonnes" },
              { k: ip.kpi4 || "Utilisateurs DOJUKU SHINGI", v: "Cible 2027 : 2 000 eleves" },
              { k: ip.kpi5 || "Taux de reinvestissement ESS", v: "Cible : plus de 50% (ESUS)" },
              { k: ip.kpi6 || "Reporting d'impact annuel", v: "Publication : avril 2028" },
            ].map((row) => (
              <div key={row.k} className="border-b border-white/10 pb-3">
                <dt className="font-mono text-xs text-gold uppercase tracking-widest mb-1">{row.k}</dt>
                <dd className="text-warm-white/80">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-4">
            {ip.activation_eyebrow || "Dispositif d'activation"}
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-6">
            {ip.activation_title || "De la mesure au deploiement"}
          </h2>
          <p className="font-body text-base md:text-lg text-warm-white/70 leading-relaxed mb-8 max-w-3xl">
            {ip.activation_body ||
              "Les KPI ci-dessus sont activables par le concours 2026 GOAT AME CITY, qui ouvre le deploiement de la cellule ESS industriel en commencant par Detroit Chapter 01."}
          </p>
          <Link
            href={`/${locale}/concours`}
            className="inline-block px-6 py-3 bg-gold text-deep-black font-body font-medium hover:bg-gold/90 transition-colors"
          >
            {ip.activation_cta || "Voir le concours 2026"} &rarr;
          </Link>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://ess-france.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-warm-white/60 hover:text-gold transition-colors"
            >
              ess-france.org &uarr;
            </a>
            <span className="text-warm-white/20">&middot;</span>
            <a
              href="https://globalgoals.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-warm-white/60 hover:text-gold transition-colors"
            >
              globalgoals.org &uarr;
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
