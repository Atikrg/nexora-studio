import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { QuizLauncher } from "@/components/interactive/quiz-launcher";
import { PricingTabs } from "@/components/interactive/pricing-tabs";
import { CtaSection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/home/faq-section";
import { Guarantee } from "@/components/sections/home/guarantee";
import { Icon } from "@/components/shared/icon";
import { PageHero } from "@/components/shared/page-hero";
import { Price } from "@/components/shared/price";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { engagementModels, pricingFaqs, pricingNote, pricingPromises } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing: Transparent Rates for Websites, Apps & Automation",
  description:
    "Transparent pricing in ₹ and $: landing pages from ₹35,000, MVP apps from ₹2,50,000, automation from ₹20,000. Fixed quotes, milestone payments, on-time guarantee.",
  alternates: { canonical: "/pricing/" },
  openGraph: { url: "/pricing/" },
};

/** Pricing: clarity first. Minimal motion, no pinning, every number visible. */
export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Honest prices, before you even call."
        highlight="Honest prices"
        subtitle="Starting prices for every package, in rupees or dollars. After a 15-minute call you get a fixed quote in writing, and it doesn't change unless you change the scope."
        breadcrumbs={[{ label: "Pricing", href: "/pricing/" }]}
      >
        <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Included with every project">
          {pricingPromises.map((p) => (
            <li key={p} className="flex items-center gap-2 text-small">
              <Check aria-hidden="true" className="size-4 text-signal" /> {p}
            </li>
          ))}
        </ul>
      </PageHero>

      <Section aria-label="Packages by service" className="pt-0 md:pt-0">
        <PricingTabs />
        <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-border p-6 md:flex-row md:items-center md:justify-between">
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">Not sure which package fits?</span> Answer three questions and get a recommendation.
          </p>
          <QuizLauncher source="pricing_page" />
        </div>
        <p className="mt-6 max-w-3xl text-caption text-muted-foreground">{pricingNote}</p>
      </Section>

      <Section aria-labelledby="models-title" tone="muted">
        <SectionHeading number={1} eyebrow="Engagement models" id="models-title" title="Three ways to work together." />
        <Stagger as="ul" className="grid gap-4 lg:grid-cols-3">
          {engagementModels.map((m) => (
            <StaggerItem as="li" key={m.name} className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 md:p-8">
              <Icon name={m.icon} className="size-7 text-signal" />
              <div className="flex flex-col gap-2">
                <h3 className="text-h3">{m.name}</h3>
                <p className="eyebrow">Best for: {m.bestFor}</p>
              </div>
              <p className="text-muted-foreground">{m.description}</p>
              <p>
                <Price money={m.price} className="font-display text-h3" /> <span className="text-small text-muted-foreground">{m.unit}</span>
              </p>
              <ul className="mt-auto flex flex-col gap-2 border-t border-border pt-5 text-small">
                {m.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-signal" />
                    {p}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Guarantee number={2} />
      <FaqSection number={3} faqs={pricingFaqs} title="Questions about money" />
      <CtaSection title="Get your fixed quote in 15 minutes." />
    </>
  );
}
