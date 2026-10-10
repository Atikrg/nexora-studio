import type { ComparisonRow, Faq, IconName, Stat } from "@/types/content";

/**
 * Home page copy, in section order. See docs/00-ux-brief.md §5 for why each section is where it is.
 * DUMMY: replace before launch
 */

export const hero = {
  eyebrow: "Founder-led studio · Pune → worldwide",
  /** Kinetic headline: "We build [websites | apps | automations] for startups." */
  before: "We build",
  rotatingWords: ["websites", "apps", "automations", "launches"],
  after: "for startups.",
  subtitle:
    "MVP website, app and automation in weeks, not months. Fixed prices, weekly demos, and you work directly with the founder who builds it.",
  secondaryCta: { label: "See our work", href: "/work/" },
};

export const problems = {
  eyebrow: "Sound familiar?",
  title: "Building a startup is hard. Your tech partner shouldn't make it harder.",
  items: [
    {
      icon: "clock",
      title: "Agencies quote 6 months",
      body: "Your runway, demo day and competitors won't wait that long.",
    },
    {
      icon: "wallet",
      title: "Prices that keep moving",
      body: "A ₹2 lakh quote becomes ₹5 lakh by the end. Nobody explains why.",
    },
    {
      icon: "message-circle",
      title: "Freelancers who go silent",
      body: "Updates dry up mid-project and you're left chasing a WhatsApp tick.",
    },
    {
      icon: "layers",
      title: "Juniors doing the work",
      body: "You meet a senior on the sales call, then never see them again.",
    },
  ] satisfies { icon: IconName; title: string; body: string }[],
}; // DUMMY: replace before launch

export const whyUs = {
  eyebrow: "Why founders choose us",
  title: "Senior skills, startup speed, one person accountable.",
  subtitle:
    "You get agency-level quality without agency layers, and freelancer speed without freelancer risk.",
  items: [
    {
      icon: "user-round",
      title: "Founder-led, always",
      body: "The person you meet on the first call designs and builds your product. No hand-offs, no account managers.",
    },
    {
      icon: "zap",
      title: "Weeks, not months",
      body: "Tight scopes, a proven process and modern tools. Most MVPs launch in 3–8 weeks.",
    },
    {
      icon: "target",
      title: "Startup-only focus",
      body: "We speak runway, traction and investors. Everything we build is meant to get you users or funding.",
    },
    {
      icon: "shield-check",
      title: "Zero-risk terms",
      body: "Fixed prices, milestone payments, an on-time guarantee and full code ownership from day one.",
    },
  ] satisfies { icon: IconName; title: string; body: string }[],
}; // DUMMY: replace before launch

export const comparison = {
  caption: "How Nexora Studio compares with hiring a freelancer or a large agency",
  columns: { us: "Nexora Studio", freelancer: "Freelancer", agency: "Big agency" },
  rows: [
    {
      criterion: "Time to launch",
      us: { label: "3–8 weeks", score: "good" },
      freelancer: { label: "Unpredictable", score: "mid" },
      agency: { label: "3–6 months", score: "bad" },
    },
    {
      criterion: "Price",
      us: { label: "Fixed, transparent", score: "good" },
      freelancer: { label: "Low, but scope creeps", score: "mid" },
      agency: { label: "₹10L+ with overheads", score: "bad" },
    },
    {
      criterion: "Communication",
      us: { label: "Direct with the builder", score: "good" },
      freelancer: { label: "Varies, often slow", score: "bad" },
      agency: { label: "Through account managers", score: "mid" },
    },
    {
      criterion: "Post-launch support",
      us: { label: "30–60 days free, then retainer", score: "good" },
      freelancer: { label: "Rarely available", score: "bad" },
      agency: { label: "Expensive contracts", score: "mid" },
    },
    {
      criterion: "Accountability",
      us: { label: "Contract, NDA, guarantee", score: "good" },
      freelancer: { label: "Little recourse", score: "bad" },
      agency: { label: "Contract, slow to act", score: "mid" },
    },
    {
      criterion: "Who does the work",
      us: { label: "Senior founder", score: "good" },
      freelancer: { label: "One person, skill varies", score: "mid" },
      agency: { label: "Often junior staff", score: "bad" },
    },
  ] satisfies ComparisonRow[],
}; // DUMMY: replace before launch

