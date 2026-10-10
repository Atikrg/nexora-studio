import type { Metadata } from "next";
import { HoverImagePreview } from "@/components/creative/hover-image-preview";
import { PortfolioFilter } from "@/components/interactive/portfolio-filter";
import { CtaSection } from "@/components/sections/cta-section";
import { categoryLabel } from "@/components/shared/case-study-card";
import { PageHero } from "@/components/shared/page-hero";
import { ProjectVisual } from "@/components/shared/project-visual";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { caseStudies } from "@/data/case-studies";
import { stats } from "@/data/home";
import { CountUp } from "@/components/motion/count-up";

export const metadata: Metadata = {
  title: "Work: Case Studies of MVPs, Apps & Automation",
  description:
    "Case studies from startups we've helped launch: MVP apps, startup websites, D2C stores, launch campaigns and automation, with real timelines and results.",
  alternates: { canonical: "/work/" },
  openGraph: { url: "/work/" },
};

/** Work: bold. Filterable grid, then a big-type project index with cursor-following previews. */
export default function WorkPage() {
  return (
    <>
      <PageHero
        variant="bold"
        eyebrow="Selected work"
        title="Products we launched, and what happened next."
        highlight="launched"
        subtitle="Every project has a timeline, a problem and a number we moved. Here are a few."
        breadcrumbs={[{ label: "Work", href: "/work/" }]}
      >
        <dl className="mt-4 grid grid-cols-2 gap-6 border-t border-border pt-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <dt className="order-2 text-small text-muted-foreground">{s.label}</dt>
              <dd className="order-1 font-display text-h2">
                <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <Section aria-labelledby="grid-title" className="pt-0 md:pt-0">
        <h2 id="grid-title" className="sr-only">
          Case studies
        </h2>
        <PortfolioFilter studies={caseStudies} />
      </Section>

      <Section aria-labelledby="index-title" tone="muted">
        <SectionHeading number={1} eyebrow="Project index" id="index-title" title="Every project, at a glance." />
        <HoverImagePreview
          items={caseStudies.map((c) => ({
            href: `/work/${c.slug}/`,
            title: c.client,
            meta: `${categoryLabel[c.category]} · ${c.year}`,
            preview: <ProjectVisual study={c} compact />,
          }))}
        />
      </Section>

      <CtaSection title="Your product could be the next case study." />
    </>
  );
}
