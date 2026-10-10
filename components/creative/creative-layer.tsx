"use client";

import dynamic from "next/dynamic";
import { GrainOverlay } from "./grain-overlay";
import { ScrollProgress } from "./scroll-progress";
import { Preloader } from "./preloader";

// Cursor is desktop-only: keep it out of the initial bundle
const CustomCursor = dynamic(() => import("./custom-cursor").then((m) => m.CustomCursor), {
  ssr: false,
});

/** Global, decorative creative layer. Everything here is aria-hidden. */
export function CreativeLayer() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <GrainOverlay />
      <CustomCursor />
    </>
  );
}
