import type { QuizQuestion, QuizRecommendation } from "@/types/content";

/**
 * "Which service do I need?" 3-question quiz. Each option adds points to recommendation ids;
 * the highest score wins. The result pre-fills the contact form.
 * DUMMY: replace before launch (wording and scoring can stay; review recommendations)
 */
export const quizQuestions: QuizQuestion[] = [
  {
    id: "goal",
    question: "What's your main goal right now?",
    options: [
      {
        id: "validate",
        label: "Validate an idea quickly",
        hint: "Test demand before building big",
        scores: { "launch-page": 3, "design-sprint": 2 },
      },
      {
        id: "credible",
        label: "Look credible to investors & users",
        hint: "A proper online presence",
        scores: { "startup-website": 3 },
      },
      {
        id: "product",
        label: "Launch my product",
        hint: "An app or platform people use",
        scores: { "mvp-app": 3 },
      },
      {
        id: "time",
        label: "Save time on repetitive work",
        hint: "Leads, follow-ups, admin",
        scores: { "workflow-suite": 3, "ai-assistant": 1 },
      },
      {
        id: "audience",
        label: "Grow my audience & sales",
        hint: "Content, ads, launches",
        scores: { "social-growth": 3, "launch-campaign": 1 },
      },
    ],
  },
  {
    id: "stage",
    question: "Where are you today?",
    options: [
      { id: "idea", label: "Just an idea", scores: { "design-sprint": 2, "launch-page": 2 } },
      {
        id: "design",
        label: "Designs or a prototype ready",
        scores: { "mvp-app": 2, "startup-website": 1 },
      },
      {
        id: "live",
        label: "Live product, need growth",
        scores: { "social-growth": 2, "workflow-suite": 2, "startup-website": 1 },
      },
      {
        id: "business",
        label: "Running business, overwhelmed",
        scores: { "ai-assistant": 2, "workflow-suite": 2 },
      },
    ],
  },
  {
    id: "timeline",
    question: "When do you need it?",
    options: [
      {
        id: "asap",
        label: "In the next 2 weeks",
        scores: { "launch-page": 2, "workflow-suite": 1 },
      },
      {
        id: "month",
        label: "Within a month",
        scores: { "startup-website": 2, "launch-campaign": 1, "ai-assistant": 1 },
      },
      { id: "quarter", label: "In 2–3 months", scores: { "mvp-app": 2 } },
      { id: "ongoing", label: "Ongoing support", scores: { "social-growth": 2 } },
    ],
  },
];

export const quizRecommendations: QuizRecommendation[] = [
  {
    id: "launch-page",
    service: "website-development",
    tier: "Launch Page",
    title: "A high-converting Launch Page",
    body: "Validate demand in 10 days with one focused page, a waitlist or lead form, and analytics.",
  },
  {
    id: "startup-website",
    service: "website-development",
    tier: "Startup Website",
    title: "A complete Startup Website",
    body: "A credible 5–8 page site with a CMS, built to convert visitors into sign-ups and calls.",
  },
  {
    id: "design-sprint",
    service: "mobile-app-development",
    tier: "Design Sprint",
    title: "A 2-week Design Sprint",
    body: "Turn your idea into a clickable prototype and test it with real users before you build.",
  },
  {
    id: "mvp-app",
    service: "mobile-app-development",
    tier: "MVP App",
    title: "An MVP App",
    body: "A launch-ready Android and iOS app built around your core user journey in about 8 weeks.",
  },
  {
    id: "social-growth",
    service: "social-media-marketing",
    tier: "Growth",
    title: "Social Media Growth plan",
    body: "Content plus paid ads, managed to a clear cost-per-lead target every month.",
  },
  {
    id: "launch-campaign",
    service: "social-media-marketing",
    tier: "Launch Campaign",
    title: "A 6-week Launch Campaign",
    body: "Build a waitlist before launch day and sell out your first drop.",
  },
  {
    id: "workflow-suite",
    service: "automation",
    tier: "Workflow Suite",
    title: "An Automation Workflow Suite",
    body: "Automate a full process end-to-end, from lead capture to follow-up, invoicing or onboarding.",
  },
  {
    id: "ai-assistant",
    service: "automation",
    tier: "AI & WhatsApp Assistant",
    title: "An AI WhatsApp Assistant",
    body: "Answer, qualify and book enquiries 24/7 on WhatsApp and your website.",
  },
];
