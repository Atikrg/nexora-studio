"use client";

/**
 * Single GSAP entry point. Import gsap/ScrollTrigger/SplitText/useGSAP from here,
 * never from "gsap" directly, so plugins are registered exactly once.
 * Cleanup: always animate inside useGSAP (auto-reverts on unmount/route change).
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { gsapDefaults } from "./motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults(gsapDefaults);
  // Mobile URL-bar resizes shouldn't re-trigger layout calculations
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
