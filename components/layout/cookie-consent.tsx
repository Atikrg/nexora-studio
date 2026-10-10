"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { setConsent, useConsent } from "@/lib/consent";
import { transition } from "@/lib/motion";

export const OPEN_COOKIE_PREFS_EVENT = "nx:open-cookie-preferences";

/**
 * Cookie consent: Accept / Reject / Preferences, remembered per visitor (localStorage).
 * Non-modal banner (doesn't block the page). Analytics only loads after "analytics: true".
 * Shown first among bottom overlays; the mobile sticky CTA waits until this is answered.
 */
export function CookieConsent() {
  const consent = useConsent();
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const id = useId();
  const visible = consent === null; // undefined = not hydrated yet

  // The footer's "Cookie preferences" button reopens the dialog from anywhere
  useEffect(() => {
    const open = () => {
      setAnalytics(consent?.analytics ?? false);
      setMarketing(consent?.marketing ?? false);
      setPrefsOpen(true);
    };
    window.addEventListener(OPEN_COOKIE_PREFS_EVENT, open);
    return () => window.removeEventListener(OPEN_COOKIE_PREFS_EVENT, open);
  }, [consent]);

  return (
    <>
      <AnimatePresence>
        {visible && !prefsOpen && (
          <motion.section
            role="region"
            aria-labelledby={`${id}-title`}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { ...transition.slow, delay: 1.2 } }}
            exit={{ y: 40, opacity: 0, transition: transition.base }}
            className="fixed inset-x-3 bottom-3 z-60 rounded-2xl border border-border bg-popover p-5 text-popover-foreground shadow-lift sm:inset-x-auto sm:left-4 sm:max-w-lg md:bottom-4"
          >
            <div className="flex items-start gap-3">
              <Cookie aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-signal" />
              <div className="flex flex-col gap-1.5">
                <h2 id={`${id}-title`} className="font-display text-body font-semibold">
                  Cookies, the honest version
                </h2>
                <p className="text-small text-muted-foreground">
                  We use privacy-friendly analytics to see which pages help founders. Nothing loads
                  until you say yes.{" "}
                  <Link
                    href="/privacy/"
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    Privacy policy
                  </Link>
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => setConsent({ analytics: true, marketing: true })}>
                Accept all
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setConsent({ analytics: false, marketing: false })}
              >
                Reject non-essential
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setPrefsOpen(true)}>
                Preferences
              </Button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <Dialog open={prefsOpen} onOpenChange={setPrefsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Cookie preferences</DialogTitle>
            <DialogDescription>
              Choose what you&rsquo;re comfortable with. You can change this anytime from the
              footer.
            </DialogDescription>
          </DialogHeader>
          <ul className="flex flex-col divide-y divide-border">
            <PreferenceRow
              id={`${id}-necessary`}
              title="Strictly necessary"
              body="Remembers your theme and this choice. Always on."
              checked
              disabled
            />
            <PreferenceRow
              id={`${id}-analytics`}
              title="Analytics"
              body="Anonymous page views and button clicks (Plausible). No personal data, no cross-site tracking."
              checked={analytics}
              onCheckedChange={setAnalytics}
            />
            <PreferenceRow
              id={`${id}-marketing`}
              title="Marketing"
              body="Lets us measure ad campaigns, if we run any. Currently unused."
              checked={marketing}
              onCheckedChange={setMarketing}
            />
          </ul>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setConsent({ analytics: false, marketing: false });
                setPrefsOpen(false);
              }}
            >
              Reject all
            </Button>
            <Button
              onClick={() => {
                setConsent({ analytics, marketing });
                setPrefsOpen(false);
              }}
            >
              Save preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function PreferenceRow({
  id,
  title,
  body,
  checked,
  disabled,
  onCheckedChange,
}: {
  id: string;
  title: string;
  body: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange?: (v: boolean) => void;
}) {
  return (
    <li className="flex items-start justify-between gap-6 py-4">
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="text-body font-medium">
          {title}
        </label>
        <p id={`${id}-desc`} className="text-small text-muted-foreground">
          {body}
        </p>
      </div>
      <Switch
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        aria-describedby={`${id}-desc`}
        className="mt-1"
      />
    </li>
  );
}
