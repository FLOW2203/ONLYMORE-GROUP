import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const BASE_URL = "https://www.onlymore.group";

const sitemapLocales = locales;

const pages: { path: string; priority: number }[] = [
  { path: "", priority: 1.0 },
  { path: "/filiales", priority: 0.9 },
  { path: "/crownium", priority: 0.8 },
  { path: "/crownium/clubs", priority: 0.7 },
  { path: "/crownium/fans", priority: 0.7 },
  { path: "/colhybri", priority: 0.8 },
  { path: "/colhybri/commercants", priority: 0.7 },
  { path: "/dojuku-shingi", priority: 0.8 },
  { path: "/onlymore-finance", priority: 0.8 },
  { path: "/plumaya", priority: 0.8 },
  { path: "/equipe", priority: 0.7 },
  { path: "/investisseurs", priority: 0.7 },
  { path: "/impact", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
  { path: "/legal/mentions", priority: 0.3 },
  { path: "/legal/privacy", priority: 0.3 },
  { path: "/legal/terms", priority: 0.3 },
  { path: "/legal/cookies", priority: 0.3 },
  { path: "/about", priority: 0.8 },
  { path: "/philosophy", priority: 0.7 },
  { path: "/press", priority: 0.6 },
  { path: "/regulatory", priority: 0.6 },
  { path: "/accessibility", priority: 0.3 },
  { path: "/insights", priority: 0.7 },
  { path: "/insights/linfini-decode", priority: 0.6 },
  { path: "/insights/le-caffe-sospeso-digitalise", priority: 0.6 },
  { path: "/insights/le-berkshire-hathaway-du-sport", priority: 0.6 },
  { path: "/labels/colhybri-city", priority: 0.7 },
  { path: "/labels/goat-ame-city", priority: 0.7 },
  { path: "/concours", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const locale of sitemapLocales) {
    for (const page of pages) {
      const languages: Record<string, string> = {};
      for (const l of sitemapLocales) {
        languages[l] = `${BASE_URL}/${l}${page.path}`;
      }
      languages["x-default"] = `${BASE_URL}/fr${page.path}`;

      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: page.priority,
        alternates: { languages },
      });
    }
  }

  return entries;
}
