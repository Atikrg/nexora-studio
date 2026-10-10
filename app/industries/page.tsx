import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { CtaSection } from "@/components/sections/cta-section";
import { Icon } from "@/components/shared/icon";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { industries } from "@/data/industries";
import { getService } from "@/data/services";

export const metadata: Metadata = {
  title: "Industries: SaaS, D2C, EdTech & HealthTech",
  description:
    "Websites, apps and automation for SaaS, D2C, EdTech and HealthTech startups. We know the challenges of each market and build for them.",
  alternates: { canonical: "/industries/" },
  openGraph: { url: "/industries/" },
};

/** Industries overview: four markets, each linking to its own page. */
export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="We speak your market's language."
        highlight="your market's"
        subtitle="Startups in different markets fail for different reasons. We focus on four we know deeply, so you don't pay for us to learn your industry."
        breadcrumbs={[{ label: "Industries", href: "/industries/" }]}
      />
      <Section aria-label="Industries we serve" className="pt-0 md:pt-0">
        <Stagger as="ul" className="grid gap-4 md:grid-cols-2">
          {industries.map((ind, i) => (
            <StaggerItem as="li" key={ind.slug}>
              <Link
                href={`/industries/${ind.slug}/`}
                className="group/ind relative flex h-full flex-col gap-8 overflow-hidden rounded-3xl border border-border bg-card p-6 transition-[border-color,transform] duration-(--duration-base) hover:-translate-y-1 hover:border-primary/40 md:p-10"
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-muted text-signal transition-colors group-hover/ind:bg-primary group-hover/ind:text-primary-foreground">
                    <Icon name={ind.icon} className="size-6" />
                  </span>
                  <span className="font-mono text-caption text-muted-foreground">0{i + 1}</span>
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="text-h2">{ind.name}</h2>
                  <p className="text-body-lg">{ind.tagline}</p>
                  <p className="text-muted-foreground">{ind.intro}</p>
                </div>
                <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-6">
                  <p className="text-small text-muted-foreground">
                    {ind.services.map((s) => getService(s)?.shortName).join(" · ")}
                  </p>
                  <ArrowUpRight aria-hidden="true" className="size-6 transition-transform group-hover/ind:translate-x-1 group-hover/ind:-translate-y-1" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <CtaSection title="Building in a different space? Let's talk anyway." />
    </>
  );
}
