# Content & dummy data: replace before launch

All site copy lives in `/data/*.ts`, with blog posts in `/content/blog/*.mdx`. Components never hard-code content, so replacing a value here updates every page that uses it.

**How dummy content is marked**
- `// DUMMY: replace before launch`: a placeholder value
- `isPlaceholder: true`: a fictional case study, testimonial, logo, stat, resource or founder profile
- `npm run check:placeholders` lists what's left. It also runs before every `npm run build`.
- Set `STRICT_PLACEHOLDERS=1` in your production deploy to **block** builds that still contain placeholders.

> ⚠️ **Legal note:** never publish the fictional testimonials, case studies, client logos or stats as real. Fake reviews are misleading, and in India they can breach consumer-protection rules (CCPA guidelines on fake reviews). Replace them with real, permissioned content, or delete them. Every list renders fine with fewer items.

---

## Checklist

### 1. `data/site.ts`: business details (do this first)
| Field | What to put |
|---|---|
| `name`, `legalName` | Final brand name and registered business name |
| `url` | Production domain (used for SEO, sitemap, OG images) |
| `tagline`, `positioning`, `description` | Final positioning. `description` is the default meta description |
| `contact.email` | Real inbox |
| `contact.whatsapp` | Digits only with country code, e.g. `919812345678` |
| `contact.whatsappDisplay` | Human-readable number |
| `contact.booking` | Your Cal.com / Calendly link |
| `social[]` | Real profile URLs (delete any you don't use) |
| `availability` | Scarcity line. **Keep it true**: update monthly or set to `""` to hide |
| `trustBadges[].detail` | Real GSTIN and Udyam number (or remove a badge you don't have yet) |
| `analytics.plausibleDomain` | Your Plausible site domain |

### 2. `data/founder.ts`: founder profile
`name`, `initials`, `role`, `photo` (put a square image in `/public/images/` and set the path, e.g. `/images/founder.jpg`), `shortBio`, `intro`, `story[]`, `highlights[]`, `linkedin`. Remove `isPlaceholder` when done.

### 3. `data/case-studies.ts`: 6 fictional case studies
For each real project: `client`, `tagline`, `industry`, `category`, `services`, `year`, `timeline`, `location`, `summary`, `problem`, `approach[]`, `solution[]`, `results[]` (real, verifiable numbers only), `testimonialId`, `visual` (mockup hue and device). Set `featured: true` on the one to show on the home page. Delete fictional entries you can't replace; the Work page adapts.

### 4. `data/testimonials.ts`: 6 fictional testimonials
Replace with real quotes **with written permission**: `name`, `role`, `company`, `location`, `quote`, `rating`, `caseStudy`. Avatars use initials; real photos can be added later.

### 5. `data/logos.ts`: 8 fictional client wordmarks
Replace with real client names (with permission) or remove the logo marquee until you have 4+. `techStack` lists real tools and can stay.

### 6. `data/home.ts`: home page copy
| Export | Replace |
|---|---|
| `hero` | Headline words, subtitle |
| `problems`, `whyUs` | Review wording |
| `comparison` | Make sure every claim is one you can stand behind |
| `process` | Your real process and durations |
| `guarantee` | **Have a lawyer review the guarantee and fine print** |
| `stats` | Real numbers only (`isPlaceholder` flags them) |
| `leadMagnet` | Audit offer details and turnaround |
| `homeFaqs` | Prices and timelines must match `services.ts` |
| `finalCta` | Closing copy |

### 7. `data/services.ts`: 4 services
Per service: `summary`, `hero`, `whoFor`, `problems`, `deliverables`, `process`, `timeline`, `stack`, `relatedCaseStudy` (must match a case-study `slug`), `pricing[]` (INR **and** USD set explicitly), `faqs`, `seo`.

### 8. `data/pricing.ts`: engagement models
`engagementModels[]` prices, `pricingPromises`, `pricingNote` (GST wording: confirm with your CA), `pricingFaqs`, `INR_PER_USD` (calculator display only).

### 9. `data/industries.ts`: 4 industries
Copy for SaaS, D2C, EdTech and HealthTech. `caseStudy` must match a case-study `slug`.

### 10. `data/quiz.ts`, `data/calculator.ts`
Quiz wording and scoring, and calculator assumptions (`automationRate`, default hourly cost). Review against real project data.

### 11. `data/resources.ts`: 3 lead magnets
These are UI only: requests open WhatsApp or email. To deliver files, connect a form or email backend in `lib/submit.ts` and attach the real PDFs or Notion links.

### 12. `content/blog/*.mdx`: 2 sample posts
Edit or replace. See the root README for how to add a post.

### 13. Legal pages: `app/(legal)/*`
Privacy Policy, Terms of Service and Refund Policy are **placeholder templates** and must be reviewed by a lawyer before launch.

### 14. Code-level placeholders
| File | What |
|---|---|
| `components/layout/newsletter-form.tsx` | `subscribe()` is a stub. Connect Buttondown / Brevo / ConvertKit |
| `components/shared/logo.tsx` | Placeholder logo mark |
| `public/` | Favicon, app icons and OG images are generated placeholders |
