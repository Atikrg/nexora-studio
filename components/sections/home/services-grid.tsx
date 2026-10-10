import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Icon } from "@/components/shared/icon";
import { Price } from "@/components/shared/price";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { services } from "@/data/services";

/**
 * 04 · Services: four outcome-led cards. Hover: accent line draws in, card lifts,
 * icon tile fills, arrow slides. The whole card is one link.
 */
export function ServicesGrid({ number = 2 }: { number?: number }) {
  return (
    <Section aria-labelledby="services-title" tone="muted">
      <SectionHeading
        number={number}
        eyebrow="What we do"
        id="services-title"
        title={
          <>
            Four ways we help you <em>launch</em> faster.
          </>
        }
        subtitle="Pick one, or combine them. Everything is built to get you users, revenue or funding."
      />
      <Stagger as="ul" className="grid gap-4 md:grid-cols-2">
        {services.map((service, i) => {
          const from = service.pricing[0]!;
          return (
            <StaggerItem as="li" key={service.slug}>
              <Link
                href={`/services/${service.slug}/`}
                data-cursor="Explore"
                className="group/card relative flex h-full flex-col gap-10 overflow-hidden rounded-2xl border border-border bg-card p-6 transition-[transform,box-shadow,border-color] duration-(--duration-base) ease-out-expo hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift md:p-10"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-(--duration-slow) ease-out-expo group-hover/card:scale-x-100 group-focus-visible/card:scale-x-100"
                />
                <div className="flex items-start justify-between">
                  <span className="flex size-14 items-center justify-center rounded-2xl border border-border bg-background text-signal transition-colors duration-(--duration-base) group-hover/card:bg-primary group-hover/card:text-primary-foreground">
                    <Icon
                      name={service.icon}
                      className="size-6 transition-transform duration-(--duration-slow) ease-out-expo group-hover/card:scale-110"
                    />
                  </span>
                  <span className="font-mono text-caption text-muted-foreground">
                    0{i + 1} / 04
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="eyebrow">{service.name}</p>
                  <h3 className="text-h3">{service.cardTitle}</h3>
                  <p className="text-muted-foreground">{service.summary}</p>
                </div>
                <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-6">
                  <dl className="flex flex-wrap gap-x-6 gap-y-1 text-small">
                    <div className="flex gap-1.5">
                      <dt className="text-muted-foreground">From</dt>
                      <dd className="font-semibold">
                        <Price money={from.price} />
                        {from.billing === "monthly" && (
                          <span className="font-normal text-muted-foreground">/mo</span>
                        )}
                      </dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <dt>
                        <Clock aria-hidden="true" className="size-3.5 text-muted-foreground" />
                        <span className="sr-only">Timeline</span>
                      </dt>
                      <dd>{service.timeline}</dd>
                    </div>
                  </dl>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border transition-[background-color,border-color,transform] duration-(--duration-base) group-hover/card:rotate-45 group-hover/card:border-primary group-hover/card:bg-primary group-hover/card:text-primary-foreground">
                    <ArrowUpRight aria-hidden="true" className="size-5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
