import { renderSectionOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import type { Locale } from "@/lib/i18n";

export const runtime = "edge";
export const alt = "GOAT AME CITY, territorial label";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  const isEn = locale === "en";
  return renderSectionOg({
    locale,
    eyebrow: isEn ? "Territorial label, US + English-speaking" : "Label territorial, US et anglophone",
    title: "GOAT AME CITY",
    subtitle: isEn
      ? "The greatest soul of all cities. Detroit Chapter 01, 2026. Seven Rust Belt cities preparing 2027."
      : "La meilleure ame des villes de tous les temps. Detroit Chapter 01, 2026.",
  });
}
