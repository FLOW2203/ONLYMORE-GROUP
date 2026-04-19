import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { getTranslations, Locale, defaultLocale } from "@/lib/i18n";
import { buildPageMetadata, BASE_URL } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const ap = (t.a11y_page as Record<string, any>) || {};
  return buildPageMetadata({
    locale,
    path: "/accessibility",
    title: ap.meta_title || "Declaration d'accessibilite, ONLYMORE Group",
    description:
      ap.meta_description ||
      "Declaration d'accessibilite numerique ONLYMORE Group. Engagement WCAG 2.1 niveau AA. Contact accessibility@onlymore.group.",
  });
}

export default async function AccessibilityPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const ap = (t.a11y_page as Record<string, any>) || {};
  const common = (t.common as Record<string, string>) || {};

  return (
    <main>
      <Header />
      <StructuredData
        locale={locale}
        breadcrumbs={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: ap.breadcrumb || "Accessibility", url: `${BASE_URL}/${locale}/accessibility` },
        ]}
      />

      <article className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-deep-black">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <nav aria-label="breadcrumb" className="mb-8 text-sm text-warm-white/50 font-body">
            <Link href={`/${locale}`} className="hover:text-gold transition-colors">
              {common.home || "Accueil"}
            </Link>
            <span className="mx-2">/</span>
            <span>{ap.breadcrumb || "Accessibilite"}</span>
          </nav>

          <h1 className="font-display text-4xl lg:text-5xl text-warm-white mb-4">
            {ap.title || "Declaration d'accessibilite"}
          </h1>
          <p className="font-body text-sm text-warm-white/50 mb-12">
            {common.updated || "Mise a jour"}: 19/04/2026
          </p>

          <div className="space-y-10 font-body text-warm-white/80 leading-relaxed">
            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {ap.engagement_title || "Engagement"}
              </h2>
              <p>
                {ap.engagement_body ||
                  "ONLYMORE Group s'engage a rendre son site accessible conformement aux Web Content Accessibility Guidelines (WCAG) 2.1 niveau AA et a l'article 47 de la loi n.2005-102 du 11 fevrier 2005. Coherence assumee avec le SDG 10 (Reduced Inequalities), qui est central dans la these du groupe."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {ap.status_title || "Niveau de conformite"}
              </h2>
              <p>
                {ap.status_body ||
                  "Partiellement conforme. Le site est initialement concu avec un contraste eleve, une navigation au clavier, des attributs ARIA sur les elements interactifs et un respect de la preference prefers-reduced-motion. Un audit axe-core complet sera realise avant le passage en production, puis republie ici avec le detail des non-conformites eventuelles."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {ap.known_title || "Non-conformites connues"}
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>{ap.known_1 || "La video du hero ne dispose pas encore d'une alternative textuelle detaillee (a ajouter)"}</li>
                <li>{ap.known_2 || "Certains contrastes secondaires (warm-white/40) devront etre revus selon les pages longues"}</li>
                <li>{ap.known_3 || "La typographie Playfair Display en italique sera testee avec un lecteur d'ecran JAWS/NVDA"}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {ap.roadmap_title || "Roadmap de correction"}
              </h2>
              <p>
                {ap.roadmap_body ||
                  "Les non-conformites identifiees seront corrigees dans un delai de six mois a compter de la date de publication de cette declaration. Les corrections majeures seront annoncees dans cette page."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {ap.feedback_title || "Nous signaler un obstacle"}
              </h2>
              <p>
                {ap.feedback_body ||
                  "Si vous rencontrez un probleme d'accessibilite, ecrivez-nous a"} <a href="mailto:accessibility@onlymore.group" className="text-gold hover:underline">accessibility@onlymore.group</a>. {ap.feedback_response || "Nous repondons dans un delai d'un mois."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {ap.mediator_title || "Mediation"}
              </h2>
              <p>
                {ap.mediator_body ||
                  "Si la reponse apportee ne vous satisfait pas, vous pouvez saisir le Defenseur des droits, qui intervient gratuitement. Formulaire en ligne : https://www.defenseurdesdroits.fr."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {ap.audit_title || "Audit et prochaine echeance"}
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>{ap.audit_1 || "Dernier audit interne : 19 avril 2026"}</li>
                <li>{ap.audit_2 || "Audit externe prevu : avant le passage en production, via axe-core plus Pa11y CI"}</li>
                <li>{ap.audit_3 || "Prochaine revision de cette declaration : 19 avril 2027"}</li>
              </ul>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
