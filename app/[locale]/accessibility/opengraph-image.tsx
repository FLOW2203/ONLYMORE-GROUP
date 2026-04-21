import { renderSectionOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import type { Locale } from "@/lib/i18n";

export const runtime = "edge";
export const alt = "ONLYMORE Group, accessibility statement";
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
    eyebrow: isEn ? "Accessibility" : "Accessibilite",
    title: isEn
      ? "Accessibility statement"
      : "Declaration d'accessibilite",
    subtitle: isEn
      ? "WCAG 2.1 AA commitment, coherent with SDG 10. Contact accessibility@onlymore.group."
      : "Engagement WCAG 2.1 AA, coherence SDG 10. Contact accessibility@onlymore.group.",
  });
}
