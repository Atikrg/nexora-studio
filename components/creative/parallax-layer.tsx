"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMotionOk } from "@/hooks/use-motion-ok";
import { useIsTouch } from "@/hooks/use-is-touch";
import { cn } from "@/lib/utils";

type ParallaxLayerProps = {
  children: ReactNode;
  /** Travel as % of the element's height across the viewport. Negative = moves up faster. */
  speed?: number;
  className?: string;
};

/**
 * Scroll-scrubbed vertical drift (transform only). Touch devices get a third of the travel;
 * reduced motion / low-end devices get none.
 */
export function ParallaxLayer({ children, speed = -12, className }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const motionOk = useMotionOk();
  const isTouch = useIsTouch();

  useGSAP(
    () => {
      if (!motionOk || !ref.current) return;
      const travel = isTouch ? speed / 3 : speed;
      gsap.fromTo(
        ref.current,
        { yPercent: -travel / 2 },
        {
          yPercent: travel / 2,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [motionOk, isTouch, speed] },
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
