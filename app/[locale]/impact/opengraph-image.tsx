import { renderSectionOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import type { Locale } from "@/lib/i18n";

export const runtime = "edge";
export const alt = "ONLYMORE Group, impact";
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
    eyebrow: isEn ? "Impact" : "Impact",
    title: isEn
      ? "Measure the impact. Don't just proclaim it."
      : "Mesurer l'impact. Pas seulement le declamer.",
    subtitle: isEn
      ? "3 ESS principles, 6 UN Global Goals, transparent KPI targets, annual report 2028."
      : "3 principes ESS, 6 UN Global Goals, KPI transparents, rapport annuel 2028.",
  });
}
