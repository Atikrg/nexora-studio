"use client";

/**
 * Hand-off from the quiz / pricing cards to the contact form. Uses sessionStorage, so it works
 * on a static export without query-string parsing, and clears after it's read once.
 */
export type ContactPrefill = {
  service?: string;
  package?: string;
  message?: string;
  source?: string;
};

const KEY = "nx-contact-prefill";

export function setContactPrefill(data: ContactPrefill): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable: the form simply starts empty */
  }
}

export function takeContactPrefill(): ContactPrefill | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    sessionStorage.removeItem(KEY);
    return JSON.parse(raw) as ContactPrefill;
  } catch {
    return null;
  }
}
