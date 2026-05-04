"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/TranslationContext";

const pillars = [
  {
    name: "CROWNIUM",
    key: "subsidiaries.crownium",
    role: "PRO",
    status: "live" as const,
    url: "https://crownium.club",
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 28L12 14L20 20L28 14L32 28H8Z" className="stroke-gold" />
        <circle cx="12" cy="12" r="2" className="fill-gold stroke-none" />
        <circle cx="20" cy="8" r="2" className="fill-gold stroke-none" />
        <circle cx="28" cy="12" r="2" className="fill-gold stroke-none" />
        <line x1="8" y1="30" x2="32" y2="30" className="stroke-gold" />
      </svg>
    ),
  },
  {
    name: "COLHYBRI",
    key: "subsidiaries.colhybri",
    role: "PRO ↔ PARTICULIER",
    status: "live" as const,
    url: "https://colhybri.com",
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="20" cy="20" r="16" className="stroke-teal" />
        <path d="M14 20c0-3.3 2.7-6 6-6s6 2.7 6 6" className="stroke-gold" />
        <path d="M12 26c2-3 4.5-4.5 8-4.5s6 1.5 8 4.5" className="stroke-teal" />
        <circle cx="20" cy="13" r="2" className="fill-gold stroke-none" />
      </svg>
    ),
  },
  {
    name: "DOJUKU SHINGI",
    key: "subsidiaries.dojuku",
    role: "PARTICULIER",
    status: "coming" as const,
    url: null,
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="20" cy="20" r="16" className="stroke-teal/50" />
        <path d="M15 28V18c0-2.8 2.2-5 5-5s5 2.2 5 5v10" className="stroke-teal" />
        <path d="M13 24h14" className="stroke-gold" />
        <circle cx="20" cy="10" r="3" className="stroke-teal" />
      </svg>
    ),
  },
  {
    name: "ONLYMORE FINANCE",
    key: "subsidiaries.finance",
    role: "PRO",
    status: "coming" as const,
    url: null,
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="16" width="24" height="16" rx="2" className="stroke-gold" />
        <path d="M12 16V12a8 8 0 1116 0v4" className="stroke-teal" />
        <circle cx="20" cy="24" r="3" className="stroke-gold" />
        <line x1="20" y1="24" x2="20" y2="27" className="stroke-gold" />
      </svg>
    ),
  },
];

type Status = "live" | "coming";

const foundation: {
  name: string;
  key: string;
  status: Status;
  url: string | null;
  icon: ReactNode;
} = {
  name: "PLUMAYA Editions",
  key: "subsidiaries.plumaya",
  status: "coming",
  url: null,
  icon: (
    <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 6c-4 2-8 6-8 14v12h16V20c0-8-4-12-8-14z" className="stroke-teal" />
      <path d="M16 32c0-4 1.8-7 4-9 2.2 2 4 5 4 9" className="stroke-gold" />
      <line x1="20" y1="12" x2="20" y2="24" className="stroke-gold/50" />
    </svg>
  ),
};

export default function Subsidiaries() {
  const { t } = useTranslation();

  return (
    <section id="subsidiaries" className="py-24 lg:py-32 bg-deep-black">
      <div className="max-w-container mx-auto px-6 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl text-warm-white text-center mb-6"
        >
          {t("subsidiaries.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-body text-sm sm:text-base text-warm-white/60 text-center max-w-2xl mx-auto mb-16 lg:mb-20 leading-relaxed"
        >
          {t("subsidiaries.subtitle")}
        </motion.p>

        {/* 4 piliers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 lg:mb-16">
          {pillars.map((sub, i) => (
            <motion.div
              key={sub.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 lg:p-7 hover:border-l-gold hover:border-l-[3px] hover:translate-x-1 transition-all duration-300"
            >
              <div className="mb-5">{sub.icon}</div>

              <span className="inline-block font-mono text-[10px] tracking-[0.2em] text-gold/70 mb-2">
                {sub.role}
              </span>

              <h3 className="font-display text-xl text-warm-white mb-2">{sub.name}</h3>

              <p className="font-body text-sm text-warm-white/60 mb-4 leading-relaxed">
                {t(`${sub.key}.desc`)}
              </p>

              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-mono tracking-wider ${
                    sub.status === "live" ? "text-emerald-400" : "text-neutral-gray"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${sub.status === "live" ? "bg-emerald-400" : "bg-neutral-gray"}`} />
                  {sub.status === "live" ? t("subsidiaries.live") : t("subsidiaries.coming")}
                </span>

                {sub.url && (
                  <a
                    href={sub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gold/70 hover:text-gold transition-colors font-mono"
                    aria-label={`Visit ${sub.name}`}
                  >
                    {sub.url.replace("https://", "")} &#8599;
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fondation — distincte */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative bg-gradient-to-br from-teal/[0.06] to-gold/[0.04] border border-gold/20 rounded-xl p-6 lg:p-8 max-w-3xl mx-auto"
        >
          <div className="absolute -top-3 left-6 px-3 py-1 bg-deep-black border border-gold/30 rounded-full">
            <span className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase">
              {t("subsidiaries.foundation_label")}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="shrink-0">{foundation.icon}</div>
            <div className="flex-1">
              <h3 className="font-display text-xl text-warm-white mb-2">{foundation.name}</h3>
              <p className="font-body text-sm text-warm-white/60 mb-4 leading-relaxed">
                {t(`${foundation.key}.desc`)}
              </p>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-mono tracking-wider ${
                  foundation.status === "live" ? "text-emerald-400" : "text-neutral-gray"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${foundation.status === "live" ? "bg-emerald-400" : "bg-neutral-gray"}`} />
                {foundation.status === "live" ? t("subsidiaries.live") : t("subsidiaries.coming")}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
