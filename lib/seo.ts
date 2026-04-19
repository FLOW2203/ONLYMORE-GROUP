import type { Metadata } from "next";
import { locales, Locale } from "./i18n";

export const BASE_URL = "https://www.onlymore.group";
export const CANONICAL_HOST = "onlymore.group";

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

/* -------------------------------------------------------------------------- */
/*  Schema.org builders                                                        */
/* -------------------------------------------------------------------------- */

export const ORG_ID = `${BASE_URL}/#organization`;
export const WEBSITE_ID = `${BASE_URL}/#website`;
export const LOCALBIZ_ID = `${BASE_URL}/#localbusiness`;

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "ONLYMORE Group",
    legalName: "ONLYMORE Group SAS",
    url: BASE_URL,
    logo: `${BASE_URL}/logo%20onlymore%20HD.png`,
    image: `${BASE_URL}/logo%20onlymore%20HD.png`,
    description:
      "Holding francaise d'economie sociale et solidaire. Infrastructure mutualiste par le sport. 5 filiales au service de 6 UN Global Goals.",
    slogan: "Optimisons vos oeuvres.",
    foundingDate: "2023",
    foundingLocation: {
      "@type": "Place",
      name: "Rodilhan, Occitanie, France",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Rodilhan",
        postalCode: "30230",
        addressRegion: "Occitanie",
        addressCountry: "FR",
      },
    },
    founder: {
      "@type": "Person",
      name: "Florent Gibert",
      jobTitle: "Founder & CEO",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rodilhan",
      postalCode: "30230",
      addressRegion: "Occitanie",
      addressCountry: "FR",
    },
    sameAs: [
      "https://www.linkedin.com/company/onlymore-group",
      "https://colhybri.com",
      "https://crownium.club",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "florent@onlymore.group",
        contactType: "customer service",
        availableLanguage: ["French", "English"],
      },
      {
        "@type": "ContactPoint",
        email: "investors@onlymore.group",
        contactType: "investor relations",
        availableLanguage: ["French", "English"],
      },
      {
        "@type": "ContactPoint",
        email: "press@onlymore.group",
        contactType: "press",
        availableLanguage: ["French", "English"],
      },
      {
        "@type": "ContactPoint",
        email: "privacy@onlymore.group",
        contactType: "privacy",
        availableLanguage: ["French", "English"],
      },
    ],
    knowsAbout: [
      "Fan Ownership",
      "Mutualist Finance",
      "Economie Sociale et Solidaire",
      "UN Sustainable Development Goals",
      "Sports Financial Inclusion",
      "Local Commerce SaaS",
      "Martial Arts Education",
      "Lombard Credit",
    ],
    award: "EU Parliament Resolution P10_TA(2025)0212, 552 votes, 86.4%",
    areaServed: ["Europe", "Americas", "Asia-Pacific"],
    subOrganization: [
      { "@type": "Organization", name: "COLHYBRI", url: "https://colhybri.com" },
      { "@type": "Organization", name: "CROWNIUM", url: "https://crownium.club" },
      { "@type": "Organization", name: "DOJUKU SHINGI", url: `${BASE_URL}/fr/dojuku-shingi` },
      { "@type": "Organization", name: "ONLYMORE FINANCE", url: `${BASE_URL}/fr/onlymore-finance` },
      { "@type": "Organization", name: "PLUMAYA Editions", url: `${BASE_URL}/fr/plumaya` },
    ],
  };
}

export function getWebSiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "ONLYMORE Group",
    url: BASE_URL,
    inLanguage: locale,
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/${locale}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": LOCALBIZ_ID,
    name: "ONLYMORE Group",
    parentOrganization: { "@id": ORG_ID },
    image: `${BASE_URL}/logo%20onlymore%20HD.png`,
    url: BASE_URL,
    telephone: "",
    email: "florent@onlymore.group",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rodilhan",
      postalCode: "30230",
      addressRegion: "Occitanie",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.8167,
      longitude: 4.4333,
    },
    areaServed: ["FR", "EU", "Global"],
    openingHours: "Mo-Fr 09:00-18:00",
  };
}

type PersonInput = {
  slug: string;
  name: string;
  jobTitle: string;
  image?: string;
  sameAs?: string[];
  description?: string;
};

export function getPersonSchema(p: PersonInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/#person-${p.slug}`,
    name: p.name,
    jobTitle: p.jobTitle,
    worksFor: { "@id": ORG_ID },
    image: p.image,
    sameAs: p.sameAs,
    description: p.description,
  };
}

