"use client";

import type { Money } from "@/types/content";
import { formatMoney, useCurrency } from "@/lib/currency";

/** Formats a price in the visitor's chosen currency (₹ by default, $ via the CurrencyToggle). */
export function Price({ money, className }: { money: Money; className?: string }) {
  const currency = useCurrency();
  return (
    <span className={className} suppressHydrationWarning>
      {formatMoney(money, currency)}
    </span>
  );
}
