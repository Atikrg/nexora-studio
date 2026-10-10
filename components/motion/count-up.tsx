"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, ease } from "@/lib/motion";

type CountUpProps = {
  value: number;
  /** Decimal places to show. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Use Indian digit grouping (1,00,000) instead of 100,000. */
  locale?: string;
  className?: string;
};

/**
 * Counts from 0 to `value` when scrolled into view.
 * The final value is in the static HTML (SEO, no-JS) and in an sr-only span,
 * so screen readers never hear the intermediate numbers.
 */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  locale = "en-IN",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const format = (n: number) =>
    `${prefix}${n.toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;
  const finalText = format(value);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !inView) return;
    const controls = animate(0, value, {
      duration: duration.reveal * 1.6,
      ease: ease.outExpo,
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });
    return () => controls.stop();
    // format is derived from stable props
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {finalText}
      </span>
      <span className="sr-only">{finalText}</span>
    </span>
  );
}
