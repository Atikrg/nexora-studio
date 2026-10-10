"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { fadeUp, stagger as staggerTokens, staggerContainer, viewport } from "@/lib/motion";

type StaggerProps = HTMLMotionProps<"div"> & {
  /** Seconds between children. */
  each?: number;
  delay?: number;
  as?: "div" | "ul" | "ol" | "section";
};

/** Staggers its <StaggerItem> children into view. */
export function Stagger({
  each = staggerTokens.base,
  delay = 0,
  as = "div",
  children,
  ...props
}: StaggerProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(each, delay)}
      {...props}
    >
      {children}
    </Component>
  );
}

type StaggerItemProps = HTMLMotionProps<"div"> & { as?: "div" | "li" | "article" };

export function StaggerItem({ as = "div", children, ...props }: StaggerItemProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component data-fade="" variants={fadeUp} {...props}>
      {children}
    </Component>
  );
}
