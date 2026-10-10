import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Section number, rendered as [02]. */
  number?: string | number;
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** id for aria-labelledby on the parent <section>. */
  id?: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  size?: "display" | "h1" | "h2";
  className?: string;
  /** Slot for a right-aligned action (e.g. "View all work" link) on desktop. */
  action?: ReactNode;
};

/**
 * Launch Control section heading: `[02] — EYEBROW`, title, subtitle.
 * Highlight one word in the title with <em> → serif italic in the signal colour.
 */
export function SectionHeading({
  number,
  eyebrow,
  title,
  subtitle,
  id,
  as: Heading = "h2",
  align = "left",
  size = "h1",
  className,
  action,
}: SectionHeadingProps) {
  const label = number !== undefined ? `[${String(number).padStart(2, "0")}]` : null;
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-6 md:mb-16 lg:flex-row lg:items-end lg:justify-between",
        align === "center" && "items-center text-center lg:flex-col lg:items-center",
        className,
      )}
    >
      <div className={cn("flex max-w-4xl flex-col gap-5", align === "center" && "items-center")}>
        <p className="flex items-center gap-3 eyebrow">
          {label && <span className="text-signal">{label}</span>}
          <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
          <span>{eyebrow}</span>
        </p>
        <Heading
          id={id}
          className={cn(
            size === "display" && "text-display",
            size === "h1" && "text-h1",
            size === "h2" && "text-h2",
            "[&_em]:font-serif [&_em]:font-normal [&_em]:tracking-normal [&_em]:text-signal",
          )}
        >
          {title}
        </Heading>
        {subtitle && (
          <p
            className={cn(
              "prose-width text-body-lg text-muted-foreground",
              align === "center" && "mx-auto",
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
