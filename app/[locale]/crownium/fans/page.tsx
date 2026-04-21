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
    path: "/crownium/fans",
    title: "Portail Fans · CROWNIUM | ONLYMORE Group",
    description:
      "Devenez co-proprietaire de votre club sportif avec CROWNIUM. Portail fans pour le modele mutualist de co-propriete sportive.",
  });
}

export default function CrowniumFansPage({
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
            Portail Fans
          </h1>
          <p className="text-lg text-neutral-gray mb-8">
            Devenez co-proprietaire de votre club sportif, bientot
            disponible.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href={`/${locale}/crownium`} className="text-teal hover:underline">
              &larr; CROWNIUM
            </Link>
            <Link href={`/${locale}/crownium/clubs`} className="text-neutral-gray hover:underline">
              Repertoire des clubs &rarr;
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
