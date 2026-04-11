"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/TranslationContext";

const combats = [
  {
    key: "impact.poverty",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="20" className="stroke-warm-white/20" />
        <path d="M16 32l4-8 4 4 4-12 4 8" className="stroke-gold" strokeWidth="2" />
        <line x1="12" y1="36" x2="36" y2="36" className="stroke-warm-white/30" />
      </svg>
    ),
  },
  {
    key: "impact.talent",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="16" r="8" className="stroke-warm-white/30" />
        <path d="M24 24v12" className="stroke-gold" strokeWidth="2" />
        <path d="M18 30l6 6 6-6" className="stroke-gold" strokeWidth="2" />
        <line x1="14" y1="40" x2="34" y2="40" className="stroke-warm-white/20" />
      </svg>
    ),
  },
  {
    key: "impact.emigration",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="16" className="stroke-warm-white/20" />
        <path d="M18 24h12" className="stroke-gold" strokeWidth="2" />
        <path d="M24 18v12" className="stroke-gold" strokeWidth="2" />
        <circle cx="24" cy="24" r="4" className="stroke-warm-white/40" />
      </svg>
    ),
  },
];

const flowSteps = ["impact.flow.1", "impact.flow.2", "impact.flow.3", "impact.flow.4"];

export default function Impact() {
  const { t } = useTranslation();

  return (
    <section id="impact" className="py-24 lg:py-32 bg-gradient-to-br from-teal-dark/90 via-teal/80 to-teal-dark/90 relative overflow-hidden">
      <div className="absolute inset-0 bg-deep-black/40" />

      <div className="relative z-10 max-w-container mx-auto px-6 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl text-warm-white text-center mb-16 lg:mb-24"
        >
          {t("impact.title")}
        </motion.h2>

        {/* 3 Combats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {combats.map((combat, i) => (
            <motion.div
              key={combat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="flex justify-center mb-5">{combat.icon}</div>
              <h3 className="font-display text-xl lg:text-2xl text-warm-white mb-3">
                {t(`${combat.key}.title`)}
              </h3>
              <p className="font-body text-sm text-warm-white/70 leading-relaxed max-w-xs mx-auto">
                {t(`${combat.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Virtuous mechanism flow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/[0.05] backdrop-blur-sm rounded-2xl p-6 lg:p-10 border border-white/10"
        >
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-2">
            {flowSteps.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.2 }}
                className="flex items-center gap-2 lg:gap-4"
              >
                <span className="font-body text-sm lg:text-base text-warm-white/90 text-center">
                  {t(step)}
                </span>
                {i < flowSteps.length - 1 && (
                  <span className="hidden lg:inline text-gold text-xl font-light">&rarr;</span>
                )}
                {i < flowSteps.length - 1 && (
                  <span className="lg:hidden text-gold text-xl font-light">&darr;</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
