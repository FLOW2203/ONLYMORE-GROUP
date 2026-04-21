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
    path: "/crownium/clubs",
    title: "Repertoire des Clubs · CROWNIUM | ONLYMORE Group",
    description:
      "Decouvrez les clubs sportifs partenaires de CROWNIUM. Fan co-ownership et modele mutualist pour le sport local.",
  });
}

export default function CrowniumClubsPage({
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
            Repertoire des Clubs
          </h1>
          <p className="text-lg text-neutral-gray mb-8">
            Les clubs sportifs partenaires de CROWNIUM, bientot disponibles.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href={`/${locale}/crownium`} className="text-teal hover:underline">
              &larr; CROWNIUM
            </Link>
            <Link href={`/${locale}/crownium/fans`} className="text-neutral-gray hover:underline">
              Portail fans &rarr;
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
