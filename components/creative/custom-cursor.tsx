"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { spring } from "@/lib/motion";
import { useMotionOk } from "@/hooks/use-motion-ok";
import { useMediaQuery } from "@/hooks/use-media-query";

type CursorState = { variant: "default" | "link" | "label"; label?: string };

/**
 * Dot + follower ring. Grows over links/buttons; shows a label over [data-cursor="View|Drag|…"].
 * Desktop with a fine pointer and motion allowed only. The native cursor stays visible over
 * text fields, and focus rings are untouched (keyboard users never depend on this).
 */
export function CustomCursor() {
  const motionOk = useMotionOk();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const enabled = motionOk && finePointer;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, spring.cursor);
  const ringY = useSpring(y, spring.cursor);
  const [state, setState] = useState<CursorState>({ variant: "default" });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setState({ variant: "label", label: labelled.dataset.cursor });
      } else if (target?.closest("a, button, [role='button'], label, summary, [role='tab']")) {
        setState({ variant: "link" });
      } else {
        setState({ variant: "default" });
      }
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize = state.variant === "label" ? 88 : state.variant === "link" ? 56 : 32;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-80">
      <motion.div
        className="absolute top-0 left-0 size-1.5 rounded-full bg-primary"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible && state.variant !== "label" ? 1 : 0 }}
      />
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-foreground/40 font-mono text-caption tracking-[0.08em] text-primary-foreground uppercase"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          backgroundColor: state.variant === "label" ? "var(--primary)" : "rgba(0,0,0,0)",
          borderColor: state.variant === "label" ? "var(--primary)" : "var(--muted-foreground)",
        }}
        transition={spring.cursor}
      >
        <AnimatePresence>
          {state.variant === "label" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
            >
              {state.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
