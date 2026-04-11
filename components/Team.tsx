"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/TranslationContext";

const members = [
  { key: "team.florent", initials: "FG", name: "Florent Gibert" },
  { key: "team.joao", initials: "JA", name: "Joao Almeida" },
  { key: "team.julie", initials: "JM", name: "Julie Mariage" },
  { key: "team.stephane", initials: "SP", name: "Stephane Picard" },
];

export default function Team() {
  const { t } = useTranslation();

  return (
    <section id="team" className="py-24 lg:py-32 bg-warm-white">
      <div className="max-w-container mx-auto px-6 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl text-deep-black text-center mb-16 lg:mb-24"
        >
          {t("team.title")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, i) => (
            <motion.div
              key={member.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center group"
            >
              {/* Avatar placeholder */}
              <div className="w-24 h-24 mx-auto mb-5 rounded-full bg-gradient-to-br from-teal/10 to-gold/10 border border-black/5 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="font-display text-xl text-deep-black/40">{member.initials}</span>
              </div>

              {/* Name */}
              <h3 className="font-display text-lg text-deep-black mb-1">{member.name}</h3>

              {/* Title */}
              <p className="font-body text-sm text-teal font-medium mb-2">
                {t(`${member.key}.role`)}
              </p>

              {/* Bio */}
              <p className="font-body text-xs text-neutral-gray leading-relaxed mb-3">
                {t(`${member.key}.bio`)}
              </p>

              {/* LinkedIn */}
              <a
                href="#"
                aria-label={`LinkedIn ${member.name}`}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/5 hover:bg-teal/10 transition-colors"
              >
                <svg className="w-4 h-4 text-neutral-gray" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
