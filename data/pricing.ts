import type { EngagementModel, Faq, PricingTier, ServiceSlug } from "@/types/content";

/**
 * Engagement models and pricing-page content. Per-service tiers live in data/services.ts.
 * DUMMY: replace before launch
 */
export const engagementModels: EngagementModel[] = [
  // DUMMY: replace before launch
  {
    name: "Fixed-price project",
    icon: "file-check",
    description:
      "A defined scope, a fixed price and a fixed launch date. Best for MVPs and websites.",
    bestFor: "New launches with clear goals",
    price: { inr: 35000, usd: 490 },
    unit: "from, per project",
    points: ["Milestone payments: 30 / 40 / 30", "Timeline guarantee", "No surprise invoices"],
  },
  // DUMMY: replace before launch
  {
    name: "Monthly retainer",
    icon: "repeat",
    description: "A reserved block of design and development time every month for ongoing work.",
    bestFor: "Iterating after launch",
    price: { inr: 40000, usd: 690 },
    unit: "from, per month",
    points: ["Priority turnaround", "Monthly roadmap call", "Pause or cancel with 30 days' notice"],
  },
  // DUMMY: replace before launch
  {
    name: "Dedicated developer",
    icon: "user-round",
    description: "A senior developer embedded in your team, working in your tools and stand-ups.",
    bestFor: "Teams that need extra hands",
    price: { inr: 1500, usd: 25 },
    unit: "per hour · or ₹1,60,000 / $2,400 per month",
    points: ["Minimum 40 hours", "Daily async updates", "Replace anytime, at no cost"],
  },
];

/** Shown under every pricing table. */
export const pricingPromises = [
  "Milestone payments, never 100% upfront",
  "2 rounds of revisions included",
  "NDA signed before kickoff",
  "You own all code and designs",
  "GST invoice for every payment",
];

export const pricingNote =
  "Prices exclude 18% GST. International clients are invoiced in USD without GST. Third-party costs (hosting, domains, ad spend, API usage) are billed at cost, with no markup.";

/** Pricing-page FAQ (objections about money and risk). */
export const pricingFaqs: Faq[] = [
  {
    question: "Why are there 'starting at' prices?",
    answer:
      "Every project is a little different. The starting price covers the scope listed. After a 15-minute call you get a fixed quote in writing, and that number doesn't change unless you add scope.",
  },
  {
    question: "How do payments work?",
    answer:
      "For projects: 30% to start, 40% at design approval or mid-build, 30% at launch. Retainers are billed monthly in advance. We accept UPI, bank transfer and cards, and international clients can pay by Wise or Stripe.",
  },
  {
    question: "What if the project runs late?",
    answer:
      "If we miss an agreed milestone date for reasons on our side, the next milestone is free. Timelines assume feedback from you within two working days.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "If you're unhappy after the discovery and design phase, you can stop the project. You keep everything created so far and pay nothing further. See our refund policy for details.",
  },
  {
    question: "Can you work with a smaller budget?",
    answer:
      "Often, yes, by cutting scope rather than quality. Tell us your budget on the call and we'll show you the smallest version that still achieves your goal.",
  },
];

/** Conversion rate used only for the calculator's USD display. Prices use explicit USD values. */
export const INR_PER_USD = 88; // DUMMY: replace before launch (review quarterly)

/**
 * Monthly care plans shown when the pricing page Switch is set to "Monthly".
 * Services that already have monthly tiers (social media) use those instead.
 * DUMMY: replace before launch
 */
export const carePlans: Partial<Record<ServiceSlug, PricingTier[]>> = {
  "website-development": [
    {
      name: "Website Care",
      price: { inr: 8000, usd: 149 },
      billing: "monthly",
      timeline: "Monthly",
      description: "Keep your site fast, secure and up to date without thinking about it.",
      features: ["Hosting & uptime monitoring", "Security and dependency updates", "Up to 4 hours of content changes", "Monthly speed report"],
    },
    {
      name: "Website Growth",
      price: { inr: 25000, usd: 390 },
      billing: "monthly",
      timeline: "Monthly",
      description: "Ongoing landing pages, A/B tests and SEO improvements.",
      features: ["Everything in Website Care", "2 new landing pages a month", "Conversion experiments", "Technical SEO fixes"],
      popular: true,
    },
  ],
  "mobile-app-development": [
    {
      name: "App Care",
      price: { inr: 15000, usd: 249 },
      billing: "monthly",
      timeline: "Monthly",
      description: "OS updates, crash fixes and store compliance, handled.",
      features: ["Crash monitoring & fixes", "iOS / Android OS updates", "Store policy compliance", "Up to 6 hours of small changes"],
    },
    {
      name: "Feature Retainer",
      price: { inr: 80000, usd: 1290 },
      billing: "monthly",
      timeline: "Monthly",
      description: "A steady stream of new features, shipped every two weeks.",
      features: ["Everything in App Care", "Bi-weekly feature releases", "Monthly roadmap call", "Priority response"],
      popular: true,
    },
  ],
  automation: [
    {
      name: "Automation Care",
      price: { inr: 10000, usd: 169 },
      billing: "monthly",
      timeline: "Monthly",
      description: "Monitoring, fixes and small tweaks to every flow we built.",
      features: ["Error monitoring & fixes", "Up to 3 hours of changes", "Monthly usage report", "API change handling"],
      popular: true,
    },
  ],
};
