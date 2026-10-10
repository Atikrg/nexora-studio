"use client";

import { getConsent } from "./consent";

/**
 * One place for event tracking (Plausible custom events).
 * - Development: logs to the console, sends nothing.
 * - Production: sends only after the visitor accepted analytics cookies.
 * Swap the body of `send` to move to another provider.
 */
export type AnalyticsEvent =
  | "cta_click"
  | "whatsapp_click"
  | "booking_open"
  | "quiz_complete"
  | "calculator_use"
  | "form_submit"
  | "lead_magnet_open"
  | "resource_request"
  | "newsletter_submit"
  | "exit_intent_shown"
  | "theme_change";

type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: ((event: string, options?: { props?: Props }) => void) & { q?: unknown[] };
  }
}

const isProduction = process.env.NODE_ENV === "production";

function send(event: AnalyticsEvent, props?: Props) {
  window.plausible?.(event, props ? { props } : undefined);
}

export function track(event: AnalyticsEvent, props?: Props): void {
  if (typeof window === "undefined") return;
  if (!isProduction) {
    console.debug("[analytics]", event, props ?? "");
    return;
  }
  if (!getConsent()?.analytics) return;
  send(event, props);
}
