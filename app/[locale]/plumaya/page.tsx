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
    path: "/plumaya",
    title: "PLUMAYA Editions — Edition & PI | ONLYMORE Group",
    description:
      "PLUMAYA Editions gere l'edition et la propriete intellectuelle du groupe ONLYMORE, incluant le systeme de notation SHINGAN.",
  });
}

export default function PlumayaPage({
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
            PLUMAYA Editions
          </h1>
          <p className="text-xl text-gold font-semibold mb-4">
            Edition et propriete intellectuelle
          </p>
          <p className="text-lg text-neutral-gray mb-8">
            PLUMAYA Editions gere l&apos;edition et la propriete
            intellectuelle du groupe, notamment le systeme de notation
            proprietaire SHINGAN. Contenu educatif et culturel aligne
            avec la mission sociale — bientot disponible.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href={`/${locale}/filiales`} className="text-teal hover:underline">
              &larr; Toutes les filiales
            </Link>
            <Link href={`/${locale}/dojuku-shingi`} className="text-neutral-gray hover:underline">
              DOJUKU SHINGI &rarr;
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
