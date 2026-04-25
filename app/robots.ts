import type { MetadataRoute } from "next";

const BASE_URL = "https://www.onlymore.group";

const AI_CRAWLERS = [
  "GPTBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Googlebot",
  "Bytespider",
  "CCBot",
  "cohere-ai",
  "Applebot-Extended",
  "FacebookBot",
  "DuckAssistBot",
  "Amazonbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/.well-known/security.txt"],
      },
      ...AI_CRAWLERS.map((agent) => ({
        userAgent: agent,
        allow: "/",
      })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
