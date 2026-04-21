"use client";

import { useState } from "react";
import { trackEvent, PlausibleEvents } from "@/lib/analytics";

type Props = {
  url: string;
  label: string;
  openLabel?: string;
};

export default function CalendlyEmbed({ url, label, openLabel }: Props) {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <button
        onClick={() => {
          trackEvent(PlausibleEvents.CalendlyOpened, { url });
          setLoaded(true);
        }}
        className="inline-block px-6 py-3 bg-gold text-deep-black font-body font-medium hover:bg-gold/90 transition-colors"
      >
        {label}
      </button>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border border-white/10 bg-white/[0.02]">
      <div className="p-3 flex items-center justify-between border-b border-white/10">
        <span className="font-mono text-xs uppercase tracking-widest text-warm-white/60">
          {openLabel || "Calendly"}
        </span>
        <button
          onClick={() => setLoaded(false)}
          aria-label="Close"
          className="text-warm-white/40 hover:text-warm-white text-sm"
        >
          &times;
        </button>
      </div>
      <iframe
        src={url}
        title="Calendly booking"
        width="100%"
        height="720"
        loading="lazy"
        allow="fullscreen"
        className="block bg-white"
      />
    </div>
  );
}
