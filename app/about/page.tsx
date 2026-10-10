import type { Metadata } from "next";
import { BadgeCheck } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ImageReveal } from "@/components/creative/image-reveal";
import { ParallaxLayer } from "@/components/creative/parallax-layer";
import { SplitTextReveal } from "@/components/creative/split-text-reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { Testimonials } from "@/components/sections/home/testimonials";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { founder } from "@/data/founder";
import { whyUs } from "@/data/home";
import { site } from "@/data/site";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About: A Founder-Led Studio in Pune",
  description: `${site.name} is a founder-led digital studio in Pune. You work directly with ${founder.name}, who designs and builds every product personally.`,
  alternates: { canonical: "/about/" },
  openGraph: { url: "/about/" },
};

/** About: bold and editorial. The founder story is the trust engine for a new, founder-led studio. */
export default function AboutPage() {
  return (
    <>
      <PageHero
        variant="bold"
        eyebrow="About"
        title="Small studio. Senior hands. Total accountability."
        highlight="Senior hands."
        subtitle={`${site.name} is a founder-led studio in ${site.location.city}. No account managers, no hand-offs: the person you talk to is the person who builds your product.`}
        breadcrumbs={[{ label: "About", href: "/about/" }]}
      />

      <Section aria-labelledby="founder-title" className="pt-0 md:pt-0">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <ImageReveal className="aspect-4/5 overflow-hidden rounded-3xl border border-border">
              {founder.photo ? (
                <Image src={founder.photo} alt={`${founder.name}, ${founder.role}`} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              ) : (
                <div
                  role="img"
                  aria-label={`Photo placeholder for ${founder.name}`}
                  className="relative flex size-full items-end bg-[radial-gradient(120%_80%_at_30%_10%,color-mix(in_oklch,var(--ignition),transparent_55%),transparent_60%),var(--card)] p-8"
                >
                  <span className="absolute top-8 right-8 font-mono text-caption text-muted-foreground">PHOTO · PLACEHOLDER</span>
                  <span className="font-display text-[clamp(6rem,14vw,12rem)] leading-none font-bold tracking-[-0.06em] text-foreground/90">{founder.initials}</span>
                </div>
              )}
            </ImageReveal>
            <p className="mt-4 flex items-center justify-between text-small">
              <span className="font-medium">{founder.name}</span>
              <span className="text-muted-foreground">{founder.role}</span>
            </p>
          </div>

          <div className="flex flex-col gap-10 lg:col-span-7">
            <p className="eyebrow flex items-center gap-3">
              <span className="text-signal">[01]</span>
              <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
              The founder
            </p>
            <SplitTextReveal as="h2" id="founder-title" className="text-h1">
              {founder.intro}
            </SplitTextReveal>
            <div className="flex flex-col gap-6 text-body-lg text-muted-foreground">
              {founder.story.map((p) => (
                <FadeIn as="p" key={p.slice(0, 24)}>
                  {p}
                </FadeIn>
              ))}
            </div>
            <dl className="grid grid-cols-3 gap-6 border-t border-border pt-8">
              {founder.highlights.map((h) => (
                <div key={h.label} className="flex flex-col gap-1">
                  <dt className="order-2 text-small text-muted-foreground">{h.label}</dt>
                  <dd className="order-1 font-display text-h2">{h.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="principles-title" tone="muted">
        <SectionHeading number={2} eyebrow="Principles" id="principles-title" title="How we work, and what we won't do." />
        <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {founder.principles.map((p, i) => (
            <StaggerItem as="li" key={p.title} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
              <span className="font-mono text-caption text-signal">0{i + 1}</span>
              <h3 className="text-h4">{p.title}</h3>
              <p className="text-small text-muted-foreground">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section aria-labelledby="different-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading number={3} eyebrow={whyUs.eyebrow} id="different-title" title={whyUs.title} />
            <ParallaxLayer speed={-10}>
              <ul className="flex flex-wrap gap-3" aria-label="Business credentials">
                {site.trustBadges.map((b) => (
                  <li key={b.label} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-small">
                    <BadgeCheck aria-hidden="true" className="size-4 text-signal" /> {b.label}
                  </li>
                ))}
              </ul>
            </ParallaxLayer>
          </div>
          <ul className="flex flex-col divide-y divide-border border-y border-border lg:col-span-7">
            {whyUs.items.map((item) => (
              <li key={item.title} className="grid gap-2 py-6 md:grid-cols-[14rem_1fr] md:gap-8">
                <h3 className="text-h4">{item.title}</h3>
                <p className="text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Testimonials number={4} />
      <CtaSection title="Work directly with the person who builds it." />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: `About ${site.name}`,
          url: new URL("/about/", site.url).toString(),
          mainEntity: {
            "@type": "Person",
            name: founder.name,
            jobTitle: founder.role,
            worksFor: { "@type": "Organization", name: site.name, url: site.url },
            address: { "@type": "PostalAddress", addressLocality: site.location.city, addressCountry: site.location.countryCode },
            sameAs: [founder.linkedin],
          },
        }}
      />
    </>
  );
}
