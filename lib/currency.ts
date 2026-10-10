"use client";

import { useSyncExternalStore } from "react";
import type { Money } from "@/types/content";
import { readStorage, writeStorage } from "./storage";

export type Currency = "inr" | "usd";

const KEY = "nx-currency";
const listeners = new Set<() => void>();
let current: Currency | null = null;

function get(): Currency {
  if (current) return current;
  const stored = readStorage(KEY);
  current = stored === "usd" ? "usd" : "inr";
  return current;
}

export function setCurrency(next: Currency) {
  current = next;
  writeStorage(KEY, next);
  listeners.forEach((l) => l());
}

/** Shared ₹/$ preference across every price on the site (remembered per visitor). INR on the server. */
export function useCurrency(): Currency {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    get,
    () => "inr",
  );
}

const inrFormat = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});
const usdFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatMoney(money: Money, currency: Currency): string {
  return currency === "usd" ? usdFormat.format(money.usd) : inrFormat.format(money.inr);
}

export function formatInr(value: number): string {
  return inrFormat.format(value);
}
