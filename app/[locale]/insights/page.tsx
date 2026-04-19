import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { Locale, defaultLocale } from "@/lib/i18n";
import { buildPageMetadata, BASE_URL } from "@/lib/seo";
import { insights } from "@/lib/insights";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (params.locale as Locale) || defaultLocale;
  return buildPageMetadata({
    locale,
    path: "/insights",
    title: "Insights, ONLYMORE Group",
    description:
      "Trois articles fondateurs : le logo decode, le cafe sospeso digitalise, le Berkshire Hathaway du sport. La these ONLYMORE Group, ecrite en long format.",
  });
}

export default function InsightsIndex({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale as Locale) || defaultLocale;

  return (
    <main>
      <Header />
      <StructuredData
        locale={locale}
        breadcrumbs={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: "Insights", url: `${BASE_URL}/${locale}/insights` },
        ]}
      />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-deep-black">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <nav aria-label="breadcrumb" className="mb-8 text-sm text-warm-white/50 font-body">
            <Link href={`/${locale}`} className="hover:text-gold transition-colors">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            <span>Insights</span>
          </nav>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-6">Long format</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-white mb-8 leading-tight">
            La these ONLYMORE, ecrite en long.
          </h1>
          <p className="font-body text-lg md:text-xl text-warm-white/70 max-w-2xl leading-relaxed">
            Trois articles fondateurs pour comprendre l'architecture : le logo decode, le cafe sospeso digitalise, le Berkshire Hathaway du sport. Aucun clickbait, pas d'ornement.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ul className="space-y-6">
            {insights.map((a) => (
              <li key={a.slug} className="border border-white/10 rounded-lg overflow-hidden hover:border-gold/40 transition-colors">
                <Link href={`/${locale}/insights/${a.slug}`} className="block p-6">
                  <div className="flex items-center gap-3 mb-3 text-xs font-mono uppercase tracking-widest text-warm-white/40">
                    <span>{a.datePublished}</span>
                    <span>&middot;</span>
                    <span>{a.readingTime}</span>
                    <span>&middot;</span>
                    <span className="text-gold">{a.tag}</span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl text-warm-white mb-3 leading-snug">
                    {a.title}
                  </h2>
                  <p className="font-body text-base text-warm-white/70 leading-relaxed">{a.excerpt}</p>
                  <p className="font-body text-sm text-gold mt-4">Lire l'article &rarr;</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
