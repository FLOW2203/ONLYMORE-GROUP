"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/TranslationContext";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
};

export default function Philosophy() {
  const { t } = useTranslation();

  return (
    <section id="philosophy" className="py-24 lg:py-32 bg-warm-white">
      <div className="max-w-container mx-auto px-6 lg:px-16">
        <motion.h2
          {...fadeInUp}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl text-deep-black text-center mb-16 lg:mb-24"
        >
          {t("philosophy.title")}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Mandela Quote - large */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 group"
          >
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all duration-500 h-full border border-black/5">
              <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-teal" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.168 11 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.388-.654-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.168 21 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.388-.654-2.917-1.179z" />
                </svg>
              </div>
              <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl text-deep-black/90 italic leading-relaxed mb-6">
                {t("philosophy.mandela.quote")}
              </blockquote>
              <cite className="font-body text-sm text-neutral-gray not-italic">
                {t("philosophy.mandela.author")}
              </cite>
            </div>
          </motion.div>

          {/* Right column - stacked */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:gap-6">
            {/* Boetcker Quote */}
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all duration-500 border border-black/5">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <blockquote className="font-display text-lg lg:text-xl text-deep-black/90 italic leading-relaxed mb-4">
                  {t("philosophy.boetcker.quote")}
                </blockquote>
                <cite className="font-body text-sm text-neutral-gray not-italic">
                  {t("philosophy.boetcker.author")}
                </cite>
              </div>
            </motion.div>

            {/* Founder Quote */}
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all duration-500 border border-black/5">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-rose-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <blockquote className="font-display text-lg lg:text-xl text-deep-black/90 italic leading-relaxed mb-4">
                  {t("philosophy.founder.quote")}
                </blockquote>
                <cite className="font-body text-sm text-neutral-gray not-italic">
                  {t("philosophy.founder.author")}
                </cite>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
