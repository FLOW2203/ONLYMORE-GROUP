import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { getTranslations, Locale, defaultLocale } from "@/lib/i18n";
import { buildPageMetadata, BASE_URL } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const tp = (t.team_page as Record<string, any>) || {};
  return buildPageMetadata({
    locale,
    path: "/equipe",
    title: tp.meta_title || "The NEW TEAM, ONLYMORE Group",
    description:
      tp.meta_description ||
      "L'equipe humaine d'ONLYMORE Group (Florent Gibert, Joao Almeida, Stephane Picard) et la NEW TEAM IA (Claude + 8 agents). Commando mode, infrastructure autonome.",
  });
}

type Human = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
};

type Agent = {
  code: string;
  name: string;
  role: string;
};

export default async function EquipePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const tp = (t.team_page as Record<string, any>) || {};
  const teamOld = (t.team as Record<string, any>) || {};
  const common = (t.common as Record<string, string>) || {};

  const humans: Human[] = [
    {
      slug: "florent-gibert",
      name: "Florent Gibert",
      role: teamOld?.florent?.role || "Founder & CEO",
      bio:
        teamOld?.florent?.bio ||
        "Autodidacte, Rodilhan (Occitanie), racines marseillaises cote mere, ex-BTP et livraison, kung fu le lundi, karate le jeudi.",
      image: "/images/florent_400.jpg",
      linkedin: "https://www.linkedin.com/in/florent-gibert",
    },
    {
      slug: "joao-almeida",
      name: "Joao Almeida",
      role: teamOld?.joao?.role || "CFO",
      bio:
        tp.joao_bio ||
        "Ex-ONEtoONE Corporate Finance (Lisbonne, Paris). Pilote la discipline financiere, la modelisation et la structuration de la levee pre-seed.",
      image: "/images/joao_400.jpg",
      linkedin: "https://www.linkedin.com/in/joao-almeida",
    },
    {
      slug: "stephane-picard",
      name: "Stephane Picard",
      role: teamOld?.stephane?.role || "Fundraising Partner",
      bio:
        tp.stephane_bio ||
        "Partenaire levee de fonds via Winvesty, label WEP Access. Reseau investisseurs impact et family offices.",
      image: "/images/stephane_400.jpg",
      linkedin: "https://www.linkedin.com/in/stephane-picard",
    },
  ];

  const agents: Agent[] = [
    { code: "10", name: "Claude", role: tp.a_claude || "President delegue IA, meneur de jeu" },
    { code: "01", name: "NOTION", role: tp.a_notion || "Gardien memoire du groupe" },
    { code: "02", name: "SHIELD", role: tp.a_shield || "Securite, CSP, secrets, vulnerabilites" },
    { code: "03", name: "VAULT", role: tp.a_vault || "Persistance Supabase, schemas, migrations" },
    { code: "04", name: "SENTINEL", role: tp.a_sentinel || "Monitoring, alertes, SLO" },
    { code: "05", name: "NEXUS", role: tp.a_nexus || "Veille via Firecrawl, benchmarks concurrence" },
    { code: "06", name: "FORGE", role: tp.a_forge || "Code, builds, deploy, CI" },
    { code: "07", name: "HERALD", role: tp.a_herald || "Communication, LinkedIn, SEO institutionnel" },
    { code: "08", name: "TITAN", role: tp.a_titan || "Synapses inter-entites, detection d'opportunites" },
  ];

  return (
    <main>
      <Header />
      <StructuredData
        locale={locale}
        includeTeam
        breadcrumbs={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: tp.breadcrumb || "Team", url: `${BASE_URL}/${locale}/equipe` },
        ]}
      />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-deep-black">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <nav aria-label="breadcrumb" className="mb-8 text-sm text-warm-white/50 font-body">
            <Link href={`/${locale}`} className="hover:text-gold transition-colors">
              {common.home || "Accueil"}
            </Link>
            <span className="mx-2">/</span>
            <span>{tp.breadcrumb || "The NEW TEAM"}</span>
          </nav>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-6">
            {tp.eyebrow || "The NEW TEAM"}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-white mb-8 leading-tight">
            {tp.hero_title || "Humains et agents. Une infrastructure autonome."}
          </h1>
          <p className="font-body text-lg md:text-xl text-warm-white/70 max-w-2xl leading-relaxed">
            {tp.hero_lead ||
              "ONLYMORE Group conjugue trois humains et neuf agents IA. Pas de salaries, pas de dette, pas d'overhead inutile. Une equipe concue pour la fiabilite longue duree."}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-12">
            {tp.humans_title || "Les humains"}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {humans.map((h) => (
              <article key={h.slug} className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.02]">
                {h.image && (
                  <div className="aspect-square relative bg-black/40">
                    <Image
                      src={h.image}
                      alt={h.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-display text-xl text-warm-white">{h.name}</h3>
                  <p className="font-mono text-xs text-gold uppercase tracking-widest mb-3">{h.role}</p>
                  <p className="font-body text-sm text-warm-white/70 leading-relaxed mb-4">{h.bio}</p>
                  {h.linkedin && (
                    <a
                      href={h.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-xs text-warm-white/50 hover:text-gold transition-colors"
                    >
                      LinkedIn &uarr;
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-4">
            {tp.agents_title || "The NEW TEAM IA"}
          </h2>
          <p className="font-body text-base md:text-lg text-warm-white/60 max-w-3xl mb-12 leading-relaxed">
            {tp.agents_lead ||
              "Une formation 4-3-3 logique. Claude porte le numero 10 : meneur de jeu, architecte narratif. Huit agents specialises couvrent la memoire, la securite, la donnee, le monitoring, la veille, le code, la communication et la detection d'opportunites."}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {agents.map((a) => (
              <article key={a.name} className="border border-white/10 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-sm text-gold border border-gold/30 rounded px-2 py-0.5">{a.code}</span>
                  <h3 className="font-display text-lg text-warm-white">{a.name}</h3>
                </div>
                <p className="font-body text-sm text-warm-white/65 leading-relaxed">{a.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-6">
            {tp.commando_eyebrow || "Commando mode"}
          </p>
          <p className="font-display text-2xl md:text-3xl text-warm-white leading-relaxed mb-8">
            {tp.commando_quote ||
              "Nous ne sommes pas une startup. Nous sommes une infrastructure autonome. Trois humains, neuf agents, zero salarie, zero dette, antifragile."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/investisseurs`}
              className="inline-block px-6 py-3 border border-gold text-gold font-body hover:bg-gold hover:text-deep-black transition-colors"
            >
              {tp.cta_invest || "Rejoindre en tant qu'investisseur"}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="inline-block px-6 py-3 border border-white/20 text-warm-white font-body hover:border-gold hover:text-gold transition-colors"
            >
              {tp.cta_about || "Notre histoire"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
