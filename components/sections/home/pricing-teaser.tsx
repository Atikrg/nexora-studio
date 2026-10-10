import { Check } from "lucide-react";
import { AnimatedButton } from "@/components/motion/animated-button";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { CurrencyToggle } from "@/components/shared/currency-toggle";
import { Icon } from "@/components/shared/icon";
import { Price } from "@/components/shared/price";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { engagementModels, pricingPromises } from "@/data/pricing";
import { services } from "@/data/services";

/** 12 · Pricing teaser + engagement models: transparent "from" prices once trust is built. */
export function PricingTeaser({ number = 8 }: { number?: number }) {
  return (
    <Section aria-labelledby="pricing-title" tone="muted">
      <SectionHeading
        number={number}
        eyebrow="Transparent pricing"
        id="pricing-title"
        title={
          <>
            Clear prices. <em>No surprises.</em>
          </>
        }
        subtitle="Starting prices for every service. You get a fixed quote in writing after a 15-minute call."
        action={<CurrencyToggle />}
      />

      <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => {
          const tier = s.pricing.find((t) => t.popular) ?? s.pricing[0]!;
          const from = s.pricing[0]!;
          return (
            <StaggerItem
              as="li"
              key={s.slug}
              className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-center gap-3">
                <Icon name={s.icon} className="size-5 text-signal" />
                <h3 className="font-display text-body font-semibold">{s.name}</h3>
              </div>
              <p>
                <span className="block text-caption text-muted-foreground">Starting at</span>
                <Price money={from.price} className="font-display text-h2" />
                {from.billing === "monthly" && (
                  <span className="text-muted-foreground"> /month</span>
                )}
              </p>
              <p className="text-small text-muted-foreground">
                Most popular: <span className="text-foreground">{tier.name}</span> · {tier.timeline}
              </p>
              <AnimatedButton
                href={`/pricing/#${s.slug}`}
                variant="outline"
                size="sm"
                className="mt-auto"
              >
                See packages
              </AnimatedButton>
            </StaggerItem>
          );
        })}
      </Stagger>

      <div className="mt-16 grid gap-4 lg:grid-cols-3">
        {engagementModels.map((m) => (
          <div key={m.name} className="flex flex-col gap-4 rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between">
              <Icon name={m.icon} className="size-6 text-signal" />
              <span className="eyebrow">{m.bestFor}</span>
            </div>
            <h3 className="text-h4">{m.name}</h3>
            <p className="text-small text-muted-foreground">{m.description}</p>
            <p className="mt-auto text-small">
              <Price money={m.price} className="font-semibold" />{" "}
              <span className="text-muted-foreground">{m.unit}</span>
            </p>
          </div>
        ))}
      </div>

      <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3" aria-label="Included with every project">
        {pricingPromises.map((p) => (
          <li key={p} className="flex items-center gap-2 text-small">
            <Check aria-hidden="true" className="size-4 text-signal" /> {p}
          </li>
        ))}
      </ul>
    </Section>
  );
}
