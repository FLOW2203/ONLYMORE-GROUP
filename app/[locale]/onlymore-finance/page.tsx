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
    path: "/onlymore-finance",
    title: "ONLYMORE FINANCE · Credit Lombard | ONLYMORE Group",
    description:
      "ONLYMORE FINANCE propose des structures de credit Lombard. Acces a la liquidite sans vendre vos investissements. Inclusion financiere et preservation du patrimoine.",
  });
}

export default function OnlymoreFinancePage({
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
            ONLYMORE FINANCE
          </h1>
          <p className="text-xl text-gold font-semibold mb-4">
            Structure de credit Lombard
          </p>
          <p className="text-lg text-neutral-gray mb-8">
            ONLYMORE FINANCE propose des prets adosses a des actifs
            financiers (credit Lombard). Acces a la liquidite sans
            vendre vos investissements, pour l&apos;inclusion financiere
            et la preservation du patrimoine, bientot disponible.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href={`/${locale}/filiales`} className="text-teal hover:underline">
              &larr; Toutes les filiales
            </Link>
            <Link href={`/${locale}/plumaya`} className="text-neutral-gray hover:underline">
              PLUMAYA &rarr;
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
