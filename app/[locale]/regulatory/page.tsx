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
  const rg = (t.regulatory_page as Record<string, any>) || {};
  return buildPageMetadata({
    locale,
    path: "/regulatory",
    title: rg.meta_title || "Cadre reglementaire, ONLYMORE Group",
    description:
      rg.meta_description ||
      "Resolution UE P10_TA(2025)0212, UEFA Squad Cost Rule, Bundesliga 50+1, agrement ESUS, IOBSP ORIAS, exception L.511-7 CMF, RGPD. Les textes qui legitiment ONLYMORE Group.",
  });
}

type Block = {
  title: string;
  body: string;
  link?: { label: string; href: string };
};

export default async function RegulatoryPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const rg = (t.regulatory_page as Record<string, any>) || {};
  const common = (t.common as Record<string, string>) || {};

  const blocks: Block[] = [
    {
      title: rg.eu_title || "Resolution UE P10_TA(2025)0212",
      body:
        rg.eu_body ||
        "Le Parlement europeen adopte le 7 octobre 2025, a 552 voix pour et 86,4%, une resolution reconnaissant formellement le modele cooperatif et mutualiste comme levier d'inclusion economique. Ce texte valide la trajectoire d'ONLYMORE Group et ouvre un chemin reglementaire continental pour les infrastructures mutualistes.",
      link: {
        label: "europarl.europa.eu",
        href: "https://www.europarl.europa.eu/doceo/document/TA-10-2025-0212_FR.html",
      },
    },
    {
      title: rg.uefa_title || "UEFA Squad Cost Rule",
      body:
        rg.uefa_body ||
        "Depuis la saison 2023-2024, l'UEFA plafonne les couts d'effectif des clubs a 70% des revenus operationnels, via la Squad Cost Rule. Des amendes significatives ont ete infligees des 2025 (Chelsea 31M EUR notamment). Ce plafond valide mecaniquement le modele de revenus CROWNIUM : la ressource mutualiste devient indispensable.",
      link: { label: "uefa.com", href: "https://www.uefa.com/insideuefa/football-development/club-licensing/financial-sustainability/" },
    },
    {
      title: rg.bundes_title || "Bundesliga 50+1",
      body:
        rg.bundes_body ||
        "La regle 50+1 impose en Bundesliga que le club detienne la majorite des droits de vote, quelles que soient les prises de participation externes. Ce modele produit un taux de remplissage moyen superieur a 95% et un rapport stable entre clubs et supporters. ONLYMORE s'en inspire pour structurer CROWNIUM.",
      link: { label: "bundesliga.com", href: "https://www.bundesliga.com/en/news/Bundesliga/50-1-rule-explained" },
    },
    {
      title: rg.ess_title || "ESS France et agrement ESUS",
      body:
        rg.ess_body ||
        "Le decret du 23 juin 2015 encadre l'agrement ESUS (Entreprise Solidaire d'Utilite Sociale). ONLYMORE Group engage la procedure en presentant les trois criteres : primaute de la personne, gouvernance democratique, lucrativite encadree avec reinvestissement majoritaire.",
      link: { label: "ess-france.org", href: "https://www.ess-france.org" },
    },
    {
      title: rg.iobsp_title || "IOBSP ORIAS",
      body:
        rg.iobsp_body ||
        "ONLYMORE FINANCE initiera, en Q1 2027, l'inscription au registre ORIAS des Intermediaires en Operations de Banque et Services de Paiement (IOBSP). Le delai standard d'inscription est de 6 a 10 semaines, sans capital minimum exige.",
      link: { label: "orias.fr", href: "https://www.orias.fr" },
    },
    {
      title: rg.l511_title || "Exception L.511-7 CMF intragroupe",
      body:
        rg.l511_body ||
        "L'article L.511-7 du Code monetaire et financier autorise le financement intragroupe sans agrement bancaire. ONLYMORE Group s'appuie sur cette exception pour structurer le flux de tresorerie entre la holding et ses filiales, dans la continuite du mutualisme francais.",
    },
    {
      title: rg.rgpd_title || "RGPD et CNIL",
      body:
        rg.rgpd_body ||
        "Le groupe applique strictement le RGPD et la Loi Informatique et Libertes. Aucun cookie publicitaire, aucun traceur tiers, analyse d'audience par Plausible sans cookie. Delegue a la protection des donnees : privacy@onlymore.group. Droit de reclamation CNIL.",
      link: { label: "cnil.fr", href: "https://www.cnil.fr" },
    },
  ];

  return (
    <main>
      <Header />
      <StructuredData
        locale={locale}
        breadcrumbs={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: rg.breadcrumb || "Regulatory", url: `${BASE_URL}/${locale}/regulatory` },
        ]}
        extra={[
          getArticleSchema({
            slug: "regulatory",
            title: rg.hero_title || "Le cadre reglementaire qui fonde ONLYMORE.",
            description:
              rg.meta_description ||
              "EU Resolution, UEFA Squad Cost Rule, Bundesliga 50+1, ESUS, IOBSP, L.511-7 CMF, RGPD.",
            datePublished: "2026-04-19",
            locale,
            path: "/regulatory",
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
            <span>{rg.breadcrumb || "Reglementaire"}</span>
          </nav>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-6">
            {rg.eyebrow || "Cadre reglementaire"}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-white mb-8 leading-tight">
            {rg.hero_title || "Le cadre reglementaire qui fonde ONLYMORE."}
          </h1>
          <p className="font-body text-lg md:text-xl text-warm-white/70 max-w-2xl leading-relaxed">
            {rg.hero_lead ||
              "Le groupe n'invente pas un modele. Il agrege des textes europeens, francais et sportifs existants, en les mettant en circulation dans une architecture nouvelle."}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-10">
          {blocks.map((b) => (
            <article key={b.title} className="border border-white/10 rounded-lg p-6">
              <h2 className="font-display text-2xl text-gold mb-3">{b.title}</h2>
              <p className="font-body text-base text-warm-white/80 leading-relaxed mb-4">{b.body}</p>
              {b.link && (
                <a
                  href={b.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-widest text-warm-white/50 hover:text-gold transition-colors"
                >
                  {b.link.label} &uarr;
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
