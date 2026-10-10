"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { distance, transition, viewport } from "@/lib/motion";

type FadeInProps = HTMLMotionProps<"div"> & {
  /** Delay in seconds. */
  delay?: number;
  /** Vertical travel in px (0 for a pure fade). */
  y?: number;
  as?: "div" | "section" | "li" | "article" | "header" | "footer" | "span" | "p";
};

/**
 * Fades + lifts content in when it scrolls into view (once).
 * Reduced motion: MotionConfig (reducedMotion="user") strips the transform, leaving a fade.
 * No JS: a <noscript> rule in the root layout forces [data-fade] visible.
 */
export function FadeIn({
  delay = 0,
  y = distance.md,
  as = "div",
  children,
  ...props
}: FadeInProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      data-fade=""
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ ...transition.slow, delay }}
      {...props}
    >
      {children}
    </Component>
  );
}
