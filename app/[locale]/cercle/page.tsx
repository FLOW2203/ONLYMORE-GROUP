import type { Metadata } from "next";
import { defaultLocale, Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CercleForm from "@/components/CercleForm";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (params.locale as Locale) || defaultLocale;
  return buildPageMetadata({
    locale,
    path: "/cercle",
    title: "Le Cercle ONLYMORE : ceux qui sont sortis de la file",
    description:
      "Rejoins le Cercle ONLYMORE : commerce de proximité, supporters, clubs et pratique martiale. Choisis ton chemin dans l'économie solidaire.",
  });
}

export default function CerclePage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { kw?: string; src?: string; u?: string };
}) {
  const locale = params.locale || defaultLocale;
  return (
    <main>
      <Header />
      <section className="min-h-screen px-6 pb-20 pt-32">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-sm uppercase tracking-widest text-gold">Le Cercle ONLYMORE</p>
          <h1 className="font-display mb-6 text-4xl font-bold md:text-5xl">
            Il suffit d&apos;un seul.
          </h1>
          <p className="mb-10 text-lg text-neutral-gray">
            Pendant des millénaires, on a marché en file. Le Cercle réunit ceux qui ont décidé d&apos;ouvrir
            la brèche : habitants, commerçants, supporters, clubs, élus et pratiquants. Choisis ton profil,
            on t&apos;oriente vers la communauté qui te concerne.
          </p>
          <CercleForm locale={locale} kw={searchParams.kw} src={searchParams.src} u={searchParams.u} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
