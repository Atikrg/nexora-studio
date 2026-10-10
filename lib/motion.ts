/**
 * Shared motion language — "Launch Control".
 * Fast in, precise, never floaty. One source of truth for Framer Motion (`motion`),
 * GSAP and CSS (CSS mirrors live in app/globals.css → --ease-*, --duration-*).
 */
import type { Transition, Variants } from "motion/react";

/* ---------------------------------------------------------------- Easing */

/** Cubic-bezier tuples for Framer Motion / CSS. */
export const ease = {
  /** Default for reveals and UI. Snappy start, long settle. */
  outExpo: [0.16, 1, 0.3, 1],
  /** Hovers, small UI feedback. */
  outQuart: [0.25, 1, 0.5, 1],
  /** Page transitions, curtains, things that leave and return. */
  inOutQuart: [0.76, 0, 0.24, 1],
} as const satisfies Record<string, readonly [number, number, number, number]>;

/** GSAP equivalents (built-in eases, no CustomEase plugin needed). */
export const gsapEase = {
  outExpo: "expo.out",
  outQuart: "power4.out",
  inOutQuart: "power4.inOut",
  linear: "none",
} as const;

/* ------------------------------------------------------------- Durations */

/** Seconds (Framer Motion + GSAP both use seconds). */
export const duration = {
  instant: 0.12,
  fast: 0.16, // hovers, presses
  base: 0.32, // UI transitions (accordion, tabs, menus)
  slow: 0.64, // section reveals
  reveal: 0.9, // headline line reveals
  page: 0.7, // route transitions
  preloader: 1.2, // hard cap (UX brief §7.3)
} as const;

export const stagger = {
  tight: 0.04, // letters / chars
  base: 0.08, // words, list items
  loose: 0.12, // cards
} as const;

/** Travel distances in px — small, so motion never displaces reading. */
export const distance = {
  sm: 12,
  md: 24,
  lg: 48,
} as const;

/* --------------------------------------------------------------- Springs */

export const spring = {
  /** Buttons press/release. */
  press: { type: "spring", stiffness: 500, damping: 30, mass: 0.6 },
  /** Magnetic pull on CTAs. */
  magnetic: { type: "spring", stiffness: 180, damping: 15, mass: 0.3 },
  /** Cursor follower ring. */
  cursor: { type: "spring", stiffness: 350, damping: 35, mass: 0.4 },
  /** Layout animations (portfolio filter, sliding indicators). */
  layout: { type: "spring", stiffness: 380, damping: 36 },
} as const satisfies Record<string, Transition>;

/* ------------------------------------------------- Framer Motion presets */

export const transition = {
  base: { duration: duration.base, ease: ease.outExpo },
  slow: { duration: duration.slow, ease: ease.outExpo },
  hover: { duration: duration.fast, ease: ease.outQuart },
  page: { duration: duration.page, ease: ease.inOutQuart },
} as const satisfies Record<string, Transition>;

/** Viewport config for whileInView — trigger once, slightly before fully visible. */
export const viewport = { once: true, amount: 0.25, margin: "0px 0px -10% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: distance.md },
  visible: { opacity: 1, y: 0, transition: transition.slow },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.slow },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transition.slow },
};

export const staggerContainer = (each: number = stagger.base, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: each, delayChildren } },
});

/** Reduced-motion variants: opacity only, no travel. */
export const reducedFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.fast } },
};

/* --------------------------------------------------------- GSAP presets */

export const gsapDefaults = {
  duration: duration.slow,
  ease: gsapEase.outExpo,
} as const;

/** Split-text line reveal (lines slide up out of masks). */
export const splitReveal = {
  yPercent: 110,
  duration: duration.reveal,
  ease: gsapEase.outExpo,
  stagger: stagger.base,
} as const;

/** ScrollTrigger start/end conventions. */
export const scrollTrigger = {
  reveal: { start: "top 85%", once: true },
  scrub: { start: "top top", end: "+=200%", scrub: 0.6 },
} as const;

/** Marquee base speed (px/s) and how strongly it reacts to scroll velocity. */
export const marquee = {
  speed: 60,
  velocityFactor: 0.004,
  maxBoost: 4,
} as const;