export function getDefaultTeamSchemas() {
  return [
    getPersonSchema({
      slug: "florent-gibert",
      name: "Florent Gibert",
      jobTitle: "Founder & CEO, ONLYMORE Group",
      image: `${BASE_URL}/images/florent_400.jpg`,
      sameAs: ["https://www.linkedin.com/in/florent-gibert"],
      description:
        "Autodidacte, ex-BTP et livraison. Base a Rodilhan, Occitanie (racines marseillaises cote mere). Fondateur d'ONLYMORE Group, architecte de l'infrastructure mutualiste.",
    }),
    getPersonSchema({
      slug: "joao-almeida",
      name: "Joao Almeida",
      jobTitle: "CFO, ONLYMORE Group",
      image: `${BASE_URL}/images/joao_400.jpg`,
      sameAs: ["https://www.linkedin.com/in/joao-almeida"],
      description: "Ex-ONEtoONE Corporate Finance (Lisbonne/Paris). Direction financiere et strategie d'ONLYMORE Group.",
    }),
    getPersonSchema({
      slug: "stephane-picard",
      name: "Stephane Picard",
      jobTitle: "Fundraising Partner, ONLYMORE Group",
      image: `${BASE_URL}/images/stephane_400.jpg`,
      sameAs: ["https://www.linkedin.com/in/stephane-picard"],
      description: "Partenaire levee de fonds. Winvesty, label WEP Access.",
    }),
  ];
}

type ServiceInput = {
  slug: string;
  name: string;
  description: string;
  url: string;
  serviceType: string;
  areaServed?: string[];
};

export function getServiceSchema(s: ServiceInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/#service-${s.slug}`,
    name: s.name,
    description: s.description,
    url: s.url,
    serviceType: s.serviceType,
    provider: { "@id": ORG_ID },
    areaServed: s.areaServed || ["Europe"],
  };
}

type BreadcrumbItem = { name: string; url: string };

export function getBreadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

type ArticleInput = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  locale: Locale;
  path: string;
  authorName?: string;
};

export function getArticleSchema(a: ArticleInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    image: a.image || `${BASE_URL}/logo%20onlymore%20HD.png`,
    datePublished: a.datePublished,
    dateModified: a.dateModified || a.datePublished,
    inLanguage: a.locale,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/${a.locale}${a.path}`,
    },
    author: {
      "@type": "Person",
      name: a.authorName || "Florent Gibert",
    },
    publisher: { "@id": ORG_ID },
  };
}

type FAQItem = { question: string; answer: string };

export function getFAQPageSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: i.answer,
      },
    })),
  };
}

/**
 * Full @graph knowledge graph, returned as a single JSON-LD object
 * combining Organization, WebSite, LocalBusiness and 5 subsidiaries.
 */
export function getKnowledgeGraph(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      getOrganizationSchema(),
      getWebSiteSchema(locale),
      getLocalBusinessSchema(),
      {
        "@type": "ItemList",
        "@id": `${BASE_URL}/#subsidiaries`,
        name: "ONLYMORE Group Subsidiaries",
        numberOfItems: 5,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "Organization",
              name: "CROWNIUM",
              url: "https://crownium.club",
              description: "Fan co-ownership fintech for sports clubs, mutualist SAS model.",
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "Organization",
              name: "COLHYBRI",
              url: "https://colhybri.com",
              description: "Local commerce SaaS solidarity platform.",
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "Organization",
              name: "DOJUKU SHINGI",
              url: `${BASE_URL}/${locale}/dojuku-shingi`,
              description: "Martial arts AI application, intergenerational education.",
            },
          },
          {
            "@type": "ListItem",
            position: 4,
            item: {
              "@type": "Organization",
              name: "ONLYMORE FINANCE",
              url: `${BASE_URL}/${locale}/onlymore-finance`,
              description: "Lombard credit structure, intragroup financing (L.511-7 CMF).",
            },
          },
          {
            "@type": "ListItem",
            position: 5,
            item: {
              "@type": "Organization",
              name: "PLUMAYA Editions",
              url: `${BASE_URL}/${locale}/plumaya`,
              description: "Publishing and intellectual property, SHINGAN notation system.",
            },
          },
        ],
      },
    ],
  };
}

/**
 * Helper to render any schema object as a JSON-LD <script> element,
 * safe against XSS by escaping </script> sequences.
 */
export function renderJsonLd(schema: object) {
  const json = JSON.stringify(schema).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">${json}</script>`;
}
