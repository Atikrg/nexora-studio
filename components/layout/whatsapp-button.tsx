"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { defaultWhatsappMessage, whatsappUrl } from "@/lib/links";
import { site } from "@/data/site";
import { WhatsAppIcon } from "./whatsapp-icon";

/**
 * Floating WhatsApp button (desktop/tablet). On mobile it lives inside the sticky CTA bar instead,
 * so there's only one bottom element. Soft pulse ring is decorative and stops for reduced motion.
 */
export function WhatsAppButton() {
  return (
    <div className="fixed right-5 bottom-5 z-40 hidden md:block">
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={whatsappUrl(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            data-track-location="floating"
            className="group/wa relative flex size-14 items-center justify-center rounded-full bg-success text-success-foreground shadow-lift transition-transform duration-(--duration-fast) ease-out-quart hover:scale-105 focus-visible:ring-3 focus-visible:ring-ring active:scale-95"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 animate-pulse-ring rounded-full bg-success"
            />
            <WhatsAppIcon className="relative size-7" />
            <span className="sr-only">Chat with {site.name} on WhatsApp (opens in a new tab)</span>
          </a>
        </TooltipTrigger>
        <TooltipContent side="left">
          Chat on WhatsApp · {site.contact.responseTime.toLowerCase()}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
