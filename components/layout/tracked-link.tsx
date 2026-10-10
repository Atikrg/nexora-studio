import type { ComponentProps } from "react";
import type { AnalyticsEvent } from "@/lib/analytics";

type TrackedLinkProps = ComponentProps<"a"> & {
  /** Documents intent; booking/WhatsApp clicks are recorded by the global listener in <Analytics />. */
  event?: AnalyticsEvent;
  /** Reported as the `location` prop of the event. */
  location: string;
  external?: boolean;
};

/** Anchor tagged for analytics (data-track-location). External links open in a new tab. */
export function TrackedLink({ event, location, external, children, ...props }: TrackedLinkProps) {
  return (
    <a
      data-track-event={event}
      data-track-location={location}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
