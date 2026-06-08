# Al Binaa — SEO & Page-Experience Action Plan (re-run)

Refreshed after removing the Plant & Equipment section from About. Score: 86/100.
Ordered Critical → High → Medium → Low. Effort = **human / CC** (CC = with Claude Code).

---

## CRITICAL
_None._ No indexing blockers, penalties, or broken pages. Safe to ship.

---

## ✅ DONE since first audit
- **About: Plant & Equipment section removed** (one fewer module; page tail is cleaner).
- Unused `equipment_*` translation keys cleaned from both locales.

---

## HIGH — fix within 1 week (the "too much going on" fixes)

### H1 · Finish slimming the About page (~7 → ~5 modules)
Equipment is gone; two duplicate modules remain.
- Remove the **"Seven Reasons Serious Developers Come Back"** block → replace with a CTA linking
  to the **Why Al Binaa** page (same content, in depth).
- Keep the red **key-numbers strip** to ONE appearance sitewide (it repeats the homepage stats).
- Target order: Chairman → Story → Vision & Mission → Heritage → People → CTA.
- **Effort:** ~1 day / ~15 min. **Impact:** high (clarity, scannability, bounce).

### H2 · De-stack the homepage top third
Three credibility bands run back-to-back (numbers → trust pillars → client logos).
- Merge the **stats strip into the trust pillars** (one combined proof band).
- **Effort:** ~0.5 day / ~15 min. **Impact:** high (above-the-fold pacing).

---

## MEDIUM — fix within 1 month (on-page polish)

### M1 · Restore `|` as the title-tag brand separator
The dash cleanup turned title separators into commas (e.g., "…Finishing, Al Binaa Construction").
For `<title>` tags only, `|` reads cleaner before the brand. Body copy stays comma-style.
- **Effort:** ~15 min / ~5 min. **Impact:** medium (SERP appearance).

### M2 · Trim long meta descriptions to ≤160 chars
Home (198), Projects (202), About (175) will truncate in Google.
- **Effort:** ~20 min / ~5 min. **Impact:** medium (CTR).

### M3 · Confirm / optimise the hero video
Autoplay `.mp4` is the heaviest asset and likely LCP element.
- Verify compressed (< 2–3 MB); poster shows instantly (already set); consider poster-first load.
- **Effort:** ~1–2 hrs / n/a. **Impact:** medium (LCP, mobile data).

### M4 · Split the longest About paragraphs
A few heritage/story paragraphs run long after the dash→comma change. Break into 2–3 sentence chunks.
- **Effort:** ~30 min / ~10 min. **Impact:** medium (readability + GEO citability).

---

## LOW — backlog

### L1 · `ConstructionProject` + breadcrumb schema on project detail pages
- **Effort:** ~2 hrs / ~20 min. **Impact:** low–medium (rich results).

### L2 · Confirm modern image formats (WebP/AVIF) for project photography
- **Effort:** ~1 hr / n/a. **Impact:** low (performance).

### L3 · Off-site brand presence (GEO #1 lever — off-site)
Business directories, local press, Chamber of Commerce, Wikipedia-eligible entity.
- **Effort:** ongoing / n/a. **Impact:** high for AI visibility, outside on-site scope.

---

## Re-verify after Railway deploy
- [ ] HTTPS enforced + HTTP→HTTPS redirect
- [ ] `sitemap.xml` lists the production domain (not localhost)
- [ ] Real Core Web Vitals via PageSpeed Insights / CrUX
- [ ] `robots.txt` references the production sitemap URL

---

## Suggested sequence
1. H1 + H2 (density) — biggest perceived-quality win, directly answers the density concern.
2. M1 + M2 (titles/meta) — 10-minute SERP polish.
3. M3 (hero video) — performance.
4. Deploy → re-verify production checklist.
5. L-items as backlog.
