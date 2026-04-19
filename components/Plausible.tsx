import Script from "next/script";

const DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "onlymore.group";
const SRC = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || "https://plausible.io/js/script.tagged-events.outbound-links.js";

export default function Plausible() {
  if (process.env.NODE_ENV !== "production") return null;
  return (
    <Script
      strategy="afterInteractive"
      defer
      data-domain={DOMAIN}
      src={SRC}
    />
  );
}
