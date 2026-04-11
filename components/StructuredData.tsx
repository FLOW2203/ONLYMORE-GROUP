export default function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ONLYMORE Group",
    url: "https://www.onlymore.group",
    logo: "https://www.onlymore.group/logo%20onlymore%20HD.png",
    description:
      "Holding fintech mutualist specialisee en inclusion financiere par le sport",
    foundingDate: "2025",
    foundingLocation: {
      "@type": "Place",
      name: "Rodilhan, Occitanie, France",
    },
    sameAs: [
      "https://www.linkedin.com/company/onlymore-group",
      "https://www.facebook.com/onlymore",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "onlymore2024@gmail.com",
      contactType: "customer service",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ONLYMORE Group",
    url: "https://www.onlymore.group",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.onlymore.group/fr/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const subsidiaries = {
    "@context": "https://schema.org",
    "@type": "ItemList",
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
          description:
            "Fan co-ownership fintech for sports clubs — mutualist SAS model",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Organization",
          name: "COLHYBRI",
          url: "https://colhybri.com",
          description: "Local commerce SaaS solidarity platform",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Organization",
          name: "DOJUKU SHINGI",
          url: "https://www.onlymore.group/fr/dojuku-shingi",
          description: "Martial arts AI application",
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Organization",
          name: "ONLYMORE FINANCE",
          url: "https://www.onlymore.group/fr/onlymore-finance",
          description: "Lombard credit structure",
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Organization",
          name: "PLUMAYA Editions",
          url: "https://www.onlymore.group/fr/plumaya",
          description:
            "Publishing and intellectual property — SHINGAN notation system",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(subsidiaries) }}
      />
    </>
  );
}
