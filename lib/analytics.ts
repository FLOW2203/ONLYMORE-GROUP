/**
 * Plausible custom events helper.
 *
 * Uses the global `plausible()` function injected by the tagged-events
 * Plausible script (wired in components/Plausible.tsx). No-ops if the
 * script has not loaded yet (dev, SSR, ad-blocker) so it is safe to
 * call from any client handler.
 */

type PlausibleOptions = {
  props?: Record<string, string | number | boolean>;
  callback?: () => void;
};

type PlausibleFn = (event: string, options?: PlausibleOptions) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

export const PlausibleEvents = {
  CalendlyOpened: "Calendly_opened",
  PressKitDownloaded: "Press_kit_downloaded",
  ContactInvestorSent: "Contact_investor_sent",
  NewsletterSubscribed: "Newsletter_subscribed",
  ManifestoSigned: "Manifesto_signed",
  LabelCityClicked: "Label_city_clicked",
  ContestCtaClicked: "Contest_cta_clicked",
  InsightArticleOpened: "Insight_article_opened",
} as const;

export type PlausibleEventName = typeof PlausibleEvents[keyof typeof PlausibleEvents];

export function trackEvent(
  event: PlausibleEventName,
  props?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined") return;
  if (typeof window.plausible !== "function") return;
  try {
    window.plausible(event, props ? { props } : undefined);
  } catch {
    // Swallow analytics errors silently. Never let analytics break UX.
  }
}
