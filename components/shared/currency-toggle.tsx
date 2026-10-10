"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { setCurrency, useCurrency, type Currency } from "@/lib/currency";
import { cn } from "@/lib/utils";

/** ₹ / $ switch (shadcn ToggleGroup, single select). Shared across all prices. */
export function CurrencyToggle({ className }: { className?: string }) {
  const currency = useCurrency();
  return (
    <ToggleGroup
      type="single"
      value={currency}
      onValueChange={(v) => v && setCurrency(v as Currency)}
      aria-label="Currency"
      variant="outline"
      className={cn("rounded-full", className)}
    >
      <ToggleGroupItem
        value="inr"
        aria-label="Indian rupees"
        className="min-w-14 rounded-l-full font-mono data-[state=on]:bg-foreground data-[state=on]:text-background"
      >
        ₹ INR
      </ToggleGroupItem>
      <ToggleGroupItem
        value="usd"
        aria-label="US dollars"
        className="min-w-14 rounded-r-full font-mono data-[state=on]:bg-foreground data-[state=on]:text-background"
      >
        $ USD
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
