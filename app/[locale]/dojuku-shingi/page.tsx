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
    path: "/dojuku-shingi",
    title: "DOJUKU SHINGI · Application IA Arts Martiaux | ONLYMORE Group",
    description:
      "DOJUKU SHINGI est une application IA pour les arts martiaux. Entrainement personnalise, analyse technique et communaute. Bientot disponible.",
  });
}

export default function DojukuShingiPage({
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
            DOJUKU SHINGI
          </h1>
          <p className="text-xl text-gold font-semibold mb-4">
            Application IA pour les arts martiaux
          </p>
          <p className="text-lg text-neutral-gray mb-8">
            DOJUKU SHINGI combine la sagesse traditionnelle des arts
            martiaux avec l&apos;intelligence artificielle moderne.
            Entrainement personnalise, analyse technique et connexion
            communautaire, bientot disponibles.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href={`/${locale}/filiales`} className="text-teal hover:underline">
              &larr; Toutes les filiales
            </Link>
            <Link href={`/${locale}/onlymore-finance`} className="text-neutral-gray hover:underline">
              ONLYMORE FINANCE &rarr;
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
