import { renderSectionOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import type { Locale } from "@/lib/i18n";

export const runtime = "edge";
export const alt = "ONLYMORE Group, about";
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
    eyebrow: isEn ? "About" : "Notre histoire",
    title: isEn
      ? "A holding born from exclusion."
      : "Une holding nee de l'exclusion.",
    subtitle: isEn
      ? "220 years of French mutualism, 138 years of pro football, 60 years of float. Rodilhan, Occitanie, 2023."
      : "220 ans de mutualisme francais, 138 ans de football pro, 60 ans de float. Rodilhan, Occitanie, 2023.",
  });
}
