import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, Clock } from "lucide-react";
import { AnimatedButton } from "@/components/motion/animated-button";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { CtaSection } from "@/components/sections/cta-section";
import { Icon } from "@/components/shared/icon";
import { PageHero } from "@/components/shared/page-hero";
import { Price } from "@/components/shared/price";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { QuizLauncher } from "@/components/interactive/quiz-launcher";
import { ServiceQuiz } from "@/components/interactive/service-quiz";
import { industries } from "@/data/industries";
import { services } from "@/data/services";
import { primaryCta } from "@/data/site";
import { bookingUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: "Services: Websites, MVP Apps, Social Media & Automation",
  description:
    "MVP development for startups: website development, Android & iOS apps, social media marketing and automation (n8n, Zapier, WhatsApp, AI). Fixed prices, launch in weeks.",
  alternates: { canonical: "/services/" },
  openGraph: { url: "/services/" },
};

/** Services overview: calm and clear. Four services, then the quiz for anyone unsure. */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything you need to launch, under one roof."
        highlight="launch"
        subtitle="Four services, one accountable founder. Use them on their own or together: a website, an app, the audience to use it, and the automation that keeps it running."
        breadcrumbs={[{ label: "Services", href: "/services/" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <AnimatedButton href={bookingUrl} external arrow="external" size="lg">
            {primaryCta.label}
          </AnimatedButton>
          <QuizLauncher size="lg" source="services_hero" />
        </div>
      </PageHero>

      <Section aria-labelledby="services-list-title" className="pt-0 md:pt-0">
        <h2 id="services-list-title" className="sr-only">
          Our services
        </h2>
        <Stagger as="ol" className="flex flex-col border-t border-border">
          {services.map((service, i) => (
            <StaggerItem as="li" key={service.slug} className="border-b border-border">
              <article className="group/row relative grid gap-8 py-10 md:py-14 lg:grid-cols-12">
                <div className="flex items-start gap-5 lg:col-span-5">
                  <span className="font-mono text-caption text-muted-foreground">0{i + 1}</span>
                  <div className="flex flex-col gap-4">
                    <span className="flex size-12 items-center justify-center rounded-xl border border-border text-signal transition-colors group-hover/row:bg-primary group-hover/row:text-primary-foreground">
                      <Icon name={service.icon} className="size-6" />
                    </span>
                    <h3 className="text-h2">
                      <Link href={`/services/${service.slug}/`} className="after:absolute after:inset-0 hover:text-signal">
                        {service.name}
                      </Link>
                    </h3>
                    <p className="text-body-lg text-muted-foreground">{service.cardTitle}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-6 lg:col-span-5">
                  <p>{service.summary}</p>
                  <ul className="grid gap-2 text-small sm:grid-cols-2">
                    {service.deliverables.flatMap((d) => d.items.slice(0, 2)).map((item) => (
                      <li key={item} className="flex gap-2">
                        <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-signal" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-end justify-between gap-6 lg:col-span-2 lg:flex-col lg:items-end">
                  <dl className="flex flex-col gap-1 text-small lg:text-right">
                    <dt className="sr-only">Starting price</dt>
                    <dd>
                      <span className="text-muted-foreground">From </span>
                      <Price money={service.pricing[0]!.price} className="font-semibold" />
                    </dd>
                    <dt className="sr-only">Timeline</dt>
                    <dd className="flex items-center gap-1.5 text-muted-foreground lg:justify-end">
                      <Clock aria-hidden="true" className="size-3.5" /> {service.timeline}
                    </dd>
                  </dl>
                  <span className="flex size-12 items-center justify-center rounded-full border border-border transition-[transform,background-color] duration-(--duration-base) group-hover/row:rotate-45 group-hover/row:bg-primary group-hover/row:text-primary-foreground">
                    <ArrowUpRight aria-hidden="true" className="size-5" />
                  </span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section id="quiz" aria-labelledby="quiz-title" tone="muted">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              number={1}
              eyebrow="Not sure where to start?"
              id="quiz-title"
              title={
                <>
                  Find the right package in <em>two minutes</em>.
                </>
              }
              subtitle="Answer three questions about your goal, stage and timeline. We'll recommend a package and pass it straight to the contact form, so you never have to explain twice."
            />
          </div>
          <FadeIn className="rounded-3xl border border-border bg-card p-6 md:p-10 lg:col-span-7">
            <ServiceQuiz source="services_inline" />
          </FadeIn>
        </div>
      </Section>

      <Section aria-labelledby="industries-strip-title">
        <SectionHeading
          number={2}
          eyebrow="Industries"
          id="industries-strip-title"
          title="Built for the markets we know best."
          action={
            <AnimatedButton href="/industries/" variant="outline">
              All industries
            </AnimatedButton>
          }
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind) => (
            <li key={ind.slug}>
              <Link
                href={`/industries/${ind.slug}/`}
                className="group/ind flex h-full flex-col gap-4 rounded-2xl border border-border p-6 transition-colors hover:border-primary/40"
              >
                <Icon name={ind.icon} className="size-6 text-signal" />
                <span className="text-h4">{ind.name}</span>
                <span className="text-small text-muted-foreground">{ind.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaSection title="Tell us what you're building." />
    </>
  );
}
