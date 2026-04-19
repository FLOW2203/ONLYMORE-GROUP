import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import LogoInfinity from "@/components/LogoInfinity";
import { getTranslations, Locale, defaultLocale } from "@/lib/i18n";
import { buildPageMetadata, getArticleSchema, BASE_URL } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const philo = (t.philosophy_page as Record<string, any>) || {};
  return buildPageMetadata({
    locale,
    path: "/philosophy",
    title: philo.meta_title || "Notre philosophie, ONLYMORE Group",
    description:
      philo.meta_description ||
      "Le symbole O-M decode, les trois citations fondatrices, les valeurs et le why d'ONLYMORE Group.",
  });
}

type Value = { title: string; body: string };
type Reading = { level: string; body: string };

export default async function PhilosophyPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const p = (t.philosophy_page as Record<string, any>) || {};
  const common = (t.common as Record<string, string>) || {};
  const philoOld = (t.philosophy as Record<string, any>) || {};

  const values: Value[] = [
    {
      title: p.v1_title || "Deviens la personne dont tu veux que le monde soit",
      body:
        p.v1_body ||
        "Le changement ne se sous-traite pas. Il se modelise d'abord en soi. ONLYMORE refuse le cynisme du gestionnaire et la naivete du militant.",
    },
    {
      title: p.v2_title || "Nous n'avons pas besoin de nuire aux autres pour briller",
      body:
        p.v2_body ||
        "Positionnement additif par principe. Le marche n'est pas un duel mais un ecosysteme. Les concurrents deviennent des partenaires implicites quand la these est assez large.",
    },
    {
      title: p.v3_title || "Optimisons vos oeuvres",
      body:
        p.v3_body ||
        "Le verbe optimiser ne designe pas une maximisation mathematique mais une remise au clair. Oter le superflu. Fortifier l'essentiel. Respecter le travail deja fait.",
    },
  ];

  const readings: Reading[] = [
    {
      level: p.r1_level || "Premium",
      body:
        p.r1_body ||
        "Un logo sobre, deux glyphes centres, typographie Playfair. Au premier regard, une marque institutionnelle.",
    },
    {
      level: p.r2_level || "Lettres",
      body:
        p.r2_body ||
        "O et M. Deux lettres grecques, deux piliers. ONLY et MORE. Le minimum indispensable pour tenir debout.",
    },
    {
      level: p.r3_level || "Mecanisme",
      body:
        p.r3_body ||
        "Le O devient circuit ferme, le M devient moteur. L'energie circule sans fuite : c'est la metaphore du capital qui reste dans l'economie locale.",
    },
    {
      level: p.r4_level || "Philosophie",
      body:
        p.r4_body ||
        "Pas de debut, pas de fin. L'infini lemniscatique. Une infrastructure concue pour durer au-dela des cycles, au-dela des fondateurs.",
    },
  ];

  return (
    <main>
      <Header />
      <StructuredData
        locale={locale}
        breadcrumbs={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: p.breadcrumb || "Philosophy", url: `${BASE_URL}/${locale}/philosophy` },
        ]}
        extra={[
          getArticleSchema({
            slug: "philosophy",
            title: p.hero_title || "Un symbole. Tout un monde.",
            description:
              p.meta_description ||
              "La philosophie ONLYMORE Group, trois citations fondatrices, le logo O-M decode, les valeurs et le why.",
            datePublished: "2026-04-19",
            locale,
            path: "/philosophy",
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
            <span>{p.breadcrumb || "Philosophie"}</span>
          </nav>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-6">
            {p.eyebrow || "Notre philosophie"}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-white mb-8 leading-tight">
            {p.hero_title || "Un symbole. Tout un monde."}
          </h1>
          <p className="font-body text-lg md:text-xl text-warm-white/70 max-w-2xl leading-relaxed">
            {p.hero_lead ||
              "Le logo n'est pas un ornement. C'est la premiere these d'ONLYMORE Group, compressee en deux lettres et une circulation infinie."}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 grid md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-center">
          <div aria-hidden className="flex justify-center md:justify-start">
            <LogoInfinity size={220} />
          </div>
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-6">
              {p.decoded_title || "L'Infini decode"}
            </h2>
            <ul className="space-y-4">
              <li>
                <span className="font-mono text-xs text-gold uppercase tracking-widest">O</span>
                <p className="font-body text-base text-warm-white/80">
                  {p.decoded_o || "ONLY. Le seul indispensable, le ras du suffisant, le non-gaspillage."}
                </p>
              </li>
              <li>
                <span className="font-mono text-xs text-gold uppercase tracking-widest">M</span>
                <p className="font-body text-base text-warm-white/80">
                  {p.decoded_m || "MORE. L'extension, le surplus reinjecte, l'infini comme trajectoire plutot que comme limite."}
                </p>
              </li>
              <li>
                <span className="font-mono text-xs text-gold uppercase tracking-widest">∞</span>
                <p className="font-body text-base text-warm-white/80">
                  {p.decoded_inf ||
                    "Le point de jonction, le moteur central. Pas un croisement, une circulation : l'argent qui revient toujours au territoire."}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-10">
            {p.readings_title || "Quatre niveaux de lecture"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {readings.map((r) => (
              <article key={r.level} className="border border-white/10 rounded-lg p-6">
                <p className="font-mono text-xs text-gold uppercase tracking-widest mb-3">{r.level}</p>
                <p className="font-body text-base text-warm-white/80 leading-relaxed">{r.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-14">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white text-center">
            {p.quotes_title || "Trois citations fondatrices"}
          </h2>
          <figure>
            <blockquote className="border-l-2 border-gold pl-6 italic font-display text-xl md:text-2xl text-warm-white/90 leading-relaxed">
              {philoOld?.mandela?.quote ||
                "Le sport a le pouvoir de changer le monde. Il a le pouvoir d'inspirer. Il a le pouvoir d'unir les gens comme peu d'autres choses."}
            </blockquote>
            <figcaption className="font-body text-sm text-warm-white/50 mt-3 ml-7">
              {philoOld?.mandela?.author || "Nelson Mandela, Laureus World Sports Awards, 2000"}
            </figcaption>
          </figure>
          <figure>
            <blockquote className="border-l-2 border-gold pl-6 italic font-display text-xl md:text-2xl text-warm-white/90 leading-relaxed">
              {philoOld?.boetcker?.quote ||
                "Vous ne pouvez pas aider le pauvre en ruinant le riche. Vous ne pouvez pas aider les hommes continuellement en faisant a leur place ce qu'ils devraient faire eux-memes."}
            </blockquote>
            <figcaption className="font-body text-sm text-warm-white/50 mt-3 ml-7">
              {philoOld?.boetcker?.author || "William J.H. Boetcker"}
            </figcaption>
          </figure>
          <figure>
            <blockquote className="border-l-2 border-gold pl-6 italic font-display text-xl md:text-2xl text-warm-white/90 leading-relaxed">
              {philoOld?.founder?.quote ||
                "Contraint de trouver des solutions financieres parce que j'etais trop handicape pour travailler, pas assez pour une pension, et trop jeune pour etre opere. J'ai transforme mon exclusion en mission : que personne ne vive ce que j'ai vecu."}
            </blockquote>
            <figcaption className="font-body text-sm text-warm-white/50 mt-3 ml-7">
              {philoOld?.founder?.author || "Florent Gibert, Founder & CEO"}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-10">
            {p.values_title || "Trois valeurs"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v) => (
              <article key={v.title} className="border border-white/10 rounded-lg p-6">
                <h3 className="font-display text-lg text-gold mb-3">{v.title}</h3>
                <p className="font-body text-sm text-warm-white/70 leading-relaxed">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-6">
            {p.why_eyebrow || "Notre why"}
          </p>
          <p className="font-display text-2xl md:text-3xl text-warm-white leading-relaxed">
            {p.why_body ||
              "Que chacun puisse vivre et prosperer la ou il a grandi."}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
