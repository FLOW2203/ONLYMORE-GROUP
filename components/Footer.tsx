"use client";

import { useTranslation } from "@/lib/TranslationContext";

const navLinks = [
  { key: "nav.group", href: "#hero" },
  { key: "nav.subsidiaries", href: "#subsidiaries" },
  { key: "nav.impact", href: "#impact" },
  { key: "nav.team", href: "#team" },
  { key: "nav.investors", href: "#investors" },
  { key: "nav.contact", href: "#contact" },
];

const platforms = [
  { name: "COLHYBRI", url: "https://colhybri.com" },
  { name: "CROWNIUM", url: "https://crownium.club" },
  { name: "DOJUKU SHINGI", url: null },
  { name: "ONLYMORE FINANCE", url: null },
  { name: "PLUMAYA Editions", url: null },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-16 lg:py-20 bg-deep-black border-t border-white/5">
      <div className="max-w-container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Col 1: Logo + slogan */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.svg"
                alt="ONLYMORE Group - Optimisons vos oeuvres"
                width={48}
                height={48}
              />
              <div>
                <span className="font-display text-lg text-warm-white block">ONLYMORE Group</span>
                <span className="font-body text-sm text-warm-white/50">{t("hero.title")}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-teal/20 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-warm-white/60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              {/* Email */}
              <a
                href="mailto:onlymore2024@gmail.com"
                aria-label="Email"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-teal/20 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-warm-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-display text-sm text-warm-white uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-warm-white/50 hover:text-gold transition-colors"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Platforms */}
          <div>
            <h4 className="font-display text-sm text-warm-white uppercase tracking-widest mb-4">
              {t("footer.platforms")}
            </h4>
            <ul className="space-y-2.5">
              {platforms.map((p) => (
                <li key={p.name}>
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-sm text-warm-white/50 hover:text-gold transition-colors"
                    >
                      {p.name}
                    </a>
                  ) : (
                    <span className="font-body text-sm text-warm-white/30">{p.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-display text-sm text-warm-white uppercase tracking-widest mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:onlymore2024@gmail.com"
                  className="font-body text-sm text-warm-white/50 hover:text-gold transition-colors"
                >
                  onlymore2024@gmail.com
                </a>
              </li>
              <li className="font-body text-sm text-warm-white/30">
                Rodilhan, France
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-gold/20 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-warm-white/30">
            {t("footer.copyright")}
          </p>
          <p className="font-body text-xs text-warm-white/20 italic">
            Built with purpose. Driven by impact.
          </p>
        </div>
      </div>
    </footer>
  );
}
