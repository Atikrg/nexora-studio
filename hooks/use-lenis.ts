"use client";

import { createContext, useContext } from "react";
import type Lenis from "lenis";

export const LenisContext = createContext<Lenis | null>(null);

/** The active Lenis instance, or null when smooth scroll is off (touch, reduced motion, low-end). */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}
