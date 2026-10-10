# Folder structure · Nexora Studio

_Snapshot: 2026-10-10, after Phase 18. Build artifacts (`.next/`, `out/`, `node_modules/`) are not listed._

```
nexora-studio/
├── app/                              # Next.js App Router: one folder per route (static export)
│   ├── layout.tsx                    # Root: fonts, metadata (metadataBase, title template), boot script,
│   │                                 #   Providers, CreativeLayer, header/main/footer, FloatingChrome, Analytics
│   ├── template.tsx                  # Route transition wrapper (PageTransition)
│   ├── globals.css                   # Design system: tokens, Tailwind v4 @theme, utilities, creative CSS
│   ├── favicon.ico                   # Scaffold favicon (replace in Phase 19)
│   ├── page.tsx                      # Home: 14 sections
│   ├── services/page.tsx             # Services overview + inline quiz (#quiz) + industries strip
│   ├── services/[slug]/page.tsx      # 4 service pages (generateStaticParams)
│   ├── work/page.tsx                 # Portfolio filter grid + project index
│   ├── work/[slug]/page.tsx          # 6 case studies + "Next project" reveal
│   ├── industries/page.tsx           # Industries overview
│   ├── industries/[slug]/page.tsx    # 4 industry pages
│   ├── pricing/page.tsx              # Tabs per service, one-time/monthly Switch, ₹/$
│   ├── about/page.tsx                # Founder story, principles, testimonials
│   ├── contact/page.tsx              # Booking card, channels, ContactForm
│   ├── resources/page.tsx            # 3 lead magnets, audit form, automation session
│   ├── blog/page.tsx                 # Post list (reads content/blog via lib/blog.ts)
│   └── blog/[slug]/page.tsx          # Post page (MDX), Article JSON-LD
│   # Phase 19 adds: privacy/, terms/, refund-policy/, not-found.tsx, error.tsx,
│   #   sitemap.ts, robots.ts, manifest.ts, icons, OG images
│
├── components/
│   ├── ui/                           # shadcn/ui (generated, radix-nova). Hand-customised: button, badge,
│   │                                 #   card, input, textarea, select, toggle, tabs, slider,
│   │                                 #   navigation-menu, table. All import cn from @/lib/utils
│   ├── layout/                       # Site chrome
│   │   ├── site-header.tsx           # NavigationMenu + Services mega menu, sliding active pill
│   │   ├── mobile-menu.tsx           # Full-screen Sheet menu
│   │   ├── site-footer.tsx           # Oversized CTA, columns, badges, legal, newsletter
│   │   ├── site-chrome.tsx           # FloatingChrome: WhatsApp button, sticky CTA, exit intent, cookies
│   │   ├── analytics.tsx             # Plausible loader (consent) + delegated click tracking
│   │   ├── cookie-consent.tsx        # Banner + preferences Dialog
│   │   ├── cookie-preferences-button.tsx
│   │   ├── mobile-sticky-cta.tsx     # Book + WhatsApp bar (mobile)
│   │   ├── whatsapp-button.tsx       # Floating button (desktop)
│   │   ├── theme-toggle.tsx          # Light/Dark/System DropdownMenu
│   │   ├── newsletter-form.tsx       # UI-only signup (stub)
│   │   ├── local-time.tsx · roll-link.tsx · tracked-link.tsx · whatsapp-icon.tsx
│   ├── sections/
│   │   ├── home/                     # Home sections (most take a `number` prop for [01] labels)
│   │   │   ├── hero.tsx · rotating-word.tsx · hero-visual.tsx · hero-visual-fallback.tsx
│   │   │   ├── logo-marquee.tsx · problem-section.tsx · services-grid.tsx
│   │   │   ├── work-showcase.tsx     # Pinned horizontal scroll (desktop)
│   │   │   ├── why-us.tsx · comparison-table.tsx · process-timeline.tsx
│   │   │   ├── calculator-section.tsx · testimonials.tsx · pricing-teaser.tsx
│   │   │   └── guarantee.tsx · lead-magnet.tsx · faq-section.tsx
│   │   └── cta-section.tsx           # End-of-page CTA (founder card), used on every page
│   ├── interactive/                  # Conversion features
│   │   ├── contact-form.tsx          # RHF + Zod, prefill, WhatsApp submit
│   │   ├── audit-form.tsx            # Free Startup Launch Audit
│   │   ├── service-quiz.tsx · quiz-launcher.tsx   # 3-question quiz (Dialog / Drawer)
│   │   ├── savings-calculator.tsx    # Automation savings
│   │   ├── pricing-tabs.tsx · portfolio-filter.tsx
│   │   ├── resource-request.tsx      # Lead-magnet request Dialog
│   │   └── exit-intent.tsx           # Desktop Dialog / mobile card + Drawer
│   ├── shared/                       # Composed building blocks
│   │   ├── container.tsx · section.tsx · section-heading.tsx · grid.tsx · page-hero.tsx · breadcrumbs.tsx
│   │   ├── form-fields.tsx           # Floating-label TextField / TextAreaField (RHF)
│   │   ├── project-visual.tsx        # Generated device mockups (browser/phone/feed/flow)
│   │   ├── case-study-card.tsx · testimonial-card.tsx · pricing-tier-card.tsx
│   │   ├── price.tsx · currency-toggle.tsx · faq-list.tsx · json-ld.tsx
│   │   └── icon.tsx · logo.tsx · client-wordmark.tsx · founder-avatar.tsx
│   ├── creative/                     # GSAP / WebGL / motion layer
│   │   ├── smooth-scroll.tsx         # Lenis + ScrollTrigger sync
│   │   ├── motion-boot-script.tsx    # Pre-paint html classes (motion-ok, preload)
│   │   ├── creative-layer.tsx        # Preloader, progress bar, grain, cursor
│   │   ├── preloader.tsx · preloader-key.ts · page-transition.tsx · custom-cursor.tsx
│   │   ├── split-text-reveal.tsx · scroll-marquee.tsx · magnetic-wrapper.tsx
│   │   ├── image-reveal.tsx · parallax-layer.tsx · pinned-section.tsx · hover-image-preview.tsx
│   │   ├── grain-overlay.tsx · scroll-progress.tsx
│   │   └── hero-3d.tsx               # R3F "Ignition Core" (lazy, desktop only)
│   ├── motion/                       # Framer Motion wrappers
│   │   └── fade-in.tsx · stagger.tsx · count-up.tsx · animated-button.tsx
│   └── providers.tsx                 # Theme, MotionConfig, Tooltip, Toaster, SmoothScroll
│
├── data/                             # ALL content (dummy, flagged). See data/README.md
│   ├── site.ts                       # Name, contact, booking, socials, badges, nav, analytics domain
│   ├── services.ts · case-studies.ts · testimonials.ts · industries.ts
│   ├── pricing.ts                    # Engagement models, care plans, FAQs, GST note
│   ├── home.ts                       # Home copy (hero, problems, why us, comparison, process, FAQ…)
│   ├── founder.ts · logos.ts · quiz.ts · resources.ts · calculator.ts
│   └── README.md                     # Replace-before-launch checklist
│
├── content/blog/                     # MDX posts (drop a file → new post)
│   ├── mvp-cost-india-2026.mdx
│   └── startup-landing-page-blueprint.mdx
│
├── lib/
│   ├── submit.ts                     # THE form submit path (WhatsApp → email fallback)
│   ├── analytics.ts                  # track() (dev no-op, consent-gated)
│   ├── consent.ts · storage.ts · prefill.ts · currency.ts · links.ts
│   ├── blog.ts                       # server-only MDX loader
│   ├── gsap.ts                       # GSAP + plugins (import from here only)
│   ├── motion.ts                     # Easing, durations, springs, variants
│   ├── fonts.ts                      # next/font: Bricolage, Instrument Serif, Geist, Geist Mono
│   └── utils.ts                      # cn() configured for custom tokens
│
├── hooks/                            # use-media-query, use-reduced-motion, use-is-touch,
│                                     #   use-device-tier, use-motion-ok, use-mounted, use-lenis
├── types/                            # content.ts (content model), mdx.d.ts
├── scripts/check-placeholders.mjs    # Runs before every build (STRICT_PLACEHOLDERS=1 fails it)
├── docs/                             # 00 UX brief · 01 art direction · 02 design system ·
│                                     #   03-05 setup/components/creative · PROGRESS.md · STRUCTURE.md
├── public/                           # images/ (empty). Icons/OG land here in Phase 19
├── mdx-components.tsx                # Blog typography
├── next.config.ts                    # output: export, trailingSlash, MDX, Turbopack Tailwind loader
├── components.json                   # shadcn config
├── eslint.config.mjs · .prettierrc.json · .prettierignore · .lintstagedrc.json · .husky/
├── tsconfig.json · package.json · AGENTS.md (Next.js agent notes) · README.md (scaffold, rewrite in Phase 20)
```

## Where to change things
| I want to… | Edit |
|---|---|
| Change any copy, price, contact detail | `data/*.ts` |
| Add a blog post | `content/blog/<slug>.mdx` |
| Change colours, fonts, spacing, type scale | `app/globals.css`, `lib/fonts.ts` |
| Change animation timing | `lib/motion.ts` |
| Connect a form backend | `deliver()` in `lib/submit.ts` |
| Change the nav | `mainNav` / `footerNav` in `data/site.ts` |
| Add a page | `app/<route>/page.tsx` + `PageHero` + `CtaSection` |
