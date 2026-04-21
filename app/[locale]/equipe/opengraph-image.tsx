import { renderSectionOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import type { Locale } from "@/lib/i18n";

export const runtime = "edge";
export const alt = "ONLYMORE Group, The NEW TEAM";
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
    eyebrow: isEn ? "The NEW TEAM" : "The NEW TEAM",
    title: isEn
      ? "Humans and agents. One autonomous infrastructure."
      : "Humains et agents. Une infrastructure autonome.",
    subtitle: isEn
      ? "Three humans, nine AI agents, zero salary, zero debt, antifragile."
      : "Trois humains, neuf agents IA, zero salarie, zero dette, antifragile.",
  });
}
