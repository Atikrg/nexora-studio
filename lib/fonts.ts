import { Bricolage_Grotesque, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

/** Display — oversized headlines (8–12vw). Variable: weight + optical size + width. */
export const fontDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz", "wdth"],
});

/** Emphasis — one italic word per headline (e.g. the rotating hero word). */
export const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-instrument",
  display: "swap",
});

/** Body copy. */
export const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

/** Labels, section numbers, stats, telemetry. */
export const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

/** Apply to <html className>. */
export const fontVariables = [fontDisplay, fontSerif, fontSans, fontMono]
  .map((f) => f.variable)
  .join(" ");
