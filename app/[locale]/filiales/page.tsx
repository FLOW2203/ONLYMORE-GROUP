import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { getTranslations, Locale, defaultLocale } from "@/lib/i18n";
import { buildPageMetadata, getServiceSchema, BASE_URL } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const fp = (t.filiales_page as Record<string, any>) || {};
  return buildPageMetadata({
    locale,
    path: "/filiales",
    title: fp.meta_title || "Nos 5 filiales, ONLYMORE Group",
    description:
      fp.meta_description ||
      "COLHYBRI, CROWNIUM, DOJUKU SHINGI, ONLYMORE FINANCE, PLUMAYA Editions. 5 filiales, 1 infrastructure mutualiste.",
  });
}

type Subsidiary = {
  slug: string;
  name: string;
  tagline: string;
  pitch: string;
  status: "live" | "soon" | "q4_2026" | "q1_2027" | "q2_2027";
  href: string;
  externalHref?: string;
  accent: "teal" | "gold";
};

export default async function FilialesPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const fp = (t.filiales_page as Record<string, any>) || {};
  const sOld = (t.subsidiaries as Record<string, any>) || {};
  const common = (t.common as Record<string, string>) || {};

  const statusLabels: Record<Subsidiary["status"], string> = {
    live: fp.status_live || "Live",
    soon: fp.status_soon || "Coming soon",
    q4_2026: "Q4 2026",
    q1_2027: "Q1 2027",
    q2_2027: "Q2 2027",
  };

  const subsidiaries: Subsidiary[] = [
    {
      slug: "colhybri",
      name: "COLHYBRI",
      tagline: fp.colhybri_tag || "Le cafe sospeso digitalise pour le commerce local.",
      pitch: sOld?.colhybri?.desc || "Plateforme SaaS de commerce solidaire. Chaque achat mutualise un geste pour le quartier.",
      status: "live",
      href: `/${locale}/colhybri`,
      externalHref: "https://colhybri.com",
      accent: "teal",
    },
    {
      slug: "crownium",
      name: "CROWNIUM",
      tagline: fp.crownium_tag || "Financement mutualiste pour clubs sportifs professionnels.",
      pitch: sOld?.crownium?.desc || "Modele SAS mutualiste. Les supporters s'abonnent, ne deviennent jamais actionnaires du club.",
      status: "live",
      href: `/${locale}/crownium`,
      externalHref: "https://crownium.club",
      accent: "teal",
    },
    {
      slug: "dojuku-shingi",
      name: "DOJUKU SHINGI",
      tagline: fp.dojuku_tag || "L'IA au service des arts martiaux intergenerationnels.",
      pitch: sOld?.dojuku?.desc || "Application IA d'arts martiaux, 5 cultures, transmission intergenerationnelle.",
      status: "q4_2026",
      href: `/${locale}/dojuku-shingi`,
      accent: "gold",
    },
    {
      slug: "onlymore-finance",
      name: "ONLYMORE FINANCE",
      tagline: fp.finance_tag || "Credit Lombard mutualiste, IOBSP ORIAS, intragroupe L.511-7 CMF.",
      pitch: sOld?.finance?.desc || "Credit Lombard et gestion de patrimoine, structuration mutualiste pour les filiales.",
      status: "q1_2027",
      href: `/${locale}/onlymore-finance`,
      accent: "gold",
    },
    {
      slug: "plumaya",
      name: "PLUMAYA Editions",
      tagline: fp.plumaya_tag || "Edition et propriete intellectuelle, systeme de notation SHINGAN.",
      pitch: sOld?.plumaya?.desc || "Edition et IP, systeme de notation SHINGAN, monetisation des actifs intellectuels du groupe.",
      status: "q2_2027",
      href: `/${locale}/plumaya`,
      accent: "gold",
    },
  ];

  const serviceSchemas = subsidiaries.map((s) =>
    getServiceSchema({
      slug: s.slug,
      name: s.name,
      description: s.pitch,
      url: s.externalHref || `${BASE_URL}${s.href}`,
      serviceType:
        s.slug === "colhybri"
          ? "Solidarity commerce SaaS"
          : s.slug === "crownium"
            ? "Mutualist sports club financing"
            : s.slug === "dojuku-shingi"
              ? "AI martial arts education"
              : s.slug === "onlymore-finance"
                ? "Lombard credit structuring"
                : "Publishing and intellectual property",
      areaServed: ["Europe"],
    })
  );

  return (
    <main>
      <Header />
      <StructuredData
        locale={locale}
        breadcrumbs={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: fp.breadcrumb || "Subsidiaries", url: `${BASE_URL}/${locale}/filiales` },
        ]}
        extra={serviceSchemas}
      />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-deep-black">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <nav aria-label="breadcrumb" className="mb-8 text-sm text-warm-white/50 font-body">
            <Link href={`/${locale}`} className="hover:text-gold transition-colors">
              {common.home || "Accueil"}
            </Link>
            <span className="mx-2">/</span>
            <span>{fp.breadcrumb || "Filiales"}</span>
          </nav>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-6">
            {fp.eyebrow || "5 filiales, 1 infrastructure"}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-white mb-8 leading-tight">
            {fp.hero_title || "Cinq piliers, une these unique."}
          </h1>
          <p className="font-body text-lg md:text-xl text-warm-white/70 max-w-2xl leading-relaxed">
            {fp.hero_lead ||
              "Chaque filiale adresse un marche distinct mais partage la meme colonne vertebrale : mutualisme, impact local, capital patient. Les flux convergent vers le float commun."}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <ul className="grid md:grid-cols-2 gap-6">
            {subsidiaries.map((s) => (
              <li key={s.slug} className="border border-white/10 rounded-lg p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className={`font-display text-2xl ${
                      s.accent === "teal" ? "text-teal-light" : "text-gold"
                    }`}
                  >
                    {s.name}
                  </h2>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded ${
                      s.status === "live"
                        ? "bg-teal/20 text-teal-light"
                        : "bg-gold/10 text-gold/80"
                    }`}
                  >
                    {statusLabels[s.status]}
                  </span>
                </div>
                <p className="font-body text-base text-warm-white/80 mb-3 leading-relaxed">{s.tagline}</p>
                <p className="font-body text-sm text-warm-white/60 mb-6 leading-relaxed flex-1">{s.pitch}</p>
                <div className="flex items-center gap-3 mt-auto">
                  <Link
                    href={s.href}
                    className="font-body text-sm text-warm-white hover:text-gold transition-colors"
                  >
                    {fp.cta_more || "En savoir plus"} &rarr;
                  </Link>
                  {s.externalHref && (
                    <a
                      href={s.externalHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-xs text-warm-white/40 hover:text-gold transition-colors"
                    >
                      {s.externalHref.replace("https://", "")} &uarr;
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
