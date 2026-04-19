import { renderSectionOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import type { Locale } from "@/lib/i18n";

export const runtime = "edge";
export const alt = "ONLYMORE Group philosophy, the O-M decoded";
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
    eyebrow: isEn ? "Philosophy" : "Philosophie",
    title: isEn ? "One symbol. One mechanism. One operator." : "Un symbole. Un mecanisme. Un operateur.",
    subtitle: isEn
      ? "Territorial revitalization through sports industry, decoded in the lemniscate of ONLYMORE."
      : "Revitalisation territoriale par l'industrie sportive, decodee dans la lemniscate ONLYMORE.",
  });
}
