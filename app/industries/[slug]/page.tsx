import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { AnimatedButton } from "@/components/motion/animated-button";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { CtaSection } from "@/components/sections/cta-section";
import { CaseStudyCard } from "@/components/shared/case-study-card";
import { Icon } from "@/components/shared/icon";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { getCaseStudy } from "@/data/case-studies";
import { getIndustry, industries } from "@/data/industries";
import { getService } from "@/data/services";
import { primaryCta } from "@/data/site";
import { bookingUrl } from "@/lib/links";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return {
    title: ind.seo.title,
    description: ind.seo.description,
    alternates: { canonical: `/industries/${ind.slug}/` },
    openGraph: { url: `/industries/${ind.slug}/`, title: ind.seo.title, description: ind.seo.description },
  };
}

/** Industry template: challenges → relevant services → use-cases → related case study → CTA. */
export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  const study = getCaseStudy(ind.caseStudy);

  return (
    <>
      <PageHero
        eyebrow={`For ${ind.name} startups`}
        title={ind.tagline}
        highlight={ind.tagline.split(" ").slice(-2).join(" ").replace(/\.$/, "")}
        subtitle={ind.intro}
        breadcrumbs={[
          { label: "Industries", href: "/industries/" },
          { label: ind.name, href: `/industries/${ind.slug}/` },
        ]}
      >
        <div>
          <AnimatedButton href={bookingUrl} external arrow="external" size="lg">
            {primaryCta.label}
          </AnimatedButton>
        </div>
      </PageHero>

      <Section aria-labelledby="challenges-title" tone="muted">
        <SectionHeading number={1} eyebrow="Industry challenges" id="challenges-title" title={`What holds ${ind.name} startups back.`} />
        <Stagger as="ol" className="grid gap-4 md:grid-cols-3">
          {ind.challenges.map((c, i) => (
            <StaggerItem as="li" key={c.title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 md:p-8">
              <span className="font-mono text-caption text-signal">0{i + 1}</span>
              <h3 className="text-h4">{c.title}</h3>
              <p className="text-muted-foreground">{c.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section aria-labelledby="ind-services-title">
        <SectionHeading number={2} eyebrow="How we help" id="ind-services-title" title="The services that matter most here." />
        <ul className="grid gap-4 md:grid-cols-3">
          {ind.services.map((slugName) => {
            const s = getService(slugName);
            if (!s) return null;
            return (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}/`}
                  className="group/s flex h-full flex-col gap-4 rounded-2xl border border-border p-6 transition-colors hover:border-primary/40"
                >
                  <div className="flex items-center justify-between">
                    <Icon name={s.icon} className="size-6 text-signal" />
                    <ArrowUpRight aria-hidden="true" className="size-5 transition-transform group-hover/s:translate-x-1 group-hover/s:-translate-y-1" />
                  </div>
                  <span className="text-h4">{s.name}</span>
                  <span className="text-small text-muted-foreground">{s.summary}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section aria-labelledby="usecases-title" tone="muted">
        <SectionHeading number={3} eyebrow="Use-cases" id="usecases-title" title="What we typically build." />
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {ind.useCases.map((u) => (
            <li key={u.title} className="flex flex-col gap-2 bg-card p-6 md:p-8">
              <h3 className="text-h4">{u.title}</h3>
              <p className="text-muted-foreground">{u.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {study && (
        <Section aria-labelledby="ind-case-title">
          <SectionHeading number={4} eyebrow="Case study" id="ind-case-title" title={`A ${ind.name} launch we're proud of.`} />
          <FadeIn className="max-w-3xl">
            <CaseStudyCard study={study} priority />
          </FadeIn>
        </Section>
      )}

      <CtaSection title={`Let's build your ${ind.name} product.`} />
    </>
  );
}
