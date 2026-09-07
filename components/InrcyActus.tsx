"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/TranslationContext";

/**
 * Widget Actualites iNrCy.
 *
 * L'URL du widget (token signe pour le domaine onlymore.group) est fournie
 * par NEXT_PUBLIC_INRCY_ACTUS_URL. Sans cette variable le composant ne rend
 * rien : la home reste intacte tant que le token n'est pas configure.
 *
 * Communication avec l'iframe : handshake postMessage. Le parent annonce son
 * origine des le chargement (puis retente jusqu'a reception d'un message du
 * widget), le widget repond avec sa hauteur de contenu. L'iframe est en
 * scrolling="no" : c'est la hauteur remontee par le handshake qui suit le
 * contenu, y compris au passage large -> mobile.
 */

const DEFAULT_HEIGHT = 560;
const MIN_HEIGHT = 280;
const MAX_HEIGHT = 4000;
const HANDSHAKE_RETRY_MS = 600;
const HANDSHAKE_MAX_TRIES = 12;

const WIDGET_URL = process.env.NEXT_PUBLIC_INRCY_ACTUS_URL || "";

/**
 * Garde volontairement tolerante : on rejette uniquement les messages dont la
 * source est explicitement etrangere a iNrCy. Un widget qui n'annonce pas de
 * `source` reste accepte, sinon le handshake casse et la hauteur reste figee.
 */
function isInrcyMessage(data: unknown): data is Record<string, unknown> {
  if (!data || typeof data !== "object") return false;
  const source = (data as { source?: unknown }).source;
  if (typeof source === "string" && source.length > 0) {
    return source.toLowerCase().includes("inrcy");
  }
  return true;
}

/** La hauteur peut arriver a plat, sous `payload` ou sous `data`. */
function readHeight(data: Record<string, unknown>): number | null {
  const candidates: unknown[] = [
    data.height,
    data.contentHeight,
    data.scrollHeight,
    (data.payload as Record<string, unknown> | undefined)?.height,
    (data.data as Record<string, unknown> | undefined)?.height,
  ];

  for (const candidate of candidates) {
    const value =
      typeof candidate === "string" ? Number.parseFloat(candidate) : candidate;
    if (typeof value === "number" && Number.isFinite(value) && value > 0) {
      return Math.min(Math.max(Math.round(value), MIN_HEIGHT), MAX_HEIGHT);
    }
  }

  return null;
}

export default function InrcyActus() {
  const { t, locale } = useTranslation();
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [connected, setConnected] = useState(false);

  const src = useMemo(() => {
    if (!WIDGET_URL) return "";
    try {
      const url = new URL(WIDGET_URL);
      // Laisse iNrCy localiser le carrousel s'il le supporte ; ignore sinon.
      if (!url.searchParams.has("lang")) url.searchParams.set("lang", locale);
      return url.toString();
    } catch {
      return WIDGET_URL;
    }
  }, [locale]);

  const origin = useMemo(() => {
    if (!WIDGET_URL) return "";
    try {
      return new URL(WIDGET_URL).origin;
    } catch {
      return "";
    }
  }, []);

  const postToWidget = useCallback(
    (message: Record<string, unknown>) => {
      const frame = frameRef.current;
      if (!frame?.contentWindow || !origin) return;
      frame.contentWindow.postMessage(
        { source: "onlymore-group", ...message },
        origin
      );
    },
    [origin]
  );

  // Reception : hauteur + accuse de handshake.
  useEffect(() => {
    if (!origin) return;

    function onMessage(event: MessageEvent) {
      if (event.origin !== origin) return;
      if (!isInrcyMessage(event.data)) return;

      setConnected(true);

      const next = readHeight(event.data as Record<string, unknown>);
      if (next !== null) setHeight(next);
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [origin]);

  // Emission : handshake repete tant que le widget n'a pas repondu.
  useEffect(() => {
    if (!origin || connected) return;

    let tries = 0;
    const send = () => {
      postToWidget({ type: "inrcy:handshake", origin: window.location.origin });
      tries += 1;
      if (tries >= HANDSHAKE_MAX_TRIES) window.clearInterval(timer);
    };

    send();
    const timer = window.setInterval(send, HANDSHAKE_RETRY_MS);
    return () => window.clearInterval(timer);
  }, [origin, connected, postToWidget]);

  // Redimensionnement de la fenetre : on redemande une mesure au widget.
  useEffect(() => {
    if (!origin) return;

    let frame = 0;
    const onResize = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() =>
        postToWidget({ type: "inrcy:measure", width: window.innerWidth })
      );
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [origin, postToWidget]);

  if (!src) return null;

  return (
    <section id="actus" className="py-24 lg:py-32 bg-deep-black">
      <div className="max-w-container mx-auto px-6 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl text-gold mb-4 text-center"
        >
          {t("actus.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-body text-base lg:text-lg text-warm-white/80 max-w-2xl mx-auto mb-12 leading-relaxed text-center"
        >
          {t("actus.description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-lg overflow-hidden border border-white/10 bg-white/[0.02]"
        >
          <iframe
            ref={frameRef}
            src={src}
            title={t("actus.title")}
            width="100%"
            height={height}
            loading="lazy"
            scrolling="no"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() =>
              postToWidget({
                type: "inrcy:handshake",
                origin: window.location.origin,
              })
            }
            className="block w-full border-0 transition-[height] duration-300"
            style={{ height }}
          />
        </motion.div>
      </div>
    </section>
  );
}
