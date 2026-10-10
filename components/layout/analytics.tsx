"use client";

import Script from "next/script";
import { useEffect } from "react";
import { site } from "@/data/site";
import { useConsent } from "@/lib/consent";
import { track } from "@/lib/analytics";

const isProduction = process.env.NODE_ENV === "production";

/** Where on the page a click happened: explicit data-track-location, else the nearest section/landmark. */
function locationOf(el: Element): string {
  const tagged = el.closest<HTMLElement>("[data-track-location]");
  if (tagged?.dataset.trackLocation) return tagged.dataset.trackLocation;
  const section = el.closest("section[aria-labelledby], section[id]");
  if (section) return section.getAttribute("aria-labelledby") ?? section.id;
  return el.closest("header") ? "header" : el.closest("footer") ? "footer" : "page";
}

/**
 * Analytics, consent-first:
 * 1. Loads the Plausible script only in production and only after the visitor accepts analytics.
 * 2. One delegated click listener records every booking and WhatsApp link click site-wide
 *    (no per-button wiring), with the page path and on-page location.
 * Other events (quiz, calculator, forms, lead magnets) call track() where they happen.
 */
export function Analytics() {
  const consent = useConsent();
  const enabled = isProduction && consent?.analytics === true;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const props = { location: locationOf(link), path: window.location.pathname };
      if (href.startsWith(site.contact.booking)) track("booking_open", props);
      else if (href.includes("wa.me/") || href.includes("api.whatsapp.com")) track("whatsapp_click", props);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!enabled) return null;
  return (
    <>
      {/* Queue stub so events fired before the script loads aren't lost */}
      <Script id="plausible-init" strategy="afterInteractive">
        {`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}
      </Script>
      <Script src={site.analytics.plausibleSrc} data-domain={site.analytics.plausibleDomain} strategy="afterInteractive" />
    </>
  );
}
