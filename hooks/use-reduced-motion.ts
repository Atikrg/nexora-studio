"use client";

import { useMediaQuery } from "./use-media-query";

/**
 * True when the visitor asked for reduced motion.
 * Defaults to `true` on the server so no motion-only markup ships in static HTML.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)", true);
}
