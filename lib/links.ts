import { site } from "@/data/site";

/** WhatsApp click-to-chat link with an optional pre-filled message. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** mailto: link with optional subject and body. */
export function mailtoUrl(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${site.contact.email}${query ? `?${query}` : ""}`;
}

export const bookingUrl = site.contact.booking;

export const defaultWhatsappMessage = `Hi ${site.name}! I'd like to talk about a project.`;
