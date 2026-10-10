"use client";

import { useDeviceTier } from "./use-device-tier";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * Single gate for heavy, decorative motion (smooth scroll, pinning, WebGL, cursor).
 * False when reduced motion is requested or the device looks low-end.
 */
export function useMotionOk(): boolean {
  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  return !reduced && tier === "high";
}
