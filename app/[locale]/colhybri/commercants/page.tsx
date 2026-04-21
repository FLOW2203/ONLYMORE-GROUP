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
    path: "/colhybri/commercants",
    title: "Portail Commercants · COLHYBRI | ONLYMORE Group",
    description:
      "Portail commercants COLHYBRI. Rejoignez la plateforme solidaire pour les commerces de proximite. SaaS local, outils digitaux et communaute.",
  });
}

export default function ColhybriCommercantsPage({
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
            Portail Commercants
          </h1>
          <p className="text-lg text-neutral-gray mb-8">
            Rejoignez le reseau COLHYBRI pour les commerces de proximite,
            bientot disponible.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href={`/${locale}/colhybri`} className="text-teal hover:underline">
              &larr; COLHYBRI
            </Link>
            <Link href={`/${locale}/filiales`} className="text-neutral-gray hover:underline">
              Toutes les filiales &rarr;
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
