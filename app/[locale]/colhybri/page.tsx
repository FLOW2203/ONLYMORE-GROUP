import type { Metadata } from "next";
import { defaultLocale, Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (params.locale as Locale) || defaultLocale;
  return buildPageMetadata({
    locale,
    path: "/colhybri",
    title: "COLHYBRI · Plateforme SaaS Commerce Local | ONLYMORE Group",
    description:
      "COLHYBRI est une plateforme SaaS solidaire pour le commerce local. Outils digitaux et reseau de solidarite pour les commercants de proximite.",
  });
}

export default function ColhybriPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale || defaultLocale;
  return (
    <main>
      <Header />
      <section className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            COLHYBRI
          </h1>
          <p className="text-xl text-teal font-semibold mb-4">
            Plateforme SaaS solidaire pour le commerce local
          </p>
          <p className="text-lg text-neutral-gray mb-8">
            COLHYBRI donne aux commercants locaux les outils digitaux et
            le reseau solidaire pour rivaliser avec les grandes enseignes.
            Infrastructure partagee, presence digitale et soutien
            communautaire.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href={`/${locale}/colhybri/commercants`}
              className="px-6 py-3 bg-teal/10 border border-teal/30 rounded-lg hover:bg-teal/20 transition"
            >
              Portail commercants
            </Link>
          </div>
          <div className="flex gap-4 text-sm">
            <Link href={`/${locale}/filiales`} className="text-teal hover:underline">
              &larr; Toutes les filiales
            </Link>
            <Link href={`/${locale}/crownium`} className="text-neutral-gray hover:underline">
              CROWNIUM &rarr;
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
