import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CountUp } from "@/components/motion/count-up";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ImageReveal } from "@/components/creative/image-reveal";
import { ParallaxLayer } from "@/components/creative/parallax-layer";
import { SplitTextReveal } from "@/components/creative/split-text-reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { Badge } from "@/components/ui/badge";
import { categoryLabel } from "@/components/shared/case-study-card";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { ProjectVisual } from "@/components/shared/project-visual";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { caseStudies, getCaseStudy, getNextCaseStudy } from "@/data/case-studies";
import { getIndustry } from "@/data/industries";
import { getService } from "@/data/services";
import { site } from "@/data/site";
import { getTestimonial } from "@/data/testimonials";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  const title = `${study.client} Case Study: ${study.tagline}`;
  return {
    title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}/` },
    openGraph: { url: `/work/${study.slug}/`, title, description: study.summary, type: "article" },
  };
}

/** Case study template: bold, editorial, numbers-first. */
export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const industry = getIndustry(study.industry);
  const testimonial = getTestimonial(study.testimonialId);
  const next = getNextCaseStudy(study.slug);
  const serviceNames = study.services.map((s) => getService(s)?.name).filter(Boolean) as string[];

  return (
    <>
      <PageHero
        variant="bold"
        eyebrow={`${categoryLabel[study.category]} · ${industry?.name ?? ""}`}
        title={`${study.client}: ${study.tagline}.`}
        highlight={study.client}
        subtitle={study.summary}
        breadcrumbs={[
          { label: "Work", href: "/work/" },
          { label: study.client, href: `/work/${study.slug}/` },
        ]}
      />

      {/* Hero visual + overview */}
      <section aria-label="Project overview" className="pb-16 md:pb-24">
        <Container className="flex flex-col gap-10">
          <ImageReveal className="aspect-16/10 overflow-hidden rounded-3xl border border-border md:aspect-16/8">
            <ProjectVisual study={study} />
          </ImageReveal>
          <dl className="grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-5">
            {[
              ["Client", study.client],
              ["Industry", industry?.name ?? "—"],
              ["Services", serviceNames.join(", ")],
              ["Timeline", study.timeline],
              ["Location", `${study.location} · ${study.year}`],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1">
                <dt className="eyebrow">{k}</dt>
                <dd className="text-small font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Problem */}
      <Section aria-labelledby="problem-title" tone="muted">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="text-signal">[01]</span>
              <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
              The problem
            </p>
            <h2 id="problem-title" className="text-h2">
              Where they started
            </h2>
          </div>
          <SplitTextReveal as="p" className="font-display text-h3 leading-snug lg:col-span-8">
            {study.problem}
          </SplitTextReveal>
        </div>
      </Section>

      {/* Approach */}
      <Section aria-labelledby="approach-title">
        <SectionHeading number={2} eyebrow="Approach" id="approach-title" title="How we tackled it." />
        <Stagger as="ol" className="grid gap-4 md:grid-cols-3">
          {study.approach.map((a, i) => (
            <StaggerItem as="li" key={a.title} className="corner-marks flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 md:p-8">
              <span className="font-mono text-caption text-signal">0{i + 1}</span>
              <h3 className="text-h4">{a.title}</h3>
              <p className="text-muted-foreground">{a.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Solution */}
      <Section aria-labelledby="solution-title" tone="muted">
        <SectionHeading number={3} eyebrow="Solution" id="solution-title" title="What we built." />
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <ParallaxLayer speed={-8} className="lg:col-span-7">
            <div className="aspect-4/3 overflow-hidden rounded-3xl border border-border">
              <ProjectVisual study={study} />
            </div>
          </ParallaxLayer>
          <ul className="flex flex-col gap-6 lg:col-span-5">
            {study.solution.map((s) => (
              <FadeIn as="li" key={s.title} className="flex flex-col gap-2 border-l-2 border-primary pl-5">
                <h3 className="text-h4">{s.title}</h3>
                <p className="text-muted-foreground">{s.body}</p>
              </FadeIn>
            ))}
          </ul>
        </div>
      </Section>

      {/* Results */}
      <Section aria-labelledby="results-title">
        <SectionHeading
          number={4}
          eyebrow="Results"
          id="results-title"
          title={
            <>
              The numbers that <em>moved</em>.
            </>
          }
        />
        <dl className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {study.results.map((r) => (
            <div key={r.label} className="flex flex-col gap-3 bg-background p-6 md:p-10">
              <dd className="order-1 font-display text-[length:clamp(2.75rem,5vw,4.5rem)] leading-none tracking-[-0.04em] text-signal">
                <CountUp value={r.value} decimals={r.decimals} prefix={r.prefix} suffix={r.suffix} />
              </dd>
              <dt className="order-2 text-muted-foreground">{r.label}</dt>
            </div>
          ))}
        </dl>
      </Section>

      {/* Testimonial */}
      {testimonial && (
        <Section aria-label="Client testimonial" className="pt-0 md:pt-0">
          <FadeIn className="mx-auto max-w-4xl">
            <TestimonialCard testimonial={testimonial} large className="border-none bg-transparent p-0 md:p-0" />
          </FadeIn>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {serviceNames.map((n) => (
              <Badge key={n} variant="label">
                {n}
              </Badge>
            ))}
          </div>
        </Section>
      )}

      {/* Next case study: full-width hover transition */}
      <nav aria-label="Next case study" className="border-y border-border">
        <Link
          href={`/work/${next.slug}/`}
          data-cursor="Next"
          className="group/next relative isolate flex min-h-[60svh] flex-col justify-center overflow-hidden py-20"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 [clip-path:inset(100%_0_0_0)] transition-[clip-path] duration-(--duration-slow) ease-in-out-quart group-hover/next:[clip-path:inset(0_0_0_0)] group-focus-visible/next:[clip-path:inset(0_0_0_0)]"
          >
            <ProjectVisual study={next} />
            <div className="absolute inset-0 bg-background/70" />
          </div>
          <Container className="flex flex-col gap-6">
            <span className="eyebrow">Next project</span>
            <span className="flex items-center justify-between gap-6">
              <span className="text-display-xl transition-transform duration-(--duration-slow) ease-out-expo group-hover/next:translate-x-4">
                {next.client}
              </span>
              <ArrowRight aria-hidden="true" className="size-12 shrink-0 transition-transform duration-(--duration-slow) ease-out-expo group-hover/next:translate-x-2 md:size-20" />
            </span>
            <span className="max-w-xl text-body-lg text-muted-foreground">{next.summary}</span>
          </Container>
        </Link>
      </nav>

      <CtaSection title={`Want results like ${study.client}?`} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: `${study.client} case study`,
          headline: study.tagline,
          description: study.summary,
          dateCreated: String(study.year),
          creator: { "@type": "Organization", name: site.name, url: site.url },
          url: new URL(`/work/${study.slug}/`, site.url).toString(),
        }}
      />
    </>
  );
}
