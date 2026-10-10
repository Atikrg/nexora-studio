"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Check, X } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { transition } from "@/lib/motion";

export type ButtonStatus = "idle" | "loading" | "success" | "error";

type BaseProps = Omit<ButtonProps, "asChild" | "loading" | "children"> & {
  children: ReactNode;
  /** Arrow that slides on hover. `external` uses ↗ for off-site links. */
  arrow?: "right" | "external" | false;
};

type AnimatedButtonProps =
  | (BaseProps & {
      href?: undefined;
      status?: ButtonStatus;
      successText?: string;
      errorText?: string;
    })
  | (BaseProps & {
      href: string;
      /** Opens in a new tab with rel="noopener noreferrer". */
      external?: boolean;
      status?: never;
    } & Pick<ComponentProps<typeof Link>, "prefetch" | "scroll">);

function ArrowIcon({ kind }: { kind: "right" | "external" }) {
  const Icon = kind === "external" ? ArrowUpRight : ArrowRight;
  return (
    <span
      aria-hidden="true"
      className="relative inline-flex size-4 overflow-hidden"
      data-icon="inline-end"
    >
      <Icon className="absolute inset-0 transition-transform duration-(--duration-base) ease-out-expo group-hover/button:translate-x-full group-focus-visible/button:translate-x-full" />
      <Icon className="absolute inset-0 -translate-x-full transition-transform duration-(--duration-base) ease-out-expo group-hover/button:translate-x-0 group-focus-visible/button:translate-x-0" />
    </span>
  );
}

/**
 * CTA button with: arrow slide on hover, press scale (from Button),
 * and idle → loading → success/error morph for form submits.
 * Pass `href` to render a link (internal via next/link, or external).
 */
export function AnimatedButton(props: AnimatedButtonProps) {
  const { children, arrow = "right", className, ...rest } = props;

  if (props.href !== undefined) {
    const { href, external, prefetch, scroll, ...buttonProps } = rest as Extract<
      AnimatedButtonProps,
      { href: string }
    >;
    const content = (
      <>
        <span>{children}</span>
        {arrow && <ArrowIcon kind={external ? "external" : arrow} />}
      </>
    );
    return (
      <Button asChild className={className} {...buttonProps}>
        {external ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {content}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          <Link href={href} prefetch={prefetch} scroll={scroll}>
            {content}
          </Link>
        )}
      </Button>
    );
  }

  const {
    status = "idle",
    successText = "Sent",
    errorText = "Try again",
    ...buttonProps
  } = rest as Extract<AnimatedButtonProps, { href?: undefined }>;

  const label = status === "success" ? successText : status === "error" ? errorText : children;

  return (
    <Button
      loading={status === "loading"}
      data-status={status}
      className={cn(
        "overflow-hidden",
        status === "success" && "bg-success text-success-foreground hover:bg-success",
        status === "error" && "animate-shake",
        className,
      )}
      {...buttonProps}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={status}
          className="inline-flex items-center gap-2"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={transition.base}
        >
          {status === "success" && <Check aria-hidden="true" />}
          {status === "error" && <X aria-hidden="true" />}
          <span>{label}</span>
          {status === "idle" && arrow && <ArrowIcon kind={arrow} />}
        </motion.span>
      </AnimatePresence>
      <span role="status" aria-live="polite" className="sr-only">
        {status === "success" ? successText : status === "error" ? errorText : ""}
      </span>
    </Button>
  );
}
