import type { Metadata } from "next";
import { locales, defaultLocale, isRtl, getTranslations, Locale } from "@/lib/i18n";
import { TranslationProvider } from "@/lib/TranslationContext";
import "../globals.css";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

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
      : "ONLYMORE GROUP";
  const description =
    typeof translations.meta === "object"
      ? (translations.meta as Record<string, string>).description
      : "";

  const languages: Record<string, string> = {};
  locales.forEach((l) => {
    languages[l] = `https://onlymore.group/${l}`;
  });

  return {
    title,
    description,
    metadataBase: new URL("https://onlymore.group"),
    alternates: {
      canonical: `https://onlymore.group/${locale}`,
      languages,
    },
    openGraph: {
      title,
      description,
      url: `https://onlymore.group/${locale}`,
      siteName: "ONLYMORE GROUP",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    other: {
      "schema:type": "Organization",
      "schema:name": "ONLYMORE GROUP",
      "schema:url": "https://onlymore.group",
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
      </head>
      <body className="font-body bg-deep-black text-warm-white antialiased">
        <TranslationProvider locale={locale} translations={translations}>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
