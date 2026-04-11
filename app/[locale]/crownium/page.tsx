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
    path: "/crownium",
    title: "CROWNIUM — Fan Co-Ownership Fintech | ONLYMORE Group",
    description:
      "CROWNIUM permet aux fans de devenir co-proprietaires de leurs clubs sportifs locaux via un modele SAS mutualist. Fintech d'inclusion financiere par le sport.",
  });
}

export default function CrowniumPage({
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
            CROWNIUM
          </h1>
          <p className="text-xl text-teal font-semibold mb-4">
            Fan co-ownership fintech pour clubs sportifs
          </p>
          <p className="text-lg text-neutral-gray mb-8">
            CROWNIUM permet aux fans de devenir collectivement
            co-proprietaires de leurs clubs sportifs locaux grace a un
            modele SAS mutualist. Democratiser la propriete des clubs,
            garder les revenus locaux et creer un modele de financement
            durable pour le sport communautaire.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href={`/${locale}/crownium/clubs`}
              className="px-6 py-3 bg-teal/10 border border-teal/30 rounded-lg hover:bg-teal/20 transition"
            >
              Repertoire des clubs
            </Link>
            <Link
              href={`/${locale}/crownium/fans`}
              className="px-6 py-3 bg-teal/10 border border-teal/30 rounded-lg hover:bg-teal/20 transition"
            >
              Portail fans
            </Link>
          </div>
          <div className="flex gap-4 text-sm">
            <Link href={`/${locale}/filiales`} className="text-teal hover:underline">
              &larr; Toutes les filiales
            </Link>
            <Link href={`/${locale}/colhybri`} className="text-neutral-gray hover:underline">
              COLHYBRI &rarr;
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
