# Phase 1 — Art Direction · Nexora Studio

## Reference sites (inspiration, not copies)

| Site | What we take | What we leave |
|---|---|---|
| **Lusion** (lusion.co) | One signature, interactive WebGL moment that feels physical and responds to the cursor | Heavy, long-loading scenes |
| **Basement Studio** (basement.studio) | Bold confidence: huge, tightly tracked type as the main visual, dark-first, personality in the copy | Chaos that hurts scanning |
| **Cuberto** (cuberto.com) | Polished micro-interactions: magnetic buttons, cursor states, hover previews on work lists | Cursor effects over forms and content |
| **Locomotive** (locomotive.ca) | Smooth-scroll craft and editorial pacing: restrained, well-timed reveals, generous whitespace | Pinning everything |
| **Linear** (linear.app), *product site used for clarity* | Precision and hierarchy: crisp grid, mono labels, conversion clarity at decision points | — |

---

## Concept A — "Launch Control" ✅ chosen

**Idea:** the agency is mission control for your launch. Precise, technical, fast, confident. Telemetry labels, countdowns, trajectories, and one ignition-orange signal colour.

| | |
|---|---|
| **Mood** | Engineered, calm under pressure, quietly premium. Think a SpaceX broadcast HUD crossed with an editorial magazine. |
| **Colour** | Ink `#0B0B0C` · Bone `#F3F0EA` · **Ignition `#FF5A1F`**, used only for actions and highlights. Dark-first; light theme is a warm "paper" version. |
| **Type** | **Bricolage Grotesque** (display, 700–800, −0.04em, 8–12vw) · **Instrument Serif Italic** (one emphasis word per headline, e.g. the rotating word) · **Geist** (body) · **Geist Mono** (labels, section numbers `01 / 16`, stats, telemetry) |
| **Visual language** | Mono eyebrows like `[02] — SERVICES`, hairline dividers, `↗` arrows, coordinate/telemetry micro-labels ("PUNE 18.52°N · T-14 DAYS"), crosshair corner marks on cards, device mockups with sample UI |
| **Motion** | Mechanical precision: masked line reveals, slot/odometer number rolls, scrubbed timelines, expo-out easing (`cubic-bezier(0.16, 1, 0.3, 1)`). Fast in, never floaty. |
| **Wow moment** | **"Ignition Core"** (React Three Fiber): a dark, faceted glossy object with a glowing orange core and thin orbital trajectory rings. It tilts toward the cursor. On scroll, the rings expand and the core brightens ("lift-off"), then it fades as the page continues. No textures and no HDR download (lightformers only), so it stays light. Static poster on mobile and low-end devices. |

## Concept B — "Editorial Manifesto"

| | |
|---|---|
| **Mood** | Warm, magazine-like, opinionated, a print-studio feel |
| **Colour** | Cream `#EFE9DD` · Ink · Electric lime `#C8FF3D` |
| **Type** | Huge serif (Fraunces / Instrument Serif) + neutral grotesk |
| **Motion** | Slow, elegant mask reveals; image-led parallax |
| **Why not** | Beautiful, but it says "branding studio", not "ships MVPs fast". Lime is the 2024–25 agency cliché. Serif-led headlines also feel slower, which is the opposite of the speed promise. |

## Concept C — "Liquid Chrome"

| | |
|---|---|
| **Mood** | Futuristic, glossy, iridescent; glass blobs, gradients |
| **Colour** | Deep navy · electric violet `#7C5CFF` · chrome gradients |
| **Type** | Wide geometric sans (Unbounded / Syne) |
| **Motion** | Fluid, morphing, gooey |
| **Why not** | Violet gradients + glass + blobs is the default look of AI and SaaS templates in 2026, so founders would see "template" first. It's also heavier on the GPU and harder to keep at AA contrast. |

---

## Why "Launch Control" wins

1. **It is the positioning made visible.** "Launch faster, in weeks not months" becomes countdowns, trajectories and an ignition colour. The look sells the promise before the copy does.
2. **Its precision builds trust.** Mono labels, exact numbers and a strict grid tell founders "these people are organised and won't miss deadlines", which is objection #2.
3. **It's distinctive.** Orange on ink with a grotesk + italic-serif mix doesn't look like the violet-gradient or lime-brutalist crowd.
4. **It switches cleanly between wow and clarity.** The same system goes cinematic on Home/Work/About and calm, Linear-like on Pricing/Contact without feeling like two sites.
5. **It's accessible by construction** (checked):

| Pair | Ratio | Use |
|---|---|---|
| Bone on Ink | 17.3 : 1 | Body text, dark theme |
| Ignition on Ink | 6.3 : 1 | Accent text/highlights, dark theme |
| Ink on Ignition | 6.3 : 1 | Primary button label, **both themes** |
| Ignition on Bone | 2.7 : 1 ❌ | Never used for text; fills only |
| Deep Ignition `#B83A0A` on Bone | 5.1 : 1 | Accent text in light theme |
| Muted `#8F8B84` on Ink | 5.8 : 1 | Secondary text, dark |
| Muted `#5E5A54` on Bone | 6.0 : 1 | Secondary text, light |

### Notes
- **Fonts:** all four families are free on Google Fonts and load through `next/font/google` (self-hosted, no layout shift). Instrument Serif ships italic only, and only Latin subsets load. Total cost is roughly 90–110 KB of WOFF2.
- **Grain:** an SVG noise overlay at about 4% opacity, rendered once as a fixed CSS layer, not a canvas.
- **Theme:** dark is the default because the brand reads strongest there. Light theme follows the system setting and the toggle.
