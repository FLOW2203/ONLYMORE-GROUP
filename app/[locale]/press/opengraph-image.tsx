import { renderSectionOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import type { Locale } from "@/lib/i18n";

export const runtime = "edge";
export const alt = "ONLYMORE Group press room";
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
    eyebrow: isEn ? "Press" : "Presse",
    title: isEn ? "Press room, ONLYMORE Group" : "Tout pour ecrire sur ONLYMORE.",
    subtitle: isEn
      ? "Factsheet, quotes, kit. press@onlymore.group, response within 24-48h."
      : "Factsheet, citations, kit. press@onlymore.group, reponse 24-48h.",
  });
}
