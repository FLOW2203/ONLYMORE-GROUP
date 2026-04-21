"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/TranslationContext";
import { trackEvent, PlausibleEvents } from "@/lib/analytics";

export default function ContestTeaser() {
  const { locale } = useTranslation();
  const isEn = locale === "en";

  return (
    <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-6">
          {isEn ? "Contest 2026" : "Concours 2026"}
        </p>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-warm-white mb-6 leading-tight">
          {isEn ? "It's my city, I'm in." : "C'est ma ville je m'engage."}
        </h2>
        <p className="font-body text-base md:text-lg text-warm-white/70 max-w-2xl mx-auto leading-relaxed mb-8">
          {isEn
            ? "Detroit Chapter 01 opens the GOAT AME CITY program. Seven Rust Belt cities prepare 2027. Sign the manifesto, add a point for your city, activate the 5 flows of the ESS industrial cell."
            : "Detroit Chapter 01 ouvre le programme GOAT AME CITY. Sept villes de la Rust Belt preparent 2027. Signez le manifeste, ajoutez un point pour votre ville, activez les 5 flux de la cellule ESS industriel."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${locale}/concours`}
            onClick={() => trackEvent(PlausibleEvents.ContestCtaClicked, { source: "home_teaser" })}
            className="inline-block px-6 py-3 bg-gold text-deep-black font-body font-medium hover:bg-gold/90 transition-colors"
          >
            {isEn ? "Engage your city" : "Engagez votre ville"} &rarr;
          </Link>
          <Link
            href={`/${locale}/labels/goat-ame-city`}
            onClick={() => trackEvent(PlausibleEvents.LabelCityClicked, { label: "goat-ame-city", source: "home_teaser" })}
            className="inline-block px-6 py-3 border border-white/20 text-warm-white font-body hover:border-gold hover:text-gold transition-colors"
          >
            GOAT AME CITY
          </Link>
          <Link
            href={`/${locale}/labels/colhybri-city`}
            onClick={() => trackEvent(PlausibleEvents.LabelCityClicked, { label: "colhybri-city", source: "home_teaser" })}
            className="inline-block px-6 py-3 border border-white/20 text-warm-white font-body hover:border-gold hover:text-gold transition-colors"
          >
            COLHYBRI CITY
          </Link>
        </div>
      </div>
    </section>
  );
}
