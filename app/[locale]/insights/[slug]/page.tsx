import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { Locale, defaultLocale, locales } from "@/lib/i18n";
import { buildPageMetadata, getArticleSchema, BASE_URL } from "@/lib/seo";
import { insights, getInsightBySlug } from "@/lib/insights";
import { articles } from "./content";

export async function generateStaticParams() {
  const paths: { locale: string; slug: string }[] = [];
  for (const loc of locales) {
    for (const a of insights) {
      paths.push({ locale: loc, slug: a.slug });
    }
  }
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const locale = (params.locale as Locale) || defaultLocale;
  const meta = getInsightBySlug(params.slug);
  if (!meta) return {};
  return buildPageMetadata({
    locale,
    path: `/insights/${params.slug}`,
    title: `${meta.title} — ONLYMORE Group`,
    description: meta.excerpt,
  });
}

export default function InsightArticlePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = (params.locale as Locale) || defaultLocale;
  const meta = getInsightBySlug(params.slug);
  const article = articles[params.slug];
  if (!meta || !article) notFound();

  return (
    <main>
      <Header />
      <StructuredData
        locale={locale}
        breadcrumbs={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: "Insights", url: `${BASE_URL}/${locale}/insights` },
          { name: meta.title, url: `${BASE_URL}/${locale}/insights/${meta.slug}` },
        ]}
        extra={[
          getArticleSchema({
            slug: meta.slug,
            title: meta.title,
            description: meta.excerpt,
            datePublished: meta.datePublished,
            locale,
            path: `/insights/${meta.slug}`,
          }),
        ]}
      />

      <article className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-deep-black">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <nav aria-label="breadcrumb" className="mb-8 text-sm text-warm-white/50 font-body">
            <Link href={`/${locale}`} className="hover:text-gold transition-colors">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/insights`} className="hover:text-gold transition-colors">
              Insights
            </Link>
            <span className="mx-2">/</span>
            <span className="text-warm-white/70">{meta.tag}</span>
          </nav>

          <div className="flex items-center gap-3 mb-4 text-xs font-mono uppercase tracking-widest text-warm-white/40">
            <span>{meta.datePublished}</span>
            <span>&middot;</span>
            <span>{meta.readingTime}</span>
            <span>&middot;</span>
            <span className="text-gold">{meta.tag}</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl text-warm-white mb-8 leading-tight">
            {meta.title}
          </h1>

          <p className="font-body text-lg md:text-xl text-warm-white/70 mb-12 leading-relaxed italic border-l-2 border-gold pl-5">
            {meta.excerpt}
          </p>

          <div className="prose-article space-y-6 font-body text-base md:text-lg text-warm-white/80 leading-relaxed">
            {article.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2 key={i} className="font-display text-2xl md:text-3xl text-gold mt-12 mb-4">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "p") {
                return <p key={i}>{block.text}</p>;
              }
              if (block.type === "quote") {
                return (
                  <blockquote
                    key={i}
                    className="border-l-2 border-gold pl-5 italic text-warm-white/90 font-display text-xl md:text-2xl leading-relaxed"
                  >
                    {block.text}
                  </blockquote>
                );
              }
              return null;
            })}
          </div>

          <div className="mt-16 pt-10 border-t border-white/10 text-center">
            <Link
              href={`/${locale}/insights`}
              className="font-body text-sm text-warm-white/60 hover:text-gold transition-colors"
            >
              &larr; Retour aux insights
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
