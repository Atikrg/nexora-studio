"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

const formatter = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: site.location.timezone,
});

/** Live local time in Pune (IST). Renders "IST" until hydrated, so static HTML never shows a stale time. */
export function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time dateTime={now?.toISOString()} className="font-mono tabular-nums" suppressHydrationWarning>
      {now ? `${formatter.format(now)} IST` : "IST (UTC+5:30)"}
    </time>
  );
}
