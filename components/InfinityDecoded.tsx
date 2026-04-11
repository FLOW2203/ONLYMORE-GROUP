"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/TranslationContext";

const annotations = [
  { key: "infinity.only", position: "left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-6 lg:pr-10", color: "text-teal", delay: 0.3 },
  { key: "infinity.more", position: "left-1/2 -translate-x-1/2 -top-4 -translate-y-full pb-4", color: "text-gold", delay: 0.6 },
  { key: "infinity.engine", position: "left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2", color: "text-warm-white", delay: 0.9 },
  { key: "infinity.circular", position: "right-0 top-1/2 -translate-y-1/2 translate-x-full pl-6 lg:pl-10", color: "text-warm-white/60", delay: 1.2 },
];

export default function InfinityDecoded() {
  const { t } = useTranslation();

  return (
    <section className="py-24 lg:py-32 bg-deep-black overflow-hidden">
      <div className="max-w-container mx-auto px-6 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl text-warm-white text-center mb-16 lg:mb-24"
        >
          {t("infinity.title")}
        </motion.h2>

        {/* Logo with annotations - desktop */}
        <div className="hidden lg:block relative mx-auto w-[600px] h-[350px] mb-16">
          {/* Center logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <img src="/logo.png" alt="ONLYMORE Infinity Logo" className="w-72 h-auto" />
          </motion.div>

          {/* Annotation: ONLY - left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute left-0 top-1/2 -translate-y-1/2"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-teal tracking-wider">{t("infinity.only")}</span>
              <div className="w-16 h-px bg-teal/30" />
            </div>
          </motion.div>

          {/* Annotation: MORE - top */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute left-1/2 -translate-x-1/2 top-4"
          >
            <div className="flex flex-col items-center gap-3">
              <span className="font-mono text-sm text-gold tracking-wider">{t("infinity.more")}</span>
              <div className="w-px h-8 bg-gold/30" />
            </div>
          </motion.div>

          {/* Annotation: Engine - center */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-8"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-6 bg-white/20" />
              <span className="font-mono text-xs text-warm-white/60 tracking-wider">{t("infinity.engine")}</span>
            </div>
          </motion.div>

          {/* Annotation: Circular - right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute right-0 top-1/2 -translate-y-1/2"
          >
            <div className="flex items-center gap-3">
              <div className="w-16 h-px bg-white/20" />
              <span className="font-mono text-xs text-warm-white/50 tracking-wider max-w-[140px] leading-relaxed">
                {t("infinity.circular")}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Mobile version - stacked */}
        <div className="lg:hidden flex flex-col items-center gap-8 mb-12">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            src="/logo.png"
            alt="ONLYMORE Infinity Logo"
            className="w-48 sm:w-64 h-auto"
          />
          <div className="grid grid-cols-2 gap-4 text-center w-full max-w-sm">
            {[
              { key: "infinity.only", color: "text-teal" },
              { key: "infinity.more", color: "text-gold" },
              { key: "infinity.engine", color: "text-warm-white" },
              { key: "infinity.circular", color: "text-warm-white/60" },
            ].map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                className="p-3"
              >
                <span className={`font-mono text-xs ${item.color} tracking-wider`}>
                  {t(item.key)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center font-body text-sm sm:text-base text-warm-white/50 max-w-xl mx-auto"
        >
          {t("infinity.tagline")}
        </motion.p>
      </div>
    </section>
  );
}
