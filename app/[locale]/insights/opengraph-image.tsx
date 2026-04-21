import { renderSectionOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import type { Locale } from "@/lib/i18n";

export const runtime = "edge";
export const alt = "ONLYMORE Group, insights, long-form";
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
    eyebrow: isEn ? "Long-form" : "Long format",
    title: isEn
      ? "The ONLYMORE thesis, written at length."
      : "La these ONLYMORE, ecrite en long.",
    subtitle: isEn
      ? "Three founding articles: the logo decoded, the digital caffe sospeso, the Berkshire Hathaway of sports."
      : "Trois articles fondateurs : le logo decode, le cafe sospeso digitalise, le Berkshire Hathaway du sport.",
  });
}
