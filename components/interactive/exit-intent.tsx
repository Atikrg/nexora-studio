"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Gift, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { leadMagnet } from "@/data/home";
import { useConsent } from "@/lib/consent";
import { useMediaQuery } from "@/hooks/use-media-query";
import { readStorage, writeStorage } from "@/lib/storage";
import { track } from "@/lib/analytics";
import { transition } from "@/lib/motion";
import { AuditForm } from "./audit-form";

const SEEN_KEY = "nx-exit-offer-seen";
const MIN_TIME_ON_PAGE = 8000;
const EXCLUDED = ["/contact", "/privacy", "/terms", "/refund-policy"];

/**
 * Free Startup Launch Audit offer, shown at most once per visitor (localStorage).
 * - Desktop: Dialog when the pointer leaves through the top of the window (after 8s on page).
 * - Mobile: a small, dismissible bottom card after 60% scroll depth. Not a timed full-screen
 *   overlay (Google penalises those, see docs/00-ux-brief.md §7); its button opens a Drawer.
 * Never before the cookie choice (one bottom overlay at a time) and never on contact/legal pages.
 */
export function ExitIntent() {
  const pathname = usePathname();
  const consent = useConsent();
  const isDesktop = useMediaQuery("(min-width: 1024px) and (hover: hover)");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const excluded = EXCLUDED.some((p) => pathname.startsWith(p));
  const armed = consent != null && !excluded;

  useEffect(() => {
    if (!armed || readStorage(SEEN_KEY)) return;
    const markSeen = (variant: string) => {
      writeStorage(SEEN_KEY, new Date().toISOString());
      track("exit_intent_shown", { variant, path: pathname });
    };

    if (isDesktop) {
      const start = Date.now();
      const onLeave = (e: MouseEvent) => {
        if (e.clientY > 0 || e.relatedTarget || Date.now() - start < MIN_TIME_ON_PAGE) return;
        if (readStorage(SEEN_KEY)) return;
        markSeen("dialog");
        setDialogOpen(true);
      };
      document.documentElement.addEventListener("mouseleave", onLeave);
      return () => document.documentElement.removeEventListener("mouseleave", onLeave);
    }

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= 0.6 && !readStorage(SEEN_KEY)) {
        markSeen("mobile_card");
        setCardVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [armed, isDesktop, pathname]);

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg" data-lenis-prevent>
          <DialogHeader>
            <span className="mb-2 flex size-11 items-center justify-center rounded-xl bg-primary/15 text-signal">
              <Gift aria-hidden="true" className="size-5" />
            </span>
            <DialogTitle className="text-h3">Before you go: want a free audit?</DialogTitle>
            <DialogDescription>{leadMagnet.body}</DialogDescription>
          </DialogHeader>
          <AuditForm source="exit_intent" kind="exit-intent" onSuccess={() => window.setTimeout(() => setDialogOpen(false), 1200)} />
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {cardVisible && !drawerOpen && (
          <motion.aside
            aria-label="Free audit offer"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: transition.slow }}
            exit={{ y: 40, opacity: 0, transition: transition.base }}
            className="fixed inset-x-3 bottom-[5.5rem] z-40 flex items-center gap-3 rounded-2xl border border-border bg-popover p-4 shadow-lift lg:hidden"
          >
            <Gift aria-hidden="true" className="size-6 shrink-0 text-signal" />
            <p className="flex-1 text-small">
              <span className="font-semibold">Free Startup Launch Audit</span>
              <span className="block text-muted-foreground">A 10-min video review of your site or app.</span>
            </p>
            <Button size="sm" onClick={() => setDrawerOpen(true)}>
              Get it
            </Button>
            <Button size="icon-sm" variant="ghost" onClick={() => setCardVisible(false)} aria-label="Dismiss offer">
              <X aria-hidden="true" />
            </Button>
          </motion.aside>
        )}
      </AnimatePresence>

      <Drawer
        open={drawerOpen}
        onOpenChange={(open) => {
          setDrawerOpen(open);
          if (!open) setCardVisible(false);
        }}
      >
        <DrawerContent className="max-h-[92svh]">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-h3">{leadMagnet.title}</DrawerTitle>
            <DrawerDescription>{leadMagnet.body}</DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-8" data-lenis-prevent>
            <AuditForm source="exit_intent_mobile" kind="exit-intent" onSuccess={() => window.setTimeout(() => setDrawerOpen(false), 1200)} />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
