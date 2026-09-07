"use client";

import { useEffect, useRef } from "react";

const INRCY_ORIGIN = "https://app.inrcy.com";
const EMBED_URL = "https://app.inrcy.com/embed/actus?frameId=inrcy-actus-onlymore-group-carousel&domain=onlymore.group&source=site_web&layout=carousel&limit=10&design=futuristic&theme=white&title=Actualit%C3%A9s&token=eyJ2IjoxLCJkb21haW4iOiJvbmx5bW9yZS5ncm91cCIsInNvdXJjZSI6InNpdGVfd2ViIiwiaWF0IjoxNzg4Nzc3Mzg3LCJleHAiOjE4MjAzMTMzODd9.fWj2F8HuD1BS2v27GKgOcyu6XHVJqOk9TprNzclwlcE";
const FRAME_ID = "inrcy-actus-onlymore-group-carousel";
const INITIAL_HEIGHT = 560;

export default function InrcyActus() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let lastHeight = INITIAL_HEIGHT;
    let ready = false;

    const applyHeight = (value: unknown) => {
      const height = Number.parseInt(String(value), 10);
      if (!Number.isFinite(height) || height < 140) return;
      if (Math.abs(height - lastHeight) < 2) return;
      lastHeight = height;
      iframe.style.height = height + "px";
      iframe.height = String(height);
    };

    const send = (type: "inrcy:embed-init" | "inrcy:embed-ping") => {
      iframe.contentWindow?.postMessage(
        { source: "inrcy-host", type, frameId: FRAME_ID },
        INRCY_ORIGIN,
      );
    };

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== INRCY_ORIGIN || event.source !== iframe.contentWindow) return;
      const data = event.data as {
        source?: string;
        type?: string;
        frameId?: string;
        height?: unknown;
      } | null;
      if (!data || data.frameId !== FRAME_ID) return;
      if (data.source && data.source !== "inrcy-embed") return;
      if (data.type === "inrcy:embed-ready") {
        ready = true;
        applyHeight(data.height);
        send("inrcy:embed-init");
        return;
      }
      if (data.type === "inrcy:embed-resize") applyHeight(data.height);
    };

    const onLoad = () => send("inrcy:embed-init");
    window.addEventListener("message", onMessage);
    iframe.addEventListener("load", onLoad);

    const timerIds = [
      window.setTimeout(() => send("inrcy:embed-ping"), 120),
      window.setTimeout(() => { if (!ready) send("inrcy:embed-ping"); }, 500),
      window.setTimeout(() => { if (!ready) send("inrcy:embed-ping"); }, 1200),
      window.setTimeout(() => { if (!ready) send("inrcy:embed-ping"); }, 2600),
    ];

    return () => {
      window.removeEventListener("message", onMessage);
      iframe.removeEventListener("load", onLoad);
      timerIds.forEach((timerId) => window.clearTimeout(timerId));
    };
  }, []);

  return (
    <section id="actualites" style={{ width: "100%" }}>
      <iframe
        ref={iframeRef}
        id={FRAME_ID}
        src={EMBED_URL}
        width="100%"
        height={INITIAL_HEIGHT}
        style={{
          border: 0,
          width: "100%",
          maxWidth: "100%",
          minHeight: 140,
          overflow: "hidden",
          borderRadius: 24,
          background: "transparent",
          display: "block",
        }}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        scrolling="no"
        title="Actualités iNrCy"
      />
    </section>
  );
}
