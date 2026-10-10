"use client";

import { useMediaQuery } from "./use-media-query";

/** True on devices whose primary pointer is coarse (touch). No custom cursor, lighter effects. */
export function useIsTouch(): boolean {
  return useMediaQuery("(hover: none), (pointer: coarse)", true);
}
