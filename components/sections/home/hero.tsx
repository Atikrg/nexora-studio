import { ArrowDown } from "lucide-react";
import { AnimatedButton } from "@/components/motion/animated-button";
import { MagneticWrapper } from "@/components/creative/magnetic-wrapper";
import { Container } from "@/components/shared/container";
import { hero } from "@/data/home";
import { primaryCta, site, trustMicroLine } from "@/data/site";
import { bookingUrl } from "@/lib/links";
import { HeroVisual } from "./hero-visual";
import { RotatingWord } from "./rotating-word";

/**
 * 01 · Hero: outcome headline, offer in 5 seconds, primary + secondary CTA, trust micro-line.
 * Headline lines rise from masks via CSS only (no JS wait for the LCP element); see .hero-line.
 */
export function Hero() {
  const fullSentence = `${hero.before} ${hero.rotatingWords.slice(0, -1).join(", ")} and ${hero.rotatingWords.at(-1)} ${hero.after}`;
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden pt-28 pb-10 md:pt-32"
    >
      <div className="absolute inset-0 -z-10 lg:left-[35%]">
        <HeroVisual />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-t from-background to-transparent"
      />

      <Container className="flex flex-1 flex-col">
        <p
          className="hero-line flex flex-wrap items-center gap-x-3 gap-y-1 eyebrow"
          style={{ ["--d" as string]: "0ms" }}
        >
          <span className="inline-flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-success" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            {site.availability}
          </span>
          <span
            aria-hidden="true"
            className="hidden h-px w-8 bg-current opacity-40 sm:inline-block"
          />
          <span className="hidden sm:inline">{hero.eyebrow}</span>
        </p>

        <h1
          id="hero-title"
          className="mt-6 text-display-xl md:mt-8 lg:text-[length:min(var(--text-display-xl),15svh)]"
        >
          <span className="sr-only">{fullSentence}</span>
          <span aria-hidden="true" className="block">
            <span className="hero-line block" style={{ ["--d" as string]: "80ms" }}>
              <span>{hero.before}</span>
            </span>
            <span className="hero-line block" style={{ ["--d" as string]: "160ms" }}>
              <span>
                <RotatingWord
                  words={hero.rotatingWords}
                  className="font-serif font-normal tracking-normal text-signal"
                />
              </span>
            </span>
            <span className="hero-line block" style={{ ["--d" as string]: "240ms" }}>
              <span>{hero.after}</span>
            </span>
          </span>
        </h1>

        <div className="mt-auto grid gap-8 pt-12 lg:grid-cols-12 lg:items-end">
          <div
            className="hero-fade flex flex-col gap-6 lg:col-span-6"
            style={{ ["--d" as string]: "360ms" }}
          >
            <p className="prose-width text-body-lg text-muted-foreground">{hero.subtitle}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <MagneticWrapper strength={0.15}>
                <AnimatedButton
                  href={bookingUrl}
                  external
                  arrow="external"
                  size="lg"
                  variant="glow"
                  className="w-full sm:w-auto"
                >
                  {primaryCta.label}
                </AnimatedButton>
              </MagneticWrapper>
              <AnimatedButton href={hero.secondaryCta.href} size="lg" variant="outline">
                {hero.secondaryCta.label}
              </AnimatedButton>
            </div>
            <ul
              className="flex flex-wrap gap-x-3 gap-y-1 eyebrow"
              aria-label="Why it's safe to book"
            >
              {trustMicroLine.map((item, i) => (
                <li key={item} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden items-end justify-end lg:col-span-6 lg:flex">
            <a
              href="#problems"
              className="inline-flex min-h-11 items-center gap-2 eyebrow hover:text-foreground"
            >
              Scroll to explore{" "}
              <ArrowDown
                aria-hidden="true"
                className="size-4 animate-bounce motion-reduce:animate-none"
              />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
