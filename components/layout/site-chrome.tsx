import { ExitIntent } from "@/components/interactive/exit-intent";
import { CookieConsent } from "./cookie-consent";
import { MobileStickyCta } from "./mobile-sticky-cta";
import { WhatsAppButton } from "./whatsapp-button";

/** Floating UI layered above the page, in stacking order: consent first, then CTAs and offers. */
export function FloatingChrome() {
  return (
    <>
      <WhatsAppButton />
      <MobileStickyCta />
      <ExitIntent />
      <CookieConsent />
    </>
  );
}
