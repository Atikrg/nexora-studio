# Phases 3–5 — Setup, Components, Creative Layer

## Phase 3 — Project setup
- **Stack:** Next.js 16.4 (App Router, Turbopack) · React 19.3 · TypeScript strict · Tailwind 4.3 · shadcn/ui 4 (Radix, "nova" preset) · GSAP 3.15 + @gsap/react · Lenis 1.3 · motion 14 (Framer Motion) · three / R3F 9 / drei 10 · React Hook Form + Zod 4 · @next/mdx + remark-gfm
- **Static export:** `output: "export"`, `trailingSlash: true`, `images.unoptimized`. `npm run build` → `/out`.
- **Quality:** ESLint (next core-web-vitals + TS, `--max-warnings=0`), Prettier + tailwind plugin, Husky pre-commit → lint-staged, `npm run typecheck`, Playwright + axe installed.
- **Deviations**
  - `cacheComponents` (on by default in create-next-app) is **off**. It's a server-runtime feature, and it keeps previous routes alive as hidden DOM, which conflicts with GSAP/ScrollTrigger cleanup on route change.
  - shadcn's `form` component is deprecated upstream; forms use **`Field` + React Hook Form `Controller` + Zod**.
  - `components/ui/**` is excluded from ESLint (generated vendor code).
  - `noUnusedLocals` is left to ESLint, because Next's generated route types fail it.
- **Gotcha:** if CSS changes don't show up in `next build`, delete `.next` (Turbopack cache).

## Phase 4 — Customised shadcn + motion wrappers
- **Button:** variants `default` (primary) / secondary / outline / ghost / link / **glow** / destructive. Sizes `sm` 44px, `md` 48px, `lg` 56px. Icon sizes keep a 44px hit area via `::after`. A `loading` prop adds a spinner, `aria-busy` and `disabled`.
- **Inputs, select, textarea, toggle, tabs** resized to ≥44px. Text stays at 16px so iOS doesn't zoom on focus. Slider thumb is 20px with a 44px hit area.
- **Badge:** adds `signal` (Most Popular), `label` (mono tag) and `success`. **Card:** border instead of ring, `rounded-2xl`, 24px padding, display-font title.
- **Motion wrappers** (`components/motion`):
  - `FadeIn`, `Stagger`/`StaggerItem`
  - `CountUp`: the final value sits in the HTML and in an sr-only span
  - `AnimatedButton`: arrow slide; idle → loading → success/error with a live region; renders `href` as next/link or an external `<a>`
- **Layout** (`components/shared`): `Container`, `Section` (tone: default/muted/inverse), `SectionHeading` (`[02] — EYEBROW`, title with `<em>` accent word, subtitle, action), `Grid`
- **Hooks:** `useMediaQuery`, `useReducedMotion`, `useIsTouch`, `useDeviceTier`, `useMotionOk` (the single gate for heavy effects), `useMounted`, `useLenis`

## Phase 5 — Creative layer (`components/creative`)
| Piece | Behaviour | Degrades to |
|---|---|---|
| `SmoothScroll` | Lenis driven by the GSAP ticker, ScrollTrigger synced; scrolls to top on route change | Native scroll on touch, reduced motion, low-end |
| `MotionBootScript` | Inline in `<head>` before paint: `html.motion-ok`, `html[data-preload]` | — |
| `Preloader` | 000→100 "systems check", ≤1.2s, first visit to `/` only | CSS failsafe hides it at 2.5s even if JS fails |
| `PageTransition` (`app/template.tsx`) | Signal-colour curtain wipe + fade-up on client navigation | Skipped on first load (protects LCP) and with reduced motion |
| `SplitTextReveal` | GSAP SplitText lines/words from masks; `aria: "auto"` keeps the full text for screen readers | Plain text; hero has a 1.5s CSS failsafe |
| `ScrollMarquee` | Speed reacts to scroll velocity and flips with direction; pauses on hover/focus; **visible pause button** | Static wrapped row |
| `CustomCursor` | Dot + spring ring; grows on links; `data-cursor="View"` / `"Drag"` labels | Not rendered on touch, reduced motion or low-end; native cursor kept over inputs |
| `MagneticWrapper` | Spring pull toward pointer | Static |
| `ImageReveal` | Clip-path mask + inner zoom-out | Instant |
| `HoverImagePreview` | Big-type list; floating image follows the cursor | Plain list |
| `ParallaxLayer` | Scrubbed yPercent | ⅓ travel on touch, none for reduced motion |
| `PinnedSection` | Pins for N viewports, exposes `--pin-progress` + callback | Normal flow below 1024px or without motion |
| `GrainOverlay`, `ScrollProgress` | Fixed CSS noise layer, top progress bar | Grain hidden for reduced motion |

**Verified in headless Chromium** (desktop 1440, mobile 390 touch, reduced motion):
- The preloader runs, then clears.
- The hero reveals with its `aria-label` intact.
- Lenis and the cursor turn on for desktop only.
- Reduced motion turns off the preloader, Lenis and the cursor, and leaves the text static.
- No console errors, apart from prefetch 404s for `/contact` and `/work`, which don't exist yet.

**Bugs found and fixed during the check:**
- The clip-path reveal never fired, because a fully clipped element doesn't report as intersecting. The trigger moved to an unclipped wrapper.
- Display headings were too tightly tracked at weight 800. Loosened to −0.035em / −0.032em.
- Split-text masks cut off overhanging glyphs. Masks now get 0.1em side and bottom padding.

`app/page.tsx` is a **temporary test bed**; Phase 8 replaces it with the real home page.
