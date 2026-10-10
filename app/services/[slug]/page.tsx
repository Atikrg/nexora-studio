import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Clock, Wallet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedButton } from "@/components/motion/animated-button";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { CtaSection } from "@/components/sections/cta-section";
import { CaseStudyCard } from "@/components/shared/case-study-card";
import { CurrencyToggle } from "@/components/shared/currency-toggle";
import { FaqList } from "@/components/shared/faq-list";
import { Icon } from "@/components/shared/icon";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { Price } from "@/components/shared/price";
import { PricingTierCard } from "@/components/shared/pricing-tier-card";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { getCaseStudy } from "@/data/case-studies";
import { getService, services } from "@/data/services";
import { primaryCta, site } from "@/data/site";
import { getTestimonial } from "@/data/testimonials";
import { bookingUrl } from "@/lib/links";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    alternates: { canonical: `/services/${service.slug}/` },
    openGraph: { url: `/services/${service.slug}/`, title: service.seo.title, description: service.seo.description },
  };
}

/** Service page template. Calm motion; clarity first (see docs/00-ux-brief.md §6). */
export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const caseStudy = getCaseStudy(service.relatedCaseStudy);
  const testimonial = getTestimonial(caseStudy?.testimonialId);
  const from = service.pricing[0]!;

  return (
    <>
      <PageHero
        eyebrow={service.hero.eyebrow}
        title={`${service.hero.title} ${service.hero.highlight}.`}
        highlight={service.hero.highlight}
        subtitle={service.hero.subtitle}
        breadcrumbs={[
          { label: "Services", href: "/services/" },
          { label: service.name, href: `/services/${service.slug}/` },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <AnimatedButton href={bookingUrl} external arrow="external" size="lg">
            {primaryCta.label}
          </AnimatedButton>
          <AnimatedButton href="#pricing" size="lg" variant="outline" arrow={false}>
            See pricing
          </AnimatedButton>
        </div>
        <dl className="flex flex-wrap gap-x-8 gap-y-2 text-small">
          <div className="flex items-center gap-2">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <Clock aria-hidden="true" className="size-4" /> Timeline
            </dt>
            <dd className="font-medium">{service.timeline}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <Wallet aria-hidden="true" className="size-4" /> From
            </dt>
            <dd className="font-medium">
              <Price money={from.price} />
              {from.billing === "monthly" ? "/month" : ""}
            </dd>
          </div>
        </dl>
      </PageHero>

      {/* Who it's for */}
      <Section aria-labelledby="who-title" tone="muted">
        <SectionHeading number={1} eyebrow="Who it's for" id="who-title" title={`Built for founders who need ${service.shortName.toLowerCase()} that work.`} />
        <Stagger as="ul" className="grid gap-4 md:grid-cols-3">
          {service.whoFor.map((w) => (
            <StaggerItem as="li" key={w.title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 md:p-8">
              <Icon name={service.icon} className="size-6 text-signal" />
              <h3 className="text-h4">{w.title}</h3>
              <p className="text-muted-foreground">{w.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Problems solved */}
      <Section aria-labelledby="problems-title">
        <SectionHeading number={2} eyebrow="Problems we solve" id="problems-title" title="What changes when you work with us." />
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          {service.problems.map((p, i) => (
            <li key={p.title} className="flex gap-5 bg-background p-6 md:p-8">
              <span className="font-mono text-caption text-signal">0{i + 1}</span>
              <div className="flex flex-col gap-2">
                <h3 className="text-h4">{p.title}</h3>
                <p className="text-muted-foreground">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Deliverables */}
      <Section aria-labelledby="deliverables-title" tone="muted">
        <SectionHeading number={3} eyebrow="Deliverables" id="deliverables-title" title="Exactly what you get." subtitle="No vague 'digital solutions'. This is the list that goes into your proposal." />
        <Tabs defaultValue={service.deliverables[0]!.title} className="gap-8">
          <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-full bg-background p-1 sm:w-fit">
            {service.deliverables.map((d) => (
              <TabsTrigger key={d.title} value={d.title} className="min-h-11 rounded-full px-5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {d.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {service.deliverables.map((d) => (
            <TabsContent key={d.title} value={d.title}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {d.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
                    <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-signal" />
                    {item}
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </Section>

      {/* Process & timeline */}
      <Section aria-labelledby="service-process-title">
        <SectionHeading
          number={4}
          eyebrow="Process & timeline"
          id="service-process-title"
          title={
            <>
              Live in <em>{service.timeline}</em>.
            </>
          }
        />
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {service.process.map((step, i) => (
            <li key={step.title} className="relative flex flex-col gap-3 rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-caption text-signal">0{i + 1}</span>
                <span className="eyebrow">{step.duration}</span>
              </div>
              <h3 className="text-h3">{step.title}</h3>
              <p className="text-small text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Tech stack */}
      <Section aria-labelledby="stack-title" tone="muted">
        <SectionHeading number={5} eyebrow="Tech stack" id="stack-title" title="Proven tools, chosen for your stage." subtitle="We pick the simplest stack that does the job, and that any good developer can maintain after us." />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {service.stack.map((t) => (
            <li key={t.name} className="flex flex-col gap-1 rounded-2xl border border-border bg-card p-5">
              <span className="font-display text-body font-semibold">{t.name}</span>
              <span className="text-small text-muted-foreground">{t.note}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Related case study */}
      {caseStudy && (
        <Section aria-labelledby="related-title">
          <SectionHeading
            number={6}
            eyebrow="Proof"
            id="related-title"
            title="See it in action."
            action={
              <AnimatedButton href="/work/" variant="outline">
                All case studies
              </AnimatedButton>
            }
          />
          <div className="grid gap-4 lg:grid-cols-2">
            <FadeIn>
              <CaseStudyCard study={caseStudy} priority className="h-full" />
            </FadeIn>
            {testimonial && (
              <FadeIn delay={0.1}>
                <TestimonialCard testimonial={testimonial} large />
              </FadeIn>
            )}
          </div>
        </Section>
      )}

      {/* Pricing snippet */}
      <Section id="pricing" aria-labelledby="service-pricing-title" tone="muted">
        <SectionHeading
          number={7}
          eyebrow="Pricing"
          id="service-pricing-title"
          title={`${service.name} packages`}
          subtitle="Fixed quote in writing after a 15-minute call. Milestone payments, never 100% upfront."
          action={<CurrencyToggle />}
        />
        <div className="grid gap-6 pt-3 lg:grid-cols-3">
          {service.pricing.map((tier) => (
            <PricingTierCard key={tier.name} tier={tier} service={{ slug: service.slug, name: service.name }} />
          ))}
        </div>
        <p className="mt-8 text-small text-muted-foreground">
          Need something in between?{" "}
          <AnimatedButton href="/pricing/" variant="link" size="sm" className="h-auto text-small">
            Compare all pricing
          </AnimatedButton>
        </p>
      </Section>

      {/* FAQ */}
      <Section aria-labelledby="service-faq-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading number={8} eyebrow="FAQ" id="service-faq-title" title={`${service.shortName} questions`} className="mb-0 md:mb-0" />
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={service.faqs} />
          </div>
        </div>
      </Section>

      <CtaSection title={`Ready to start your ${service.shortName.toLowerCase()} project?`} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          serviceType: service.name,
          description: service.seo.description,
          url: new URL(`/services/${service.slug}/`, site.url).toString(),
          areaServed: [{ "@type": "Country", name: "India" }, "Worldwide"],
          provider: { "@type": "Organization", name: site.name, url: site.url },
          offers: service.pricing.map((t) => ({
            "@type": "Offer",
            name: t.name,
            price: t.price.inr,
            priceCurrency: "INR",
            description: t.description,
          })),
        }}
      />
    </>
  );
}
