"use client";

import { site } from "@/data/site";
import { mailtoUrl, whatsappUrl } from "./links";
import { track } from "./analytics";

/**
 * THE single submit path for every form on the site (contact, audit, resources, quiz).
 * FRONTEND ONLY for now: builds a readable message and opens WhatsApp (wa.me) in a new tab,
 * falling back to a pre-filled email if the popup is blocked.
 *
 * To connect a backend later (Formspree, Resend, a CRM webhook…), replace the body of
 * `deliver()`. Callers, validation and UI states stay exactly the same.
 */
export type LeadKind =
  "contact" | "audit" | "resource" | "quiz" | "exit-intent" | "automation-session";

export type LeadPayload = {
  kind: LeadKind;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  /** Free-form fields rendered as "Label: value" lines. */
  fields?: Record<string, string | number | undefined>;
  message?: string;
};

export type SubmitResult =
  { ok: true; channel: "whatsapp" | "email" } | { ok: false; error: string };

const subjects: Record<LeadKind, string> = {
  contact: "New project enquiry",
  audit: "Free Startup Launch Audit request",
  resource: "Free resource request",
  quiz: "Service quiz result",
  "exit-intent": "Free Startup Launch Audit request",
  "automation-session": "Automation Idea Session request",
};

export function formatLeadMessage(payload: LeadPayload): string {
  const lines: (string | undefined)[] = [
    `Hi ${site.name}! ${subjects[payload.kind]}.`,
    "",
    `Name: ${payload.name}`,
    payload.company ? `Company: ${payload.company}` : undefined,
    payload.email ? `Email: ${payload.email}` : undefined,
    payload.phone ? `Phone: ${payload.phone}` : undefined,
    ...Object.entries(payload.fields ?? {})
      .filter(([, v]) => v !== undefined && v !== "")
      .map(([k, v]) => `${k}: ${v}`),
    payload.message ? "" : undefined,
    payload.message,
  ];
  return lines.filter((l): l is string => l !== undefined).join("\n");
}

async function deliver(payload: LeadPayload): Promise<SubmitResult> {
  const text = formatLeadMessage(payload);
  // No "noopener" feature string: with it, window.open always returns null, which would look like
  // a blocked popup. Detach the opener manually instead.
  const popup = window.open(whatsappUrl(text), "_blank");
  if (popup) {
    popup.opener = null;
    return { ok: true, channel: "whatsapp" };
  }
  // Popup blocked (or noopener returned null): fall back to email in the same tab
  window.location.href = mailtoUrl(subjects[payload.kind], text);
  return { ok: true, channel: "email" };
}

export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  try {
    const result = await deliver(payload);
    if (result.ok) track("form_submit", { kind: payload.kind, channel: result.channel });
    return result;
  } catch {
    return { ok: false, error: `Something went wrong. Email us at ${site.contact.email}.` };
  }
}
