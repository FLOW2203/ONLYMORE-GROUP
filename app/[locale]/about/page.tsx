import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { getTranslations, Locale, defaultLocale } from "@/lib/i18n";
import { buildPageMetadata, getArticleSchema, getBreadcrumbListSchema, BASE_URL } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const about = (t.about as Record<string, any>) || {};
  return buildPageMetadata({
    locale,
    path: "/about",
    title: about.meta_title || "Notre histoire, ONLYMORE Group",
    description:
      about.meta_description ||
      "ONLYMORE Group, holding mutualiste francaise nee en 2023 de 220 annees de mutualisme, 138 ans de football professionnel et 60 ans de float model.",
  });
}

type Milestone = {
  year: string;
  title: string;
  body: string;
};

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const about = (t.about as Record<string, any>) || {};
  const common = (t.common as Record<string, string>) || {};

  const milestones: Milestone[] = [
    {
      year: "1806",
      title: about.m1_title || "Le mutualisme francais",
      body:
        about.m1_body ||
        "Premiere societe de secours mutuel autorisee en France. 219 annees plus tard, ce modele infuse la culture economique francaise et inspire la structure d'ONLYMORE Group.",
    },
    {
      year: "1888",
      title: about.m2_title || "Le football professionnel",
      body:
        about.m2_body ||
        "17 avril 1888, fondation de la Football League en Angleterre. 138 ans plus tard, 13 000 clubs professionnels adressables portent une economie affective que CROWNIUM mutualise.",
    },
    {
      year: "1919",
      title: about.m3_title || "Green Bay Packers",
      body:
        about.m3_body ||
        "Fondation du club par Curly Lambeau. 538 967 actionnaires aujourd'hui. La seule franchise NFL detenue par la communaute. Modele inspirationnel, pas operationnel.",
    },
    {
      year: "1965",
      title: about.m4_title || "Berkshire Hathaway float",
      body:
        about.m4_body ||
        "Warren Buffett transforme une entreprise textile en vehicule d'investissement utilisant le float assurantiel. 60 annees de preuve que le capital patient genere de l'alpha.",
    },
    {
      year: "2023",
      title: about.m5_title || "Genese ONLYMORE",
      body:
        about.m5_body ||
        "28 decembre 2023, premier email sociochaux.fr. Florent Gibert depose les fondations d'une infrastructure mutualiste a l'intersection du mutualisme, du sport et du capital patient.",
    },
    {
      year: "2025",
      title: about.m6_title || "Validation institutionnelle",
      body:
        about.m6_body ||
        "7 octobre 2025, Resolution P10_TA(2025)0212 du Parlement europeen. 552 votes, 86,4% pour le modele cooperatif. Le cadre reglementaire rejoint la these ONLYMORE.",
    },
  ];

  const breadcrumbs = [
    { name: "Home", url: `${BASE_URL}/${locale}` },
    { name: about.breadcrumb || "About", url: `${BASE_URL}/${locale}/about` },
  ];

  return (
    <main>
      <Header />
      <StructuredData
        locale={locale}
        breadcrumbs={breadcrumbs}
        extra={[
          getArticleSchema({
            slug: "about",
            title: about.hero_title || "Une holding nee de l'exclusion.",
            description:
              about.meta_description ||
              "Histoire d'ONLYMORE Group, 220 annees de mutualisme et 138 ans de football professionnel.",
            datePublished: "2026-04-19",
            locale,
            path: "/about",
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
            <span>{about.breadcrumb || "Notre histoire"}</span>
          </nav>

          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-6">
            {about.eyebrow || "Notre histoire"}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-white mb-8 leading-tight">
            {about.hero_title || "Une holding nee de l'exclusion."}
          </h1>
          <p className="font-body text-lg md:text-xl text-warm-white/70 max-w-2xl leading-relaxed">
            {about.hero_lead ||
              "ONLYMORE Group agrege deux siecles de mutualisme, plus d'un siecle de football populaire et soixante annees de capital patient. Une infrastructure pour les oublies des systemes actuels."}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-12">
            {about.timeline_title || "Une infrastructure longue duree"}
          </h2>
          <ol className="space-y-10">
            {milestones.map((m) => (
              <li key={m.year} className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-10">
                <div className="font-mono text-2xl md:text-3xl text-gold pt-1">{m.year}</div>
                <div>
                  <h3 className="font-display text-xl md:text-2xl text-warm-white mb-2">{m.title}</h3>
                  <p className="font-body text-base text-warm-white/70 leading-relaxed">{m.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-6">
            {about.coffee_title || "Le cafe suspendu de Naples"}
          </h2>
          <p className="font-body text-base md:text-lg text-warm-white/70 leading-relaxed mb-6">
            {about.coffee_body ||
              "Naples, debut du XIXe siecle. Un client paye deux cafes, en consomme un, laisse le second pour un passant sans le sou. Rien n'est ecrit, rien n'est demande. La solidarite circule dans le geste quotidien. COLHYBRI digitalise cette mecanique : un achat generateur de reserve pour ceux qui en auraient le besoin. Le don s'agrege sans s'afficher."}
          </p>
          <p className="font-body text-base md:text-lg text-warm-white/70 leading-relaxed">
            {about.coffee_body_2 ||
              "Le meme principe structure CROWNIUM : une place au stade achetee mutualise un financement pour le club. La philanthropie ne paraissait jadis possible qu'aux extremes. ONLYMORE la reintegre au ras du quotidien."}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-6">
            {about.hummingbird_title || "La legende du colibri"}
          </h2>
          <blockquote className="border-l-2 border-gold pl-6 italic font-display text-xl md:text-2xl text-warm-white/90 mb-6 leading-relaxed">
            {about.hummingbird_quote ||
              "Je fais ma part. Pierre Rabhi, reprenant une legende amerindienne."}
          </blockquote>
          <p className="font-body text-base md:text-lg text-warm-white/70 leading-relaxed">
            {about.hummingbird_body ||
              "Face au brasier, l'oiseau transporte quelques gouttes. Les autres animaux moquent son inutilite. Il repond. Le groupe ONLYMORE cultive cette humilite active. Ni sauveurs, ni observateurs : des contributeurs precis, a la mesure de leur portee."}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-6">
            {about.cta_title || "Continuer l'exploration"}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/philosophy`}
              className="inline-block px-6 py-3 border border-gold text-gold font-body hover:bg-gold hover:text-deep-black transition-colors"
            >
              {about.cta_philosophy || "Notre philosophie"}
            </Link>
            <Link
              href={`/${locale}/equipe`}
              className="inline-block px-6 py-3 border border-white/20 text-warm-white font-body hover:border-gold hover:text-gold transition-colors"
            >
              {about.cta_team || "Rencontrer l'equipe"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
