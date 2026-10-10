import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"
import { LoaderCircle } from "lucide-react"

/**
 * Nexora button. Customised from shadcn (radix-nova):
 * - variants: primary (default), secondary, outline, ghost, link, glow, destructive
 * - sizes: sm (44px), md (48px), lg (56px) — every size meets the 44px touch target
 * - small icon sizes keep a 44px hit area through an invisible ::after
 * - `loading` state: spinner, aria-busy, disabled
 */
const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-(--duration-fast) ease-out-quart outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:not-aria-[haspopup]:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 aria-busy:cursor-progress aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-[color-mix(in_oklch,var(--primary),var(--foreground)_12%)]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_8%)] aria-expanded:bg-secondary",
        outline:
          "border-input bg-transparent text-foreground hover:border-foreground hover:bg-accent aria-expanded:bg-accent",
        ghost:
          "text-foreground hover:bg-accent hover:text-accent-foreground aria-expanded:bg-accent",
        link: "rounded-sm px-0! text-foreground underline decoration-signal decoration-2 underline-offset-[6px] hover:text-signal",
        glow: "bg-primary text-primary-foreground shadow-glow hover:shadow-[0_0_0_1px_var(--ignition),0_12px_48px_color-mix(in_oklch,var(--ignition),transparent_45%)]",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/30 dark:bg-destructive/20 dark:hover:bg-destructive/30",
      },
      size: {
        sm: "h-11 gap-1.5 px-4 text-small",
        default: "h-12 gap-2 px-5 text-small",
        md: "h-12 gap-2 px-5 text-small",
        lg: "h-14 gap-2.5 px-7 text-body",
        xs: "h-8 gap-1 px-3 text-caption after:absolute after:-inset-1.5 [&_svg:not([class*='size-'])]:size-3",
        icon: "size-11",
        "icon-xs":
          "size-7 after:absolute after:-inset-2 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-9 after:absolute after:-inset-1",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    /** Shows a spinner, sets aria-busy and disables the button. Ignored with asChild. */
    loading?: boolean
    /** Accessible text announced while loading. */
    loadingText?: string
  }

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  loading = false,
  loadingText = "Loading",
  disabled,
  children,
  ...props
}: ButtonProps) {
  if (asChild) {
    return (
      <Slot.Root
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Slot.Root>
    )
  }

  return (
    <button
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading ? (
        <>
          <LoaderCircle className="animate-spin" aria-hidden="true" />
          <span className="sr-only">{loadingText}</span>
          <span aria-hidden="true" className="contents">
            {children}
          </span>
        </>
      ) : (
        children
      )}
    </button>
  )
}

export { Button, buttonVariants, type ButtonProps }
