import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** 1280px max-width container with fluid gutters. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("container-site", className)} {...props} />;
}
