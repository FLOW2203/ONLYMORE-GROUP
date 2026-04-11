"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/TranslationContext";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 lg:px-16 overflow-hidden"
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-deep-black" />
      <div className="absolute inset-0 bg-gradient-to-br from-deep-black via-teal/5 to-deep-black" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal/3 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/3 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-container mx-auto text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <img
            src="/logo.svg"
            alt="ONLYMORE Group - Optimisons vos oeuvres"
            className="mx-auto"
            width={200}
            height={200}
          />
        </motion.div>

        {/* Animated badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center mb-8"
        >
          <span className="px-4 py-1.5 border border-gold/40 rounded-full text-gold text-sm font-body tracking-wider animate-pulse">
            {t("hero.badge")}
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-warm-white leading-tight mb-6"
        >
          {t("hero.title")}
        </motion.h1>

        {/* WHY statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-lg sm:text-xl md:text-2xl text-warm-white/90 font-light tracking-wide max-w-3xl mx-auto mb-4"
        >
          {t("hero.why")}
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-body text-sm sm:text-base text-warm-white/50 max-w-2xl mx-auto mb-10"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#philosophy"
            className="px-8 py-3.5 bg-gold text-deep-black font-body font-semibold rounded-lg hover:bg-gold-light transition-colors duration-300 text-sm sm:text-base"
          >
            {t("hero.cta_primary")}
          </a>
          <a
            href="#investors"
            className="px-8 py-3.5 border border-warm-white/30 text-warm-white font-body rounded-lg hover:border-warm-white/60 transition-colors duration-300 text-sm sm:text-base"
          >
            {t("hero.cta_secondary")}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <svg className="w-5 h-5 text-warm-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
