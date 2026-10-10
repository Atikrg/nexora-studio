import type { Industry } from "@/types/content";

/**
 * Industries we serve. Copy is placeholder but written to be accurate for each market.
 * DUMMY: replace before launch
 */
export const industries: Industry[] = [
  // DUMMY: replace before launch
  {
    slug: "saas",
    name: "SaaS",
    icon: "cloud",
    tagline: "Websites that sell your product while you sleep.",
    intro:
      "B2B and B2C software founders come to us to turn a working product into a growing one: clearer positioning, self-serve onboarding and automated pipelines.",
    challenges: [
      {
        title: "Visitors don't get it",
        body: "Feature-list homepages lose buyers. We lead with the outcome and show the product working.",
      },
      {
        title: "Trials don't activate",
        body: "Most trials die before the 'aha' moment. Onboarding emails triggered by behaviour fix that.",
      },
      {
        title: "Sales is the bottleneck",
        body: "Lead routing, scoring and CRM automation so founders only talk to qualified buyers.",
      },
    ],
    services: ["website-development", "automation", "mobile-app-development"],
    useCases: [
      {
        title: "Marketing site + interactive demo",
        body: "Let visitors try the product before they sign up.",
      },
      {
        title: "Comparison & alternative pages",
        body: "Rank for 'X vs Y' searches your buyers already make.",
      },
      {
        title: "Product-led onboarding flows",
        body: "Emails and in-app nudges until the first value moment.",
      },
      {
        title: "Lead-to-CRM automation",
        body: "Every demo request enriched, scored and routed in seconds.",
      },
    ],
    caseStudy: "ledgerly",
    seo: {
      title: "SaaS Website & Growth Automation Agency",
      description:
        "SaaS marketing websites, interactive demos and onboarding automation that turn trials into paying customers.",
    },
  },
  // DUMMY: replace before launch
  {
    slug: "d2c",
    name: "D2C",
    icon: "shopping-bag",
    tagline: "Stores that load fast and sell out.",
    intro:
      "Direct-to-consumer brands need speed, trust and repeat purchases. We build the store, the launch and the WhatsApp flows that bring customers back.",
    challenges: [
      {
        title: "Slow stores lose sales",
        body: "Every extra second on mobile costs conversions. We target sub-2-second loads on 4G.",
      },
      {
        title: "One-time buyers",
        body: "Subscriptions, bundles and WhatsApp win-backs turn first orders into habits.",
      },
      {
        title: "Ads getting expensive",
        body: "Better creatives, tighter testing and organic content to lower blended CAC.",
      },
    ],
    services: ["website-development", "social-media-marketing", "automation"],
    useCases: [
      {
        title: "Shopify store rebuild",
        body: "Faster theme, cleaner checkout, UPI and COD done right.",
      },
      {
        title: "Subscription programme",
        body: "Recurring revenue with skip, pause and swap controls.",
      },
      { title: "Launch campaigns", body: "Waitlist → drop → sell-out playbooks on Instagram." },
      {
        title: "WhatsApp commerce flows",
        body: "Cart recovery, order updates and reorder reminders.",
      },
    ],
    caseStudy: "kulhad-co",
    seo: {
      title: "D2C Shopify Development & Launch Marketing",
      description:
        "Fast Shopify stores, D2C launch campaigns and WhatsApp commerce automation for Indian brands.",
    },
  },
  // DUMMY: replace before launch
  {
    slug: "edtech",
    name: "EdTech",
    icon: "graduation-cap",
    tagline: "Learning products students actually come back to.",
    intro:
      "EdTech lives or dies on retention. We design apps and platforms around daily habits, offline access and visible progress.",
    challenges: [
      {
        title: "Students drop off in week one",
        body: "Bite-sized lessons, streaks and reminders build a daily habit.",
      },
      {
        title: "Patchy connectivity",
        body: "Offline-first apps that download on Wi-Fi and work anywhere.",
      },
      {
        title: "Admissions are manual",
        body: "Counselling bookings, fee reminders and follow-ups on autopilot.",
      },
    ],
    services: ["mobile-app-development", "website-development", "automation"],
    useCases: [
      {
        title: "Micro-learning apps",
        body: "Short lessons, quizzes and streaks on Android and iOS.",
      },
      {
        title: "Course & cohort websites",
        body: "Landing pages that fill batches, with payments built in.",
      },
      {
        title: "Admissions automation",
        body: "Enquiry → counselling call → enrolment, all tracked.",
      },
      {
        title: "Parent updates on WhatsApp",
        body: "Attendance, results and fee reminders sent automatically.",
      },
    ],
    caseStudy: "learnloop",
    seo: {
      title: "EdTech App & Platform Development",
      description:
        "Learning apps, course websites and admissions automation for EdTech startups and institutes in India.",
    },
  },
  // DUMMY: replace before launch
  {
    slug: "healthtech",
    name: "HealthTech",
    icon: "heart-pulse",
    tagline: "Care that's easier to book, and harder to miss.",
    intro:
      "From teleconsult MVPs to clinic automation, we build healthcare products that patients find simple and staff find time-saving.",
    challenges: [
      {
        title: "No-shows cost money",
        body: "Automated reminders and one-tap rescheduling reduce empty slots.",
      },
      {
        title: "Front desks overwhelmed",
        body: "WhatsApp assistants answer routine questions and book appointments 24/7.",
      },
      {
        title: "Trust is everything",
        body: "Clean, credible design and careful handling of patient data.",
      },
    ],
    services: ["mobile-app-development", "automation", "website-development"],
    useCases: [
      { title: "Teleconsult & booking apps", body: "Search, book, pay and consult on video." },
      {
        title: "WhatsApp booking assistant",
        body: "Multilingual answers and bookings at any hour.",
      },
      { title: "Patient recall automation", body: "Follow-ups, check-ins and review requests." },
      { title: "Clinic websites", body: "Local SEO and online booking for every centre." },
    ],
    caseStudy: "pulsecare",
    seo: {
      title: "HealthTech App Development & Clinic Automation",
      description:
        "Healthcare apps, teleconsult MVPs and WhatsApp clinic automation for HealthTech startups and clinics.",
    },
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
