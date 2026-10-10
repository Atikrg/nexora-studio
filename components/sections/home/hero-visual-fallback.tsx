/**
 * Static "Ignition Core" poster: CSS + SVG only. It's the hero visual on mobile, low-end devices
 * and reduced motion, and it sits under the 3D canvas while that loads (no blank hero, no CLS).
 */
export function HeroVisualFallback() {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
      <div className="relative aspect-square w-[min(110vw,52rem)]">
        <div className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle_at_40%_35%,var(--ignition)_0%,color-mix(in_oklch,var(--ignition),transparent_55%)_32%,transparent_70%)] opacity-70 blur-2xl" />
        <div className="absolute inset-[34%] rounded-full bg-[radial-gradient(circle_at_35%_30%,color-mix(in_oklch,var(--foreground),transparent_70%),color-mix(in_oklch,var(--background),transparent_10%)_55%)] shadow-[inset_0_0_60px_color-mix(in_oklch,var(--ignition),transparent_60%)]" />
        <svg viewBox="0 0 400 400" className="absolute inset-0 size-full text-foreground">
          <g fill="none" stroke="currentColor" strokeOpacity="0.18">
            <ellipse cx="200" cy="200" rx="170" ry="62" transform="rotate(-18 200 200)" />
            <ellipse cx="200" cy="200" rx="140" ry="48" transform="rotate(28 200 200)" />
            <ellipse cx="200" cy="200" rx="188" ry="188" strokeDasharray="2 6" />
          </g>
          <circle cx="352" cy="146" r="4" fill="var(--ignition)" />
          <circle cx="84" cy="262" r="2.5" fill="currentColor" fillOpacity="0.5" />
        </svg>
      </div>
    </div>
  );
}
