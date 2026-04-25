import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { getTranslations, Locale, defaultLocale } from "@/lib/i18n";
import { buildPageMetadata, getFAQPageSchema, BASE_URL } from "@/lib/seo";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || "{{CALENDLY_URL}}";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const ip = (t.investors_page as Record<string, any>) || {};
  return buildPageMetadata({
    locale,
    path: "/investisseurs",
    title: ip.meta_title || "Investors, ONLYMORE Group",
    description:
      ip.meta_description ||
      "Pre-seed ONLYMORE Group : 200-350K EUR, pre-money 1.3-2.15M EUR. Infrastructure mutualiste, ESS, 6 UN SDG. Reserver un rendez-vous.",
  });
}

type Stage = { year: string; label: string };
type FAQ = { question: string; answer: string };

export default async function InvestorsPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const ip = (t.investors_page as Record<string, any>) || {};
  const common = (t.common as Record<string, string>) || {};
  const investorsOld = (t.investors as Record<string, any>) || {};

  const roadmap: Stage[] = [
    { year: "2026", label: ip.r26 || "Pre-seed 200-350K EUR, consolidation COLHYBRI et CROWNIUM" },
    { year: "2027", label: ip.r27 || "Seed 1.5-2.5M EUR, lancement DOJUKU SHINGI, IOBSP ORIAS pour FINANCE" },
    { year: "2028", label: ip.r28 || "Serie A, expansion europeenne, PLUMAYA Editions operationnel" },
    { year: "2029", label: ip.r29 || "Scaling, premieres operations CROWNIUM multi-clubs" },
    { year: "2030", label: ip.r30 || "Profitabilite operationnelle groupe, reinvestissement 100% ESS" },
  ];

  const faqs: FAQ[] = [
    {
      question: ip.faq1_q || "Quel est le ticket d'entree ?",
      answer:
        ip.faq1_a ||
        "Pre-seed ouvert entre 25K et 150K EUR par ligne, en BSA-AIR de preference, ou actions ordinaires selon structuration. Priorite aux investisseurs alignes ESS.",
    },
    {
      question: ip.faq2_q || "Quelle est la valorisation ?",
      answer:
        ip.faq2_a ||
        "Pre-money 1.3M a 2.15M EUR selon tranche et syndicat. Valorisation institutionnelle basee sur la these groupe, les filiales live (COLHYBRI, CROWNIUM) et le cadre reglementaire consolide (ESUS, ESS France, EU Resolution).",
    },
    {
      question: ip.faq3_q || "Qu'est-ce qui est promis ?",
      answer:
        ip.faq3_a ||
        "Aucune promesse de rendement financier. Une infrastructure mutualiste pre-revenue, alignee ESS, avec vision 7 a 10 ans. Le capital investi finance le lancement des filiales et le passage a l'agrement ESUS.",
    },
    {
      question: ip.faq4_q || "Comment se passe la gouvernance ?",
      answer:
        ip.faq4_a ||
        "Pacte d'actionnaires standard BGE/France Active. Droit d'information trimestriel, reporting ESS annuel, droit de preference. Florent Gibert conserve le controle operationnel pour assurer la continuite de la these.",
    },
    {
      question: ip.faq5_q || "Quels sont les labels ?",
      answer:
        ip.faq5_a ||
        "Winvesty, label WEP Access pour le fundraising partner. Accompagnement BGE Nimes, France Active Occitanie. Agrement ESUS en cours (decret 23/06/2015).",
    },
  ];

  return (
    <main>
      <Header />
      <StructuredData
        locale={locale}
        breadcrumbs={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: ip.breadcrumb || "Investors", url: `${BASE_URL}/${locale}/investisseurs` },
        ]}
        extra={[getFAQPageSchema(faqs)]}
      />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-deep-black">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <nav aria-label="breadcrumb" className="mb-8 text-sm text-warm-white/50 font-body">
            <Link href={`/${locale}`} className="hover:text-gold transition-colors">
              {common.home || "Accueil"}
            </Link>
            <span className="mx-2">/</span>
            <span>{ip.breadcrumb || "Investisseurs"}</span>
          </nav>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-6">
            {ip.eyebrow || "Pre-seed 2026"}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-white mb-8 leading-tight">
            {ip.hero_title || "Invest in the mutualist future."}
          </h1>
          <p className="font-body text-lg md:text-xl text-warm-white/70 max-w-2xl leading-relaxed mb-10">
            {ip.hero_lead ||
              investorsOld.description ||
              "ONLYMORE Group leve un tour pre-seed de 200-350K EUR a une valorisation pre-money de 1.3-2.15M EUR. Infrastructure mutualiste, ESS, 6 UN Global Goals."}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <CalendlyEmbed url={CALENDLY_URL} label={ip.cta_book || "Reserver un rendez-vous"} />
            <a
              href="mailto:investors@onlymore.group"
              className="inline-block px-6 py-3 border border-white/20 text-warm-white font-body hover:border-gold hover:text-gold transition-colors"
            >
              investors@onlymore.group
            </a>
          </div>
          <p className="font-body text-xs text-warm-white/40 mt-6 max-w-xl">
            {ip.disclaimer ||
              "Ce site ne constitue pas une sollicitation a l'investissement ni un conseil en investissement. Toute operation est encadree par le droit financier francais applicable."}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-10">
            {ip.thesis_title || "Le WHY, le HOW, le WHAT"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <article className="border border-white/10 rounded-lg p-6">
              <p className="font-mono text-xs text-gold uppercase tracking-widest mb-3">WHY</p>
              <p className="font-body text-sm text-warm-white/80 leading-relaxed">
                {ip.why ||
                  "Que chacun puisse vivre et prosperer la ou il a grandi. Reduire la pauvrete, stopper la fuite des talents, combattre l'emigration forcee."}
              </p>
            </article>
            <article className="border border-white/10 rounded-lg p-6">
              <p className="font-mono text-xs text-gold uppercase tracking-widest mb-3">HOW</p>
              <p className="font-body text-sm text-warm-white/80 leading-relaxed">
                {ip.how ||
                  "Mutualisme francais, community ownership inspire Green Bay, Berkshire Hathaway float model. Infrastructure longue duree, capital patient, agrement ESUS."}
              </p>
            </article>
            <article className="border border-white/10 rounded-lg p-6">
              <p className="font-mono text-xs text-gold uppercase tracking-widest mb-3">WHAT</p>
              <p className="font-body text-sm text-warm-white/80 leading-relaxed">
                {ip.what ||
                  "Une holding ESS et 5 filiales adressant 6 UN Global Goals : COLHYBRI, CROWNIUM, DOJUKU SHINGI, ONLYMORE FINANCE, PLUMAYA Editions."}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-10">
            {ip.market_title || "Marche"}
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 font-mono text-sm">
            <div className="border border-white/10 rounded-lg p-5">
              <p className="text-xs uppercase tracking-widest text-warm-white/40 mb-1">TAM</p>
              <p className="text-2xl text-gold">25-35 Md EUR</p>
              <p className="text-xs text-warm-white/60 mt-2">Sport-tech Europe</p>
            </div>
            <div className="border border-white/10 rounded-lg p-5">
              <p className="text-xs uppercase tracking-widest text-warm-white/40 mb-1">SAM</p>
              <p className="text-2xl text-gold">8-12 Md EUR</p>
              <p className="text-xs text-warm-white/60 mt-2">Clubs pros UE + ESS</p>
            </div>
            <div className="border border-white/10 rounded-lg p-5">
              <p className="text-xs uppercase tracking-widest text-warm-white/40 mb-1">SOM</p>
              <p className="text-2xl text-gold">50 M EUR</p>
              <p className="text-xs text-warm-white/60 mt-2">
                3 premiers clubs CROWNIUM plus deploiement COLHYBRI Occitanie
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-10">
            {ip.roadmap_title || "Roadmap 5 ans"}
          </h2>
          <ol className="space-y-6">
            {roadmap.map((s) => (
              <li key={s.year} className="grid grid-cols-[80px_1fr] gap-6 items-start">
                <span className="font-mono text-2xl text-gold">{s.year}</span>
                <span className="font-body text-base text-warm-white/80 leading-relaxed">{s.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-10">
            {ip.sdg_title || "6 UN Global Goals"}
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { n: 1, color: "#E5243B", label: ip.sdg1 || "No Poverty" },
              { n: 4, color: "#C5192D", label: ip.sdg4 || "Quality Education" },
              { n: 8, color: "#A21942", label: ip.sdg8 || "Decent Work" },
              { n: 10, color: "#DD1367", label: ip.sdg10 || "Reduced Inequalities" },
              { n: 11, color: "#FD9D24", label: ip.sdg11 || "Sustainable Cities" },
              { n: 17, color: "#19486A", label: ip.sdg17 || "Partnerships" },
            ].map((s) => (
              <span key={s.n} className="flex items-center gap-2 px-3 py-2 rounded-md border border-white/10">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold font-body"
                  style={{ backgroundColor: s.color }}
                >
                  {s.n}
                </span>
                <span className="font-body text-sm text-warm-white/80">{s.label}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-10">
            {ip.faq_title || "Questions frequentes"}
          </h2>
          <dl className="space-y-6">
            {faqs.map((f) => (
              <div key={f.question} className="border border-white/10 rounded-lg p-5">
                <dt className="font-display text-lg text-warm-white mb-2">{f.question}</dt>
                <dd className="font-body text-sm text-warm-white/70 leading-relaxed">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-6">
            {ip.cta_title || "Prenons le temps d'en parler"}
          </h2>
          <p className="font-body text-base md:text-lg text-warm-white/70 mb-8 leading-relaxed">
            {ip.cta_body ||
              "Un echange de 30 minutes pour discuter de la these, des filiales, de la structuration. Aucun engagement, aucune pression commerciale."}
          </p>
          <CalendlyEmbed url={CALENDLY_URL} label={ip.cta_book || "Reserver un rendez-vous"} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
