import type { CaseStudy } from "@/types/content";

/**
 * Fictional case studies (2 web, 2 app, 1 social, 1 automation).
 * Every company, number and quote is invented. Never publish these as real work.
 * DUMMY: replace before launch
 */
export const caseStudies: CaseStudy[] = [
  // DUMMY: replace before launch
  {
    slug: "pulsecare",
    isPlaceholder: true,
    client: "PulseCare",
    tagline: "Teleconsults for tier-2 India",
    industry: "healthtech",
    category: "app",
    services: ["mobile-app-development", "automation"],
    year: 2026,
    timeline: "8 weeks",
    location: "Indore, India",
    summary:
      "A doctor-booking and video-consult MVP that signed up 12,000 patients in its first 90 days and helped close a ₹3.2 Cr seed round.",
    problem:
      "PulseCare had a network of 140 doctors in tier-2 cities and a seed meeting in 10 weeks, but no product. Patients booked by calling clinic receptionists, and 30% of appointments were no-shows.",
    approach: [
      {
        title: "Cut the scope to one journey",
        body: "In the scoping week we cut 23 feature ideas down to one flow: find a doctor, book a slot, pay, consult on video.",
      },
      {
        title: "Design for first-time smartphone users",
        body: "Large tap targets, Hindi and English, UPI-first payment and OTP login without passwords.",
      },
      {
        title: "Automate the no-shows away",
        body: "WhatsApp reminders 24h and 1h before each slot, with one-tap reschedule.",
      },
    ],
    solution: [
      {
        title: "Patient app (Android + iOS)",
        body: "React Native app with doctor search, slot booking, UPI payments and in-app video consults.",
      },
      {
        title: "Doctor dashboard",
        body: "A web panel for doctors to manage availability, notes and e-prescriptions.",
      },
      {
        title: "WhatsApp reminder engine",
        body: "n8n flows triggered by bookings send reminders and follow-ups and request reviews.",
      },
    ],
    results: [
      { value: 12000, suffix: "+", label: "patients in 90 days" },
      { value: 62, suffix: "%", label: "fewer no-shows" },
      { value: 3.2, decimals: 1, prefix: "₹", suffix: " Cr", label: "seed round closed" },
      { value: 4.7, decimals: 1, suffix: "★", label: "Play Store rating" },
    ],
    testimonialId: "t-pulsecare",
    visual: { hue: 160, device: "phone", screen: "booking" },
    featured: true,
  },
  // DUMMY: replace before launch
  {
    slug: "ledgerly",
    isPlaceholder: true,
    client: "Ledgerly",
    tagline: "GST invoicing for freelancers",
    industry: "saas",
    category: "web",
    services: ["website-development", "automation"],
    year: 2026,
    timeline: "3 weeks",
    location: "Bengaluru, India",
    summary:
      "A marketing site and self-serve onboarding that tripled trial sign-ups and cut sales calls needed per customer in half.",
    problem:
      "Ledgerly's product was solid, but its site read like a feature list. Visitors didn't understand the value, and every trial needed a sales call to activate.",
    approach: [
      {
        title: "Rewrite around one outcome",
        body: "From 'GST-compliant invoicing platform' to 'Send a GST invoice in 30 seconds. Get paid 2x faster.'",
      },
      {
        title: "Show, don't tell",
        body: "Interactive product demo in the hero instead of screenshots.",
      },
      {
        title: "Automate activation",
        body: "Behaviour-based onboarding emails replaced the manual sales call.",
      },
    ],
    solution: [
      {
        title: "Next.js marketing site",
        body: "Eight pages, CMS-driven blog, comparison pages for SEO and a 0.9s LCP.",
      },
      {
        title: "Interactive demo",
        body: "A sandboxed invoice builder visitors can try without signing up.",
      },
      {
        title: "Onboarding automation",
        body: "HubSpot + product events trigger tailored emails until the first invoice is sent.",
      },
    ],
    results: [
      { value: 3.1, decimals: 1, suffix: "x", label: "more trial sign-ups" },
      { value: 48, suffix: "%", label: "trial-to-paid conversion" },
      { value: 0.9, decimals: 1, suffix: "s", label: "largest contentful paint" },
      { value: 50, suffix: "%", label: "fewer sales calls per customer" },
    ],
    testimonialId: "t-ledgerly",
    visual: { hue: 260, device: "browser", screen: "dashboard" },
  },
  // DUMMY: replace before launch
  {
    slug: "kulhad-co",
    isPlaceholder: true,
    client: "Kulhad & Co.",
    tagline: "Small-batch chai, delivered",
    industry: "d2c",
    category: "web",
    services: ["website-development", "social-media-marketing"],
    year: 2025,
    timeline: "5 weeks",
    location: "Jaipur, India",
    summary:
      "A Shopify store rebuilt for speed and subscriptions, lifting conversion from 1.1% to 3.4% in the first quarter.",
    problem:
      "Kulhad & Co. was selling well on Instagram, but its store took 6 seconds to load on mobile, checkout broke on some UPI apps, and there was no way to subscribe.",
    approach: [
      {
        title: "Fix speed first",
        body: "Removed 14 unused apps, rebuilt the theme and served images in modern formats.",
      },
      {
        title: "Make subscriptions the default",
        body: "'Subscribe & save 15%' became the main path, with flexible delivery intervals.",
      },
      {
        title: "Recover lost carts on WhatsApp",
        body: "Abandoned-cart reminders on WhatsApp instead of ignored emails.",
      },
    ],
    solution: [
      {
        title: "Custom Shopify theme",
        body: "Story-led product pages, bundles and a 2-step checkout with Razorpay UPI.",
      },
      {
        title: "Subscription engine",
        body: "Recurring orders with skip, pause and swap controls customers manage themselves.",
      },
      {
        title: "WhatsApp cart recovery",
        body: "Automated reminders with a one-tap return-to-cart link.",
      },
    ],
    results: [
      { value: 3.4, decimals: 1, suffix: "%", label: "conversion rate (from 1.1%)" },
      { value: 38, suffix: "%", label: "revenue from subscriptions" },
      { value: 1.8, decimals: 1, suffix: "s", label: "mobile load time (from 6s)" },
      { value: 22, suffix: "%", label: "abandoned carts recovered" },
    ],
    testimonialId: "t-kulhad",
    visual: { hue: 45, device: "browser", screen: "store" },
  },
  // DUMMY: replace before launch
  {
    slug: "learnloop",
    isPlaceholder: true,
    client: "LearnLoop",
    tagline: "10-minute daily exam prep",
    industry: "edtech",
    category: "app",
    services: ["mobile-app-development"],
    year: 2025,
    timeline: "10 weeks",
    location: "Kota, India",
    summary:
      "A bite-sized learning app for competitive exam aspirants that reached 40% day-30 retention, about 3x the category average.",
    problem:
      "LearnLoop's founders had 2,000 hours of video lectures, but students dropped off after the first week. They needed a habit, not a library.",
    approach: [
      {
        title: "Design for 10 minutes a day",
        body: "Daily micro-lessons, 5-question quizzes and streaks, all tuned for the commute.",
      },
      {
        title: "Work offline",
        body: "Lessons download on Wi-Fi and play without data, which mattered for students in hostels.",
      },
      {
        title: "Make progress visible",
        body: "Topic mastery maps and weekly rank among peers preparing for the same exam.",
      },
    ],
    solution: [
      {
        title: "Flutter app",
        body: "Offline-first lessons, adaptive quizzes and streaks with gentle push nudges.",
      },
      {
        title: "Content admin",
        body: "Teachers upload, tag and schedule micro-lessons without developer help.",
      },
      {
        title: "Analytics",
        body: "Cohort retention dashboards so the team sees which lessons lose students.",
      },
    ],
    results: [
      { value: 40, suffix: "%", label: "day-30 retention" },
      { value: 85000, suffix: "+", label: "downloads in 6 months" },
      { value: 11, suffix: " min", label: "average daily session" },
      { value: 4.6, decimals: 1, suffix: "★", label: "Play Store rating" },
    ],
    testimonialId: "t-learnloop",
    visual: { hue: 300, device: "phone", screen: "lesson" },
  },
  // DUMMY: replace before launch
  {
    slug: "vastra-lane",
    isPlaceholder: true,
    client: "Vastra Lane",
    tagline: "Handloom, made modern",
    industry: "d2c",
    category: "social",
    services: ["social-media-marketing"],
    year: 2026,
    timeline: "6-week launch",
    location: "Pune, India",
    summary:
      "A 6-week Instagram launch campaign that built a 9,000-person waitlist and sold out the first collection in 4 days.",
    problem:
      "A new handloom brand with beautiful products, 300 followers and a fixed launch date. Paid ads had been tried and abandoned at ₹180 per lead.",
    approach: [
      {
        title: "Tell the weaver's story",
        body: "A reel series following one saree from loom to wardrobe, filmed in Maheshwar.",
      },
      {
        title: "Waitlist, not 'buy now'",
        body: "Ads drove to an early-access waitlist with a launch-day discount.",
      },
      {
        title: "Micro-creators over celebrities",
        body: "12 creators with 10k–50k engaged followers in the slow-fashion niche.",
      },
    ],
    solution: [
      {
        title: "Content system",
        body: "24 reels, 18 carousels and daily stories across 6 weeks.",
      },
      {
        title: "Paid campaign",
        body: "Meta ads with weekly creative tests, scaled on the two best-performing hooks.",
      },
      {
        title: "Launch-day playbook",
        body: "Countdown stories, WhatsApp broadcast to the waitlist and live styling sessions.",
      },
    ],
    results: [
      { value: 9000, suffix: "+", label: "waitlist sign-ups" },
      { value: 4, suffix: " days", label: "to sell out collection one" },
      { value: 38, prefix: "₹", label: "cost per lead (from ₹180)" },
      { value: 12, suffix: "x", label: "follower growth" },
    ],
    testimonialId: "t-vastra",
    visual: { hue: 20, device: "feed", screen: "reels" },
  },
  // DUMMY: replace before launch
  {
    slug: "sahaj-clinics",
    isPlaceholder: true,
    client: "Sahaj Clinics",
    tagline: "Physiotherapy across 6 centres",
    industry: "healthtech",
    category: "automation",
    services: ["automation"],
    year: 2026,
    timeline: "2 weeks",
    location: "Nashik, India",
    summary:
      "A WhatsApp assistant and lead automation that now handles 70% of enquiries and saves the front desk 26 hours a week.",
    problem:
      "Six clinic receptionists answered the same WhatsApp questions all day: fees, timings, location, availability. Enquiries after 8 pm went unanswered until morning, and many booked elsewhere.",
    approach: [
      {
        title: "Map every question",
        body: "Exported 3 months of chats and grouped them: 70% were five repeat questions.",
      },
      {
        title: "Answer instantly, hand over gracefully",
        body: "An AI assistant handles common questions and bookings, and hands complex cases to staff with full context.",
      },
      {
        title: "Close the loop",
        body: "Every enquiry lands in the CRM with its source, so the team knows which ads actually bring patients.",
      },
    ],
    solution: [
      {
        title: "WhatsApp AI assistant",
        body: "Answers FAQs in English, Hindi and Marathi, shows slots and books into the clinic calendar.",
      },
      {
        title: "Lead pipeline",
        body: "n8n routes every enquiry from WhatsApp, Instagram and Google into Zoho CRM with follow-ups.",
      },
      {
        title: "Recall automation",
        body: "Patients get session reminders and a check-in message after their last session.",
      },
    ],
    results: [
      { value: 26, suffix: " hrs", label: "saved per week" },
      { value: 70, suffix: "%", label: "enquiries handled automatically" },
      { value: 31, suffix: "%", label: "more bookings after hours" },
      { value: 14, suffix: " days", label: "from kickoff to live" },
    ],
    testimonialId: "t-sahaj",
    visual: { hue: 200, device: "flow", screen: "whatsapp" },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

/** Next case study in the list (wraps around) for the full-width "Next project" link. */
export function getNextCaseStudy(slug: string): CaseStudy {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  return caseStudies[(i + 1) % caseStudies.length]!;
}

export const featuredCaseStudy = caseStudies.find((c) => c.featured) ?? caseStudies[0]!;
