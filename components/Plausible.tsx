import Script from "next/script";

const DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "onlymore.group";
// Default script ships tagged-events (for data-plausible tags), outbound-links
// and manual (for trackEvent from lib/analytics.ts) extensions.
const SRC =
  process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ||
  "https://plausible.io/js/script.tagged-events.outbound-links.manual.js";

const INIT_SNIPPET = `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`;

export default function Plausible() {
  if (process.env.NODE_ENV !== "production") return null;
  return (
    <>
      <Script
        id="plausible-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: INIT_SNIPPET }}
      />
      <Script
        id="plausible"
        strategy="afterInteractive"
        defer
        data-domain={DOMAIN}
        src={SRC}
      />
    </>
  );
}
