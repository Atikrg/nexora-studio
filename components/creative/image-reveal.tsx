"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { duration, ease, viewport } from "@/lib/motion";

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  /** Direction the mask opens from. */
  from?: "bottom" | "top" | "left" | "right";
  delay?: number;
};

const hidden = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
} as const;

/**
 * Clip-path mask reveal with a subtle inner zoom-out. Wrap an <img>, device mockup or gradient.
 * The in-view trigger sits on an unclipped wrapper: browsers report a fully clipped element as
 * not intersecting, so observing the clipped node itself would never fire.
 */
export function ImageReveal({ children, className, from = "bottom", delay = 0 }: ImageRevealProps) {
  const mask: Variants = {
    hidden: { clipPath: hidden[from] },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: duration.reveal * 1.2, ease: ease.inOutQuart, delay },
    },
  };
  const zoom: Variants = {
    hidden: { scale: 1.15 },
    visible: {
      scale: 1,
      transition: { duration: duration.reveal * 1.6, ease: ease.outExpo, delay },
    },
  };
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={viewport} className={className}>
      <motion.div
        data-fade=""
        variants={mask}
        className="size-full overflow-hidden rounded-[inherit]"
      >
        <motion.div variants={zoom} className="size-full">
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
