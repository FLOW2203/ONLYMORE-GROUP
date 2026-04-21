import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import PressKitLink from "@/components/PressKitLink";
import { getTranslations, Locale, defaultLocale } from "@/lib/i18n";
import { buildPageMetadata, getArticleSchema, BASE_URL } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const pr = (t.press_page as Record<string, any>) || {};
  return buildPageMetadata({
    locale,
    path: "/press",
    title: pr.meta_title || "Press room, ONLYMORE Group",
    description:
      pr.meta_description ||
      "Kit presse ONLYMORE Group. Factsheet, citations, logos, contact press@onlymore.group, engagement de reponse 24 a 48 heures.",
  });
}

type Quote = { text: string; author: string };

export default async function PressPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const pr = (t.press_page as Record<string, any>) || {};
  const common = (t.common as Record<string, string>) || {};

  const quotes: Quote[] = [
    {
      text: pr.q1 || "Une infrastructure mutualiste n'est pas une utopie. C'est un patrimoine francais ignore depuis deux siecles.",
      author: "Florent Gibert, Founder & CEO",
    },
    {
      text: pr.q2 || "Nous ne voulons pas casser le capitalisme. Nous voulons l'elargir pour qu'il retienne ceux qu'il expulse habituellement.",
      author: "Florent Gibert, Founder & CEO",
    },
    {
      text: pr.q3 || "Chaque commerce local digitalise, chaque club sportif mutualise, chaque talent retenu dans sa ville : le groupe additionne les preuves plutot que les promesses.",
      author: "Florent Gibert, Founder & CEO",
    },
  ];

  return (
    <main>
      <Header />
      <StructuredData
        locale={locale}
        breadcrumbs={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: pr.breadcrumb || "Press", url: `${BASE_URL}/${locale}/press` },
        ]}
        extra={[
          getArticleSchema({
            slug: "press-room",
            title: pr.hero_title || "Press room ONLYMORE Group",
            description:
              pr.meta_description ||
              "Kit presse, factsheet, citations, contact presse. Engagement de reponse 24 a 48 heures.",
            datePublished: "2026-04-19",
            locale,
            path: "/press",
          }),
        ]}
      />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-deep-black">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <nav aria-label="breadcrumb" className="mb-8 text-sm text-warm-white/50 font-body">
            <Link href={`/${locale}`} className="hover:text-gold transition-colors">
              {common.home || "Accueil"}
            </Link>
            <span className="mx-2">/</span>
            <span>{pr.breadcrumb || "Presse"}</span>
          </nav>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-6">
            {pr.eyebrow || "Press room"}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-white mb-8 leading-tight">
            {pr.hero_title || "Tout ce qu'il vous faut pour ecrire sur ONLYMORE Group."}
          </h1>
          <p className="font-body text-lg md:text-xl text-warm-white/70 max-w-2xl leading-relaxed mb-8">
            {pr.hero_lead ||
              "Factsheet, citations libres de droits, logos, photos. Contact direct press@onlymore.group. Engagement de reponse 24 a 48 heures ouvrees."}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="mailto:press@onlymore.group"
              className="inline-block px-6 py-3 bg-gold text-deep-black font-body font-medium hover:bg-gold/90 transition-colors"
            >
              press@onlymore.group
            </a>
            <PressKitLink
              href="/press-kit/PRESS_KIT_ONLYMORE_v1.pdf"
              label={pr.cta_kit || "Telecharger le kit presse PDF"}
            />
          </div>
          <p className="font-body text-xs text-warm-white/40 mt-4">
            {pr.kit_todo || "Le PDF sera publie apres generation via la skill pdf + onlymore-designer."}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-10">
            {pr.about_title || "About ONLYMORE en 3 formats"}
          </h2>

          <div className="mb-8">
            <p className="font-mono text-xs text-gold uppercase tracking-widest mb-3">{pr.about_tweet || "Tweet (280 caracteres)"}</p>
            <p className="font-body text-base text-warm-white/80 leading-relaxed border border-white/10 rounded-lg p-4">
              {pr.about_short ||
                "ONLYMORE Group. Holding mutualiste francaise ESS. 5 filiales, 6 UN Global Goals. Siege Rodilhan Occitanie. Pre-seed en cours. https://onlymore.group"}
            </p>
          </div>

          <div className="mb-8">
            <p className="font-mono text-xs text-gold uppercase tracking-widest mb-3">
              {pr.about_mid || "Paragraphe (100 mots)"}
            </p>
            <p className="font-body text-base text-warm-white/80 leading-relaxed border border-white/10 rounded-lg p-4">
              {pr.about_medium ||
                "ONLYMORE Group est une holding mutualiste francaise fondee en 2023 par Florent Gibert a Rodilhan, en Occitanie. Elle federe cinq filiales : COLHYBRI (SaaS commerce solidaire), CROWNIUM (financement mutualiste de clubs sportifs), DOJUKU SHINGI (IA arts martiaux), ONLYMORE FINANCE (credit Lombard) et PLUMAYA Editions (edition et IP). Le groupe adresse six UN Global Goals via une infrastructure longue duree, inspiree par 220 annees de mutualisme francais, 138 annees de football professionnel anglais et le float model de Berkshire Hathaway."}
            </p>
          </div>

          <div>
            <p className="font-mono text-xs text-gold uppercase tracking-widest mb-3">
              {pr.about_long || "Fiche longue (500 mots)"}
            </p>
            <div className="font-body text-base text-warm-white/80 leading-relaxed border border-white/10 rounded-lg p-5 space-y-4">
              <p>
                {pr.long_1 ||
                  "ONLYMORE Group est une holding d'economie sociale et solidaire fondee fin 2023 par Florent Gibert a Rodilhan, dans le Gard. Le groupe articule cinq filiales sous une these unique : construire une infrastructure mutualiste longue duree pour retenir localement les richesses generees par le sport, le commerce de proximite et l'education."}
              </p>
              <p>
                {pr.long_2 ||
                  "COLHYBRI, filiale operationnelle, digitalise le cafe sospeso napolitain : chaque achat en boutique partenaire alimente une reserve solidaire disponible pour les plus modestes. CROWNIUM, deuxieme filiale live, structure un financement mutualiste pour clubs sportifs professionnels. Les supporters s'abonnent, ne deviennent jamais actionnaires, s'inspirant du modele allemand 50+1 et du modele Green Bay Packers (538 967 actionnaires depuis 1919)."}
              </p>
              <p>
                {pr.long_3 ||
                  "Trois filiales suivent : DOJUKU SHINGI (application IA d'arts martiaux, lancement Q4 2026), ONLYMORE FINANCE (structure de credit Lombard, IOBSP ORIAS, Q1 2027), et PLUMAYA Editions (edition et propriete intellectuelle, Q2 2027, porteuse du systeme de notation SHINGAN)."}
              </p>
              <p>
                {pr.long_4 ||
                  "Le groupe adresse six UN Global Goals : No Poverty (1), Quality Education (4), Decent Work (8), Reduced Inequalities (10), Sustainable Cities (11) et Partnerships (17). L'agrement ESUS est en cours. La Resolution P10_TA(2025)0212 du Parlement europeen, adoptee le 7 octobre 2025 a 552 voix pour et 86,4%, valide le modele cooperatif a l'echelle continentale."}
              </p>
              <p>
                {pr.long_5 ||
                  "Une levee pre-seed est en cours, entre 200 000 et 350 000 euros a une valorisation pre-money de 1,3 a 2,15 millions d'euros. L'equipe reunit trois humains : Florent Gibert (Founder & CEO), Joao Almeida (CFO, ex-ONEtoONE Corporate Finance) et Stephane Picard (Fundraising Partner, Winvesty), assistes par neuf agents IA specialises. Contact presse : press@onlymore.group."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-10">
            {pr.factsheet_title || "Factsheet"}
          </h2>
          <dl className="grid sm:grid-cols-2 gap-y-6 gap-x-10 font-body text-sm">
            {[
              { k: pr.f_founded || "Fondation", v: "2023" },
              { k: pr.f_hq || "Siege social", v: "Rodilhan, 30230, Occitanie, France" },
              { k: pr.f_founder || "Fondateur", v: "Florent Gibert" },
              { k: pr.f_team || "Equipe", v: "3 humains + 9 agents IA" },
              { k: pr.f_subs || "Filiales", v: "COLHYBRI, CROWNIUM, DOJUKU SHINGI, ONLYMORE FINANCE, PLUMAYA Editions" },
              { k: pr.f_raise || "Levee en cours", v: "Pre-seed 200-350K EUR" },
              { k: pr.f_sdg || "UN Global Goals", v: "SDG 1, 4, 8, 10, 11, 17" },
              { k: pr.f_validation || "Validation UE", v: "Resolution P10_TA(2025)0212, 552 votes, 86,4%" },
            ].map((row) => (
              <div key={row.k} className="border-b border-white/10 pb-3">
                <dt className="font-mono text-xs text-gold uppercase tracking-widest mb-1">{row.k}</dt>
                <dd className="text-warm-white/80">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-10">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-6">
            {pr.quotes_title || "Citations signees"}
          </h2>
          {quotes.map((q) => (
            <figure key={q.text}>
              <blockquote className="border-l-2 border-gold pl-6 italic font-display text-xl md:text-2xl text-warm-white/90 leading-relaxed">
                {q.text}
              </blockquote>
              <figcaption className="font-body text-sm text-warm-white/50 mt-3 ml-7">{q.author}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-10">
            {pr.media_title || "Dans la presse"}
          </h2>
          <p className="font-body text-base text-warm-white/60 mb-6">
            {pr.media_empty ||
              "Emplacement reserve aux premieres couvertures medias. Echange en cours avec Jean-Francois Peres (JDD). Vos publications seront referencees ici avec votre accord."}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-6">
            {pr.contact_title || "Contact presse"}
          </h2>
          <p className="font-body text-base md:text-lg text-warm-white/70 mb-4 leading-relaxed">
            {pr.contact_body ||
              "Un seul contact : press@onlymore.group. Reponse sous 24 a 48 heures ouvrees. Pour une interview avec Florent Gibert, precisez l'angle et la deadline."}
          </p>
          <a
            href="mailto:press@onlymore.group"
            className="inline-block px-6 py-3 bg-gold text-deep-black font-body font-medium hover:bg-gold/90 transition-colors"
          >
            press@onlymore.group
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
