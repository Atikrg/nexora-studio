import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { FadeIn } from "@/components/motion/fade-in";
import { Icon } from "@/components/shared/icon";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { whyUs } from "@/data/home";
import { ComparisonTable } from "./comparison-table";

/** 06 · Why founders choose us: turns "new and small" into the advantage, ending in the comparison table. */
export function WhyUs({ number = 4 }: { number?: number }) {
  return (
    <Section aria-labelledby="why-title">
      <SectionHeading
        number={number}
        eyebrow={whyUs.eyebrow}
        id="why-title"
        title={whyUs.title}
        subtitle={whyUs.subtitle}
      />
      <Stagger
        as="ul"
        className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
      >
        {whyUs.items.map((item) => (
          <StaggerItem
            as="li"
            key={item.title}
            className="flex flex-col gap-5 bg-background p-6 md:p-8"
          >
            <Icon name={item.icon} className="size-7 text-signal" />
            <h3 className="text-h4">{item.title}</h3>
            <p className="text-small text-muted-foreground">{item.body}</p>
          </StaggerItem>
        ))}
      </Stagger>
      <FadeIn className="mt-16 md:mt-24">
        <h3 className="mb-6 text-h3">How we compare</h3>
        <ComparisonTable />
      </FadeIn>
    </Section>
  );
}
