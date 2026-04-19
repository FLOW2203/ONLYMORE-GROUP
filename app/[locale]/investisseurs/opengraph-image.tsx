import { renderSectionOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import type { Locale } from "@/lib/i18n";

export const runtime = "edge";
export const alt = "ONLYMORE Group investor landing, pre-seed 2026";
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
    eyebrow: isEn ? "Investors" : "Investisseurs",
    title: isEn ? "Invest in the mutualist future." : "Invest in the mutualist future.",
    subtitle: isEn
      ? "Pre-seed 200-350K EUR, pre-money 1.3-2.15M EUR. 6 UN Global Goals. No return promise."
      : "Pre-seed 200-350K EUR, pre-money 1.3-2.15M EUR. 6 UN Global Goals. Aucune promesse de rendement.",
  });
}
