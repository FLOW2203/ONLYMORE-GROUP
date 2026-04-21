import { renderSectionOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import type { Locale } from "@/lib/i18n";

export const runtime = "edge";
export const alt = "GOAT AME CITY 2026 contest, Detroit Chapter 01";
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
    eyebrow: isEn ? "GOAT AME CITY 2026, Detroit Chapter 01" : "GOAT AME CITY 2026, Detroit Chapter 01",
    title: isEn ? "It's my city, I'm in." : "C'est ma ville je m'engage.",
    subtitle: isEn
      ? "Sign the manifesto, add a point for your city, activate the 5 flows of the ESS industrial cell."
      : "Signez le manifeste, ajoutez un point pour votre ville, activez les 5 flux de la cellule ESS industriel.",
  });
}
