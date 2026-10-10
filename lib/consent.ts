"use client";

import { useSyncExternalStore } from "react";
import { readStorage, writeStorage } from "./storage";

/** Cookie/analytics consent, remembered per visitor in localStorage. */
export type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  /** ISO date the visitor decided. */
  decidedAt: string;
};

const KEY = "nx-consent-v1";
const listeners = new Set<() => void>();
let cached: Consent | null | undefined;

function read(): Consent | null {
  if (cached !== undefined) return cached;
  const raw = readStorage(KEY);
  try {
    cached = raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    cached = null;
  }
  return cached;
}

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  return read();
}

export function setConsent(choice: { analytics: boolean; marketing: boolean }): void {
  const value: Consent = { necessary: true, ...choice, decidedAt: new Date().toISOString() };
  cached = value;
  writeStorage(KEY, JSON.stringify(value));
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Current consent. `undefined` during SSR / before hydration, `null` when the visitor
 * hasn't decided yet, otherwise their choice.
 */
export function useConsent(): Consent | null | undefined {
  return useSyncExternalStore(subscribe, getConsent, () => undefined);
}
