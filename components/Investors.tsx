"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/TranslationContext";

const metrics = ["investors.metric1", "investors.metric2", "investors.metric3"];

export default function Investors() {
  const { t } = useTranslation();

  return (
    <section id="investors" className="py-24 lg:py-32 bg-deep-black">
      <div className="max-w-container mx-auto px-6 lg:px-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl text-gold mb-8"
        >
          {t("investors.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-body text-base lg:text-lg text-warm-white/80 max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          {t("investors.description")}
        </motion.p>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          {metrics.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="py-6"
            >
              <span className="block font-mono text-3xl lg:text-4xl text-gold mb-2">
                {t(`${key}.value`)}
              </span>
              <span className="font-body text-sm text-warm-white/50">
                {t(`${key}.label`)}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <a
            href="mailto:onlymore2024@gmail.com?subject=Meeting%20Request"
            className="inline-flex items-center px-10 py-4 bg-gold text-deep-black font-body font-semibold rounded-lg hover:bg-gold-light transition-colors duration-300 text-base lg:text-lg"
          >
            {t("cta.book")}
          </a>
          <p className="mt-6 font-body text-sm text-neutral-gray" id="contact">
            contact : onlymore2024@gmail.com
          </p>
        </motion.div>
      </div>
    </section>
  );
}
