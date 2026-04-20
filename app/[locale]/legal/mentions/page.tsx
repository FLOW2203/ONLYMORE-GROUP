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
  const page = legal.mentions || {};
  return {
    title: `${page.title || "Mentions légales"} · ONLYMORE Group`,
    description: page.description || "Mentions légales ONLYMORE Group.",
    alternates: { canonical: `${BASE_URL}/${locale}/legal/mentions` },
    robots: { index: true, follow: true },
  };
}

export default async function LegalMentionsPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const legal = (t.legal as Record<string, any>) || {};
  const p = legal.mentions || {};
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
            <span>{common.legal || "Mentions légales"}</span>
          </nav>

          <h1 className="font-display text-4xl lg:text-5xl text-warm-white mb-4">
            {p.title || "Mentions légales"}
          </h1>
          <p className="font-body text-sm text-warm-white/50 mb-12">
            {common.updated || "Mise à jour"}: 19/04/2026
          </p>

          <div className="space-y-10 font-body text-warm-white/80 leading-relaxed">
            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.editor_title || "Éditeur du site"}
              </h2>
              <p className="mb-4">
                {p.editor_body ||
                  "The website onlymore.group is published by Florent Gibert, founder of the ONLYMORE Group project, a simplified joint-stock company (SAS) currently being incorporated. Name: Florent Gibert. Address: Rodilhan (30230), Occitanie, France. Contact: contact@onlymore.group. Publication director: Florent Gibert. Once ONLYMORE Group SAS is officially registered with the Nimes Commercial Register, this page will be updated."}
              </p>
              <ul className="space-y-1.5 list-none pl-0">
                <li><strong className="text-warm-white">ONLYMORE Group</strong></li>
                <li>{p.form || "Forme juridique"}: SAS en cours de constitution</li>
                <li>SIREN: en cours d&apos;attribution</li>
                <li>{p.capital || "Capital social"}: en cours de constitution</li>
                <li>RCS: en cours d&apos;inscription au RCS de Nîmes</li>
                <li>{p.address || "Siège social"}: Rodilhan (30230), Occitanie, France</li>
                <li>{p.director || "Directeur de la publication"}: Florent Gibert</li>
                <li>{p.contact || "Contact"}: <a href="mailto:contact@onlymore.group" className="text-gold hover:underline">contact@onlymore.group</a></li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.host_title || "Hébergeur"}
              </h2>
              <ul className="space-y-1.5 list-none pl-0">
                <li><strong className="text-warm-white">Vercel Inc.</strong></li>
                <li>440 N Barranca Ave #4133, Covina, CA 91723, USA</li>
                <li>
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                    vercel.com
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.ip_title || "Propriété intellectuelle"}
              </h2>
              <p>
                {p.ip_body || "L'ensemble du site, incluant sa structure, ses textes, ses images, son logo, ses marques (ONLYMORE, COLHYBRI, CROWNIUM, DOJUKU SHINGI, PLUMAYA) et ses logiciels, est la propriété exclusive d'ONLYMORE Group, sauf mention contraire. Toute reproduction, représentation, modification, publication, adaptation, totale ou partielle, par quelque procédé que ce soit, sans l'autorisation écrite préalable d'ONLYMORE Group est strictement interdite."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.liability_title || "Responsabilité"}
              </h2>
              <p>
                {p.liability_body || "Les informations présentes sur ce site sont fournies à titre indicatif. ONLYMORE Group met tout en œuvre pour assurer leur exactitude mais ne saurait être tenu responsable d'erreurs, d'omissions ou de résultats obtenus par un mauvais usage de ces informations. Ce site ne constitue pas une sollicitation à l'investissement. Toute levée de fonds est encadrée par le droit financier applicable."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.law_title || "Droit applicable"}
              </h2>
              <p>
                {p.law_body || "Le présent site et ses mentions légales sont régis par le droit français. Tout litige relatif à l'utilisation du site sera de la compétence exclusive des tribunaux de Nîmes."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-3">
                {p.contact_title || "Contact"}
              </h2>
              <p>
                {p.contact_body || "Pour toute question relative à ces mentions légales"}: <a href="mailto:legal@onlymore.group" className="text-gold hover:underline">legal@onlymore.group</a>
              </p>
            </section>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
