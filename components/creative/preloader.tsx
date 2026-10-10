"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { duration, gsapEase } from "@/lib/motion";
import { PRELOADER_STORAGE_KEY } from "./preloader-key";

/**
 * Branded "systems check" counter, 000 → 100, then the panel lifts away.
 * Shown only on the first visit to "/" (the inline head script decides before paint and
 * sets html[data-preload]); hard cap 1.2s; never shown with reduced motion.
 * The real page renders underneath, so the hero <h1> is in the HTML from the start.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      if (!html.hasAttribute("data-preload")) return;
      const state = { value: 0 };
      const finish = () => {
        html.removeAttribute("data-preload");
        try {
          localStorage.setItem(PRELOADER_STORAGE_KEY, "1");
        } catch {
          /* storage blocked: preloader may show again next visit, which is harmless */
        }
      };
      gsap
        .timeline({ onComplete: finish })
        .to(state, {
          value: 100,
          duration: duration.preloader * 0.7,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counter.current)
              counter.current.textContent = String(Math.round(state.value)).padStart(3, "0");
          },
        })
        .to(bar.current, { scaleX: 1, duration: duration.preloader * 0.7, ease: "power2.inOut" }, 0)
        .to(root.current, {
          yPercent: -100,
          duration: duration.preloader * 0.3,
          ease: gsapEase.inOutQuart,
        });
    },
    { scope: root },
  );

  // Safety: never trap focus/scroll behind the overlay
  useEffect(() => {
    const t = window.setTimeout(
      () => document.documentElement.removeAttribute("data-preload"),
      2500,
    );
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="preloader fixed inset-0 z-90 flex-col justify-between bg-ink p-6 text-bone md:p-10"
    >
      <p className="eyebrow text-bone/60">Nexora Studio — Systems check</p>
      <div>
        <span
          ref={counter}
          className="block font-mono text-display-xl leading-none font-medium tabular-nums"
        >
          000
        </span>
        <div className="mt-6 h-px w-full bg-bone/15">
          <div ref={bar} className="h-full origin-left scale-x-0 bg-ignition" />
        </div>
        <p className="mt-4 flex justify-between eyebrow text-bone/60">
          <span>Pune 18.52°N 73.85°E</span>
          <span>T-minus launch</span>
        </p>
      </div>
    </div>
  );
}
