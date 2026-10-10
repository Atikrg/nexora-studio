import type { ClientLogo } from "@/types/content";
import { cn } from "@/lib/utils";

/** Text wordmark for a (placeholder) client logo. No image files needed. */
export function ClientWordmark({ logo, className }: { logo: ClientLogo; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground",
        logo.style === "serif" && "font-serif text-[1.75rem] italic",
        logo.style === "sans" && "font-display text-[1.5rem] font-bold tracking-[-0.04em]",
        logo.style === "mono" && "font-mono text-[1.25rem] font-medium tracking-tight uppercase",
        logo.style === "rounded" && "font-sans text-[1.5rem] font-semibold tracking-[-0.03em]",
        className,
      )}
    >
      {logo.mark === "dot" && (
        <span aria-hidden="true" className="size-2.5 rounded-full bg-current" />
      )}
      {logo.mark === "ring" && (
        <span aria-hidden="true" className="size-4 rounded-full border-[3px] border-current" />
      )}
      {logo.mark === "slash" && (
        <span aria-hidden="true" className="h-5 w-1 rotate-[20deg] rounded-full bg-current" />
      )}
      {logo.mark === "bars" && (
        <span aria-hidden="true" className="flex items-end gap-0.5">
          <span className="h-2 w-1 bg-current" />
          <span className="h-3 w-1 bg-current" />
          <span className="h-4 w-1 bg-current" />
        </span>
      )}
      {logo.name}
    </span>
  );
}
