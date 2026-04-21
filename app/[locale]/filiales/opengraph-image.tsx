import { renderSectionOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import type { Locale } from "@/lib/i18n";

export const runtime = "edge";
export const alt = "ONLYMORE Group, 5 subsidiaries";
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
    eyebrow: isEn ? "5 subsidiaries, 1 infrastructure" : "5 filiales, 1 infrastructure",
    title: isEn ? "Five pillars, one unique thesis." : "Cinq piliers, une these unique.",
    subtitle: isEn
      ? "COLHYBRI, CROWNIUM, DOJUKU SHINGI, ONLYMORE FINANCE, PLUMAYA Editions."
      : "COLHYBRI, CROWNIUM, DOJUKU SHINGI, ONLYMORE FINANCE, PLUMAYA Editions.",
  });
}
