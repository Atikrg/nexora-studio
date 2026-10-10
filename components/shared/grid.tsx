import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** 4 / 8 / 12-column site grid. Children use col-span-* to place themselves. */
export function Grid({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("grid-site gap-y-8", className)} {...props} />;
}
