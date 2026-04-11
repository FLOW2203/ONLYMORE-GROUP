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
    path: "/equipe",
    title: "Equipe — ONLYMORE Group",
    description:
      "L'equipe fondatrice d'ONLYMORE Group. Florent Gibert et les co-fondateurs de la holding fintech mutualist.",
  });
}

export default function EquipePage({
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
            Notre Equipe
          </h1>
          <p className="text-lg text-neutral-gray mb-8">
            Les fondateurs et collaborateurs d&apos;ONLYMORE Group,
            unis par la mission d&apos;inclusion financiere par le sport.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href={`/${locale}`} className="text-teal hover:underline">
              &larr; Accueil
            </Link>
            <Link href={`/${locale}/investisseurs`} className="text-neutral-gray hover:underline">
              Investisseurs &rarr;
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
