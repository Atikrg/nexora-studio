"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ease } from "@/lib/motion";

type RotatingWordProps = {
  words: string[];
  /** ms per word. */
  interval?: number;
  /** Stop after this many full cycles (WCAG 2.2.2: no endless auto-updating text). */
  cycles?: number;
  className?: string;
};

/**
 * Visual-only rotating word. Screen readers get the full sentence from the parent's sr-only text,
 * so this whole element is aria-hidden. Reduced motion: shows the first word, static.
 * The longest word reserves the width invisibly, so the line never shifts the layout.
 */
export function RotatingWord({ words, interval = 2200, cycles = 2, className }: RotatingWordProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  useEffect(() => {
    if (reduced) return;
    const total = words.length * cycles - 1;
    let step = 0;
    const id = window.setInterval(() => {
      step += 1;
      setIndex(step % words.length);
      if (step >= total) window.clearInterval(id);
    }, interval);
    return () => window.clearInterval(id);
  }, [reduced, words.length, interval, cycles]);

  return (
    <span aria-hidden="true" className={className}>
      <span className="relative inline-grid overflow-clip pr-[0.12em] pb-[0.12em] align-bottom">
        <span className="invisible col-start-1 row-start-1">{longest}</span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={words[index]}
            className="col-start-1 row-start-1"
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            exit={{ y: "-105%" }}
            transition={{ duration: 0.7, ease: ease.outExpo }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
