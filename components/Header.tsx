"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/TranslationContext";
import LanguageSelector from "./LanguageSelector";
import LogoInfinity from "./LogoInfinity";

const navKeys = ["nav.group", "nav.subsidiaries", "nav.impact", "nav.team", "nav.investors", "nav.contact"];
const navAnchors = ["#hero", "#subsidiaries", "#impact", "#team", "#investors", "#contact"];

export default function Header() {
  const { t, locale } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [labelsOpen, setLabelsOpen] = useState(false);
  const labelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (labelsRef.current && !labelsRef.current.contains(e.target as Node)) {
        setLabelsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-deep-black/90 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-container mx-auto flex items-center justify-between px-6 lg:px-16 h-16 lg:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 shrink-0" aria-label="ONLYMORE GROUP Home">
            <LogoInfinity size={20} />
            <span className="hidden sm:inline font-display text-lg tracking-wide text-warm-white">
              ONLYMORE Group
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navKeys.map((key, i) => (
              <a
                key={key}
                href={navAnchors[i]}
                className="text-sm font-body text-warm-white/70 hover:text-gold transition-colors duration-300 tracking-wide uppercase"
              >
                {t(key)}
              </a>
            ))}
            <div ref={labelsRef} className="relative">
              <button
                onClick={() => setLabelsOpen((v) => !v)}
                aria-expanded={labelsOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 text-sm font-body text-warm-white/70 hover:text-gold transition-colors duration-300 tracking-wide uppercase"
              >
                {t("nav.labels") !== "nav.labels" ? t("nav.labels") : "Labels"}
                <svg className={`w-3 h-3 transition-transform ${labelsOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {labelsOpen && (
                <div className="absolute right-0 top-full mt-3 w-64 bg-deep-black/95 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl overflow-hidden">
                  <Link
                    href={`/${locale}/labels/colhybri-city`}
                    onClick={() => setLabelsOpen(false)}
                    className="block px-4 py-3 text-sm text-warm-white/80 hover:bg-white/5 hover:text-gold transition-colors"
                  >
                    <div className="font-display">COLHYBRI CITY</div>
                    <div className="text-xs text-warm-white/40">
                      {locale === "en" ? "Francophone + Europe" : "Francophone + Europe"}
                    </div>
                  </Link>
                  <Link
                    href={`/${locale}/labels/goat-ame-city`}
                    onClick={() => setLabelsOpen(false)}
                    className="block px-4 py-3 text-sm text-warm-white/80 hover:bg-white/5 hover:text-gold transition-colors"
                  >
                    <div className="font-display">GOAT AME CITY</div>
                    <div className="text-xs text-warm-white/40">
                      {locale === "en" ? "US + English-speaking" : "US + anglophone"}
                    </div>
                  </Link>
                  <div className="h-px bg-white/10" />
                  <Link
                    href={`/${locale}/concours`}
                    onClick={() => setLabelsOpen(false)}
                    className="block px-4 py-3 text-sm text-warm-white/80 hover:bg-white/5 hover:text-gold transition-colors"
                  >
                    <div className="font-display">{locale === "en" ? "Contest 2026" : "Concours 2026"}</div>
                    <div className="text-xs text-warm-white/40">
                      {locale === "en" ? "Detroit Chapter 01" : "Detroit Chapter 01"}
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <a
              href="#investors"
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-gold text-deep-black font-body text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors duration-300"
            >
              {t("cta.book")}
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span className={`block w-6 h-0.5 bg-warm-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-warm-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-warm-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-deep-black/98 backdrop-blur-lg flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {navKeys.map((key, i) => (
              <a
                key={key}
                href={navAnchors[i]}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-display text-warm-white/80 hover:text-gold transition-colors uppercase tracking-widest"
              >
                {t(key)}
              </a>
            ))}
            <Link
              href={`/${locale}/labels/colhybri-city`}
              onClick={() => setMobileOpen(false)}
              className="text-xl font-display text-warm-white/70 hover:text-gold transition-colors"
            >
              COLHYBRI CITY
            </Link>
            <Link
              href={`/${locale}/labels/goat-ame-city`}
              onClick={() => setMobileOpen(false)}
              className="text-xl font-display text-warm-white/70 hover:text-gold transition-colors"
            >
              GOAT AME CITY
            </Link>
            <Link
              href={`/${locale}/concours`}
              onClick={() => setMobileOpen(false)}
              className="text-xl font-display text-gold hover:text-gold-light transition-colors"
            >
              {locale === "en" ? "Contest 2026" : "Concours 2026"}
            </Link>
            <a
              href="#investors"
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-8 py-3 bg-gold text-deep-black font-body font-semibold rounded-lg text-lg"
            >
              {t("cta.book")}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
