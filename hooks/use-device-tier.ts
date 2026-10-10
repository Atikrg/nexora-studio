"use client";

import { useSyncExternalStore } from "react";

export type DeviceTier = "low" | "high";

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

function detectTier(): DeviceTier {
  const nav = navigator as NavigatorWithHints;
  const memory = nav.deviceMemory ?? 8;
  const cores = nav.hardwareConcurrency ?? 8;
  const saveData = nav.connection?.saveData === true;
  const slowNetwork = /(^|-)2g$|^3g$/.test(nav.connection?.effectiveType ?? "");
  if (saveData || slowNetwork || memory < 4 || cores < 4) return "low";
  return "high";
}

const noopSubscribe = () => () => {};

/**
 * Rough capability tier used to gate WebGL, pinning and heavy effects.
 * "low" on the server, so heavy layers only switch on after hydration.
 */
export function useDeviceTier(): DeviceTier {
  return useSyncExternalStore(noopSubscribe, detectTier, () => "low");
}
