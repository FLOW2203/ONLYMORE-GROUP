"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/lib/TranslationContext";
import { locales, localeNames, localeFlags, Locale } from "@/lib/i18n";
import { usePathname } from "next/navigation";

export default function LanguageSelector() {
  const { locale } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    window.location.href = segments.join("/") || `/${newLocale}`;
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-warm-white/70 hover:text-warm-white border border-white/10 rounded-md transition-colors"
        aria-label="Select language"
        aria-expanded={open}
      >
        <span>{localeFlags[locale]}</span>
        <span className="uppercase font-mono text-xs">{locale}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 max-h-72 overflow-y-auto bg-deep-black/95 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl z-50">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => {
                switchLocale(l);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-white/5 transition-colors ${
                l === locale ? "text-gold bg-white/5" : "text-warm-white/70"
              }`}
            >
              <span>{localeFlags[l]}</span>
              <span>{localeNames[l]}</span>
              <span className="ml-auto uppercase font-mono text-xs opacity-40">{l}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
