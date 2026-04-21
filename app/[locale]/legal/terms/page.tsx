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
  const page = legal.terms || {};
  return {
    title: `${page.title || "Conditions générales d'utilisation"} · ONLYMORE Group`,
    description: page.description || "CGU du site onlymore.group.",
    alternates: { canonical: `${BASE_URL}/${locale}/legal/terms` },
    robots: { index: true, follow: true },
  };
}

export default async function LegalTermsPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const legal = (t.legal as Record<string, any>) || {};
  const p = legal.terms || {};
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
            <span>{p.title || "Conditions générales d'utilisation"}</span>
          </nav>

          <h1 className="font-display text-4xl lg:text-5xl text-warm-white mb-4">
            {p.title || "Conditions générales d'utilisation"}
          </h1>
          <p className="font-body text-sm text-warm-white/50 mb-12">
            {common.updated || "Mise à jour"}: 19/04/2026
          </p>

          <div className="space-y-10 font-body text-warm-white/80 leading-relaxed">
            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.object_title || "1. Objet"}
              </h2>
              <p>
                {p.object_body || "Les présentes Conditions Générales d'Utilisation (CGU) encadrent l'accès et l'usage du site onlymore.group, site institutionnel d'ONLYMORE Group (SAS). Ce site est un site vitrine d'une holding et de ses 5 filiales. Il ne propose ni transaction financière, ni contrat de service en ligne."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.acceptance_title || "2. Acceptation"}
              </h2>
              <p>
                {p.acceptance_body || "L'accès au site vaut acceptation pleine et entière des présentes CGU. En cas de désaccord, l'utilisateur s'abstient d'accéder au site."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.access_title || "3. Accès au site"}
              </h2>
              <p>
                {p.access_body || "Le site est accessible gratuitement 24h/24, 7j/7, sauf en cas de maintenance, cas de force majeure ou événements hors du contrôle d'ONLYMORE Group. ONLYMORE Group ne garantit pas une disponibilité absolue et ne pourra être tenu pour responsable d'une indisponibilité temporaire."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.ip_title || "4. Propriété intellectuelle"}
              </h2>
              <p>
                {p.ip_body || "L'ensemble du contenu du site (textes, images, logos, vidéos, structure, code source, marques ONLYMORE, COLHYBRI, CROWNIUM, DOJUKU SHINGI, PLUMAYA) est protégé par le droit de la propriété intellectuelle. Toute reproduction, représentation, modification, exploitation ou rediffusion, totale ou partielle, sans autorisation écrite préalable, est interdite et constituerait une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.conduct_title || "5. Comportement utilisateur"}
              </h2>
              <p className="mb-3">
                {p.conduct_intro || "L'utilisateur s'engage à utiliser le site conformément aux lois en vigueur. Il s'interdit notamment :"}
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{p.conduct_1 || "D'accéder ou de tenter d'accéder aux espaces réservés"}</li>
                <li>{p.conduct_2 || "De porter atteinte à l'intégrité du site (virus, scraping massif, déni de service)"}</li>
                <li>{p.conduct_3 || "De diffuser tout contenu contraire à l'ordre public ou aux bonnes mœurs"}</li>
                <li>{p.conduct_4 || "D'usurper l'identité d'un tiers"}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.liability_title || "6. Responsabilité"}
              </h2>
              <p>
                {p.liability_body || "Les informations publiées sur le site sont fournies à titre informatif. Elles ne constituent ni une sollicitation à l'investissement, ni un conseil en investissement, ni un démarchage financier. ONLYMORE Group ne saurait être tenu responsable d'un usage de ces informations contraire à leur finalité institutionnelle. Les liens vers des sites tiers sont fournis à titre de commodité et ONLYMORE Group décline toute responsabilité quant à leur contenu."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.data_title || "7. Données personnelles"}
              </h2>
              <p>
                {p.data_body || "Le traitement des données personnelles est décrit dans notre"} <Link href={`/${locale}/legal/privacy`} className="text-gold hover:underline">{p.data_link || "Politique de confidentialité"}</Link>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.changes_title || "8. Modifications"}
              </h2>
              <p>
                {p.changes_body || "ONLYMORE Group se réserve le droit de modifier à tout moment les présentes CGU. Les modifications sont opposables à l'utilisateur dès leur mise en ligne."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.law_title || "9. Droit applicable et juridiction"}
              </h2>
              <p>
                {p.law_body || "Les présentes CGU sont régies par le droit français. En cas de litige, compétence exclusive est donnée aux tribunaux compétents, Rodilhan (30230), ressort judiciaire de Nîmes, sous réserve des dispositions impératives applicables aux consommateurs."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.contact_title || "10. Contact"}
              </h2>
              <p>
                {p.contact_body || "Pour toute question relative aux présentes CGU"}: <a href="mailto:legal@onlymore.group" className="text-gold hover:underline">legal@onlymore.group</a>
              </p>
            </section>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
