import type { NavLink } from "@/types/content";

/**
 * Global business details. Every value here is a placeholder.
 * DUMMY: replace before launch
 */
export const site = {
  name: "Nexora Studio", // DUMMY: replace before launch
  legalName: "Nexora Studio (Proprietorship)", // DUMMY: replace before launch
  url: "https://nexora.studio", // DUMMY: replace before launch
  tagline: "MVP websites, apps & automation for startups", // DUMMY: replace before launch
  positioning:
    "We help startups launch faster: MVP website, app & automation in weeks, not months.", // DUMMY: replace before launch
  description:
    "Founder-led digital studio in Pune building MVP websites, mobile apps, social media and automation for startups in India and worldwide. Launch in weeks, not months.", // DUMMY: replace before launch
  locale: "en_IN",
  location: {
    city: "Pune",
    region: "Maharashtra",
    country: "India",
    countryCode: "IN",
    timezone: "Asia/Kolkata",
    coordinates: "18.52°N 73.85°E",
  },
  contact: {
    email: "hello@nexora.studio", // DUMMY: replace before launch
    whatsapp: "919000000000", // DUMMY: replace before launch (digits only, with country code)
    whatsappDisplay: "+91 90000 00000", // DUMMY: replace before launch
    booking: "https://cal.com/nexora/15min", // DUMMY: replace before launch
    responseTime: "Reply within 24 hours",
  },
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/nexora-studio" }, // DUMMY: replace before launch
    { label: "Instagram", href: "https://www.instagram.com/nexora.studio" }, // DUMMY: replace before launch
    { label: "X", href: "https://x.com/nexorastudio" }, // DUMMY: replace before launch
    { label: "GitHub", href: "https://github.com/nexora-studio" }, // DUMMY: replace before launch
  ],
  /** Scarcity line shown near CTAs. Keep it true: update monthly or remove. */
  availability: "Taking only 3 new projects this month", // DUMMY: replace before launch
  trustBadges: [
    { label: "GST registered", detail: "GSTIN 27XXXXX0000X1ZX" }, // DUMMY: replace before launch
    { label: "Udyam / MSME registered", detail: "UDYAM-MH-00-0000000" }, // DUMMY: replace before launch
    { label: "NDA available", detail: "Signed before we see your idea" },
  ],
  analytics: {
    /** Plausible domain. Loaded only after consent, only in production. */
    plausibleDomain: "nexora.studio", // DUMMY: replace before launch
    plausibleSrc: "https://plausible.io/js/script.tagged-events.js",
  },
} as const;

export const primaryCta = {
  label: "Book a Free 15-min Strategy Call",
  shortLabel: "Book a Call",
  microcopy: "No pitch. Just a clear plan for your launch.",
} as const;

export const trustMicroLine = ["Reply within 24 hours", "Transparent pricing", "NDA on request"];

export const mainNav: NavLink[] = [
  { label: "Work", href: "/work/" },
  { label: "Pricing", href: "/pricing/" },
  { label: "About", href: "/about/" },
  { label: "Blog", href: "/blog/" },
];

export const footerNav = {
  company: [
    { label: "About", href: "/about/" },
    { label: "Work", href: "/work/" },
    { label: "Industries", href: "/industries/" },
    { label: "Pricing", href: "/pricing/" },
    { label: "Resources", href: "/resources/" },
    { label: "Blog", href: "/blog/" },
    { label: "Contact", href: "/contact/" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy/" },
    { label: "Terms of Service", href: "/terms/" },
    { label: "Refund Policy", href: "/refund-policy/" },
  ],
} satisfies Record<string, NavLink[]>;
