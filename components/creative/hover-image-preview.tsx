"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { spring } from "@/lib/motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMotionOk } from "@/hooks/use-motion-ok";

export type HoverPreviewItem = {
  href: string;
  title: string;
  meta: string;
  /** Either an image URL… */
  image?: string;
  /** …or any rendered preview (e.g. a generated ProjectVisual mockup). Decorative. */
  preview?: ReactNode;
};

/**
 * Big-type project list. On desktop, hovering a row shows a floating image that follows the
 * cursor. Touch/reduced motion: a clean list, no floating image. Links are ordinary links.
 */
export function HoverImagePreview({ items }: { items: HoverPreviewItem[] }) {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const motionOk = useMotionOk();
  const enabled = finePointer && motionOk;
  const [active, setActive] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), spring.cursor);
  const y = useSpring(useMotionValue(0), spring.cursor);
  const current = active !== null ? items[active] : undefined;

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        if (!enabled) return;
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ul className="border-t border-border">
        {items.map((item, i) => (
          <li key={item.href} className="border-b border-border">
            <Link
              href={item.href}
              data-cursor="View"
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(null)}
              className="group/row flex items-baseline justify-between gap-6 py-6 transition-colors md:py-8"
            >
              <span className="font-display text-h2 transition-[color,transform] duration-(--duration-base) ease-out-expo group-hover/row:translate-x-2 group-hover/row:text-signal">
                {item.title}
              </span>
              <span className="flex shrink-0 items-center gap-3 text-small text-muted-foreground">
                <span className="hidden sm:inline">{item.meta}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 transition-transform duration-(--duration-base) group-hover/row:translate-x-1 group-hover/row:-translate-y-1"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {enabled && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed top-0 left-0 z-40 aspect-4/3 w-80 overflow-hidden rounded-xl shadow-lift"
          style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        >
          <AnimatePresence mode="popLayout">
            {current && (
              <motion.div
                key={current.href}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {current.preview ?? (current.image ? <Image src={current.image} alt="" fill sizes="320px" className="object-cover" /> : null)}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
