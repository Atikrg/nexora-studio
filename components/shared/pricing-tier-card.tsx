"use client";

import { useRouter } from "next/navigation";
import { Check, Clock, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PricingTier, Service } from "@/types/content";
import { setContactPrefill } from "@/lib/prefill";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Price } from "./price";

/**
 * One pricing package. "Most Popular" gets a soft ignition highlight. The CTA hands the
 * package to the contact form (sessionStorage prefill) and navigates there.
 */
export function PricingTierCard({ tier, service, className }: { tier: PricingTier; service: Pick<Service, "slug" | "name">; className?: string }) {
  const router = useRouter();
  return (
    <article
      className={cn(
        "relative flex h-full flex-col gap-6 rounded-3xl border bg-card p-6 md:p-8",
        tier.popular ? "border-primary/60 shadow-glow" : "border-border",
        className,
      )}
      aria-labelledby={`tier-${service.slug}-${tier.name}`}
    >
      {tier.popular && (
        <Badge variant="signal" className="absolute -top-3 left-6 bg-background">
          Most popular
        </Badge>
      )}
      <div className="flex flex-col gap-2">
        <h3 id={`tier-${service.slug}-${tier.name}`} className="text-h4">
          {tier.name}
        </h3>
        <p className="text-small text-muted-foreground">{tier.description}</p>
      </div>
      <div className="flex flex-col gap-1">
        {tier.from && <span className="text-caption text-muted-foreground">Starting at</span>}
        <p className="flex items-baseline gap-1">
          <Price money={tier.price} className="font-display text-h2" />
          <span className="text-small text-muted-foreground">{tier.billing === "monthly" ? "/month" : "one-time"}</span>
        </p>
        <p className="flex items-center gap-1.5 text-small text-muted-foreground">
          <Clock aria-hidden="true" className="size-3.5" /> {tier.timeline}
        </p>
      </div>
      <ul className="flex flex-col gap-2.5 text-small">
        {tier.features.map((f) => (
          <li key={f} className="flex gap-2.5">
            <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-signal" />
            {f}
          </li>
        ))}
        {tier.notIncluded?.map((f) => (
          <li key={f} className="flex gap-2.5 text-muted-foreground">
            <Minus aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>
              <span className="sr-only">Not included: </span>
              {f}
            </span>
          </li>
        ))}
      </ul>
      <Button
        className="mt-auto w-full"
        variant={tier.popular ? "default" : "outline"}
        onClick={() => {
          setContactPrefill({ service: service.slug, package: tier.name, source: "pricing_card" });
          track("cta_click", { location: "pricing_card", service: service.slug, package: tier.name });
          router.push("/contact/");
        }}
      >
        {tier.ctaLabel ?? `Get a quote for ${tier.name}`}
      </Button>
    </article>
  );
}
