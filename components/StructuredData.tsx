import {
  getKnowledgeGraph,
  getDefaultTeamSchemas,
  getBreadcrumbListSchema,
  getServiceSchema,
  getArticleSchema,
  getFAQPageSchema,
} from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

type StructuredDataProps = {
  locale?: Locale;
  includeTeam?: boolean;
  breadcrumbs?: { name: string; url: string }[];
  extra?: object[];
};

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function StructuredData({
  locale = "fr" as Locale,
  includeTeam = false,
  breadcrumbs,
  extra = [],
}: StructuredDataProps) {
  const graphs: object[] = [getKnowledgeGraph(locale)];

  if (includeTeam) {
    getDefaultTeamSchemas().forEach((p) => graphs.push(p));
  }

  if (breadcrumbs && breadcrumbs.length > 0) {
    graphs.push(getBreadcrumbListSchema(breadcrumbs));
  }

  extra.forEach((e) => graphs.push(e));

  return (
    <>
      {graphs.map((g, i) => (
        <JsonLd key={i} data={g} />
      ))}
    </>
  );
}

export { getServiceSchema, getArticleSchema, getFAQPageSchema, getBreadcrumbListSchema };
