export const locales = [
  "fr", "en", "es", "pt", "de", "it", "nl", "ar", "zh", "ja",
  "ko", "tr", "pl", "ru", "hi", "id", "vi", "th", "sv", "da",
  "no", "fi", "el", "ro", "cs",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const rtlLocales: Locale[] = ["ar"];

export const localeNames: Record<Locale, string> = {
  fr: "Francais",
  en: "English",
  es: "Espanol",
  pt: "Portugues",
  de: "Deutsch",
  it: "Italiano",
  nl: "Nederlands",
  ar: "العربية",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  tr: "Turkce",
  pl: "Polski",
  ru: "Русский",
  hi: "हिन्दी",
  id: "Bahasa Indonesia",
  vi: "Tiếng Việt",
  th: "ภาษาไทย",
  sv: "Svenska",
  da: "Dansk",
  no: "Norsk",
  fi: "Suomi",
  el: "Ελληνικά",
  ro: "Romana",
  cs: "Cestina",
};

export const localeFlags: Record<Locale, string> = {
  fr: "🇫🇷",
  en: "🇬🇧",
  es: "🇪🇸",
  pt: "🇵🇹",
  de: "🇩🇪",
  it: "🇮🇹",
  nl: "🇳🇱",
  ar: "🇸🇦",
  zh: "🇨🇳",
  ja: "🇯🇵",
  ko: "🇰🇷",
  tr: "🇹🇷",
  pl: "🇵🇱",
  ru: "🇷🇺",
  hi: "🇮🇳",
  id: "🇮🇩",
  vi: "🇻🇳",
  th: "🇹🇭",
  sv: "🇸🇪",
  da: "🇩🇰",
  no: "🇳🇴",
  fi: "🇫🇮",
  el: "🇬🇷",
  ro: "🇷🇴",
  cs: "🇨🇿",
};

export type TranslationKeys = {
  [key: string]: string | TranslationKeys;
};

const translationCache: Partial<Record<Locale, TranslationKeys>> = {};

export async function getTranslations(locale: Locale): Promise<TranslationKeys> {
  if (translationCache[locale]) {
    return translationCache[locale]!;
  }
  try {
    const translations = (await import(`@/locales/${locale}.json`)).default;
    translationCache[locale] = translations;
    return translations;
  } catch {
    const translations = (await import(`@/locales/fr.json`)).default;
    return translations;
  }
}

export function getNestedValue(obj: TranslationKeys, path: string): string {
  const keys = path.split(".");
  let current: TranslationKeys | string = obj;
  for (const key of keys) {
    if (typeof current === "string") return path;
    current = current[key];
    if (current === undefined) return path;
  }
  return typeof current === "string" ? current : path;
}

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}
