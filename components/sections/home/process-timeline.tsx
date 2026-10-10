"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PinnedSection } from "@/components/creative/pinned-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { useMotionOk } from "@/hooks/use-motion-ok";
import { useMediaQuery } from "@/hooks/use-media-query";
import { process } from "@/data/home";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * 08 · Process: Discover → Design → Build → Launch → Grow.
 * Desktop + motion: pinned and scroll-scrubbed. A progress rail fills and the active step's
 * detail swaps in. Otherwise: a readable vertical timeline with every step visible.
 */
export function ProcessTimeline({ number = 5 }: { number?: number }) {
  const motionOk = useMotionOk();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const pinned = motionOk && isDesktop;
  const [active, setActive] = useState(0);
  const steps = process.steps;

  const heading = (
    <SectionHeading
      number={number}
      eyebrow={process.eyebrow}
      id="process-title"
      title={process.title}
    />
  );

  if (!pinned) {
    return (
      <section aria-labelledby="process-title" className="section-y">
        <div className="container-site">
          {heading}
          <ol className="relative flex flex-col gap-10 border-l border-border pl-8">
            {steps.map((step) => (
              <li key={step.number} className="relative flex flex-col gap-2">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-[2.3rem] size-3 rounded-full border-2 border-primary bg-background"
                />
                <p className="eyebrow">
                  <span className="text-signal">{step.number}</span> · {step.duration}
                </p>
                <h3 className="text-h3">{step.title}</h3>
                <p className="prose-width text-muted-foreground">{step.body}</p>
                <p className="text-small">
                  <span className="text-muted-foreground">You get: </span>
                  {step.deliverable}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  const current = steps[active]!;
  return (
    <section aria-labelledby="process-title">
      <PinnedSection
        length={2.5}
        onProgress={(p) => {
          const next = Math.min(steps.length - 1, Math.floor(p * steps.length));
          setActive((prev) => (prev === next ? prev : next));
        }}
        className="h-svh"
      >
        <div className="container-site flex h-full flex-col justify-center pt-20">
          {heading}
          {/* Screen readers get every step at once; the animated display below is visual only */}
          <ol className="sr-only">
            {steps.map((step) => (
              <li key={step.number}>
                {step.number} {step.title}, {step.duration}. {step.body} You get: {step.deliverable}
                .
              </li>
            ))}
          </ol>
          <div className="grid grid-cols-12 gap-8" aria-hidden="true">
            {/* Big step display */}
            <div className="col-span-7 flex flex-col gap-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.number}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -32 }}
                  transition={{ duration: 0.45, ease: ease.outExpo }}
                  className="flex flex-col gap-5"
                >
                  <p className="eyebrow">
                    <span className="text-signal">{current.number}</span> · {current.duration}
                  </p>
                  <h3 className="text-display">{current.title}</h3>
                  <p className="prose-width text-body-lg text-muted-foreground">{current.body}</p>
                  <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-4 py-2 text-small">
                    <span className="text-muted-foreground">You get</span>
                    <span className="font-medium">{current.deliverable}</span>
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Rail */}
            <ol className="col-span-4 col-start-9 flex flex-col justify-center">
              {steps.map((step, i) => (
                <li key={step.number} className="relative flex items-center gap-5 py-3">
                  <span className="relative flex h-full w-px self-stretch bg-border">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 origin-top bg-primary"
                      style={{
                        height: "100%",
                        transform: `scaleY(${i < active ? 1 : i === active ? 0.5 : 0})`,
                        transition: "transform 400ms var(--ease-out-expo)",
                      }}
                    />
                  </span>
                  <span
                    className={cn(
                      "font-mono text-caption transition-colors duration-(--duration-base)",
                      i <= active ? "text-signal" : "text-muted-foreground",
                    )}
                  >
                    {step.number}
                  </span>
                  <span
                    className={cn(
                      "font-display text-h4 transition-[color,opacity] duration-(--duration-base)",
                      i === active ? "text-foreground" : "text-muted-foreground opacity-60",
                    )}
                  >
                    {step.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </PinnedSection>
    </section>
  );
}
