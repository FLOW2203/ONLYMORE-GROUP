import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import EngagementForm from "@/components/EngagementForm";
import { getTranslations, Locale, defaultLocale } from "@/lib/i18n";
import {
  buildPageMetadata,
  getDetroitContestEventSchema,
  BASE_URL,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const cp = (t.concours_page as Record<string, any>) || {};
  return buildPageMetadata({
    locale,
    path: "/concours",
    title: cp.meta_title || "GOAT AME CITY 2026, C'est ma ville je m'engage",
    description:
      cp.meta_description ||
      "Concours 2026 GOAT AME CITY, Detroit Chapter 01. Signer le manifeste, soutenir votre ville, activer la cellule ESS industriel.",
  });
}

type HowCard = { code: string; title: string; body: string };

export default async function ConcoursPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale as Locale) || defaultLocale;
  const t = await getTranslations(locale);
  const cp = (t.concours_page as Record<string, any>) || {};
  const common = (t.common as Record<string, string>) || {};
  const isEn = locale === "en";
  const formLocale: "fr" | "en" = isEn ? "en" : "fr";

  const steps = [
    {
      n: "01",
      title: isEn ? "Every resident signs the manifesto" : "Chaque habitant signe le manifeste",
      body: isEn
        ? "1 signature equals 1 point for the city. Free, one-time, RGPD-compliant."
        : "1 signature egale 1 point pour la ville. Gratuit, unique, conforme RGPD.",
    },
    {
      n: "02",
      title: isEn
        ? "Every active COLHYBRI merchant, DOJUKU dojo, CROWNIUM club adds points"
        : "Chaque commercant COLHYBRI, dojo DOJUKU, club CROWNIUM actif ajoute des points",
      body: isEn
        ? "A subscribing merchant or an operating dojo counts more than a passive signature. Concrete engagement compounds."
        : "Un commercant abonne ou un dojo operationnel compte plus qu'une signature passive. L'engagement concret capitalise.",
    },
    {
      n: "03",
      title: isEn
        ? "The city crossing the minimum 5-flow thresholds with the highest score earns the title"
        : "La ville qui passe les seuils minimums des 5 flux avec le score le plus eleve remporte le titre",
      body: isEn
        ? "Points alone are not enough. The city must also validate minimum thresholds on each of the 5 flows of the ESS industrial cell."
        : "Les points ne suffisent pas. La ville doit aussi valider les seuils minimums sur chacun des 5 flux de la cellule ESS industriel.",
    },
  ];

  const manifesto = isEn
    ? "I am committed to my city. I believe the future of cities is built through local retail, community sport, and mutualist redistribution. I support the merchants, clubs and dojos that play their part. I am my city."
    : "Je m'engage pour ma ville. Je crois que l'avenir des villes se construit par le commerce de proximite, le sport communautaire et la redistribution mutualiste. Je soutiens les commercants, clubs et dojos qui font leur part. Je suis ma ville.";

  const roles: HowCard[] = [
    {
      code: "01",
      title: isEn ? "You are a resident" : "Vous etes habitant",
      body: isEn
        ? "Sign the manifesto below. Share your city's URL with 5 friends. Every signature raises your city's score."
        : "Signez le manifeste ci-dessous. Partagez l'URL de votre ville a 5 amis. Chaque signature fait monter le score de votre ville.",
    },
    {
      code: "02",
      title: isEn ? "You are a merchant" : "Vous etes commercant",
      body: isEn
        ? "Join COLHYBRI. Your subscription activates flow 3 of the ESS industrial cell and multiplies the local points for your city."
        : "Rejoignez COLHYBRI. Votre abonnement active le flux 3 de la cellule ESS industriel et multiplie les points locaux pour votre ville.",
    },
    {
      code: "03",
      title: isEn ? "You are a club" : "Vous etes un club",
      body: isEn
        ? "Contact CROWNIUM for the SAS franchise. Flow 1 and 2 activate together. Your supporters gain access to mutualist micro-dividends."
        : "Contactez CROWNIUM pour la franchise SAS. Les flux 1 et 2 s'activent ensemble. Vos supporters accedent aux micro-dividendes mutualistes.",
    },
    {
      code: "04",
      title: isEn ? "You are a dojo" : "Vous etes un dojo",
      body: isEn
        ? "Join DOJUKU SHINGI. Flow 5 activates. Your students become the intergenerational practice base of the cell."
        : "Rejoignez DOJUKU SHINGI. Le flux 5 s'active. Vos eleves deviennent la base de pratique intergenerationnelle de la cellule.",
    },
  ];

  return (
    <main>
      <Header />
      <StructuredData
        locale={locale}
        breadcrumbs={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: "Concours", url: `${BASE_URL}/${locale}/concours` },
        ]}
        extra={[getDetroitContestEventSchema()]}
      />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-deep-black">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <nav aria-label="breadcrumb" className="mb-8 text-sm text-warm-white/50 font-body">
            <Link href={`/${locale}`} className="hover:text-gold transition-colors">
              {common.home || (isEn ? "Home" : "Accueil")}
            </Link>
            <span className="mx-2">/</span>
            <span>{isEn ? "Contest" : "Concours"}</span>
          </nav>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-6">
            {isEn ? "GOAT AME CITY 2026, Detroit Chapter 01" : "GOAT AME CITY 2026, Detroit Chapter 01"}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-white mb-6 leading-tight">
            {isEn ? "It's my city, I'm in" : "C'est ma ville je m'engage"}
          </h1>
          <p className="font-body text-lg md:text-xl text-warm-white/70 max-w-2xl leading-relaxed">
            {cp.hero_lead ||
              (isEn
                ? "The 2026 contest opens the GOAT AME CITY program. Every signature, every merchant, every club, every dojo compounds into a measurable score. The winning city earns the Chapter 01 label and becomes the flagship deployment of the ESS industrial cell."
                : "Le concours 2026 ouvre le programme GOAT AME CITY. Chaque signature, chaque commercant, chaque club, chaque dojo s'additionne dans un score mesurable. La ville gagnante obtient le label Chapter 01 et devient le deploiement phare de la cellule ESS industriel.")}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-10">
            {isEn ? "The 2026 program" : "Le dispositif 2026"}
          </h2>
          <ol className="space-y-6">
            {steps.map((s) => (
              <li key={s.n} className="grid grid-cols-[72px_1fr] gap-6 items-start">
                <span className="font-mono text-2xl text-gold">{s.n}</span>
                <div>
                  <h3 className="font-display text-lg text-warm-white mb-1">{s.title}</h3>
                  <p className="font-body text-sm text-warm-white/70 leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-6">
            {isEn ? "The engagement manifesto" : "Le manifeste d'engagement"}
          </h2>
          <blockquote className="border-l-2 border-gold pl-6 italic font-display text-xl md:text-2xl text-warm-white/90 leading-relaxed mb-10">
            {manifesto}
          </blockquote>
          <EngagementForm locale={formLocale} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-4">
            Detroit Chapter 01
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-6">
            {isEn ? "Detroit leads the race" : "Detroit mene la course"}
          </h2>
          <p className="font-body text-base md:text-lg text-warm-white/70 leading-relaxed mb-4">
            {isEn
              ? "Detroit opens the program with Detroit City FC as the community-owned anchor, the Corktown stadium roadmap for 2027, and the USL Division One candidacy on track. The Chapter 01 deployment of the ESS industrial cell is calibrated to accompany the city, not instrumentalize it."
              : "Detroit ouvre le programme avec Detroit City FC comme ancre communautaire, la roadmap du stade de Corktown pour 2027 et la candidature USL Division One en cours. Le deploiement Chapter 01 de la cellule ESS industriel est calibre pour accompagner la ville, pas l'instrumentaliser."}
          </p>
          <p className="font-body text-xs italic text-warm-white/40">
            {isEn
              ? "Public leaderboard launches as soon as the Supabase table is active."
              : "Classement public lance des que la table Supabase est active."}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-10">
            {isEn ? "How to participate, by role" : "Comment participer selon votre role"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {roles.map((r) => (
              <article key={r.code} className="border border-white/10 rounded-lg p-5">
                <p className="font-mono text-xs text-gold uppercase tracking-widest mb-3">{r.code}</p>
                <h3 className="font-display text-lg text-warm-white mb-2">{r.title}</h3>
                <p className="font-body text-sm text-warm-white/65 leading-relaxed">{r.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${locale}/labels/colhybri-city`}
            className="inline-block px-6 py-3 border border-white/20 text-warm-white font-body hover:border-gold hover:text-gold transition-colors"
          >
            COLHYBRI CITY
          </Link>
          <Link
            href={`/${locale}/labels/goat-ame-city`}
            className="inline-block px-6 py-3 border border-white/20 text-warm-white font-body hover:border-gold hover:text-gold transition-colors"
          >
            GOAT AME CITY
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
