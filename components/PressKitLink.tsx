"use client";

import { trackEvent, PlausibleEvents } from "@/lib/analytics";

type Props = {
  href: string;
  label: string;
};

export default function PressKitLink({ href, label }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent(PlausibleEvents.PressKitDownloaded, { href })}
      className="inline-block px-6 py-3 border border-white/20 text-warm-white font-body hover:border-gold hover:text-gold transition-colors"
    >
      {label}
    </a>
  );
}
