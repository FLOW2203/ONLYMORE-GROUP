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
    path: "/impact",
    title: "Impact Social — ONLYMORE Group",
    description:
      "L'impact social d'ONLYMORE Group : reduire la pauvrete, stopper la fuite des talents, lutter contre l'emigration forcee. Le sport comme levier economique local.",
  });
}

export default function ImpactPage({
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
            Impact Social
          </h1>
          <p className="text-lg text-neutral-gray mb-8">
            ONLYMORE Group combat trois defis interconnectes : la
            pauvrete, la fuite des talents et l&apos;emigration forcee.
            Le sport comme levier economique pour la retention locale.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href={`/${locale}`} className="text-teal hover:underline">
              &larr; Accueil
            </Link>
            <Link href={`/${locale}/filiales`} className="text-neutral-gray hover:underline">
              Nos filiales &rarr;
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
