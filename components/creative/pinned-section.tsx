"use client";

import { useRef, type ReactNode } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useMotionOk } from "@/hooks/use-motion-ok";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

type PinnedSectionProps = {
  children: ReactNode;
  /** Scroll distance while pinned, as a multiple of viewport height. */
  length?: number;
  /** Called with 0–1 progress while pinned (e.g. to drive the active step). */
  onProgress?: (progress: number) => void;
  className?: string;
  /** Pin only from this media query up (default: lg, 1024px). */
  minWidthQuery?: string;
};

/**
 * Pins its content for `length` viewports and exposes progress as the CSS variable
 * --pin-progress (0–1) plus an optional callback. Desktop + motion allowed only;
 * otherwise it's a normal block and content reads top-to-bottom.
 */
export function PinnedSection({
  children,
  length = 2,
  onProgress,
  className,
  minWidthQuery = "(min-width: 1024px)",
}: PinnedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const motionOk = useMotionOk();
  const isDesktop = useMediaQuery(minWidthQuery);
  const enabled = motionOk && isDesktop;

  useGSAP(
    () => {
      const el = ref.current;
      if (!enabled || !el) return;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${window.innerHeight * length}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          el.style.setProperty("--pin-progress", self.progress.toFixed(4));
          onProgress?.(self.progress);
        },
      });
      return () => st.kill();
    },
    { scope: ref, dependencies: [enabled, length] },
  );

  return (
    <div ref={ref} data-pinned={enabled || undefined} className={cn("relative", className)}>
      {children}
    </div>
  );
}
