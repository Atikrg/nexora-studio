"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LenisContext } from "@/hooks/use-lenis";
import { useMotionOk } from "@/hooks/use-motion-ok";
import { useIsTouch } from "@/hooks/use-is-touch";

/**
 * Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in sync.
 * Off for touch devices (native momentum is better), reduced motion and low-end devices.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const motionOk = useMotionOk();
  const isTouch = useIsTouch();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!motionOk || isTouch) return;
    const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -96 } });
    const raf = (time: number) => instance.raf(time * 1000);
    instance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- publishing an external instance
    setLenis(instance);
    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenis(null);
    };
  }, [motionOk, isTouch]);

  // New route: jump to top and recalculate triggers once the new page has laid out
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
