# Phase 0 — UX Brief · Nexora Studio

> Design goal: **award-level feel, conversion-level clarity.**
> The site has one job: turn a skimming, sceptical founder into a booked 15-min call.

---

## 1. Personas

### Primary — "Riya, pre-seed founder"
| | |
|---|---|
| **Context** | Raised ₹50L–₹3Cr (or bootstrapping). Has a deck, maybe a Figma, no tech team. Demo day / investor meeting / launch date is 4–10 weeks away. |
| **Goals** | Ship an MVP fast · look credible to investors and early users · keep burn low · not become a project manager |
| **Fears** | Getting overcharged · missed deadlines · ghosting freelancers · "agency B-team" after the sales call · owning code she can't maintain |
| **Behaviour** | Skims on mobile between meetings. Compares 3–4 agencies in open tabs. Decides on **trust signals and specificity**, then books whoever makes it easiest. |
| **Decision trigger** | "These people have done exactly my thing, the price is in my range, and I can talk to the person doing the work tomorrow." |

### Secondary — "Sandeep, SMB owner (clinic / coaching institute / D2C brand)"
| | |
|---|---|
| **Context** | Non-technical. Team drowning in WhatsApp enquiries, spreadsheets, manual follow-ups. |
| **Goals** | Save staff hours · stop losing leads · something that "just works" |
| **Fears** | Jargon · tools he can't operate · monthly costs that creep |
| **Decision trigger** | A rupee figure for time saved, and a concrete example from a business like his. |

---

## 2. What the site must prove → where it proves it

| The founder asks… | Site must prove | Answered by |
|---|---|---|
| "What do you do, and is it for me?" | Clear offer in 5 seconds | Home hero headline + rotating word, Services grid, Industries pages |
| "Can you actually build it?" | Competence | Work showcase, case studies with numbers, tech stack, device mockups |
| "Will you be fast?" | Speed | "Weeks, not months" positioning, timelines on every service + case study, Process section, Guarantee |
| "Can I afford you?" | Price fit | Pricing teaser on Home, full /pricing in ₹ + $, engagement models |
| "Will you disappear?" | Reliability | Founder-led story, "Reply within 24 hours", milestone payments, comparison table, testimonials |
| "Who am I working with?" | Human trust | Founder intro ("You'll work directly with me"), About page, avatar on CTA blocks |
| "What happens after I click?" | Low-friction next step | 15-min call framing, "No pitch, just a plan" microcopy, WhatsApp alternative |

### How each page answers it
| Page | Job | Proof device |
|---|---|---|
| **Home** | Hook → prove → convert, in one scroll | Full journey (see §5) |
| **/services/[slug]** | "Is this exactly what I need, and what do I get?" | Deliverables list, timeline, price snippet, related case study |
| **/work + case study** | "Have they done it before, with results?" | Problem → approach → result numbers → testimonial |
| **/industries/[slug]** | "Do they understand my market?" | Industry-specific pains, use-cases, relevant case study |
| **/pricing** | "Can I afford it and is it transparent?" | Tiered packages, ₹/$ toggle, what's included / not included, payment milestones |
| **/about** | "Who is behind this and can I trust them?" | Founder story, values, working principles, badges |
| **/contact** | "Make it effortless" | Cal.com embed first, form second, WhatsApp third |
| **/resources, /blog** | "Are they genuinely expert?" + SEO + lead capture | Useful content, lead magnets |

---

## 3. Primary user journey

```
LAND ─────────▶ UNDERSTAND ─────▶ TRUST ─────────▶ EVALUATE ──────▶ ACT
(ad / search /   (≤5 sec)          (proof)          (fit & risk)      (book / WhatsApp)
 LinkedIn post)
Hero headline    Rotating word     Logo marquee     Comparison table  Book a Free 15-min
+ trust micro-   + subtext +       Featured work    Process + timing  Strategy Call
line             services grid     Case study #s    Pricing teaser    (always visible:
                                   Testimonials     Guarantee         header, sticky
                                   Founder intro    FAQ               mobile bar, footer)
```

**Exit ramps for not-ready visitors** (capture instead of losing them):
Startup Launch Audit (lead magnet) · Savings Calculator · Service Quiz · free resources · WhatsApp.

---

## 4. Objections map

| # | Objection | Primary answer | Reinforced at |
|---|---|---|---|
| 1 | "You'll overcharge me" | Transparent ₹ pricing with "starting at" + inclusions | Home pricing teaser, /pricing, service pages |
| 2 | "You'll miss deadlines" | Fixed timelines + **Guarantee** ("Launch on time or the next milestone is free") | Process, case-study timelines, FAQ |
| 3 | "Bad communication" | "Reply within 24 hours", weekly demo, shared Slack/WhatsApp | Hero micro-line, Why Us, FAQ |
| 4 | "You'll disappear like freelancers do" | Registered business (GST/MSME), contract + NDA, 30-day post-launch support | Comparison table, footer badges, FAQ |
| 5 | "You're new / too small" | Reframe as an advantage: founder-led, senior-only, no hand-offs; scarcity line | Why Us, About, founder intro |
| 6 | "I won't own my code / I'm locked in" | Full IP + repo handover, documented, standard stack | FAQ, service pages, pricing inclusions |
| 7 | "Big upfront payment risk" | Milestone payments (30/40/30) | Pricing, FAQ |
| 8 | "I don't know what I need" | Service quiz → recommended package; free 15-min call | Home, Services, Pricing |
| 9 | "Is automation worth it?" (Sandeep) | Savings calculator with ₹/month result | Home, Automation service page |
| 10 | "Can you handle international clients?" | $ pricing, timezone overlap, international testimonials | Pricing toggle, testimonials, FAQ |

---

## 5. Home section order — rationale

