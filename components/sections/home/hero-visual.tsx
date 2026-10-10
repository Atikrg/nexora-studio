"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useMotionOk } from "@/hooks/use-motion-ok";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { HeroVisualFallback } from "./hero-visual-fallback";

// three / R3F / drei live in their own chunk and are never part of the initial bundle
const Hero3D = dynamic(() => import("@/components/creative/hero-3d"), { ssr: false });

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Hero visual: static poster first (server-rendered, zero JS), then on capable desktops the
 * 3D "Ignition Core" loads after the browser is idle and cross-fades in. Mobile, low-end,
 * reduced motion or no WebGL: the poster is the final visual. The hero text never waits.
 */
export function HeroVisual() {
  const motionOk = useMotionOk();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!motionOk || !isDesktop || !supportsWebGL()) return;
    const start = () => setLoad(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(start, 1200);
    return () => window.clearTimeout(t);
  }, [motionOk, isDesktop]);

  return (
    <>
      <div
        className={cn("absolute inset-0 transition-opacity duration-1000", ready && "opacity-0")}
      >
        <HeroVisualFallback />
      </div>
      {load && (
        <div
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-1000",
            ready && "opacity-100",
          )}
        >
          <Hero3D onReady={() => setReady(true)} />
        </div>
      )}
    </>
  );
}
