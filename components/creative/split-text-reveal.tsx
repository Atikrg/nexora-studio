"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { splitReveal, scrollTrigger } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type SplitTextRevealProps = {
  children: ReactNode;
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4";
  className?: string;
  id?: string;
  /** "lines" for paragraphs/headings, "words" for short display lines. */
  by?: "lines" | "words";
  /** Start immediately (hero) instead of on scroll. */
  immediate?: boolean;
  delay?: number;
};

/**
 * Lines/words slide up out of masks. Accessibility: SplitText's aria:"auto" puts the full
 * text in an aria-label on the element and marks the split spans aria-hidden.
 * Reduced motion / no JS: plain, fully visible text.
 * `immediate` headings are pre-hidden by CSS only when html.motion-ok (set before paint),
 * with a CSS failsafe that reveals them after 1.5s if JS never runs.
 */
export function SplitTextReveal({
  children,
  as: Tag = "div",
  className,
  id,
  by = "lines",
  immediate = false,
  delay = 0,
}: SplitTextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (reduced) {
        gsap.set(el, { autoAlpha: 1 });
        return;
      }
      const split = SplitText.create(el, {
        type: by === "lines" ? "lines" : "words,lines",
        mask: by,
        aria: "auto",
        autoSplit: true,
        linesClass: "split-line",
        wordsClass: "split-word",
        onSplit(self) {
          gsap.set(el, { autoAlpha: 1 });
          return gsap.from(by === "lines" ? self.lines : self.words, {
            ...splitReveal,
            delay,
            scrollTrigger: immediate ? undefined : { trigger: el, ...scrollTrigger.reveal },
          });
        },
      });
      return () => split.revert();
    },
    { scope: ref, dependencies: [reduced, by, immediate, delay] },
  );

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      id={id}
      data-split={immediate ? "immediate" : ""}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
