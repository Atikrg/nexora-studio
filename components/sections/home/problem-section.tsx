import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SplitTextReveal } from "@/components/creative/split-text-reveal";
import { Icon } from "@/components/shared/icon";
import { Section } from "@/components/shared/section";
import { problems } from "@/data/home";

/** 03 · Problem: mirror the founder's pain in their words, which earns attention for the offer. */
export function ProblemSection() {
  return (
    <Section id="problems" aria-labelledby="problems-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <p className="mb-5 flex items-center gap-3 eyebrow">
            <span className="text-signal">[01]</span>
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
            {problems.eyebrow}
          </p>
          <SplitTextReveal as="h2" id="problems-title" className="text-h1">
            {problems.title}
          </SplitTextReveal>
        </div>
        <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {problems.items.map((item, i) => (
            <StaggerItem
              as="li"
              key={item.title}
              className="group corner-marks flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 transition-colors duration-(--duration-base) hover:border-primary/40 md:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-muted text-signal">
                  <Icon name={item.icon} className="size-5" />
                </span>
                <span className="font-mono text-caption text-muted-foreground">0{i + 1}</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-h4">{item.title}</h3>
                <p className="text-muted-foreground">{item.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
      <p className="mt-12 text-body-lg md:mt-16">
        <span className="text-muted-foreground">We built Nexora to fix exactly this.</span>{" "}
        <span className="font-medium">Here&rsquo;s how. ↓</span>
      </p>
    </Section>
  );
}