The order follows the journey: **hook → empathy → offer → proof → differentiation → method → deep proof → personal value → social proof → price → risk removal → capture → objections → close.**

| # | Section | Why it's here |
|---|---|---|
| 1 | **Hero** | Outcome + who it's for + primary CTA above the fold. Trust micro-line pre-empts objections 3 and 1. |
| 2 | **Logo / tech marquee** | Instant credibility before scrolling far; low cognitive load. |
| 3 | **Problem** | Mirrors the founder's pain in her words → "they get me". Earns attention for the offer. |
| 4 | **Services** | Now that the pain is named, present the four fixes. |
| 5 | **Featured work** (horizontal pin) | Proof right after the claim. Highest visual impact point mid-page. |
| 6 | **Why us** | Turns "new, small agency" into the advantage: founder-led, fast, startup-only. |
| 7 | **Comparison table** | Founders are comparing anyway — frame the comparison for them. |
| 8 | **Process** (pinned, scrubbed) | Answers "what happens and how long?" and makes speed tangible. |
| 9 | **Featured case study** | Deep proof with big numbers, placed where scepticism peaks (after claims). |
| 10 | **Savings calculator** | Interactive engagement; personalises value (strongest for Sandeep). |
| 11 | **Testimonials** | Social proof just before the price conversation. |
| 12 | **Pricing teaser + engagement models** | Visitor is now warm enough to see numbers. |
| 13 | **Guarantee** | Removes risk the moment price creates hesitation. |
| 14 | **Lead magnet (Launch Audit)** | Captures the not-yet-ready majority. |
| 15 | **FAQ** | Mops up remaining objections (and FAQPage JSON-LD for SEO). |
| 16 | **Final CTA** | One clear close, with founder face + scarcity line. |

### ✅ Final order (merges accepted)
Why Us + Comparison are merged; the featured case study becomes panel 1 of the work showcase. **14 sections:**

1. Hero · 2. Logo/tech marquee · 3. Problem · 4. Services · 5. Featured work (panel 1 = featured case study with result numbers) · 6. Why founders choose us (ends in Us vs Freelancer vs Big Agency table) · 7. Process · 8. Savings calculator · 9. Testimonials · 10. Pricing teaser + engagement models · 11. Guarantee · 12. Lead magnet (Launch Audit) · 13. FAQ · 14. Final CTA

Every section has a scannable eyebrow + headline so a fast thumb-scroll still reads as a coherent story.

---

## 6. Wow vs clarity map

**Rule: wow where the visitor is *forming an impression*; clarity where they're *making a decision*.**

| Zone | Treatment | Motion budget |
|---|---|---|
| Home hero | **Signature wow** — 3D/WebGL moment, kinetic headline. Text + CTAs render first, 3D lazy-loads behind. | High |
| Home: marquee, featured work, process | Secondary wow — velocity marquee, horizontal pin, scroll-scrubbed steps | Medium-high |
| Home: comparison, pricing teaser, calculator, FAQ | **Clarity wins** — simple fades only, no pinning, no split-text on numbers | Low |
| /work, case studies | Bold — image reveals, hover previews, full-width next-project transition | Medium-high |
| /about | Bold, editorial — founder story with parallax, oversized type | Medium |
| /services, /industries | Calm — fades, accent lines, card lift | Low |
| /pricing, /contact | **Clarity first** — no cursor gimmicks over form fields, no pinning | Minimal |
| Legal, 404 | Plain (404 gets one playful touch) | Minimal |

Always-on, everywhere: CTA never animated out of view, forms never animated during input, everything works with `prefers-reduced-motion` and if JS fails.

---

## 7. Decisions (all accepted)

1. **Mobile timed lead-magnet Drawer → replace with a non-blocking bottom card after 60% scroll.** A timed full-screen overlay on mobile counts as an intrusive interstitial (Google penalises it), and stacked with the cookie banner + sticky CTA + WhatsApp button it gets crowded. Desktop exit-intent Dialog stays as specified.
2. **Overlay stacking rules:** cookie banner first; sticky CTA appears only after consent is answered and after the hero; WhatsApp button merges into the sticky bar on mobile (one bottom element instead of three).
3. **Preloader:** first visit only, ≤1.2s, skipped for reduced motion and for deep links to non-home pages. The hero `<h1>` is in the HTML underneath so LCP isn't held hostage.
4. **Lighthouse 90+ with R3F is achievable but tight.** I'll load the 3D only after idle + in-viewport on desktop with decent hardware (`deviceMemory`/`hardwareConcurrency` check), and serve a static poster on mobile/low-end. Mobile Lighthouse will be measured against the poster path.
5. **Guarantee wording:** "Launch on time or the next milestone is free" needs a condition ("…for agreed scope, with timely feedback from you") — otherwise scope creep makes it a liability for a solo founder. I'll add that as fine print.
6. **Placeholder proof:** launching with fictional testimonials/case studies/stats would be misleading (and in India can fall foul of consumer-protection rules on fake reviews). Everything is flagged with `isPlaceholder`, and I'll add a dev-only console warning listing any placeholders still rendered in production builds.
7. **Plausible is cookieless** and technically doesn't need consent — I'll still gate it behind consent as you asked, but you could load it unconditionally later for better data.
8. **Static export + `next/image`:** export mode disables Next's image optimiser. I'll pre-size images and use `unoptimized` with explicit width/height (no CLS), AVIF/WebP posters for local assets.

---

## 8. Success metrics (for later)
- Primary: booked calls / sessions (target 2–4% from qualified traffic)
- Secondary: WhatsApp clicks, lead-magnet opens, quiz completions, calculator use
- Guardrails: LCP < 2.5s, CLS < 0.1, INP < 200ms, bounce on mobile hero
