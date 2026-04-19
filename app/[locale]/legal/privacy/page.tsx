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
  const page = legal.privacy || {};
  return {
    title: `${page.title || "Politique de confidentialité"} · ONLYMORE Group`,
    description: page.description || "Politique de confidentialité ONLYMORE Group, conforme RGPD.",
    alternates: { canonical: `${BASE_URL}/${locale}/legal/privacy` },
    robots: { index: true, follow: true },
  };
}

export default async function LegalPrivacyPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const legal = (t.legal as Record<string, any>) || {};
  const p = legal.privacy || {};
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
            <span>{p.title || "Politique de confidentialité"}</span>
          </nav>

          <h1 className="font-display text-4xl lg:text-5xl text-warm-white mb-4">
            {p.title || "Politique de confidentialité"}
          </h1>
          <p className="font-body text-sm text-warm-white/50 mb-12">
            {common.updated || "Mise à jour"}: 19/04/2026 · {p.rgpd_notice || "Conforme au Règlement Général sur la Protection des Données (RGPD) et à la Loi Informatique et Libertés."}
          </p>

          <div className="space-y-10 font-body text-warm-white/80 leading-relaxed">
            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.controller_title || "Responsable du traitement"}
              </h2>
              <p>
                {p.controller_body || "Le responsable de traitement est ONLYMORE Group, SAS immatriculée au RCS sous le numéro"} {"{{NUMERO_RCS}}"}, {p.controller_address || "dont le siège social est situé"} {"{{ADRESSE_COMPLETE}}"}.
              </p>
              <p className="mt-2">
                {p.dpo || "Contact Délégué à la protection des données (DPO)"}: <a href="mailto:privacy@onlymore.group" className="text-gold hover:underline">privacy@onlymore.group</a>
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.purpose_title || "Finalités du traitement"}
              </h2>
              <p className="mb-3">{p.purpose_intro || "Nous collectons et traitons vos données personnelles pour les finalités suivantes :"}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{p.purpose_1 || "Répondre aux demandes de contact (investisseurs, presse, partenaires)"}</li>
                <li>{p.purpose_2 || "Gérer la relation investisseur (prospection autorisée, rendez-vous Calendly, suivi)"}</li>
                <li>{p.purpose_3 || "Mesurer l'audience du site via Plausible Analytics (sans cookie, sans donnée personnelle)"}</li>
                <li>{p.purpose_4 || "Envoyer, sur demande, des informations institutionnelles (newsletter, communications)"}</li>
                <li>{p.purpose_5 || "Se conformer aux obligations légales et réglementaires"}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.legal_basis_title || "Bases légales"}
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>{p.legal_1 || "Consentement explicite (article 6.1.a RGPD) : newsletter, demande de rendez-vous"}</li>
                <li>{p.legal_2 || "Intérêt légitime (article 6.1.f RGPD) : mesure d'audience, sécurité du site"}</li>
                <li>{p.legal_3 || "Exécution de mesures précontractuelles (article 6.1.b RGPD) : échanges investisseurs"}</li>
                <li>{p.legal_4 || "Obligation légale (article 6.1.c RGPD) : conservation de pièces comptables"}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.data_title || "Données collectées"}
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>{p.data_1 || "Identité : nom, prénom, fonction, société"}</li>
                <li>{p.data_2 || "Coordonnées : adresse e-mail, téléphone (facultatif), LinkedIn"}</li>
                <li>{p.data_3 || "Contenu des échanges : messages, pièces jointes éventuelles"}</li>
                <li>{p.data_4 || "Données techniques anonymisées : pays, type d'appareil, page consultée (via Plausible, sans IP stockée)"}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.retention_title || "Durées de conservation"}
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>{p.retention_1 || "Données investisseurs : 3 ans après la dernière interaction"}</li>
                <li>{p.retention_2 || "Données de prospection B2B : 3 ans après le dernier contact"}</li>
                <li>{p.retention_3 || "Newsletter : jusqu'au désabonnement"}</li>
                <li>{p.retention_4 || "Données techniques anonymisées : 25 mois maximum"}</li>
                <li>{p.retention_5 || "Archives comptables et légales : durées légales applicables"}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.recipients_title || "Destinataires et sous-traitants"}
              </h2>
              <p className="mb-3">{p.recipients_intro || "Vos données sont accessibles uniquement aux personnes habilitées d'ONLYMORE Group et à nos sous-traitants techniques :"}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{p.recipient_1 || "Vercel Inc. (hébergement, région eu-west-3 Paris)"}</li>
                <li>{p.recipient_2 || "Plausible Analytics (mesure d'audience, serveurs UE, sans cookie)"}</li>
                <li>{p.recipient_3 || "Calendly (prise de rendez-vous, uniquement si vous y consentez)"}</li>
                <li>{p.recipient_4 || "Cloudflare Turnstile (anti-spam sur formulaires, sans cookie de traçage)"}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.transfers_title || "Transferts hors UE"}
              </h2>
              <p>
                {p.transfers_body || "Les données hébergées sur Vercel sont stockées dans la région eu-west-3 (Paris). Aucun transfert de données personnelles hors de l'Espace économique européen n'est effectué sans garanties appropriées (clauses contractuelles types de la Commission européenne)."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.rights_title || "Vos droits"}
              </h2>
              <p className="mb-3">
                {p.rights_intro || "Conformément aux articles 15 à 22 du RGPD, vous disposez des droits suivants :"}
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{p.right_1 || "Droit d'accès à vos données"}</li>
                <li>{p.right_2 || "Droit de rectification"}</li>
                <li>{p.right_3 || "Droit à l'effacement (droit à l'oubli)"}</li>
                <li>{p.right_4 || "Droit à la limitation du traitement"}</li>
                <li>{p.right_5 || "Droit à la portabilité de vos données"}</li>
                <li>{p.right_6 || "Droit d'opposition, notamment à la prospection"}</li>
                <li>{p.right_7 || "Droit de définir des directives post mortem"}</li>
                <li>{p.right_8 || "Droit de retirer votre consentement à tout moment"}</li>
              </ul>
              <p className="mt-3">
                {p.rights_how || "Pour exercer ces droits, contactez-nous à"} <a href="mailto:privacy@onlymore.group" className="text-gold hover:underline">privacy@onlymore.group</a>. {p.rights_response || "Nous répondons dans un délai d'un mois."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.complaint_title || "Réclamation CNIL"}
              </h2>
              <p>
                {p.complaint_body || "Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous avez le droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL)"}: <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">www.cnil.fr</a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.security_title || "Sécurité"}
              </h2>
              <p>
                {p.security_body || "Nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données : chiffrement HTTPS/TLS, politique de sécurité du contenu (CSP), accès restreint, journalisation. Une faille de sécurité peut être signalée à"} <a href="mailto:security@onlymore.group" className="text-gold hover:underline">security@onlymore.group</a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.changes_title || "Modifications"}
              </h2>
              <p>
                {p.changes_body || "Cette politique peut évoluer. La version en vigueur est celle publiée sur cette page, avec sa date de mise à jour."}
              </p>
            </section>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
