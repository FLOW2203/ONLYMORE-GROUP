import { renderSectionOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import type { Locale } from "@/lib/i18n";

export const runtime = "edge";
export const alt = "ONLYMORE Group, regulatory anchors";
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
    eyebrow: isEn ? "Regulatory" : "Reglementaire",
    title: isEn
      ? "The legal framework that founds ONLYMORE."
      : "Le cadre reglementaire qui fonde ONLYMORE.",
    subtitle: isEn
      ? "EU Resolution 552/86.4%, UEFA 70% cap, Bundesliga 50+1, ESUS, IOBSP, L.511-7 CMF."
      : "Resolution UE 552/86,4%, UEFA 70%, Bundesliga 50+1, ESUS, IOBSP, L.511-7 CMF.",
  });
}
