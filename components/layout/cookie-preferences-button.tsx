"use client";

import { OPEN_COOKIE_PREFS_EVENT } from "./cookie-consent";

/** Footer button that reopens the cookie preferences dialog. */
export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_PREFS_EVENT))}
      className="inline-flex min-h-11 cursor-pointer items-center hover:text-foreground"
    >
      Cookie preferences
    </button>
  );
}
