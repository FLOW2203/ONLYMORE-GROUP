import type { Metadata } from "next";
import { locales, defaultLocale, isRtl, getTranslations, Locale } from "@/lib/i18n";
import { TranslationProvider } from "@/lib/TranslationContext";
import StructuredData from "@/components/StructuredData";
import "../globals.css";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const BASE_URL = "https://www.onlymore.group";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (params.locale as Locale) || defaultLocale;
  const translations = await getTranslations(locale);
  const title =
    typeof translations.meta === "object"
      ? (translations.meta as Record<string, string>).title
      : "ONLYMORE Group — Optimisons vos œuvres";
  const description =
    "ONLYMORE Group — The mutualist infrastructure. Built for the many. Powered by sport. ESS fintech holding. 5 entities addressing 6 UN SDGs through sport, local commerce, and martial arts.";

  const languages: Record<string, string> = {};
  locales.forEach((l) => {
    languages[l] = `${BASE_URL}/${l}`;
  });

  return {
    title,
    description,
    keywords: [
      "fintech",
      "sport",
      "inclusion financière",
      "mutualist",
      "CROWNIUM",
      "COLHYBRI",
      "fan ownership",
      "local commerce",
      "ONLYMORE",
      "DOJUKU SHINGI",
      "PLUMAYA",
      "ESS",
      "Économie Sociale Solidaire",
      "UN Global Goals",
      "SDG",
      "mutualist finance",
      "impact investing",
      "social economy",
    ],
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}`,
      siteName: "ONLYMORE GROUP",
      images: [
        {
          url: `${BASE_URL}/logo%20onlymore%20HD.png`,
          width: 1200,
          height: 630,
          alt: "ONLYMORE Group",
        },
      ],
      locale: "fr_FR",
      alternateLocale: ["en_US", "es_ES", "pt_BR", "de_DE", "it_IT", "ar_SA", "zh_CN", "ja_JP"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/logo%20onlymore%20HD.png`],
    },
    other: {
      "geo.region": "FR-30",
      "geo.placename": "Rodilhan, Occitanie, France",
      "geo.position": "43.8167;4.4333",
      ICBM: "43.8167, 4.4333",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = (params.locale as Locale) || defaultLocale;
  const translations = await getTranslations(locale);
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          href="/logo_onlymore_1024.png"
          as="image"
          type="image/png"
        />
        <StructuredData locale={locale} />
      </head>
      <body className="font-body bg-deep-black text-warm-white antialiased">
        <TranslationProvider locale={locale} translations={translations}>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
