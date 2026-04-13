"use client";

import { motion } from "framer-motion";

const sdgBadges = [
  { number: 1, label: "No Poverty", color: "#E5243B" },
  { number: 4, label: "Quality Education", color: "#C5192D" },
  { number: 8, label: "Decent Work & Economic Growth", color: "#A21942" },
  { number: 10, label: "Reduced Inequalities", color: "#DD1367" },
  { number: 11, label: "Sustainable Cities", color: "#FD9D24" },
  { number: 17, label: "Partnerships", color: "#19486A" },
];

const stats = [
  "13,000+ professional sports clubs addressable",
  "€4.2B annual talent drain in European football",
  "EU Parliament: 552 votes, 86.4% for cooperative model",
  "220 years of French mutualism",
];

export default function ESSImpact() {
  return (
    <section
      id="ess-impact"
      className="relative py-20 lg:py-28 bg-deep-black overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal/5 via-transparent to-gold/5" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />

      <div className="relative z-10 max-w-container mx-auto px-6 lg:px-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-warm-white mb-4">
            ESS & Impact
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-teal to-gold mx-auto" />
        </motion.div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Column 1 — ESS DNA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8"
          >
            <div className="w-10 h-10 rounded-lg bg-teal/20 flex items-center justify-center mb-5">
              <svg
                className="w-5 h-5 text-teal-light"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            </div>
            <h3 className="font-display text-xl text-warm-white mb-4">
              Économie Sociale & Solidaire
            </h3>
            <p className="font-body text-sm text-warm-white/60 leading-relaxed mb-6">
              ONLYMORE Group est structuré selon les 3 principes fondateurs de
              l&apos;ESS : primauté de la personne sur le capital, gouvernance
              démocratique, réinvestissement des excédents dans la mission.
            </p>
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-teal/30 bg-teal/10 text-teal-light text-xs font-body tracking-wide">
              Agrément ESUS en cours
            </span>
          </motion.div>

          {/* Column 2 — 6 UN Global Goals */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8"
          >
            <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center mb-5">
              <svg
                className="w-5 h-5 text-gold-light"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5"
                />
              </svg>
            </div>
            <h3 className="font-display text-xl text-warm-white mb-5">
              6 UN Sustainable Development Goals
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {sdgBadges.map((sdg) => (
                <div key={sdg.number} className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold font-body shrink-0"
                    style={{ backgroundColor: sdg.color }}
                  >
                    {sdg.number}
                  </div>
                  <span className="font-body text-xs text-warm-white/60 leading-tight">
                    {sdg.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 3 — Impact chiffré */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8"
          >
            <div className="w-10 h-10 rounded-lg bg-teal/20 flex items-center justify-center mb-5">
              <svg
                className="w-5 h-5 text-teal-light"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                />
              </svg>
            </div>
            <h3 className="font-display text-xl text-warm-white mb-5">
              The Infrastructure
            </h3>
            <ul className="space-y-4">
              {stats.map((stat, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                  <span className="font-body text-sm text-warm-white/60 leading-relaxed">
                    {stat}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}
