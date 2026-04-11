"use client";

import { createContext, useContext } from "react";
import { Locale, TranslationKeys, getNestedValue } from "./i18n";

type TranslationContextType = {
  locale: Locale;
  t: (key: string) => string;
  translations: TranslationKeys;
};

const TranslationContext = createContext<TranslationContextType>({
  locale: "fr",
  t: (key: string) => key,
  translations: {},
});

export function TranslationProvider({
  children,
  locale,
  translations,
}: {
  children: React.ReactNode;
  locale: Locale;
  translations: TranslationKeys;
}) {
  const t = (key: string): string => getNestedValue(translations, key);

  return (
    <TranslationContext.Provider value={{ locale, t, translations }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
