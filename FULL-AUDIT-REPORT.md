# Al Binaa — Full SEO & Page-Experience Audit (re-run)

**Audited build:** local static export (`out/`), served at `http://localhost:3002/en`
**Date:** 2026-06-04 (refresh — after Plant & Equipment section removed from About)
**Auditor:** seo-audit (focused inline run — small site, no 500-page crawl needed)
**Business type detected:** Local service / specialist building contractor (brick-and-mortar, Muscat, Oman)

---

## Executive Summary

**Overall SEO Health Score: 86 / 100 — Strong.**

Technically the site is in good shape: clean static rendering, complete metadata, rich structured
data, good internal linking. The remaining opportunity is **content density on the Homepage and
About page** — a UX/conversion refinement, not an SEO fix. (About improved this round after the
Plant & Equipment block was cut.)

### Score by category

| Category | Weight | Score | Notes |
|---|---:|---:|---|
| Technical SEO | 22% | 88 | robots/sitemap/llms.txt/canonical all present; static SSR |
| Content Quality | 23% | 85 | strong E-E-A-T; some cross-page duplication remains |
| On-Page SEO | 20% | 85 | unique titles/H1/meta; title separators now commas |
| Schema / Structured Data | 10% | 92 | LocalBusiness, FAQ, Service, Org, credentials |
| Performance (CWV) | 10% | 80 | static + lazy images, but autoplay hero video |
| AI Search Readiness | 10% | 85 | llms.txt + SSR + citable FAQ passages |
| Images | 5% | 80 | alt text mostly present; hero is video |
| **Weighted total** | | **86** | |

### Top 5 issues
1. **Homepage stacks three "proof" bands in a row** (stats → trust pillars → client logos) before substance.
2. **About still carries two duplicate modules** — the "Seven Reasons" block (repeats Why Al Binaa) and the red stats strip (repeats homepage numbers).
3. **Title tag separators became commas** during the em-dash cleanup (cosmetic; reads slightly off before the brand).
4. **Three meta descriptions exceed ~160 chars** (Home 198, Projects 202, About 175) and will truncate.
5. **Autoplay `.mp4` hero** is the heaviest LCP/bandwidth element — needs size confirmation.

### Top 5 quick wins
1. Merge homepage **stats strip into the trust pillars** (removes a whole section).
2. On About, **replace the 7-reasons block with a link** to the Why Al Binaa page.
3. Switch title-tag brand separator from `,` back to `|`.
4. Trim Home / Projects / About meta descriptions to ≤160 chars.
5. Confirm/compress the hero video (target < 2–3 MB) or load poster-first.

---

## Page Density Analysis (the core finding)

Measured from the rendered HTML of each main page (current build).

| Page | `<section>` | Words | H2 | H3 | Images | Verdict |
|---|---:|---:|---:|---:|---:|---|
| Home | 8–9 | 610 | 4 | 6 | 18 | ⚠️ Busy |
| About | 7 | **1,270** | 6 | 0 | 8 | ⚠️ Improved, still heavy |
| Services | 3 (accordion) | 493 | 1 | 0 | 6 | ✅ Good |
| Projects | 1 + grid | 460 | 0 | 10 | 12 | ✅ Good |
| Why Al Binaa | 5 | 745 | 5 | 8 | 2 | ✅ OK |
| Qualifications | 1 | 362 | 0 | 0 | 7 | ✅ Good |
| Contact | 2 | 392 | 1 | 1 | 3 | ✅ Good |

### Homepage — 9 sections
hero → numbers strip → trust pillars → client-logo marquee → services → featured projects →
how-we-work → testimonial → CTA band.
**Problem:** the top third is three consecutive credibility modules (numbers, pillars, logos).
**Fix:** fold the numbers strip into the trust pillars → one proof band, faster path to substance.

