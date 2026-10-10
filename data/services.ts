import type { Service, ServiceSlug } from "@/types/content";

/**
 * Services: copy, deliverables, pricing tiers and FAQs per service page.
 * Prices are realistic 2026 Indian startup-market rates; USD set separately for international clients.
 * DUMMY: replace before launch (all copy, prices, timelines)
 */
export const services: Service[] = [
  // DUMMY: replace before launch
  {
    slug: "website-development",
    name: "Website Development",
    shortName: "Websites",
    icon: "globe",
    summary: "Landing pages, startup sites and e-commerce that load fast and convert.",
    cardTitle: "A website that makes you look funded.",
    hero: {
      eyebrow: "Website development company in Pune",
      title: "Launch a website that",
      highlight: "sells",
      subtitle:
        "Landing pages, startup websites and e-commerce stores designed to convert, built to load in under two seconds, and live in as little as 10 days.",
    },
    whoFor: [
      {
        title: "Founders preparing to raise",
        body: "Investors check your site before your deck. Look like the company you're becoming.",
      },
      {
        title: "Startups with a product but no pipeline",
        body: "Turn visitors into sign-ups and demo calls with clear messaging and fast pages.",
      },
      {
        title: "D2C brands outgrowing a template",
        body: "Custom storefronts that load fast on Indian 4G and check out without friction.",
      },
    ],
    problems: [
      {
        title: "Your site doesn't explain what you do",
        body: "Visitors leave in 5 seconds. We rewrite the story around one outcome and one action.",
      },
      {
        title: "It's slow on mobile",
        body: "Most of your traffic is on phones. We target sub-2-second loads and a 90+ Lighthouse score.",
      },
      {
        title: "Every change needs a developer",
        body: "You get a CMS or simple content files, so you can update copy and add pages yourself.",
      },
      {
        title: "No one can find you on Google",
        body: "Technical SEO, schema and clean page structure from day one, not bolted on later.",
      },
    ],
    deliverables: [
      {
        title: "Strategy & design",
        items: [
          "Messaging and page structure workshop",
          "Wireframes for every page",
          "High-fidelity UI design (desktop + mobile)",
          "Copywriting support for key pages",
        ],
      },
      {
        title: "Build",
        items: [
          "Next.js or Shopify build, responsive on every screen",
          "CMS so you can edit content yourself",
          "Forms, booking and WhatsApp integrations",
          "Analytics and conversion tracking",
        ],
      },
      {
        title: "Launch & after",
        items: [
          "On-page SEO, sitemap and schema",
          "Speed and accessibility audit before go-live",
          "Domain, hosting and launch support",
          "30 days of free fixes after launch",
        ],
      },
    ],
    process: [
      {
        title: "Discover",
        duration: "Days 1–2",
        body: "Goals, audience, competitors and one primary action for the site.",
      },
      {
        title: "Design",
        duration: "Days 3–6",
        body: "Wireframes, then UI in your brand. Two rounds of revisions included.",
      },
      {
        title: "Build",
        duration: "Days 7–12",
        body: "Development on a live staging link you can check any time.",
      },
      {
        title: "Launch",
        duration: "Days 13–14",
        body: "QA on real devices, speed checks, go live, hand over.",
      },
    ],
    timeline: "10 days to 4 weeks",
    stack: [
      { name: "Next.js", note: "Fast, SEO-friendly React framework" },
      { name: "Tailwind CSS", note: "Consistent, maintainable styling" },
      { name: "Shopify", note: "For e-commerce stores you can run yourself" },
      { name: "Sanity / Payload", note: "Headless CMS for editable content" },
      { name: "Vercel", note: "Global hosting with instant deploys" },
      { name: "Figma", note: "Design you can see before we build" },
    ],
    relatedCaseStudy: "kulhad-co",
    pricing: [
      {
        name: "Launch Page",
        price: { inr: 35000, usd: 490 },
        from: true,
        billing: "one-time",
        timeline: "10 days",
        description: "One high-converting landing page to validate an idea or launch a product.",
        features: [
          "Single long-form landing page",
          "Copywriting support",
          "Mobile-first design",
          "Lead form + WhatsApp integration",
          "Basic SEO + analytics",
          "30 days of free fixes",
        ],
        notIncluded: ["CMS", "Multiple pages"],
      },
      {
        name: "Startup Website",
        price: { inr: 85000, usd: 1190 },
        from: true,
        billing: "one-time",
        timeline: "3 weeks",
        description:
          "A complete 5–8 page site that makes you look credible to users and investors.",
        features: [
          "Up to 8 custom-designed pages",
          "Headless CMS for blog and pages",
          "Conversion-focused copy structure",
          "Booking, forms and CRM integration",
          "Technical SEO + schema",
          "Speed & accessibility audit",
          "30 days of free fixes",
        ],
        popular: true,
      },
      {
        name: "E-commerce Store",
        price: { inr: 150000, usd: 2090 },
        from: true,
        billing: "one-time",
        timeline: "4–5 weeks",
        description: "A fast Shopify or headless store built for Indian payments and shipping.",
        features: [
          "Custom Shopify theme or headless storefront",
          "Razorpay / UPI / COD setup",
          "Shiprocket or Delhivery integration",
          "Product, collection and offer pages",
          "Abandoned-cart WhatsApp flows",
          "Training for your team",
        ],
      },
    ],
    faqs: [
      {
        question: "How fast can you launch my website?",
        answer:
          "A landing page takes about 10 days. A full startup website takes about 3 weeks, and an e-commerce store 4–5 weeks. The timeline is fixed in your proposal, and the guarantee covers it.",
      },
      {
        question: "Will I be able to update the website myself?",
        answer:
          "Yes. Startup websites and stores come with a CMS or Shopify admin, plus a short recorded walkthrough. Most founders update copy and add blog posts without us.",
      },
      {
        question: "Do you write the content?",
        answer:
          "We structure every page and write headlines and key sections with you. If you need full copywriting for every page, we add it as a fixed-price extra.",
      },
      {
        question: "Can you redesign my existing site?",
        answer:
          "Yes. We audit what's working, keep your SEO equity with proper redirects, and rebuild the rest. Redesigns are usually priced like a Startup Website.",
      },
    ],
    seo: {
      title: "Website Development for Startups in Pune & India",
      description:
        "Startup websites, landing pages and e-commerce stores built in weeks. Fast, SEO-ready, conversion-focused. Website development company in Pune.",
      keywords: [
        "website development company Pune",
        "startup website design",
        "landing page development India",
      ],
    },
  },
  // DUMMY: replace before launch
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    shortName: "Apps",
    icon: "smartphone",
    summary: "MVP apps for Android and iOS, from idea to app store in about 8 weeks.",
    cardTitle: "Your MVP in users' hands in 8 weeks.",
    hero: {
      eyebrow: "MVP development for startups",
      title: "Ship your MVP app in",
      highlight: "8 weeks",
      subtitle:
        "Cross-platform Android and iOS apps, designed around one core user journey and built so you can test, learn and raise without rewriting everything later.",
    },
    whoFor: [
      {
        title: "Pre-seed founders validating an idea",
        body: "Get a real app in front of real users before you spend your round.",
      },
      {
        title: "Startups with a web product going mobile",
        body: "Bring your platform to Android and iOS with one shared codebase.",
      },
      {
        title: "Non-technical founders",
        body: "We act as your product and tech team until you're ready to hire one.",
      },
    ],
    problems: [
      {
        title: "You don't know what to build first",
        body: "We run a scoping sprint to cut your idea down to the one journey that proves demand.",
      },
      {
        title: "Quotes range from ₹2 lakh to ₹40 lakh",
        body: "You get a fixed scope, fixed price and milestone payments. No surprise invoices.",
      },
      {
        title: "Fear of being locked in",
        body: "You own the code, the repo and the app store accounts from day one.",
      },
      {
        title: "Two apps, two budgets",
        body: "One React Native or Flutter codebase ships to Android and iOS together.",
      },
    ],
    deliverables: [
      {
        title: "Product & design",
        items: [
          "Scoping sprint and feature prioritisation",
          "User flows and clickable prototype",
          "UI design system for the app",
          "Usability check with 5 target users",
        ],
      },
      {
        title: "Engineering",
        items: [
          "Cross-platform app (React Native or Flutter)",
          "Backend, database and admin panel",
          "Auth, payments and push notifications",
          "Analytics and crash reporting",
        ],
      },
      {
        title: "Launch",
        items: [
          "Play Store and App Store submission",
          "Beta testing with TestFlight / internal track",
          "Documentation and code handover",
          "60 days of free bug fixes",
        ],
      },
    ],
    process: [
      {
        title: "Scope",
        duration: "Week 1",
        body: "Core journey, feature list, success metrics and a fixed quote.",
      },
      {
        title: "Design",
        duration: "Weeks 2–3",
        body: "Flows, prototype and UI. You test it on your phone before we code.",
      },
      {
        title: "Build",
        duration: "Weeks 4–7",
        body: "Weekly builds you can install, plus a weekly demo call.",
      },
      {
        title: "Launch",
        duration: "Week 8",
        body: "Store submission, beta feedback, fixes and go-live.",
      },
    ],
    timeline: "6 to 12 weeks",
    stack: [
      { name: "React Native / Expo", note: "One codebase for Android and iOS" },
      { name: "Flutter", note: "For animation-heavy or offline-first apps" },
      { name: "Supabase / Firebase", note: "Auth, database and storage that scale" },
      { name: "Node.js", note: "Custom APIs and integrations" },
      { name: "Razorpay / Stripe", note: "Payments in India and worldwide" },
      { name: "Sentry", note: "Crash reporting from day one" },
    ],
    relatedCaseStudy: "pulsecare",
    pricing: [
      {
        name: "Design Sprint",
        price: { inr: 60000, usd: 890 },
        billing: "one-time",
        timeline: "2 weeks",
        description: "Validate the idea with a clickable prototype before you commit to a build.",
        features: [
          "Scoping workshop",
          "User flows for the core journey",
          "Clickable high-fidelity prototype",
          "Usability test with 5 users",
          "Fixed quote for the build",
        ],
        notIncluded: ["Development"],
      },
      {
        name: "MVP App",
        price: { inr: 250000, usd: 3490 },
        from: true,
        billing: "one-time",
        timeline: "8 weeks",
        description: "A launch-ready Android and iOS app built around your core journey.",
        features: [
          "Everything in Design Sprint",
          "Cross-platform app (Android + iOS)",
          "Backend + admin panel",
          "Auth, payments, notifications",
          "Store submission",
          "60 days of free bug fixes",
        ],
        popular: true,
      },
      {
        name: "Growth App",
        price: { inr: 450000, usd: 6290 },
        from: true,
        billing: "one-time",
        timeline: "10–12 weeks",
        description:
          "For products with multiple user roles, real-time features or complex integrations.",
        features: [
          "Everything in MVP App",
          "Multiple user roles (e.g. customer + partner)",
          "Real-time chat or tracking",
          "Third-party integrations",
          "Load testing before launch",
        ],
      },
    ],
    faqs: [
      {
        question: "React Native or Flutter: which will you use?",
        answer:
          "We recommend after scoping. React Native fits most startups, especially if you have or plan a React web app. Flutter suits apps with heavy animation or offline needs. Both ship to Android and iOS from one codebase.",
      },
      {
        question: "Who owns the code and app store accounts?",
        answer:
          "You do, from day one. The repository, store accounts and cloud accounts are created in your name. We work as collaborators and hand everything over at the end.",
      },
      {
        question: "What happens after launch?",
        answer:
          "Bugs are fixed free for 60 days. After that, you can move to a monthly retainer for new features, or take the code to your own team. Documentation makes that easy.",
      },
      {
        question: "Can you work from my Figma designs?",
        answer:
          "Yes. If your designs are ready, we skip the design phase and the quote drops. We'll review them first and flag anything that will be hard to build.",
      },
    ],
    seo: {
      title: "MVP App Development for Startups | Android & iOS",
      description:
        "MVP development for startups: cross-platform Android and iOS apps in about 8 weeks. Fixed price, milestone payments, full code ownership.",
      keywords: [
        "MVP development for startups",
        "mobile app development India",
        "React Native agency Pune",
      ],
    },
  },
  // DUMMY: replace before launch
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    shortName: "Social",
    icon: "megaphone",
    summary: "Content, community and paid ads that turn attention into customers.",
    cardTitle: "Get noticed before your launch day.",
    hero: {
      eyebrow: "Social media marketing for startups",
      title: "Build an audience that",
      highlight: "buys",
      subtitle:
        "Strategy, content and paid campaigns for Instagram, LinkedIn and YouTube, measured on leads and sales, not likes.",
    },
    whoFor: [
      {
        title: "D2C brands launching a product",
        body: "Build demand before launch day so your first drop sells out.",
      },
      {
        title: "B2B founders building authority",
        body: "Founder-led LinkedIn content that brings in inbound demo requests.",
      },
      {
        title: "Startups wasting ad spend",
        body: "Tighter targeting, better creatives and weekly optimisation.",
      },
    ],
    problems: [
      {
        title: "Posting without a plan",
        body: "We build a content system around your audience's questions and your sales goals.",
      },
      {
        title: "Ads that burn money",
        body: "We test creatives in small batches and scale only what brings leads at your target cost.",
      },
      {
        title: "No time to create content",
        body: "We shoot, edit and schedule. You approve a monthly calendar in one sitting.",
      },
      {
        title: "No idea what's working",
        body: "A simple monthly report: reach, leads, cost per lead, sales. Nothing vague.",
      },
    ],
    deliverables: [
      {
        title: "Strategy",
        items: [
          "Audience and competitor research",
          "Content pillars and brand voice guide",
          "Monthly content calendar",
          "KPI targets agreed upfront",
        ],
      },
      {
        title: "Content",
        items: [
          "Reels, carousels and static posts",
          "Founder-led LinkedIn posts",
          "Captions, hashtags and scheduling",
          "Community replies (business hours)",
        ],
      },
      {
        title: "Growth",
        items: [
          "Meta and LinkedIn ad campaigns",
          "Creative testing every week",
          "Influencer shortlist for launches",
          "Monthly performance report",
        ],
      },
    ],
    process: [
      {
        title: "Audit",
        duration: "Week 1",
        body: "What's working, what isn't, and where your buyers spend time.",
      },
      {
        title: "Plan",
        duration: "Week 1",
        body: "Pillars, calendar and ad strategy with clear targets.",
      },
      {
        title: "Create",
        duration: "Ongoing",
        body: "Monthly shoot or design batch, approved in one review.",
      },
      { title: "Optimise", duration: "Weekly", body: "Ad tweaks weekly, strategy review monthly." },
    ],
    timeline: "Monthly, minimum 3 months",
    stack: [
      { name: "Meta Ads Manager", note: "Instagram and Facebook campaigns" },
      { name: "LinkedIn Campaign Manager", note: "B2B targeting" },
      { name: "Canva / Figma", note: "On-brand creative at speed" },
      { name: "CapCut / Premiere", note: "Short-form video editing" },
      { name: "Buffer", note: "Scheduling and approvals" },
      { name: "Looker Studio", note: "One clear monthly dashboard" },
    ],
    relatedCaseStudy: "vastra-lane",
    pricing: [
      {
        name: "Starter",
        price: { inr: 25000, usd: 390 },
        billing: "monthly",
        timeline: "Monthly",
        description: "Consistent, on-brand presence on one platform.",
        features: [
          "1 platform",
          "12 posts / month (4 reels)",
          "Content calendar + captions",
          "Monthly report",
        ],
        notIncluded: ["Paid ads management"],
      },
      {
        name: "Growth",
        price: { inr: 45000, usd: 690 },
        billing: "monthly",
        timeline: "Monthly",
        description: "Content plus paid ads, managed to a cost-per-lead target.",
        features: [
          "2 platforms",
          "20 posts / month (8 reels)",
          "Paid ads management (up to ₹1L spend)",
          "Weekly creative testing",
          "Community management",
          "Monthly strategy call",
        ],
        popular: true,
      },
      {
        name: "Launch Campaign",
        price: { inr: 75000, usd: 1090 },
        billing: "one-time",
        timeline: "6 weeks",
        description: "A focused pre-launch to launch push for a product or brand.",
        features: [
          "Teaser → launch → follow-up content plan",
          "Launch video + 15 creatives",
          "Influencer shortlist and outreach",
          "Waitlist or pre-order ads",
          "Post-launch report",
        ],
      },
    ],
    faqs: [
      {
        question: "Is ad spend included in the price?",
        answer:
          "No. Ad spend is paid directly to Meta or LinkedIn from your account, so you keep full control and visibility. Our fee covers strategy, creatives and management.",
      },
      {
        question: "How soon will I see results?",
        answer:
          "Paid campaigns usually show reliable cost-per-lead data within 2–3 weeks. Organic growth compounds over 3 months, which is why we ask for a 3-month minimum.",
      },
      {
        question: "Do you shoot photos and videos?",
        answer:
          "Yes, in Pune we run a monthly half-day shoot. For brands elsewhere we work with your product shots, UGC creators or remote founder recordings with a simple guide.",
      },
      {
        question: "Can I cancel anytime?",
        answer:
          "After the first 3 months, yes, with 30 days' notice. No lock-in contracts beyond that.",
      },
    ],
    seo: {
      title: "Social Media Marketing for Startups & D2C Brands",
      description:
        "Social media marketing that drives leads and sales: content, reels, Meta and LinkedIn ads for startups in India. Transparent monthly pricing.",
      keywords: [
        "social media marketing agency Pune",
        "startup social media marketing",
        "D2C launch campaign",
      ],
    },
  },
  // DUMMY: replace before launch
  {
    slug: "automation",
    name: "Automation",
    shortName: "Automation",
    icon: "workflow",
    summary: "Workflows, AI chatbots and WhatsApp automation that save hours every week.",
    cardTitle: "Stop doing work a robot can do.",
    hero: {
      eyebrow: "Automation agency in India",
      title: "Give your team back",
      highlight: "20 hours",
      subtitle:
        "We connect your tools and automate the repetitive work (lead follow-ups, WhatsApp replies, invoices, reports) with n8n, Zapier, Make and AI.",
    },
    whoFor: [
      {
        title: "Small businesses drowning in WhatsApp",
        body: "Auto-reply, qualify and book enquiries 24/7 without hiring.",
      },
      {
        title: "Startups with leads leaking",
        body: "Every lead captured, scored, followed up and in your CRM within seconds.",
      },
      {
        title: "Ops teams copying data between tools",
        body: "Connect your forms, sheets, CRM and accounting so data moves on its own.",
      },
    ],
    problems: [
      {
        title: "Leads go cold while you're busy",
        body: "Instant WhatsApp and email follow-ups mean no enquiry waits more than a minute.",
      },
      {
        title: "Hours lost to copy-paste",
        body: "We map your manual tasks and automate the ones that cost the most time.",
      },
      {
        title: "Tools that don't talk to each other",
        body: "Custom integrations between your CRM, sheets, payments and support tools.",
      },
      {
        title: "Scared of breaking things",
        body: "Every automation is documented, monitored and comes with error alerts.",
      },
    ],
    deliverables: [
      {
        title: "Audit",
        items: [
          "Process mapping session",
          "Time and cost savings estimate",
          "Prioritised automation roadmap",
          "Tool recommendations (no unnecessary subscriptions)",
        ],
      },
      {
        title: "Build",
        items: [
          "Workflows in n8n, Zapier or Make",
          "WhatsApp Business API flows",
          "AI chatbot trained on your FAQs",
          "CRM and lead automation",
        ],
      },
      {
        title: "Run",
        items: [
          "Error alerts and monitoring",
          "Loom walkthroughs for your team",
          "Documentation of every flow",
          "30 days of free tweaks",
        ],
      },
    ],
    process: [
      {
        title: "Map",
        duration: "Days 1–2",
        body: "We list every repetitive task and what it costs you per month.",
      },
      {
        title: "Prioritise",
        duration: "Day 3",
        body: "Highest savings first. You approve the roadmap and price.",
      },
      {
        title: "Build",
        duration: "Days 4–10",
        body: "Flows built and tested on real data in a sandbox.",
      },
      {
        title: "Hand over",
        duration: "Days 11–14",
        body: "Go live, monitor, train your team, document.",
      },
    ],
    timeline: "1 to 3 weeks",
    stack: [
      { name: "n8n", note: "Self-hostable workflows with no per-task fees" },
      { name: "Zapier / Make", note: "Quick wins on tools you already use" },
      { name: "WhatsApp Business API", note: "Official API via Interakt / Wati / Meta" },
      { name: "OpenAI / Claude", note: "AI replies, summaries and classification" },
      { name: "HubSpot / Zoho CRM", note: "Lead pipelines that update themselves" },
      { name: "Google Workspace", note: "Sheets, Gmail and Calendar automation" },
    ],
    relatedCaseStudy: "sahaj-clinics",
    pricing: [
      {
        name: "Quick Win",
        price: { inr: 20000, usd: 290 },
        billing: "one-time",
        timeline: "5 days",
        description:
          "One high-impact automation, such as lead capture to CRM with instant follow-up.",
        features: [
          "1 automated workflow (up to 8 steps)",
          "Connected to 3 tools",
          "Error alerts",
          "Loom walkthrough",
        ],
      },
      {
        name: "Workflow Suite",
        price: { inr: 65000, usd: 990 },
        from: true,
        billing: "one-time",
        timeline: "2 weeks",
        description:
          "Automate a full process end-to-end: leads, sales follow-up, onboarding or invoicing.",
        features: [
          "Process audit + savings estimate",
          "Up to 5 connected workflows",
          "CRM setup or clean-up",
          "WhatsApp or email sequences",
          "Monitoring + documentation",
          "30 days of free tweaks",
        ],
        popular: true,
      },
      {
        name: "AI & WhatsApp Assistant",
        price: { inr: 90000, usd: 1390 },
        from: true,
        billing: "one-time",
        timeline: "3 weeks",
        description:
          "An AI assistant on WhatsApp and your website that answers, qualifies and books.",
        features: [
          "WhatsApp Business API setup",
          "AI trained on your FAQs and catalogue",
          "Lead qualification + booking",
          "Human handover inbox",
          "Analytics dashboard",
        ],
        notIncluded: ["WhatsApp API conversation charges (billed by Meta)"],
      },
    ],
    faqs: [
      {
        question: "Which tool will you use: n8n, Zapier or Make?",
        answer:
          "Whatever costs you least over time. Zapier is quickest for simple flows on tools you already use. n8n is best for heavy volume because it has no per-task fees. We explain the trade-off before we build.",
      },
      {
        question: "Do I need the WhatsApp Business API?",
        answer:
          "For automated replies and broadcasts at scale, yes. We set it up through an official provider. The regular WhatsApp Business app can't be automated safely.",
      },
      {
        question: "What if an automation breaks?",
        answer:
          "Every flow has error alerts sent to you and us. Fixes are free for 30 days, and a small monthly support plan covers everything after that.",
      },
      {
        question: "Is my data safe?",
        answer:
          "We use your accounts, least-privilege access and, where needed, self-hosted n8n on your own server. We sign an NDA and a data-processing agreement on request.",
      },
    ],
    seo: {
      title: "Automation Agency India | n8n, Zapier, WhatsApp & AI",
      description:
        "Automation agency in India: workflow automation with n8n, Zapier and Make, AI chatbots, WhatsApp automation and CRM lead automation for startups and small businesses.",
      keywords: ["automation agency India", "WhatsApp automation", "n8n automation agency"],
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug) as ServiceSlug[];
