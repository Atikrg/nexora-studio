/**
 * Content model. Every piece of copy on the site lives in /data and matches these types,
 * so swapping dummy content for real content never touches a component.
 */

/** Lucide icon names used in data (resolved to components in components/shared/icon.tsx). */
export type IconName =
  | "globe"
  | "smartphone"
  | "megaphone"
  | "workflow"
  | "rocket"
  | "shield-check"
  | "message-circle"
  | "clock"
  | "wallet"
  | "user-round"
  | "zap"
  | "target"
  | "layers"
  | "bot"
  | "shopping-bag"
  | "graduation-cap"
  | "heart-pulse"
  | "cloud"
  | "file-check"
  | "list-checks"
  | "layout-template"
  | "handshake"
  | "trending-up"
  | "search"
  | "pen-tool"
  | "code"
  | "life-buoy"
  | "badge-check"
  | "calendar-clock"
  | "repeat";

export type Money = {
  /** Price in Indian rupees. */
  inr: number;
  /** Price in US dollars (set explicitly: international pricing isn't a straight conversion). */
  usd: number;
};

export type Faq = { question: string; answer: string };

export type ServiceSlug =
  "website-development" | "mobile-app-development" | "social-media-marketing" | "automation";

export type IndustrySlug = "saas" | "d2c" | "edtech" | "healthtech";

export type PricingTier = {
  name: string;
  price: Money;
  /** "from" pricing shows "Starting at". */
  from?: boolean;
  billing: "one-time" | "monthly";
  timeline: string;
  description: string;
  features: string[];
  notIncluded?: string[];
  popular?: boolean;
  /** Pre-fills the contact form when chosen. */
  ctaLabel?: string;
};

export type Service = {
  slug: ServiceSlug;
  name: string;
  /** Short label for nav and tags. */
  shortName: string;
  icon: IconName;
  /** One line for the mega menu and cards. */
  summary: string;
  /** Outcome-led card copy. */
  cardTitle: string;
  hero: { eyebrow: string; title: string; highlight: string; subtitle: string };
  whoFor: { title: string; body: string }[];
  problems: { title: string; body: string }[];
  deliverables: { title: string; items: string[] }[];
  process: { title: string; duration: string; body: string }[];
  timeline: string;
  stack: { name: string; note: string }[];
  relatedCaseStudy: string;
  pricing: PricingTier[];
  faqs: Faq[];
  seo: { title: string; description: string; keywords: string[] };
};

export type ResultMetric = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type CaseStudy = {
  slug: string;
  isPlaceholder: boolean;
  client: string;
  /** Wordmark style for the fictional client's logo. */
  tagline: string;
  industry: IndustrySlug;
  category: "web" | "app" | "social" | "automation";
  services: ServiceSlug[];
  year: number;
  timeline: string;
  location: string;
  summary: string;
  problem: string;
  approach: { title: string; body: string }[];
  solution: { title: string; body: string }[];
  results: ResultMetric[];
  testimonialId?: string;
  /** Visual direction for the generated mockup. Hue in OKLCH degrees. */
  visual: { hue: number; device: "browser" | "phone" | "feed" | "flow"; screen: string };
  featured?: boolean;
};

export type Testimonial = {
  id: string;
  isPlaceholder: boolean;
  name: string;
  role: string;
  company: string;
  location: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  caseStudy?: string;
};

export type Industry = {
  slug: IndustrySlug;
  name: string;
  icon: IconName;
  tagline: string;
  intro: string;
  challenges: { title: string; body: string }[];
  services: ServiceSlug[];
  useCases: { title: string; body: string }[];
  caseStudy: string;
  seo: { title: string; description: string };
};

export type EngagementModel = {
  name: string;
  icon: IconName;
  description: string;
  bestFor: string;
  price: Money;
  unit: string;
  points: string[];
};

export type ComparisonRow = {
  criterion: string;
  us: { label: string; score: "good" | "mid" | "bad" };
  freelancer: { label: string; score: "good" | "mid" | "bad" };
  agency: { label: string; score: "good" | "mid" | "bad" };
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: { id: string; label: string; hint?: string; scores: Partial<Record<string, number>> }[];
};

export type QuizRecommendation = {
  id: string;
  service: ServiceSlug;
  tier: string;
  title: string;
  body: string;
};

export type Resource = {
  slug: string;
  isPlaceholder: boolean;
  title: string;
  format: string;
  description: string;
  icon: IconName;
  bullets: string[];
};

export type ClientLogo = {
  name: string;
  isPlaceholder: boolean;
  /** Wordmark styling. */
  style: "sans" | "serif" | "mono" | "rounded";
  mark?: "dot" | "slash" | "ring" | "bars" | "none";
};

export type Stat = ResultMetric & { isPlaceholder: boolean; note?: string };

export type NavLink = { label: string; href: string };
