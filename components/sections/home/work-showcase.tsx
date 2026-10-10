"use client";

import Link from "next/link";
import { useRef, type FocusEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useMotionOk } from "@/hooks/use-motion-ok";
import { useMediaQuery } from "@/hooks/use-media-query";
import { AnimatedButton } from "@/components/motion/animated-button";
import { CountUp } from "@/components/motion/count-up";
import { Badge } from "@/components/ui/badge";
import { ProjectVisual } from "@/components/shared/project-visual";
import { SectionHeading } from "@/components/shared/section-heading";
import { caseStudies, featuredCaseStudy } from "@/data/case-studies";
import { industries } from "@/data/industries";
import { cn } from "@/lib/utils";

const categoryLabel = {
  web: "Website",
  app: "Mobile app",
  social: "Social media",
  automation: "Automation",
} as const;
const industryName = (slug: string) => industries.find((i) => i.slug === slug)?.name ?? slug;

/**
 * 05 · Featured work. Desktop + motion: the section pins and panels scroll horizontally,
 * scrubbed by vertical scroll. Panel 1 is the featured case study with result numbers.
 * Mobile / reduced motion / low-end: a plain vertical list. Keyboard focus inside an
 * off-screen panel scrolls the page so that panel slides into view.
 */
export function WorkShowcase({ number = 3 }: { number?: number }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const motionOk = useMotionOk();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const horizontal = motionOk && isDesktop;
  const others = caseStudies.filter((c) => c.slug !== featuredCaseStudy.slug);

  useGSAP(
    () => {
      const el = track.current;
      if (!horizontal || !el || !section.current) return;
      const distance = () => el.scrollWidth - window.innerWidth;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      triggerRef.current = tween.scrollTrigger ?? null;
      return () => {
        triggerRef.current = null;
      };
    },
    { scope: section, dependencies: [horizontal] },
  );

  const onFocusPanel = (e: FocusEvent<HTMLElement>) => {
    const st = triggerRef.current;
    const el = track.current;
    if (!st || !el) return;
    const panel = (e.target as HTMLElement).closest<HTMLElement>("[data-panel]");
    if (!panel) return;
    const max = el.scrollWidth - window.innerWidth;
    const ratio = Math.min(1, Math.max(0, (panel.offsetLeft - 64) / max));
    window.scrollTo({
      top: st.start + ratio * (st.end - st.start),
      behavior: "instant" as ScrollBehavior,
    });
  };

  return (
    <section
      ref={section}
      aria-labelledby="work-title"
      className={cn(
        "relative overflow-hidden",
        horizontal ? "flex h-svh flex-col justify-center" : "section-y",
      )}
    >
      <div className={cn("container-site", horizontal && "pt-24")}>
        <SectionHeading
          number={number}
          eyebrow="Selected work"
          id="work-title"
          className={cn(horizontal && "mb-8 md:mb-10")}
          title={
            <>
              Launched, funded, <em>growing</em>.
            </>
          }
          action={
            <AnimatedButton href="/work/" variant="outline">
              View all work
            </AnimatedButton>
          }
        />
      </div>

      <div
        ref={track}
        onFocus={onFocusPanel}
        className={cn(
          horizontal
            ? "flex w-max gap-6 pr-[10vw] pl-[max(var(--spacing-gutter),calc((100vw-var(--container-site))/2+var(--spacing-gutter)))] will-change-transform"
            : "container-site flex flex-col gap-6",
        )}
      >
        {/* Panel 1: featured case study */}
        <article
          data-panel
          className={cn(
            "relative grid overflow-hidden rounded-3xl border border-border bg-card",
            horizontal ? "h-[62svh] w-[min(78vw,72rem)] grid-cols-2" : "md:grid-cols-2",
          )}
        >
          <div className="flex flex-col justify-between gap-8 p-6 md:p-10">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="signal">Featured</Badge>
                <Badge variant="label">{industryName(featuredCaseStudy.industry)}</Badge>
                <Badge variant="label">{featuredCaseStudy.timeline}</Badge>
              </div>
              <h3 className="text-h2">
                <Link
                  href={`/work/${featuredCaseStudy.slug}/`}
                  data-cursor="View"
                  className="after:absolute after:inset-0 hover:text-signal"
                >
                  {featuredCaseStudy.client}
                </Link>
              </h3>
              <p className="max-w-md text-muted-foreground">{featuredCaseStudy.summary}</p>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
              {featuredCaseStudy.results.map((r) => (
                <div key={r.label} className="flex flex-col gap-1 border-t border-border pt-3">
                  <dt className="order-2 text-small text-muted-foreground">{r.label}</dt>
                  <dd className="order-1 font-display text-h2 leading-none">
                    <CountUp
                      value={r.value}
                      decimals={r.decimals}
                      prefix={r.prefix}
                      suffix={r.suffix}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={cn("relative min-h-72", horizontal && "min-h-0")}>
            <ProjectVisual study={featuredCaseStudy} />
          </div>
        </article>

        {others.map((study, i) => (
          <article
            key={study.slug}
            data-panel
            className={cn(
              "group/panel relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card",
              horizontal ? "h-[62svh] w-[min(40vw,34rem)]" : "",
            )}
          >
            <div className={cn("relative overflow-hidden", horizontal ? "flex-1" : "aspect-4/3")}>
              <div className="size-full transition-transform duration-(--duration-slow) ease-out-expo group-hover/panel:scale-[1.03]">
                <ProjectVisual study={study} compact />
              </div>
            </div>
            <div className="flex flex-col gap-3 p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="eyebrow">
                  {categoryLabel[study.category]} · {industryName(study.industry)}
                </p>
                <span className="font-mono text-caption text-muted-foreground">0{i + 2}</span>
              </div>
              <h3 className="flex items-center justify-between gap-3 text-h3">
                <Link
                  href={`/work/${study.slug}/`}
                  data-cursor="View"
                  className="after:absolute after:inset-0 hover:text-signal"
                >
                  {study.client}
                </Link>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-6 shrink-0 transition-transform duration-(--duration-base) group-hover/panel:translate-x-1 group-hover/panel:-translate-y-1"
                />
              </h3>
              <p className="text-small text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {study.results[0]!.prefix}
                  {study.results[0]!.value.toLocaleString("en-IN")}
                  {study.results[0]!.suffix}
                </span>{" "}
                {study.results[0]!.label}
              </p>
            </div>
          </article>
        ))}

        {horizontal && (
          <div
            data-panel
            className="flex h-[62svh] w-[min(30vw,24rem)] flex-col items-start justify-center gap-6 px-4"
          >
            <p className="text-h2">Your startup could be next.</p>
            <AnimatedButton href="/work/">See all case studies</AnimatedButton>
          </div>
        )}
      </div>
    </section>
  );
}
