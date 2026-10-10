import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = ComponentProps<"section"> & {
  /** Skip the inner container (full-bleed sections such as marquees). */
  bleed?: boolean;
  /** Surface tone. "inverse" flips to the opposite theme colours for contrast moments. */
  tone?: "default" | "muted" | "inverse";
  containerClassName?: string;
};

/**
 * Page section: vertical rhythm (72px → 128px), optional container, tone.
 * Pass `aria-labelledby` pointing at the SectionHeading id.
 */
export function Section({
  className,
  containerClassName,
  bleed = false,
  tone = "default",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-tone={tone}
      className={cn(
        "relative section-y",
        tone === "muted" && "bg-muted",
        tone === "inverse" &&
          "bg-foreground text-background [--muted-foreground:color-mix(in_oklch,var(--background),var(--foreground)_38%)]",
        className,
      )}
      {...props}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
