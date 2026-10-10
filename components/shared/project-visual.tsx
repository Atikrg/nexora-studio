import type { CSSProperties } from "react";
import type { CaseStudy } from "@/types/content";
import { cn } from "@/lib/utils";

type ProjectVisualProps = {
  study: Pick<CaseStudy, "client" | "tagline" | "visual" | "results">;
  className?: string;
  /** Compact = fewer details, for small cards. */
  compact?: boolean;
};

/**
 * Generated device mockup with sample UI. It stands in for real project screenshots, so no
 * stock photos are needed. The tint comes from the case study's `visual.hue` (content data).
 * The mockup is a single role="img" with a text description.
 * DUMMY: replace before launch with real screenshots inside the same frames if you prefer.
 */
export function ProjectVisual({ study, className, compact = false }: ProjectVisualProps) {
  const { hue, device } = study.visual;
  const style = {
    "--pv-hue": hue,
    "--pv-tint": `oklch(0.68 0.16 ${hue})`,
    "--pv-tint-soft": `oklch(0.68 0.16 ${hue} / 0.18)`,
    background: `radial-gradient(120% 90% at 20% 10%, oklch(0.72 0.17 ${hue} / 0.55), transparent 60%), radial-gradient(90% 80% at 90% 100%, oklch(0.55 0.2 ${(hue + 40) % 360} / 0.5), transparent 60%), var(--card)`,
  } as CSSProperties;

  return (
    <div
      role="img"
      aria-label={`${study.client} ${device === "phone" ? "app" : device === "feed" ? "social feed" : device === "flow" ? "automation flow" : "website"} mockup`}
      className={cn(
        "relative isolate flex size-full items-center justify-center overflow-hidden",
        className,
      )}
      style={style}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07]"
      />
      {device === "browser" && <BrowserMock study={study} compact={compact} />}
      {device === "phone" && <PhoneMock study={study} compact={compact} />}
      {device === "feed" && <FeedMock study={study} compact={compact} />}
      {device === "flow" && <FlowMock study={study} compact={compact} />}
    </div>
  );
}

type MockProps = { study: ProjectVisualProps["study"]; compact: boolean };

const bar = "rounded-full bg-foreground/15";

