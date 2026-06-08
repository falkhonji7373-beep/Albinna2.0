# Al Binaa — Taste / Frontend Audit

Scored against the High-Agency Frontend matrix. Adapted to this project's locked stack:
**CSS-only motion (no Framer/GSAP), inline styles + CSS variables (no Tailwind), Cinzel serif
editorial brand, single saturated red accent.** Rules that fight the stack are marked N/A
with the reason, not failed.

Baseline dials read from the actual site: DESIGN_VARIANCE ~7 (asymmetric hero, 2fr/1fr grids),
MOTION_INTENSITY ~5 (CSS reveals + hover), VISUAL_DENSITY ~4 (airy editorial).

---

## Anti-Slop scorecard (where the site already wins)

| AI tell | Status |
|---|---|
| Inter / Space Grotesk as primary | ✅ Avoided — Cinzel display + body sans |
| Purple / AI-gradient accent | ✅ None — single red `#f5141f` |
| Centered-everything hero | ✅ Asymmetric, left-aligned over faded media |
| `h-screen` hero (mobile jump) | ✅ Uses `min-h-[100dvh]` |
| 3-equal-card feature row | ✅ Asymmetric project grid (2fr/1fr), accordion services |
| Pure black `#000` | ✅ Off-black / charcoal surfaces |
| Emojis in UI | ✅ None — inline SVG icons |
| Generic names / fake numbers | ✅ Real clients, real OMR values, real CR/phone |
| Neon outer glows | ✅ None — tinted shadows / inner borders |
| JS scroll listeners | ✅ IntersectionObserver only |
| Motion ignores reduced-motion | ✅ Full `prefers-reduced-motion` kill block |

The site passes the anti-slop matrix better than most production sites. The gaps are in
**interaction completeness**, not aesthetics.

---

## Interaction completeness

| Rule | Before | Now |
|---|---|---|
| Tactile `:active` push on buttons | Only `.btn-press` elements (hero, a few CTAs) | ✅ **Fixed** — sitewide `button:active` scale(0.97) + `.btn-press` added to anchor CTAs (About, Why Al Binaa ×3) |
| Card hover (img zoom + overlay) | ✅ Service/featured cards | ✅ Good |
| Mega-menu reveal | ✅ Smooth `megaDrop` + staggered items | ✅ Good (added this session) |
| Form error states | ✅ Inline, red border + message | ✅ Good |
| Form loading state | ✅ "Sending…" + disabled opacity | ✅ Good |
| Empty state | ✅ Projects "No projects found" | ✅ Good |
| Focus-visible (keyboard a11y) | ✅ Outlines on inputs/links/buttons | ✅ Good |

### ✅ Done this pass (tactile polish)
- Global `button:not(:disabled):active { transform: scale(0.97) }` — every button now has a
  physical press, including inline-styled ones (nav "Get in Touch", footer quote, contact
  submit, projects/about CTAs, service quote, quick-quote, testimonial dots, filter pills).
- Added to the `prefers-reduced-motion` kill list so it disables for motion-sensitive users.
- Added `.btn-press` to the anchor-CTAs that lacked it: About "See Why Al Binaa", and Why Al
  Binaa's View Portfolio / Qualifications / Request a Consultation.

---

## Punch list (remaining — backlog, by priority)

### Worth doing (CSS-only, low risk)
1. **Image skeleton / fade-in.** The `.img-skeleton` shimmer class exists but is unused. Wire a
   fade-in on `<img>` load for project/service photos so they don't pop in on slow connections.
   Effort: ~30 min. Impact: medium (perceived performance on mobile/3G).
2. **Project listing card lift.** `/projects` grid cards zoom the image on hover but the card
   itself doesn't lift. Add a subtle `translateY(-2px)` + tinted shadow on hover to match the
   premium feel of the featured cards. Effort: ~15 min. Impact: low-medium.
3. **Directional-aware hover on cards** (fill enters from the side the cursor enters). Possible
   in pure CSS with a clever gradient/mask, no JS. Effort: ~45 min. Impact: low (nice-to-have).

### Intentionally skipped (stack constraint — would violate CLAUDE.md)
- **Magnetic buttons** (cursor-follow) — requires Framer Motion `useMotionValue`. Stack is
  CSS-only. Skip unless the no-animation-libs rule is lifted.
- **Perpetual micro-motion / Bento "motion engine"** — Framer-dependent, and conflicts with the
  calm editorial tone of a construction brand. Not appropriate here even if the lib were allowed.
- **Tailwind refactor** — site is inline-styles + CSS vars by design. Rewriting is high-risk
  churn with no user-visible benefit.

### Not applicable (correctly diverges from the matrix for this brand)
- **"Serif banned"** — the matrix bans serif for *dashboards*. This is an editorial luxury
  marketing site; Cinzel serif is the brand identity. Correct to keep.
- **"Accent saturation < 80%"** — brand red is intentionally saturated and is the approved
  brand color. Correct to keep.
- **Phosphor/Radix icons** — site uses zero-dependency inline SVGs, which is leaner. Fine.

---

## Verdict
The site is aesthetically in strong shape (anti-slop matrix nearly clean). The taste gap was
**interaction feel**, and the highest-value fix — sitewide tactile button feedback — is now
done. The remaining items (image fade-in, card lift) are polish, not problems. The
Framer/Tailwind/Bento parts of the matrix are deliberately out of scope for this stack and brand.
