# Nexora Studio — Build Progress & Handoff

_Last updated: 2026-10-10 · Phases 0–18 complete · Next: Phase 19 (Legal, 404/error, SEO files, OG images, icons, manifest)_

The original brief (21 phases, 0–20) is the source of truth. Folder map: `docs/STRUCTURE.md`. The phase docs in this folder record decisions:
`00-ux-brief.md` · `01-art-direction.md` · `02-design-system.md` · `03-05-setup-components-creative.md` · this file.

## How to resume
```bash
cd nexora-studio
npm run dev            # http://localhost:3000
npm run build          # static export → /out (runs the placeholder report first)
npx serve@14 out       # preview the static build
npm run lint && npm run typecheck
```
- If CSS changes don't show up in a build, run `rm -rf .next` (Turbopack cache).
- Next.js 16.4 differs from older versions. Check `node_modules/next/dist/docs/` before using a new API (see `AGENTS.md`).
- **Nothing is committed yet.** Git is initialised on `main` with no commits. Husky runs lint-staged on commit.

## Status
| Phase | Status | Notes |
|---|---|---|
| 0 UX brief | ✅ | Accepted changes: 14 home sections, no timed mobile drawer, overlay stacking order, preloader ≤1.2s, guarantee fine print |
| 1 Art direction | ✅ | "Launch Control": ink `#0B0B0C` / bone `#F3F0EA` / ignition `#FF5A1F`; Bricolage Grotesque + Instrument Serif italic + Geist + Geist Mono |
| 2 Design system | ✅ | `app/globals.css` (Tailwind v4 CSS-first, no tailwind.config), `lib/motion.ts`, `lib/fonts.ts` |
| 3 Setup | ✅ | Static export, shadcn (radix-nova), ESLint/Prettier/Husky, Playwright + Chromium installed |
| 4 Components | ✅ | Buttons and inputs ≥44px, button variants incl. `glow`, motion wrappers, layout primitives |
| 5 Creative layer | ✅ | Lenis, preloader, page transition, SplitText, marquee, cursor, magnetic, reveals, parallax, pin, grain |
| 6 Layout | ✅ | Header + mega menu, mobile Sheet menu, footer, theme toggle, WhatsApp button, mobile sticky CTA, cookie consent |
| 7 Dummy data | ✅ | All content in `/data`, `data/README.md`, `npm run check:placeholders` (runs on prebuild) |
| 8 Home page | ✅ | 14 sections, verified desktop + mobile, no runtime errors |
| 9 Hero 3D | ✅ | `components/creative/hero-3d.tsx` (R3F), lazy + idle-loaded on capable desktops, poster fallback |
| 10 Service pages | ✅ | `/services` (overview + inline quiz `#quiz` + industries strip) and `/services/[slug]` ×4 (full template, Service + BreadcrumbList JSON-LD). ServiceQuiz + QuizLauncher (Dialog desktop / Drawer mobile) |
| 11 Work | ✅ | `/work` (ToggleGroup filter + Framer layout, project index with cursor previews) and `/work/[slug]` ×6 (overview → problem → approach → solution → results → testimonial → full-width "Next project" clip-path reveal) |
| 12 Industries | ✅ | `/industries` + `/industries/[slug]` ×4 |
| 13 Pricing | ✅ | `/pricing`: `components/interactive/pricing-tabs.tsx` (Tabs per service, deep links `#slug`, one-time/monthly Switch using `carePlans` in `data/pricing.ts`, ₹/$), engagement models, guarantee, money FAQs |
| 14 About + Contact | ✅ | `/about` (founder story, principles, why-us, testimonials, AboutPage/Person JSON-LD); `/contact` (booking card, WhatsApp/email/location/response time, `components/interactive/contact-form.tsx`). Tested end to end: pricing card → prefill → validation → WhatsApp message with all fields |
| 15 Resources | ✅ | `/resources`: 3 lead magnets with `components/interactive/resource-request.tsx` (Dialog + RHF), audit form, Automation Idea Session |
| 16 Conversion | ✅ | `components/interactive/exit-intent.tsx` (mounted in FloatingChrome): desktop Dialog on top-edge mouseleave after 8s; mobile dismissible bottom card at 60% scroll → Drawer. Once per visitor (`nx-exit-offer-seen`), waits for cookie choice, skipped on /contact + legal. Browser-tested |
| 17 Analytics | ✅ | `components/layout/analytics.tsx` in root layout: Plausible script only in prod + after analytics consent (with queue stub); one delegated click listener tracks every booking/WhatsApp link (`data-track-location` or nearest section). Explicit per-button booking/WhatsApp `track()` calls removed |
| 18 Blog | ✅ | `lib/blog.ts` (server-only; reads `content/blog/*.mdx`, dynamic import, reading time), `/blog`, `/blog/[slug]` (Article JSON-LD, author box, more posts), prose styles in `mdx-components.tsx`, `types/mdx.d.ts`. 2 posts: `mvp-cost-india-2026`, `startup-landing-page-blueprint` (isPlaceholder) |
| 19–20 | ⏳ | See "Remaining work" |

