import type { ReactNode } from "react";
import { SplitTextReveal } from "@/components/creative/split-text-reveal";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";
import { Container } from "./container";

type PageHeroProps = {
  eyebrow: string;
  /** Plain-text title. `highlight` (if present in the title) is set in serif italic. */
  title: string;
  highlight?: string;
  subtitle?: ReactNode;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
  /** "bold" for Work/About (display size), "calm" for Services/Pricing/Contact/Legal. */
  variant?: "bold" | "calm";
};

/** Inner-page hero: breadcrumbs, eyebrow, one h1 (split-reveal), subtitle, optional actions. */
export function PageHero({ eyebrow, title, highlight, subtitle, breadcrumbs, children, variant = "calm" }: PageHeroProps) {
  const parts = highlight && title.includes(highlight) ? title.split(highlight) : null;
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div aria-hidden="true" className="absolute -top-40 right-[-10%] -z-10 size-[36rem] rounded-full bg-primary opacity-[0.12] blur-3xl" />
      <Container className="flex flex-col gap-8">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <p className="eyebrow flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-primary" />
          {eyebrow}
        </p>
        <SplitTextReveal
          as="h1"
          immediate
          by="words"
          className={variant === "bold" ? "max-w-6xl text-display" : "max-w-5xl text-h1 lg:text-[length:clamp(3rem,6vw,5.5rem)]"}
        >
          {parts ? (
            <>
              {parts[0]}
              <em className="font-serif font-normal tracking-normal text-signal">{highlight}</em>
              {parts[1]}
            </>
          ) : (
            title
          )}
        </SplitTextReveal>
        {subtitle && <p className="prose-width text-body-lg text-muted-foreground">{subtitle}</p>}
        {children}
      </Container>
    </section>
  );
}
