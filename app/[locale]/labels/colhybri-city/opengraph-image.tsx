import { renderSectionOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import type { Locale } from "@/lib/i18n";

export const runtime = "edge";
export const alt = "COLHYBRI CITY, territorial label";
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
    eyebrow: isEn ? "Territorial label, francophone + Europe" : "Label territorial, francophone et Europe",
    title: "COLHYBRI CITY",
    subtitle: isEn
      ? "The label for downtowns that play their part. 5 flows of the ESS industrial cell, measurable outputs."
      : "Le label des centres-villes qui font leur part. 5 flux de la cellule ESS industriel, sorties mesurables.",
  });
}
