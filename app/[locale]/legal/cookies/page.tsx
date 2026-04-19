import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTranslations, Locale, defaultLocale } from "@/lib/i18n";

const BASE_URL = "https://www.onlymore.group";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const legal = (t.legal as Record<string, Record<string, string>>) || {};
  const page = legal.cookies || {};
  return {
    title: `${page.title || "Politique cookies"} · ONLYMORE Group`,
    description: page.description || "Politique cookies ONLYMORE Group : un seul cookie essentiel, aucun traceur.",
    alternates: { canonical: `${BASE_URL}/${locale}/legal/cookies` },
    robots: { index: true, follow: true },
  };
}

export default async function LegalCookiesPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const legal = (t.legal as Record<string, any>) || {};
  const p = legal.cookies || {};
  const common = legal.common || {};

  return (
    <main>
      <Header />
      <article className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-deep-black">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <nav aria-label="breadcrumb" className="mb-8 text-sm text-warm-white/50 font-body">
            <Link href={`/${locale}`} className="hover:text-gold transition-colors">
              {common.home || "Accueil"}
            </Link>
            <span className="mx-2">/</span>
            <span>{p.title || "Politique cookies"}</span>
          </nav>

          <h1 className="font-display text-4xl lg:text-5xl text-warm-white mb-4">
            {p.title || "Politique cookies"}
          </h1>
          <p className="font-body text-sm text-warm-white/50 mb-12">
            {common.updated || "Mise à jour"}: 19/04/2026
          </p>

          <div className="space-y-10 font-body text-warm-white/80 leading-relaxed">
            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.intro_title || "Notre approche"}
              </h2>
              <p>
                {p.intro_body || "ONLYMORE Group refuse le traçage publicitaire. Le site onlymore.group n'utilise qu'un seul cookie, strictement nécessaire à la mémorisation de votre langue. Aucun cookie analytique, aucun cookie publicitaire, aucun traceur tiers n'est déposé sur votre appareil sans votre consentement explicite."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.list_title || "Cookies utilisés"}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-warm-white">
                      <th className="text-left py-2 pr-4">{p.th_name || "Nom"}</th>
                      <th className="text-left py-2 pr-4">{p.th_purpose || "Finalité"}</th>
                      <th className="text-left py-2 pr-4">{p.th_type || "Type"}</th>
                      <th className="text-left py-2 pr-4">{p.th_duration || "Durée"}</th>
                      <th className="text-left py-2">{p.th_consent || "Consentement"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-3 pr-4 font-mono">NEXT_LOCALE</td>
                      <td className="py-3 pr-4">{p.locale_purpose || "Mémoriser la langue choisie"}</td>
                      <td className="py-3 pr-4">{p.essential || "Essentiel"}</td>
                      <td className="py-3 pr-4">1 an</td>
                      <td className="py-3">{p.no_consent_needed || "Non requis (exempté)"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-warm-white/60 text-sm">
                {p.essential_note || "Les cookies strictement nécessaires au fonctionnement du site sont exemptés de consentement par l'article 82 de la Loi Informatique et Libertés."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.analytics_title || "Mesure d'audience"}
              </h2>
              <p>
                {p.analytics_body || "Nous utilisons Plausible Analytics, une solution européenne d'analyse d'audience sans cookie. Aucune donnée personnelle n'est collectée, aucune IP n'est stockée, aucun profil utilisateur n'est constitué. Les données sont agrégées et anonymes."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.third_title || "Services tiers"}
              </h2>
              <p className="mb-3">
                {p.third_intro || "Certaines fonctionnalités chargent des scripts tiers, uniquement après action explicite de votre part :"}
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{p.third_1 || "Calendly (prise de rendez-vous investisseur), chargé uniquement après clic sur le bouton"}</li>
                <li>{p.third_2 || "Cloudflare Turnstile (anti-spam sur formulaires), sans cookie de traçage"}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.manage_title || "Gérer vos préférences"}
              </h2>
              <p>
                {p.manage_body || "Vous pouvez à tout moment supprimer les cookies stockés sur votre navigateur via ses paramètres. Attention : la suppression du cookie NEXT_LOCALE entraînera la redétection de votre langue préférée à la prochaine visite."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.more_title || "En savoir plus"}
              </h2>
              <p>
                {p.more_body || "Pour plus d'informations sur le traitement de vos données"}: <Link href={`/${locale}/legal/privacy`} className="text-gold hover:underline">{p.more_link || "Politique de confidentialité"}</Link>.
              </p>
            </section>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
