# Phase 2 — Design System · Nexora Studio

Files:
- `app/globals.css`: all tokens, the Tailwind theme, base styles, utilities, creative layers, reduced motion
- `lib/motion.ts`: shared easing, durations, springs, Framer Motion variants, GSAP presets
- `lib/fonts.ts`: `next/font/google` setup for the four families

## ⚠️ Deviation: no `tailwind.config.ts`
The current Tailwind (v4.3) and shadcn/ui (v4) are **CSS-first**: theme tokens live in `@theme` inside `globals.css`, and a JS config is legacy. Everything the brief asked for in "Tailwind config" (colours, fonts, type scale, radius, shadows, easing, keyframes, container) is in `globals.css` §2. Breakpoints use Tailwind's defaults, which already match the brief (640/768/1024/1280/1536).

## Colour tokens (shadcn variables)

| Token | Light | Dark | Notes |
|---|---|---|---|
| background / foreground | `#F3F0EA` / `#0B0B0C` | `#0B0B0C` / `#F3F0EA` | 17.3:1 |
| card | `#FBFAF7` | `#141415` | |
| popover | `#FFFFFF` | `#18181A` | |
| primary / -foreground | `#FF5A1F` / ink | `#FF5A1F` / ink | Ink label on orange: 6.3:1 in both themes |
| secondary | `#E7E3DB` | `#1F1F21` | |
| muted / -foreground | `#EAE6DE` / `#5A564F` | `#1A1A1C` / `#9A968F` | ≥5.9:1 on every surface |
| accent / -foreground | `#E4E0D7` | `#232325` | **shadcn's "accent" is the hover surface** for menus and ghost buttons, not the brand orange |
| destructive | `#C42B1C` | `#FF6B5E` | 5.0 / 7.0:1 |
| border | `#D9D4CA` | `#2A2A2D` | Decorative dividers only |
| input | `#8C8579` | `#6E6A64` | **3.2 / 3.7:1**, so field outlines meet WCAG 1.4.11 (shadcn's default fails this) |
| ring | `#B83A0A` | `#FF5A1F` | 5.1 / 6.3:1 focus ring |
| **signal** (custom) | `#B83A0A` | `#FF5A1F` | Brand accent *as text*, e.g. `text-signal` |
| **success** (custom) | `#1D7347` | `#3CCB7F` | 5.1 / 9.4:1 |
| **warning** (custom) | `#8F5400` | `#F5B544` | 5.4 / 10.8:1 |
| **brand-gradient** (custom) | ignition → orange → amber | same | `bg-brand-gradient`, `text-gradient` |

Values are stored as OKLCH (the shadcn v4 convention); the hex codes are in comments. **Rule:** orange is a *fill* in light mode and never used as text on bone (2.7:1); use `text-signal` for orange text.

## Typography

| Token | Size (360 → 1440px) | Line height | Tracking | Font |
|---|---|---|---|---|
| `text-display-xl` | 56 → 176px (~12vw) | 0.95 | −0.035em | Bricolage 800 |
| `text-display` | 44 → 124px | 1.0 | −0.032em | Bricolage 750 |
| `text-h1` | 36 → 80px | 1.05 | −0.035em | Bricolage 700 |
| `text-h2` | 30 → 56px | 1.1 | −0.03em | Bricolage 700 |
| `text-h3` | 24 → 36px | 1.15 | −0.02em | Bricolage 650 |
| `text-h4` | 20 → 24px | 1.25 | −0.01em | Bricolage 600 |
| `text-body-lg` | 18 → 21px | 1.6 | — | Geist |
| `text-body` | 16 → 17px | 1.6 | — | Geist |
| `text-small` | 14px | 1.5 | — | Geist |
| `text-caption` | 12px | 1.4 | +0.08em, uppercase | Geist Mono |

The brief allows 1.0–1.15 line height for display text. I went to 0.95 on `display-xl` only, because 176px at 1.0 leaves visibly loose gaps between lines. Split-text masks pad for descenders so nothing gets clipped.

Use `font-serif italic` for the single emphasis word, and `prose-width` (65ch) for long text.

## Spacing and layout
- 8px scale through Tailwind's 4px base: `2`=8, `3`=12, `4`=16, `6`=24, `8`=32, `12`=48, `16`=64, `24`=96, `32`=128, `40`=160
- `section-y`: section padding, 72px on mobile to 128px on desktop (fluid)
- `container-site`: 1280px max width, fluid 16–32px gutters
- `grid-site`: 4 / 8 / 12 columns at mobile / tablet / desktop
- Radius: `--radius: 0.5rem` (crisp, technical), derived sm 4 / md 6 / lg 8 / xl 12 / 2xl 16 / 3xl 24
- Shadows: `shadow-soft`, `shadow-lift`, `shadow-glow` (orange, for CTAs only). Dark theme swaps to an inset top highlight plus a deep shadow, because normal shadows don't show on ink.

## Design-system utilities
`eyebrow` (mono label) · `corner-marks` (crosshair card corners) · `glass` (header and floating bars only) · `tap-target` (44×44 minimum) · `text-gradient` · `.grain-overlay` · `.skip-link` · `.split-line` · Lenis base styles · marquee pause hooks

## Motion config (`lib/motion.ts`)

| | Value | Use |
|---|---|---|
| `ease.outExpo` | `[0.16, 1, 0.3, 1]` / GSAP `expo.out` | Default for reveals and UI |
| `ease.outQuart` | `[0.25, 1, 0.5, 1]` | Hovers |
| `ease.inOutQuart` | `[0.76, 0, 0.24, 1]` | Page transitions and curtains |
| durations | 0.16 / 0.32 / 0.64 / 0.9s | Hover / UI / section / headline |
| springs | press, magnetic, cursor, layout | Buttons, CTAs, cursor ring, portfolio filter |
| presets | `fadeUp`, `scaleIn`, `staggerContainer`, `reducedFade`, `splitReveal`, `scrollTrigger.reveal/scrub` | |

Travel distances are kept small (12/24/48px) so motion never shifts text people are reading. The CSS mirrors these as `ease-out-expo` and `duration-*` utilities.

**Reduced motion:** a global CSS rule cuts every animation and transition to near zero and hides the grain. In JS, components switch to `reducedFade`; Lenis, the cursor, WebGL and pinning stay off (wired up in Phase 5).

## Notes
- **Framer Motion** is now published as `motion` (same library and team; `framer-motion` is the legacy name), so imports come from `"motion/react"`.
- **Fonts:** Bricolage loads as one variable file (weight + optical size + width axes). Instrument Serif loads italic only.
