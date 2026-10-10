"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { duration, ease } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Route transition, used from app/template.tsx (remounts on every navigation).
 * A curtain in the signal colour wipes off the new page, and content fades up underneath.
 * Skipped on the very first page load, so it never delays LCP.
 */
let hasNavigated = false;

export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  // Read once per mount: false on the initial page load, true after any client navigation
  const [afterNavigation] = useState(() => hasNavigated);
  useEffect(() => {
    hasNavigated = true;
  }, []);
  const animate = afterNavigation && !reduced;

  if (!animate) return <>{children}</>;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-85 origin-top bg-primary"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: duration.page, ease: ease.inOutQuart }}
      />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration.page, ease: ease.outExpo, delay: duration.page * 0.35 }}
      >
        {children}
      </motion.div>
    </>
  );
}
