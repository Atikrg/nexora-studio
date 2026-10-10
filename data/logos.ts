import type { ClientLogo } from "@/types/content";

/**
 * Fictional client wordmarks for the logo marquee. Rendered as text + a simple mark,
 * so no image files are needed. Replace with real client logos (with permission).
 * DUMMY: replace before launch
 */
export const clientLogos: ClientLogo[] = [
  { name: "PulseCare", isPlaceholder: true, style: "rounded", mark: "ring" }, // DUMMY: replace before launch
  { name: "Ledgerly", isPlaceholder: true, style: "sans", mark: "bars" }, // DUMMY: replace before launch
  { name: "Kulhad & Co.", isPlaceholder: true, style: "serif", mark: "none" }, // DUMMY: replace before launch
  { name: "LearnLoop", isPlaceholder: true, style: "rounded", mark: "dot" }, // DUMMY: replace before launch
  { name: "Vastra Lane", isPlaceholder: true, style: "serif", mark: "slash" }, // DUMMY: replace before launch
  { name: "Sahaj", isPlaceholder: true, style: "sans", mark: "dot" }, // DUMMY: replace before launch
  { name: "Orbitly", isPlaceholder: true, style: "mono", mark: "ring" }, // DUMMY: replace before launch
  { name: "Finvest", isPlaceholder: true, style: "sans", mark: "slash" }, // DUMMY: replace before launch
];

/** Technologies for the tech marquee (real tools, not placeholders). */
export const techStack = [
  "Next.js",
  "React Native",
  "Flutter",
  "Shopify",
  "Supabase",
  "Node.js",
  "n8n",
  "Zapier",
  "WhatsApp API",
  "OpenAI",
  "Figma",
  "Vercel",
];
