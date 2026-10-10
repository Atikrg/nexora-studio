import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Nav link with a text "roll" on hover: the label slides up and an identical copy slides in
 * from below. The copy is aria-hidden; reduced motion makes the transition instant.
 */
export function RollLink({
  children,
  className,
  ...props
}: ComponentProps<typeof Link> & { children: string }) {
  return (
    <Link
      className={cn(
        "group/roll relative inline-flex min-h-11 items-center overflow-hidden rounded-full px-4 text-small font-medium",
        className,
      )}
      {...props}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-(--duration-base) ease-out-expo group-hover/roll:-translate-y-full group-focus-visible/roll:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full text-signal transition-transform duration-(--duration-base) ease-out-expo group-hover/roll:translate-y-0 group-focus-visible/roll:translate-y-0"
        >
          {children}
        </span>
      </span>
    </Link>
  );
}
