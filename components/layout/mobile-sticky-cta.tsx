"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { primaryCta } from "@/data/site";
import { useConsent } from "@/lib/consent";
import { bookingUrl, defaultWhatsappMessage, whatsappUrl } from "@/lib/links";
import { transition } from "@/lib/motion";
import { WhatsAppIcon } from "./whatsapp-icon";

/**
 * Mobile sticky bar: Book a Call + WhatsApp. Appears only after
 * (1) the visitor has answered the cookie banner and (2) scrolled past the first screen,
 * and hides near the footer, which has its own big CTA.
 */
export function MobileStickyCta() {
  const consent = useConsent();
  const [pastHero, setPastHero] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.8);
      const remaining = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      setNearFooter(remaining < 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const show = consent != null && pastHero && !nearFooter;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={transition.base}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] glass md:hidden"
        >
          <div className="flex gap-2">
            <Button asChild size="md" className="flex-1">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track-location="mobile_sticky"
              >
                <CalendarClock aria-hidden="true" />
                {primaryCta.shortLabel}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
            <Button asChild size="md" variant="outline" className="px-4">
              <a
                href={whatsappUrl(defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                data-track-location="mobile_sticky"
              >
                <WhatsAppIcon className="size-5 text-success" />
                WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
