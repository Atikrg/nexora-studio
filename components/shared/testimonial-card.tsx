import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Testimonial } from "@/types/content";
import { cn } from "@/lib/utils";

const initials = (name: string) =>
  name
    .replace(/^Dr\.?\s+/i, "")
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/** Testimonial as a <figure>: stars (with text), quote, avatar (initials fallback), name, role. */
export function TestimonialCard({
  testimonial,
  className,
  large = false,
}: {
  testimonial: Testimonial;
  className?: string;
  large?: boolean;
}) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col justify-between gap-8 rounded-3xl border border-border bg-card p-6 md:p-8",
        className,
      )}
    >
      <div className="flex flex-col gap-5">
        <div
          className="flex gap-0.5"
          role="img"
          aria-label={`Rated ${testimonial.rating} out of 5`}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              aria-hidden="true"
              className={cn(
                "size-4",
                i < testimonial.rating ? "fill-primary text-primary" : "text-border",
              )}
            />
          ))}
        </div>
        <blockquote
          className={cn(
            "text-pretty",
            large ? "font-display text-h3 leading-snug" : "text-body-lg",
          )}
        >
          <p>&ldquo;{testimonial.quote}&rdquo;</p>
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-3">
        <Avatar className="size-12 border border-border">
          <AvatarFallback className="bg-muted font-mono text-small">
            {initials(testimonial.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold">{testimonial.name}</span>
          <span className="text-small text-muted-foreground">
            {testimonial.role}, {testimonial.company} · {testimonial.location}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
