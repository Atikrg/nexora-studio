import type { Metadata } from "next";
import { Hero } from "@/components/sections/home/hero";
import { LogoMarquee } from "@/components/sections/home/logo-marquee";
import { ProblemSection } from "@/components/sections/home/problem-section";
import { ServicesGrid } from "@/components/sections/home/services-grid";
import { WorkShowcase } from "@/components/sections/home/work-showcase";
import { WhyUs } from "@/components/sections/home/why-us";
import { ProcessTimeline } from "@/components/sections/home/process-timeline";
import { CalculatorSection } from "@/components/sections/home/calculator-section";
import { Testimonials } from "@/components/sections/home/testimonials";
import { PricingTeaser } from "@/components/sections/home/pricing-teaser";
import { Guarantee } from "@/components/sections/home/guarantee";
import { LeadMagnet } from "@/components/sections/home/lead-magnet";
import { FaqSection } from "@/components/sections/home/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name}: MVP Development for Startups | Websites, Apps & Automation` },
  description: site.description,
  alternates: { canonical: "/" },
};

/** Home: the full journey in one scroll (order rationale in docs/00-ux-brief.md §5). */
export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <ProblemSection />
      <ServicesGrid number={2} />
      <WorkShowcase number={3} />
      <WhyUs number={4} />
      <ProcessTimeline number={5} />
      <CalculatorSection number={6} />
      <Testimonials number={7} />
      <PricingTeaser number={8} />
      <Guarantee number={9} />
      <LeadMagnet number={10} />
      <FaqSection number={11} />
      <CtaSection />
    </>
  );
}