## Key architecture (where things live)
- **Content:** `data/*.ts` (types in `types/content.ts`). `site.ts` holds contact, booking, socials, availability and badges.
- **Single form submit path:** `lib/submit.ts` → `submitLead()` opens a pre-filled WhatsApp message, with an email fallback. Swap `deliver()` to add a backend.
- **Analytics:** `lib/analytics.ts` → `track(event, props)`. No-op in dev, consent-gated in prod. **The Plausible script loader isn't written yet (Phase 17).**
- **Consent:** `lib/consent.ts` (`useConsent()`: `undefined` before hydration, `null` = undecided). Footer button reopens preferences via the `nx:open-cookie-preferences` event.
- **Currency:** `lib/currency.ts` (`useCurrency`, `formatMoney`), `<Price>` and `<CurrencyToggle>` in `components/shared`.
- **Motion gates:** `useMotionOk()` (no reduced motion + not low-end) controls heavy effects. `useIsTouch()`, `useMediaQuery()`.
- **GSAP:** always import from `lib/gsap.ts` and animate inside `useGSAP` (it cleans up automatically).
- **Head boot script** (`components/creative/motion-boot-script.tsx`): sets `html.motion-ok`, and on the first visit to `/` sets `html[data-preload]` + `intro-delay`. CSS failsafes guarantee content can't stay hidden.
- **Hero headline** uses CSS-only line reveals (`.hero-line`, `.hero-fade` in globals.css), so the LCP text never waits on JS.
- **Forms:** `components/shared/form-fields.tsx` (`TextField`, `TextAreaField`: floating labels, RHF `Controller`, Zod, `useId` ids, shake on error). Example: `components/interactive/audit-form.tsx`.
- **Mockups:** `components/shared/project-visual.tsx` generates browser/phone/feed/flow mockups from `caseStudy.visual`.
- **Phase 10 building blocks** (reuse them in Phases 11–15):
  - `components/shared/page-hero.tsx`: inner-page hero (`variant="bold"` for Work/About, `"calm"` default)
  - `breadcrumbs.tsx`: emits BreadcrumbList JSON-LD
  - `pricing-tier-card.tsx`: CTA writes the contact prefill and goes to `/contact/`
  - `case-study-card.tsx`: also exports `categoryLabel`
  - `components/interactive/service-quiz.tsx`, `quiz-launcher.tsx`
  - `lib/prefill.ts`: `setContactPrefill` / `takeContactPrefill`, sessionStorage. **The Phase 14 contact form must call `takeContactPrefill()` on mount.**
- Root `app/layout.tsx` now has `metadataBase` and a title template (`%s | Nexora Studio`).
- `npm run typecheck` runs `next typegen` first (needed for `PageProps<"/route/[slug]">`).
- **Reusable sections:** `components/sections/cta-section.tsx` (end-of-page CTA), `components/shared/faq-list.tsx` (Accordion + FAQPage JSON-LD), `sections/home/services-grid.tsx`, `work-showcase.tsx`, `testimonials.tsx`, `pricing-teaser.tsx`, `faq-section.tsx` (all take a `number` prop).

## Gotchas found (keep in mind)
1. **`cn` must come from `@/lib/utils`.** It's configured for the custom tokens (`text-h4`, `text-small`, `shadow-lift`, …). The raw `cn` package treats `text-h4` as a colour and drops classes. **After any `npx shadcn add`, replace `import { cn } from "cn"` with `@/lib/utils`.**
2. **IntersectionObserver ignores elements clipped to zero** by clip-path, so put `whileInView` on an unclipped wrapper (see `image-reveal.tsx`).
3. **`window.open(url, "_blank", "noopener")` always returns null**, so `lib/submit.ts` opens without it and sets `popup.opener = null` instead.
4. **R3F's JSX types break generic `as: ElementType` props.** Use explicit tag unions.
5. **Shadow theme vars** use `--elevation-*` raw names, because a self-referencing `--shadow-*` would break.
6. **The shadcn `form` component is deprecated**; use `Field` + RHF `Controller`.
8. **Radix Select emits an empty `onValueChange("")`** when its value is set programmatically (`reset`/prefill). Always use `onValueChange={(v) => v && field.onChange(v)}` (see `contact-form.tsx`). Use `form.reset({...})` rather than `setValue` for prefills.
7. `components/ui/**` is excluded from ESLint (generated). `button`, `badge`, `card`, `input`, `textarea`, `select`, `toggle`, `tabs`, `slider`, `navigation-menu` and `table` were customised by hand; re-adding them with the CLI overwrites those changes.

## Remaining work (from the brief)
- **19 Legal/SEO:** `/privacy`, `/terms`, `/refund-policy` (placeholder text marked for legal review; README references `app/(legal)/*`), `app/not-found.tsx`, `error.tsx`, `sitemap.ts`, `robots.ts`, Organization/Service JSON-LD, root OG image (metadataBase + title template are already done), OG images (static for export), favicon/app icons, `manifest.ts`, theme-color.
- **20 QA:** Playwright smoke tests (navigation, contact form, quiz, calculator, theme toggle) + `@axe-core/playwright`, GitHub Actions (lint, typecheck, test, build, deploy to Vercel), Lighthouse pass, root README (setup, replacing dummy data, adding posts, deploying).

## Known loose ends
- Legal pages (`/privacy`, `/terms`, `/refund-policy`) still 404 until Phase 19. The blog Article JSON-LD references `/icon.svg`, which Phase 19 must create.
- **Adding a blog post** (for the Phase 20 README): create `content/blog/<slug>.mdx` with `export const metadata = { title, description, date, author, tags }`. It's picked up automatically.
- The mobile exit-intent card stays on screen until dismissed or used; consider auto-hiding it near the footer.
- Root OG image and Organization JSON-LD are still to add (Phase 19).
- The mobile sticky CTA shows over the top of the footer (it hides only within the last 600px); consider hiding it once the footer CTA is in view.
- The process rail uses per-item segments; a continuous line would be a nice polish.
- The 3D was only checked in headless Chromium with a software renderer. Check it on a real GPU and tune the look (shell opacity, light intensity).