export const process = {
  eyebrow: "How we work",
  title: "From first call to launch, with no surprises.",
  steps: [
    {
      number: "01",
      title: "Discover",
      duration: "Week 1",
      body: "A focused call and a scoping session. You leave with a fixed scope, price and launch date.",
      deliverable: "Scope document + fixed quote",
    },
    {
      number: "02",
      title: "Design",
      duration: "Weeks 1–2",
      body: "Wireframes, then polished UI and a clickable prototype you can test on your phone.",
      deliverable: "Figma prototype",
    },
    {
      number: "03",
      title: "Build",
      duration: "Weeks 2–6",
      body: "Development in weekly sprints, with a live staging link and a 20-minute demo every Friday.",
      deliverable: "Weekly working builds",
    },
    {
      number: "04",
      title: "Launch",
      duration: "Launch week",
      body: "QA on real devices, speed and accessibility checks, then go-live and app store submission.",
      deliverable: "Live product + handover",
    },
    {
      number: "05",
      title: "Grow",
      duration: "Ongoing",
      body: "Free fixes after launch, then optional retainers for features, marketing and automation.",
      deliverable: "Growth roadmap",
    },
  ],
}; // DUMMY: replace before launch

export const guarantee = {
  eyebrow: "Our guarantee",
  title: "Launch on time, or the next milestone is free.",
  body: "We agree a launch date in writing before we start. If we miss a milestone for reasons on our side, you don't pay for the next one. Simple.",
  fineprint:
    "Applies to the agreed scope, with feedback from you within two working days. Scope changes reset the date in writing first.",
  points: [
    "Fixed launch date in your contract",
    "Milestone payments: 30 / 40 / 30",
    "Free revisions in every phase",
  ],
}; // DUMMY: replace before launch

export const stats: Stat[] = [
  { value: 20, suffix: "+", label: "products launched", isPlaceholder: true }, // DUMMY: replace before launch
  { value: 4.9, decimals: 1, suffix: "/5", label: "average client rating", isPlaceholder: true }, // DUMMY: replace before launch
  { value: 3, suffix: "x", label: "faster than typical agencies", isPlaceholder: true }, // DUMMY: replace before launch
  { value: 24, suffix: "h", label: "maximum reply time", isPlaceholder: true }, // DUMMY: replace before launch
];

export const leadMagnet = {
  eyebrow: "Free for founders",
  title: "Get a free Startup Launch Audit.",
  body: "Send us your website, app or idea. Within 48 hours you get a 10-minute video review covering what's holding back conversions, speed and credibility, and the three fixes we'd make first.",
  points: [
    "Personal Loom video, not a PDF template",
    "Conversion, speed and SEO quick wins",
    "No sales follow-up unless you ask",
  ],
  cta: "Get my free audit",
  secondary: "Prefer automation? Book a free Automation Idea Session.",
}; // DUMMY: replace before launch

export const homeFaqs: Faq[] = [
  {
    question: "How much does an MVP cost?",
    answer:
      "Landing pages start at ₹35,000, startup websites at ₹85,000 and MVP apps at ₹2,50,000. You get a fixed quote after a 15-minute call, and it doesn't change unless you add scope.",
  },
  {
    question: "How long will it take?",
    answer:
      "Websites take 10 days to 4 weeks. MVP apps take 6–12 weeks. Automations take 1–3 weeks. The date goes in your contract and is covered by our on-time guarantee.",
  },
  {
    question: "Will I really work with the founder?",
    answer:
      "Yes. The founder runs your discovery, designs and builds your product, and is on your weekly demo calls. For larger projects, vetted specialists join under the founder's direct supervision.",
  },
  {
    question: "What if I'm not technical?",
    answer:
      "Most of our clients aren't. We explain decisions in plain language, recommend the simplest stack that works, and document everything so you're never dependent on us.",
  },
  {
    question: "Do I own the code and designs?",
    answer:
      "Completely. Repositories, design files and app store accounts are in your name from day one.",
  },
  {
    question: "Do you work with clients outside India?",
    answer:
      "Yes, around a third of our clients are in the US, UK, UAE and Singapore. We overlap with your working hours for calls and invoice in USD.",
  },
  {
    question: "Will you sign an NDA?",
    answer:
      "Happily, before you share any details. Ask on the call and we'll send ours, or sign yours.",
  },
]; // DUMMY: replace before launch

export const finalCta = {
  eyebrow: "Ready when you are",
  title: "Let's build something people want.",
  body: "Tell us what you're building. In 15 minutes you'll know what it takes, how long it'll take and what it'll cost. No pitch, no pressure.",
}; // DUMMY: replace before launch