### About — 7 modules, ~1,270 words (was 9 / ~1,300)
Current order: Chairman → Story → Vision & Mission → red stats strip → "Seven Reasons" →
Heritage (4 chapters) → CSR (6 pillars) → People (team).
**✅ Done this round:** Plant & Equipment block removed.
**Still duplicated:**
- **"Seven Reasons Serious Developers Come Back"** largely repeats the dedicated Why Al Binaa page.
- **Red key-numbers strip** (30+/200+/1,000+) repeats the homepage stats.
**Fix:** cut/merge to ~5 modules. Suggested: Chairman → Story → Vision & Mission → Heritage → People → CTA.

---

## Technical SEO

| Check | Status |
|---|---|
| `robots.txt` | ✅ Present |
| `sitemap.xml` | ✅ Present |
| `llms.txt` (AI crawler guidance) | ✅ Present |
| Canonical tags | ✅ On every page |
| Rendering | ✅ Static export (SSR-equivalent), AI-crawler friendly |
| HTTPS | n/a locally — Railway provides it in production |
| Mobile | ✅ Responsive (`min-h-[100dvh]` hero, single-column fallbacks) |

No crawlability or indexability blockers found.

---

## Content Quality (E-E-A-T)

**Strong.** Named Chairman's statement, ISO 9001:2015 + CR 2693300, real project case studies with
costs/units/locations, client testimonials with attribution, 30-year heritage narrative.
**Watch-outs:** cross-page duplication (Why-reasons + stats on About); a few long About paragraphs
could be split for scannability after the em-dash → comma change.

---

## On-Page SEO

| Page | Title len | Meta len | H1 | Canonical |
|---|---:|---:|---:|---|
| Home | 78 | 198 ⚠️ | 1 | ✅ |
| About | 58 | 175 ⚠️ | 1 | ✅ |
| Services | 55 | 153 | 1 | ✅ |
| Projects | 58 | 202 ⚠️ | 1 | ✅ |
| Why Al Binaa | 64 | 155 | 1 | ✅ |
| Qualifications | 60 | 150 | 1 | ✅ |
| Contact | 55 | 157 | 1 | ✅ |

- ✅ Unique title + single H1 + meta on every page.
- ⚠️ Meta length: Home (198), About (175), Projects (202) exceed ~160-char display limit.
- ⚠️ Title separators became commas during dash cleanup — restore `|` before the brand (titles only).
- ✅ Internal linking reaches every page within 1–2 clicks.

---

## Schema / Structured Data

**Excellent.** Detected: `LocalBusiness`/`ProfessionalService`, `Organization`, `WebSite`,
`Service`, `OfferCatalog`, `Offer`, `FAQPage` (`Question`/`Answer`), `PostalAddress`,
`GeoCoordinates`, `OpeningHoursSpecification`, `QuantitativeValue`, and
`EducationalOccupationalCredential` + `PropertyValue` on Qualifications.
Optional: add `ConstructionProject` + breadcrumb schema to individual project detail pages.

---

## Performance (CWV — lab estimate, local)

- ✅ Static HTML, no client data-fetching on critical path
- ✅ Images lazy-loaded; CSS-only animations
- ⚠️ Autoplay `.mp4` hero is the largest asset / likely LCP — confirm < 2–3 MB, consider poster-first.

---

## AI Search Readiness (GEO)

- ✅ `llms.txt` present; ✅ SSR (AI crawlers can read all content)
- ✅ FAQ Q&A blocks (Why Al Binaa) highly citable; specific quotable facts throughout
- Opportunity (off-site): brand mentions (directories, press, Wikipedia entity) — #1 AI-visibility lever.

---

## Images
- ✅ Most `<img>` carry descriptive alt text; lazy loading applied
- ⚠️ Hero is video, not an optimized still — see Performance
- Optional: confirm WebP/AVIF for project photography

---

## Changes since first audit
- ✅ **Plant & Equipment** section removed from About (−1 module, −~25 words, cleaner page tail).
- ✅ Unused `equipment_*` message keys cleaned from `en.json` / `ar.json`.

## Limitations
- No live field data (CrUX/GSC/GA4) — no Google API credentials configured.
- No backlink/Domain-Authority data (no Moz/Ahrefs key).
- CWV is structural, not a Lighthouse field measurement.
- Ran on the local build — re-verify HTTPS, redirects, sitemap domain, and CWV on production after deploy.