function BrowserMock({ study, compact }: MockProps) {
  const domain = `${study.client.toLowerCase().replace(/[^a-z]/g, "")}.com`;
  return (
    <div className="w-[86%] overflow-hidden rounded-xl border border-foreground/10 bg-background shadow-lift">
      <div className="flex items-center gap-2 border-b border-foreground/10 px-3 py-2">
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-foreground/20" />
          <span className="size-2 rounded-full bg-foreground/20" />
          <span className="size-2 rounded-full bg-foreground/20" />
        </span>
        <span className="mx-auto rounded-md bg-muted px-3 py-0.5 font-mono text-[0.625rem] text-muted-foreground">
          {domain}
        </span>
      </div>
      <div className="flex flex-col gap-3 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="font-display text-[0.8rem] font-bold">{study.client}</span>
          <span className="flex gap-2">
            <span className={cn(bar, "h-1.5 w-8")} />
            <span className={cn(bar, "h-1.5 w-8")} />
            <span className="h-4 w-12 rounded-full bg-(--pv-tint)" />
          </span>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <span className="font-display text-[clamp(0.9rem,2.2vw,1.6rem)] leading-tight font-bold tracking-tight">
            {study.tagline}
          </span>
          <span className={cn(bar, "h-1.5 w-3/4")} />
          <span className={cn(bar, "h-1.5 w-1/2")} />
        </div>
        <div className="flex gap-2">
          <span className="h-5 w-20 rounded-full bg-(--pv-tint)" />
          <span className="h-5 w-16 rounded-full border border-foreground/20" />
        </div>
        {!compact && (
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex flex-col gap-1.5 rounded-lg border border-foreground/10 bg-muted/60 p-2"
              >
                <span className="size-4 rounded bg-(--pv-tint-soft)" />
                <span className={cn(bar, "h-1 w-full")} />
                <span className={cn(bar, "h-1 w-2/3")} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PhoneMock({ study, compact }: MockProps) {
  const metric = study.results[0];
  return (
    <div className="relative aspect-[9/19] h-[86%] max-h-[34rem] rounded-[2.2rem] border-[6px] border-foreground/85 bg-background p-3 shadow-lift">
      <span className="absolute top-2 left-1/2 h-4 w-16 -translate-x-1/2 rounded-full bg-foreground/85" />
      <div className="mt-6 flex h-[calc(100%-1.5rem)] flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="font-display text-[0.75rem] font-bold">{study.client}</span>
          <span className="size-5 rounded-full bg-(--pv-tint-soft)" />
        </div>
        <div className="rounded-xl bg-(--pv-tint) p-3 text-ink">
          <span className="block text-[0.55rem] font-medium opacity-80">{metric?.label}</span>
          <span className="block font-display text-[1.1rem] leading-tight font-bold">
            {metric?.prefix}
            {metric?.value.toLocaleString("en-IN")}
            {metric?.suffix}
          </span>
        </div>
        {[0, 1, compact ? null : 2, compact ? null : 3]
          .filter((i) => i !== null)
          .map((i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg border border-foreground/10 p-2"
            >
              <span className="size-6 shrink-0 rounded-md bg-(--pv-tint-soft)" />
              <span className="flex flex-1 flex-col gap-1">
                <span className={cn(bar, "h-1 w-4/5")} />
                <span className={cn(bar, "h-1 w-1/2")} />
              </span>
            </div>
          ))}
        <div className="mt-auto flex justify-around border-t border-foreground/10 pt-2">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn("size-3 rounded", i === 0 ? "bg-(--pv-tint)" : "bg-foreground/15")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FeedMock({ study, compact }: MockProps) {
  const tiles = compact ? 6 : 9;
  return (
    <div className="w-[min(78%,26rem)] rounded-2xl border border-foreground/10 bg-background p-3 shadow-lift">
      <div className="mb-3 flex items-center gap-2">
        <span className="size-8 rounded-full bg-(--pv-tint) p-0.5">
          <span className="block size-full rounded-full border-2 border-background bg-(--pv-tint-soft)" />
        </span>
        <span className="flex flex-col">
          <span className="text-[0.7rem] font-semibold">
            {study.client.toLowerCase().replace(/\s/g, "")}
          </span>
          <span className="text-[0.55rem] text-muted-foreground">{study.tagline}</span>
        </span>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: tiles }, (_, i) => (
          <span
            key={i}
            className="relative aspect-square rounded-sm"
            style={{
              background: `linear-gradient(${40 * i}deg, oklch(0.7 0.15 calc(var(--pv-hue) + ${i * 12})), oklch(0.45 0.12 calc(var(--pv-hue) + ${i * 20})))`,
            }}
          >
            {i % 3 === 0 && (
              <span className="absolute top-1 right-1 size-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-white/90" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function FlowMock({ study, compact }: MockProps) {
  const nodes = compact
    ? ["WhatsApp", "AI reply", "CRM"]
    : ["WhatsApp", "AI reply", "Booking", "CRM"];
  return (
    <div className="flex w-[88%] flex-col items-stretch gap-0 sm:flex-row sm:items-center">
      {nodes.map((node, i) => (
        <div key={node} className="flex flex-1 flex-col items-center sm:flex-row">
          <div className="flex w-full flex-col gap-1.5 rounded-xl border border-foreground/10 bg-background p-3 shadow-soft">
            <span className="flex items-center gap-1.5">
              <span
                className={cn("size-2 rounded-full", i === 0 ? "bg-success" : "bg-(--pv-tint)")}
              />
              <span className="font-mono text-[0.6rem] tracking-wide uppercase">{node}</span>
            </span>
            <span className={cn(bar, "h-1 w-full")} />
            <span className={cn(bar, "h-1 w-2/3")} />
          </div>
          {i < nodes.length - 1 && (
            <span className="h-4 w-px bg-(--pv-tint) sm:h-px sm:w-6 sm:shrink-0" />
          )}
        </div>
      ))}
      <span className="sr-only">{study.client}</span>
    </div>
  );
}
