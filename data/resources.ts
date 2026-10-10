import type { Resource } from "@/types/content";

/**
 * Free resources (lead magnets). UI-only: requesting one opens WhatsApp/email
 * with a pre-filled message until a real delivery flow is connected.
 * DUMMY: replace before launch (attach real files or a form backend)
 */
export const resources: Resource[] = [
  // DUMMY: replace before launch
  {
    slug: "mvp-launch-checklist",
    isPlaceholder: true,
    title: "MVP Launch Checklist",
    format: "Checklist · 47 items · PDF + Notion",
    description:
      "Everything to tick off before, during and after launch day, from analytics to app store screenshots.",
    icon: "list-checks",
    bullets: [
      "Pre-launch: analytics, legal pages, error tracking",
      "Launch day: Product Hunt, waitlist emails, socials",
      "Week one: feedback loops and the metrics that matter",
    ],
  },
  // DUMMY: replace before launch
  {
    slug: "10-automations-every-startup-needs",
    isPlaceholder: true,
    title: "10 Automations Every Startup Needs",
    format: "Guide · 18 pages · with n8n & Zapier templates",
    description:
      "The ten workflows that save early teams the most hours, with ready-to-import templates.",
    icon: "bot",
    bullets: [
      "Lead capture → CRM → instant WhatsApp follow-up",
      "Invoice reminders and payment reconciliation",
      "Weekly metrics report delivered to Slack",
    ],
  },
  // DUMMY: replace before launch
  {
    slug: "startup-website-planning-template",
    isPlaceholder: true,
    title: "Startup Website Planning Template",
    format: "Template · Notion + Google Docs",
    description:
      "Plan your pages, messaging and calls-to-action before you brief a designer, and save weeks of back-and-forth.",
    icon: "layout-template",
    bullets: [
      "Page-by-page structure for SaaS, D2C and service startups",
      "Messaging framework: problem → outcome → proof",
      "Launch checklist for SEO and analytics",
    ],
  },
];
