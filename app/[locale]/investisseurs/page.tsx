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
    path: "/investisseurs",
    title: "Investisseurs — ONLYMORE Group",
    description:
      "Relations investisseurs ONLYMORE Group. Rejoignez la holding fintech mutualist pour l'inclusion financiere par le sport. Modele mutualist, impact social.",
  });
}

export default function InvestisseursPage({
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
            Investisseurs
          </h1>
          <p className="text-lg text-neutral-gray mb-8">
            ONLYMORE Group accueille les investisseurs partageant la
            vision d&apos;inclusion financiere par le sport. Modele
            mutualist, impact social et rendement financier.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href={`/${locale}`} className="text-teal hover:underline">
              &larr; Accueil
            </Link>
            <Link href={`/${locale}/impact`} className="text-neutral-gray hover:underline">
              Impact &rarr;
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
