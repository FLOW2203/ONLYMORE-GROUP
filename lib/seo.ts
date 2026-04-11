import type { Metadata } from "next";
import { locales, Locale } from "./i18n";

const BASE_URL = "https://www.onlymore.group";

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const languages: Record<string, string> = {};
  locales.forEach((l) => {
    languages[l] = `${BASE_URL}/${l}${path}`;
  });

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}${path}`,
      languages,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}${path}`,
      siteName: "ONLYMORE GROUP",
      images: [
        {
          url: `${BASE_URL}/logo%20onlymore%20HD.png`,
          width: 1200,
          height: 630,
        },
      ],
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    other: {
      "geo.region": "FR-30",
      "geo.placename": "Rodilhan, Occitanie, France",
      "geo.position": "43.8167;4.4333",
      ICBM: "43.8167, 4.4333",
    },
  };
}
