"use client";

import { useRef, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { marquee as marqueeTokens } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type ScrollMarqueeProps = {
  children: ReactNode;
  /** Accessible name for the region, e.g. "Technologies we use". */
  label: string;
  /** -1 scrolls right-to-left (default), 1 left-to-right. */
  direction?: -1 | 1;
  /** Pixels per second at rest. */
  speed?: number;
  className?: string;
};

/**
 * Infinite marquee that speeds up with scroll velocity and flips with scroll direction.
 * The content is rendered twice; the copy is aria-hidden. A visible pause button
 * (WCAG 2.2.2) stops it, as do hover and focus. Reduced motion: a static row.
 */
export function ScrollMarquee({
  children,
  label,
  direction = -1,
  speed = marqueeTokens.speed,
  className,
}: ScrollMarqueeProps) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const hoverRef = useRef(false);

  useGSAP(
    () => {
      if (reduced || !track.current) return;
      const el = track.current;
      let x = 0;
      let dir: number = direction;
      let boost = 1;
      const half = () => el.scrollWidth / 2;

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          boost = Math.min(1 + Math.abs(v) * marqueeTokens.velocityFactor, marqueeTokens.maxBoost);
          if (v !== 0) dir = (v > 0 ? 1 : -1) * direction;
        },
      });

      const tick = (_: number, deltaMs: number) => {
        if (pausedRef.current || hoverRef.current) return;
        boost += (1 - boost) * 0.05;
        x += (dir * speed * boost * deltaMs) / 1000;
        const w = half();
        if (w > 0) x = gsap.utils.wrap(-w, 0, x);
        gsap.set(el, { x });
      };
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        st.kill();
      };
    },
    { scope: root, dependencies: [reduced, direction, speed] },
  );

  return (
    <div
      ref={root}
      role="region"
      aria-label={label}
      className={cn("group/marquee relative overflow-hidden", className)}
      onPointerEnter={() => (hoverRef.current = true)}
      onPointerLeave={() => (hoverRef.current = false)}
      onFocus={() => (hoverRef.current = true)}
      onBlur={() => (hoverRef.current = false)}
    >
      <div
        ref={track}
        className={cn(
          "flex w-max will-change-transform",
          reduced && "w-full flex-wrap justify-center",
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        {!reduced && (
          <div className="flex shrink-0 items-center" aria-hidden="true" inert>
            {children}
          </div>
        )}
      </div>
      {!reduced && (
        <button
          type="button"
          onClick={() => {
            pausedRef.current = !paused;
            setPaused(!paused);
          }}
          aria-pressed={paused}
          className="absolute right-2 bottom-2 inline-flex tap-target items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground opacity-60 backdrop-blur transition-opacity hover:opacity-100 focus-visible:opacity-100"
        >
          {paused ? (
            <Play className="size-4" aria-hidden="true" />
          ) : (
            <Pause className="size-4" aria-hidden="true" />
          )}
          <span className="sr-only">
            {paused ? `Play ${label} animation` : `Pause ${label} animation`}
          </span>
        </button>
      )}
    </div>
  );
}
