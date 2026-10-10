import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { FadeIn } from "@/components/motion/fade-in";
import { AuditForm } from "@/components/interactive/audit-form";
import { ResourceRequest } from "@/components/interactive/resource-request";
import { CtaSection } from "@/components/sections/cta-section";
import { Icon } from "@/components/shared/icon";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { leadMagnet } from "@/data/home";
import { resources } from "@/data/resources";

export const metadata: Metadata = {
  title: "Free Resources for Startup Founders",
  description:
    "Free MVP Launch Checklist, 10 Automations Every Startup Needs and a Startup Website Planning Template, plus a free Startup Launch Audit of your website or app.",
  alternates: { canonical: "/resources/" },
  openGraph: { url: "/resources/" },
};

/** Free resources (lead magnets) + the Startup Launch Audit. */
export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Free resources"
        title="Tools we use to launch startups. Yours, free."
        highlight="free"
        subtitle="Checklists, templates and guides from real projects. Use them on your own, or with us."
        breadcrumbs={[{ label: "Resources", href: "/resources/" }]}
      />

      <Section aria-label="Downloadable resources" className="pt-0 md:pt-0">
        <Stagger as="ul" className="grid gap-4 lg:grid-cols-3">
          {resources.map((r, i) => (
            <StaggerItem as="li" key={r.slug} className="corner-marks flex flex-col gap-6 rounded-3xl border border-border bg-card p-6 md:p-8">
              <div className="flex items-start justify-between">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-muted text-signal">
                  <Icon name={r.icon} className="size-6" />
                </span>
                <span className="font-mono text-caption text-muted-foreground">0{i + 1}</span>
              </div>
              <div className="flex flex-col gap-2">
                <p className="eyebrow">{r.format}</p>
                <h2 className="text-h3">{r.title}</h2>
                <p className="text-muted-foreground">{r.description}</p>
              </div>
              <ul className="flex flex-col gap-2 text-small">
                {r.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-signal" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-2">
                <ResourceRequest resource={r} />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section id="audit" aria-labelledby="res-audit-title" tone="muted">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading number={1} eyebrow={leadMagnet.eyebrow} id="res-audit-title" title={leadMagnet.title} subtitle={leadMagnet.body} />
            <ul className="flex flex-col gap-3">
              {leadMagnet.points.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <Check aria-hidden="true" className="size-4 text-signal" /> {p}
                </li>
              ))}
            </ul>
          </div>
          <FadeIn className="rounded-3xl border border-border bg-card p-6 md:p-10 lg:col-span-6">
            <AuditForm source="resources_page" />
          </FadeIn>
        </div>
      </Section>

      <Section aria-labelledby="automation-session-title">
        <div className="flex flex-col gap-8 rounded-3xl border border-border p-6 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="flex max-w-2xl flex-col gap-3">
            <h2 id="automation-session-title" className="text-h3">
              Free Automation Idea Session
            </h2>
            <p className="text-muted-foreground">
              Thirty minutes mapping your repetitive tasks. You leave with the three automations that would save you the most hours, whether or not you hire us.
            </p>
          </div>
          <Link href="/#calculator" className="inline-flex min-h-11 shrink-0 items-center font-medium underline decoration-signal decoration-2 underline-offset-[6px] hover:text-signal">
            Estimate your savings first →
          </Link>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
