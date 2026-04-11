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
    path: "/filiales",
    title: "Filiales — ONLYMORE Group",
    description:
      "Les 5 filiales ONLYMORE : CROWNIUM, COLHYBRI, DOJUKU SHINGI, ONLYMORE FINANCE, PLUMAYA. Fintech mutualist pour l'inclusion financiere par le sport.",
  });
}

export default function FilialesPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale || defaultLocale;
  return (
    <main>
      <Header />
      <section className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">
            Nos Filiales
          </h1>
          <p className="text-lg text-neutral-gray mb-12">
            ONLYMORE Group regroupe 5 filiales au service de l&apos;inclusion
            financiere par le sport.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href={`/${locale}/crownium`}
              className="block p-6 rounded-xl border border-white/10 hover:border-teal/50 transition"
            >
              <h2 className="font-display text-xl font-bold text-teal mb-2">
                CROWNIUM
              </h2>
              <p className="text-sm text-neutral-gray">
                Fan co-ownership fintech pour clubs sportifs
              </p>
            </Link>
            <Link
              href={`/${locale}/colhybri`}
              className="block p-6 rounded-xl border border-white/10 hover:border-teal/50 transition"
            >
              <h2 className="font-display text-xl font-bold text-teal mb-2">
                COLHYBRI
              </h2>
              <p className="text-sm text-neutral-gray">
                Plateforme SaaS solidaire pour le commerce local
              </p>
            </Link>
            <Link
              href={`/${locale}/dojuku-shingi`}
              className="block p-6 rounded-xl border border-white/10 hover:border-teal/50 transition"
            >
              <h2 className="font-display text-xl font-bold text-gold mb-2">
                DOJUKU SHINGI
              </h2>
              <p className="text-sm text-neutral-gray">
                Application IA pour les arts martiaux
              </p>
            </Link>
            <Link
              href={`/${locale}/onlymore-finance`}
              className="block p-6 rounded-xl border border-white/10 hover:border-gold/50 transition"
            >
              <h2 className="font-display text-xl font-bold text-gold mb-2">
                ONLYMORE FINANCE
              </h2>
              <p className="text-sm text-neutral-gray">
                Structure de credit Lombard
              </p>
            </Link>
            <Link
              href={`/${locale}/plumaya`}
              className="block p-6 rounded-xl border border-white/10 hover:border-gold/50 transition"
            >
              <h2 className="font-display text-xl font-bold text-gold mb-2">
                PLUMAYA Editions
              </h2>
              <p className="text-sm text-neutral-gray">
                Edition et propriete intellectuelle
              </p>
            </Link>
          </div>
          <div className="mt-12">
            <Link
              href={`/${locale}`}
              className="text-teal hover:underline"
            >
              &larr; Retour au groupe
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
