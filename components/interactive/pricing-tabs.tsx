"use client";

import { useEffect, useId, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrencyToggle } from "@/components/shared/currency-toggle";
import { Icon } from "@/components/shared/icon";
import { PricingTierCard } from "@/components/shared/pricing-tier-card";
import { carePlans } from "@/data/pricing";
import { services } from "@/data/services";
import type { ServiceSlug } from "@/types/content";

/**
 * Pricing per service (Tabs), with a one-time ↔ monthly Switch and the ₹/$ toggle.
 * Deep links like /pricing/#automation open the matching tab.
 */
export function PricingTabs() {
  const id = useId();
  const [tab, setTab] = useState<ServiceSlug>(services[0]!.slug);
  const [monthly, setMonthly] = useState(false);

  useEffect(() => {
    const fromHash = () => {
      const hash = window.location.hash.slice(1) as ServiceSlug;
      if (services.some((s) => s.slug === hash)) setTab(hash);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  return (
    <Tabs value={tab} onValueChange={(v) => setTab(v as ServiceSlug)} className="gap-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-2xl bg-muted p-1 lg:w-fit">
          {services.map((s) => (
            <TabsTrigger
              key={s.slug}
              value={s.slug}
              className="min-h-11 gap-2 rounded-xl px-4 data-[state=active]:bg-background data-[state=active]:shadow-soft"
            >
              <Icon name={s.icon} className="size-4" />
              {s.shortName}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <label htmlFor={`${id}-billing`} className="text-small">
              One-time
            </label>
            <Switch id={`${id}-billing`} checked={monthly} onCheckedChange={setMonthly} aria-label="Show monthly plans" />
            <span className="text-small">Monthly</span>
          </div>
          <CurrencyToggle />
        </div>
      </div>

      {services.map((s) => {
        const own = s.pricing.filter((t) => t.billing === (monthly ? "monthly" : "one-time"));
        const tiers = own.length > 0 ? own : monthly ? (carePlans[s.slug] ?? []) : s.pricing;
        return (
          <TabsContent key={s.slug} value={s.slug} id={s.slug} className="scroll-mt-32">
            <p className="mb-8 max-w-2xl text-muted-foreground">
              {monthly ? `Ongoing ${s.shortName.toLowerCase()} plans. Cancel with 30 days' notice.` : s.summary}
            </p>
            <div className={`grid gap-6 pt-3 ${tiers.length >= 3 ? "lg:grid-cols-3" : "md:grid-cols-2 lg:max-w-4xl"}`}>
              {tiers.map((tier) => (
                <PricingTierCard key={tier.name} tier={tier} service={{ slug: s.slug, name: s.name }} />
              ))}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
