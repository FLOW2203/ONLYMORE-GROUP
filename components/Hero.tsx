"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/TranslationContext";
import LogoInfinity from "./LogoInfinity";

const FRAME_COUNT = 192;
const SCROLL_HEIGHT_VH = 600;

function getFrameSrc(index: number): string {
  return `/frames/frame_${String(index + 1).padStart(3, "0")}.jpg`;
}

export default function Hero() {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = framesRef.current[index];
    if (!img || !img.complete || !img.naturalWidth) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Cover-fit the frame into the canvas
    const scale = Math.max(
      canvas.width / img.naturalWidth,
      canvas.height / img.naturalHeight
    );
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = (canvas.width - w) / 2;
    const y = (canvas.height - h) / 2;

    ctx.drawImage(img, x, y, w, h);
  }, []);

  useEffect(() => {
    // Preload all frames
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      if (i === 0) {
        img.onload = () => drawFrame(0);
      }
      images.push(img);
    }
    framesRef.current = images;

    // Scroll handler using rAF
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) {
          ticking = false;
          return;
        }
        const rect = container.getBoundingClientRect();

        // Hide canvas + overlay when scrolled past hero zone
        const isInHero = rect.top < window.innerHeight && rect.bottom > 0;
        const canvas = canvasRef.current;
        const overlay = overlayRef.current;
        if (canvas) canvas.style.display = isInHero ? "block" : "none";
        if (overlay) overlay.style.display = isInHero ? "block" : "none";

        const scrollableHeight = container.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(scrolled / scrollableHeight, 1));
        const frameIndex = Math.min(
          Math.floor(progress * (FRAME_COUNT - 1)),
          FRAME_COUNT - 1
        );

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Handle resize
    const onResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);

  return (
    <div ref={containerRef} id="hero" style={{ height: `${SCROLL_HEIGHT_VH}vh` }}>
      {/* Fixed canvas background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-screen pointer-events-none"
        style={{ zIndex: 0, opacity: 0.6 }}
      />

      {/* Dark overlay for readability */}
      <div ref={overlayRef} className="fixed top-0 left-0 w-full h-screen bg-black/60 pointer-events-none" style={{ zIndex: 1 }} />

      {/* Sticky hero content */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 lg:px-16" style={{ zIndex: 10 }}>
        <div className="max-w-container mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8"
          >
            <LogoInfinity size={100} className="mx-auto" />
          </motion.div>

          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center mb-8"
          >
            <span className="px-4 py-1.5 border border-gold/40 rounded-full text-gold text-sm font-body tracking-wider animate-pulse">
              {t("hero.badge")}
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-warm-white leading-tight mb-6"
          >
            {t("hero.title")}
          </motion.h1>

          {/* WHY statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-body text-lg sm:text-xl md:text-2xl text-warm-white/90 font-light tracking-wide max-w-3xl mx-auto mb-4"
          >
            {t("hero.why")}
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="font-body text-sm sm:text-base text-warm-white/50 max-w-2xl mx-auto mb-10"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#philosophy"
              className="px-8 py-3.5 bg-gold text-deep-black font-body font-semibold rounded-lg hover:bg-gold-light transition-colors duration-300 text-sm sm:text-base"
            >
              {t("hero.cta_primary")}
            </a>
            <a
              href="#investors"
              className="px-8 py-3.5 border border-warm-white/30 text-warm-white font-body rounded-lg hover:border-warm-white/60 transition-colors duration-300 text-sm sm:text-base"
            >
              {t("hero.cta_secondary")}
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <svg className="w-5 h-5 text-warm-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
