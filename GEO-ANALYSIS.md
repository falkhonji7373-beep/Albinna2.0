# GEO / AI Search Optimization Analysis
## Al Binaa Construction & Industry SAOC
**URL:** https://www.albinaa.om/en  
**Analysis Date:** 2026-06-01  
**Analyst:** Claude GEO Specialist  

---

## GEO Readiness Score: 54 / 100

| Dimension | Weight | Raw Score | Weighted |
|-----------|--------|-----------|----------|
| Citability | 25% | 52 / 100 | 13.0 |
| Structural Readability | 20% | 60 / 100 | 12.0 |
| Multi-Modal Content | 15% | 55 / 100 | 8.25 |
| Authority & Brand Signals | 20% | 38 / 100 | 7.6 |
| Technical Accessibility | 20% | 68 / 100 | 13.6 |
| **TOTAL** | | | **54.45** |

**Rounded GEO Score: 54 / 100** — Moderate. Strong technical and structural foundation, undermined by absent AI crawler directives, no llms.txt, weak off-site brand corroboration, and content passages that are not structured as self-contained extractable answers.

---

## Platform-Specific Scores

| Platform | Estimated Score | Key Bottleneck |
|----------|----------------|----------------|
| Google AI Overviews | 52 / 100 | No `max-snippet: -1` directive confirmed served; passage blocks too visual/layout-fragmented |
| ChatGPT (Browse/Search) | 45 / 100 | No Wikipedia entity; no Reddit/YouTube corroboration; content is SSR but no llms.txt |
| Perplexity | 58 / 100 | Strongest candidate — SSR HTML, rich structured data, specific project stats work well |
| Bing Copilot | 50 / 100 | Sitemap points to production domain (albinaa.om), not Railway staging URL — may cause crawl gaps |

---

## 1. AI Crawler Access Status

### robots.txt (live at https://web-production-9334f.up.railway.app/robots.txt)

```
User-agent: *
Allow: /

Sitemap: https://www.albinaa.om/sitemap.xml
```

**Assessment: Permissive by default — but missing explicit AI crawler rules.**

| Crawler | Status | Notes |
|---------|--------|-------|
| GPTBot | Allowed (via wildcard) | Not explicitly named — implicit permission only |
| OAI-SearchBot | Allowed (via wildcard) | Not explicitly named |
| ClaudeBot | Allowed (via wildcard) | Not explicitly named |
| PerplexityBot | Allowed (via wildcard) | Not explicitly named |
| CCBot | Allowed (via wildcard) | Training crawler — allowed by default if you want Common Crawl data |
| anthropic-ai | Allowed (via wildcard) | Same as ClaudeBot but separate agent string |

**Critical issue:** The `Sitemap:` directive points to `https://www.albinaa.om/sitemap.xml` while the site is currently served from a Railway staging domain (`web-production-9334f.up.railway.app`). Any crawler following the robots.txt Sitemap pointer will be directed to the production domain. If `www.albinaa.om` is not yet live, the sitemap is unreachable and pages may not be discovered. Once the production domain is active, this resolves itself — but during the Railway staging period, crawlers cannot follow the declared sitemap.

**Fix:** Add explicit named rules for the major AI agents, and during staging add a second `Sitemap:` line pointing to the Railway URL.

```
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: *
Allow: /

Sitemap: https://www.albinaa.om/sitemap.xml
```

---

## 2. llms.txt Status

**Status: MISSING (HTTP 404)**

`https://web-production-9334f.up.railway.app/llms.txt` returns 404. No llms.txt file exists in `/public/`.

`llms.txt` is an emerging convention (proposed by Answer.AI / Jeremy Howard, 2024) that gives AI systems a structured, plain-text index of your site — what it is, what pages exist, and how to cite it. It is the robots.txt equivalent for LLMs. Several AI crawlers now check for it before deciding how to summarize or attribute a site.

A ready-to-use template is provided in Section 7 below.

**RSL 1.0 Licensing:** Not declared anywhere on the site. RSL 1.0 (Responsible Scraping License) signals to training crawlers that content may be used for AI search/citation purposes but not wholesale model training. Worth adding a `<meta name="license">` tag and a LICENSE.txt if the client wants to control training use explicitly.

---

## 3. Citability Analysis

### Technical Rendering: PASS
The site uses Next.js 14 with `output: 'export'` — all HTML is pre-rendered at build time. Every page component confirms `setRequestLocale(locale)` is called server-side before rendering. Page content is delivered as static HTML; no client-side JS is required to read the body text. This is the single most important technical decision for AI crawlability and it is correctly implemented.

**Confirmed SSR/Static signals:** Page title, H1, H2s, structured data JSON-LD, and all body paragraphs are in the initial HTML response. The `'use client'` directive on content components (`HomeContent.tsx`, `AboutContent.tsx`, `ServicesContent.tsx`, `ProjectsContent.tsx`) controls interactivity only — the static export means these render to HTML at build time.

### Passage-Level Citability

AI systems (Google AIO, ChatGPT browse, Perplexity) preferentially extract and cite passages that are 134–167 words, self-contained, answer a specific question without requiring surrounding context, and begin with the direct answer in the first 40–60 words.

**Homepage analysis:**

| Passage | Word Count | Self-Contained? | Direct Answer First? | Score |
|---------|-----------|-----------------|---------------------|-------|
| hero.subtitle ("Since 1997, Al Binaa has delivered...") | 48 words | Yes | Yes | Good seed — too short to cite standalone |
| services.body ("Most projects fail at the interfaces...") | 54 words | Yes | Yes | Good framing, too short |
| Trust pillar: "Since 1997" block | ~38 words | Partially | Yes | Too short |
| Trust pillar: "One Contract" block | ~32 words | Partially | Yes | Too short |
| Trust pillar: "ISO 9001:2015" block | ~29 words | Yes | Yes | Too short |
| Trust pillar: "600+ Personnel" block | ~27 words | Yes | Yes | Too short |
| How We Work — step text (4 steps combined) | ~105 words | Partially | No — split across steps | Fragmented |
| CTA band copy | ~40 words | No | No | Not citable |

**About page analysis:**

| Passage | Word Count | Self-Contained? | Direct Answer First? | Score |
|---------|-----------|-----------------|---------------------|-------|
| story_p1 ("Founded in 1997 under the Al Khonji Group...") | 62 words | Yes | Yes | Strong — still slightly short |
| story_p2 ("Our engineers, supervisors...") | 52 words | Yes | Yes | Good corroboration block |
| story_p1 + story_p2 combined | 114 words | Yes | Yes | Close to optimal range — 20 words short |
| Heritage chapter: "2015–21 Landmark Scale" | 45 words | Yes | Yes | Specific + verifiable — excellent intent, too short |
| Heritage chapter: "1997 Founded" | 35 words | Partially | Yes | Too short |
| Heritage chapter: "2024–25 Active Pipeline" | 42 words | Yes | Yes | High AI-citation value (specific figures) — too short |
| Mission statement | 43 words | Yes | Yes | Good, too short |
| Vision statement | 42 words | Yes | Partially | Too short |
| Chairman's Statement (3 paragraphs) | ~150 words | Yes | No — starts with philosophy, not fact | In the optimal length range but not fact-first |

**Overall citability verdict:** The site has strong content intent and genuine specificity (named projects, contract values, year ranges, client names, certification numbers). The primary weakness is that most passages are 30–60 words — too short for AI citation extraction. The optimal 134–167 word self-contained block format is absent across all pages. Passages need to be merged or expanded without diluting precision.

### Structured Data: STRONG
The layout.tsx implements a comprehensive JSON-LD `@graph` with three node types:

- `LocalBusiness` + `GeneralContractor` (dual type) — correct
- `WebSite` with publisher link — correct
- `FAQPage` with 4 `Question`/`Answer` pairs — **high value for AI citation**

The FAQ answers are the best candidates on the site for AI citation — they are self-contained, direct, and specific. The answer to "What notable projects has Al Binaa completed?" (Rimal I, OFFICE 1991, Al Wadi Complex, Sur Plaza Hotel, Desert Nights Resort with specific details) is 55 words — still short of optimal, but structured for extraction.

**Gap:** No `Project` schema (`https://schema.org/Project` or `ConstructionProject`) on the projects page. Individual project pages do not exist (it's a single filtered grid page), so there is no structured data describing individual completed works at the URL level.

**Gap:** No `Article` or `BlogPosting` schema. There is no blog or editorial content — this limits long-tail AI citation opportunities significantly.

### Heading Structure
- H1 is present on every page (confirmed: "Built to Last in Oman" on homepage, "About Al Binaa" on about page)
- H2s are present and descriptive ("Three Disciplines. One Contract.", "From Brief to Handover", "Seven Reasons Serious Developers Come Back")
- H3s used for service cards and project titles
- **Gap:** No question-format headings (e.g., "What construction services does Al Binaa offer?" or "How long has Al Binaa been operating?"). Question headings directly match the format AI systems use when pulling AI Overview snippets and cited answers.

---

## 4. Multi-Modal Content Assessment

| Signal | Present | Notes |
|--------|---------|-------|
| Images with descriptive alt text | Partial | Hero video has no alt; most images have descriptive alt ("Al Binaa workers on reinforced concrete slab", "Rimal I Residential Complex, Bausher, Oman") — good practice |
| Video content | Yes (hero video) | `/videos/hero.mp4` — no transcript, no captions, no YouTube counterpart |
| Tables | No | Statistics are rendered as visual grid cells, not HTML `<table>` elements — missed by text extractors |
| Ordered/unordered lists | Partial | Scope of work items in Services use custom `<div>` bullets, not `<ul><li>` — reduces semantic extractability |
| Infographics with text alternatives | No | |
| Case studies / project detail pages | No | All projects on a single page with truncated descriptions (130 chars for hero, 70 chars for stacked cards) |

**Key gap:** The hero video has no YouTube presence. YouTube mentions correlate at ~0.737 with AI citations — the strongest single off-site signal. A project showcase video or company overview video on YouTube, embedded on the site, would be the highest-ROI multi-modal investment.

**Key gap:** Project descriptions are truncated programmatically (`.slice(0, 130)`) on the homepage and `.slice(0, 70)` on secondary cards. These truncated strings are what gets indexed, not the full `p.desc` field in `data.ts`. Individual project landing pages with full case-study text would dramatically improve citability.

---

## 5. Authority & Brand Signals

### Off-Site Entity Presence

| Platform | Status | Notes |
|----------|--------|-------|
| Wikipedia | Not found | Search returns no article for "Al Binaa Construction Oman". The name "Al Binaa" matches an Iraqi political party — potential entity confusion for AI systems. |
| Reddit | Unknown | No Reddit presence confirmed — Oman construction subreddits are thin; organic mentions unlikely without content marketing |
| YouTube | Not found | No YouTube channel confirmed. This is the highest-correlation gap for AI citations. |
| LinkedIn | Declared in schema (`sameAs`) but company page returns 404 | `https://www.linkedin.com/company/al-binaa-construction` in JSON-LD `sameAs` property returns a 404. This is an active misinformation signal — AI systems that follow `sameAs` links to validate entity identity will find a dead URL. |
| Google Business Profile | Unknown | Not confirmed active. Critical for local construction queries. |
| Clutch / GoodFirms | Unknown | B2B contractor directories — important for AI citation of "top construction companies in Muscat" type queries |

### On-Site Authority Signals

| Signal | Present | Notes |
|--------|---------|-------|
| Named authorship / bylines | No | No named authors on any page content |
| Publication / update dates | No | No visible dates on any page; sitemap `lastmod` is 2026-05-26 for all pages |
| Source citations / external references | No | Statistics (OMR 13.6M, 242 units, 600+ staff) are asserted without source attribution |
| Client testimonials with verifiable attribution | Partial | Mohamed Al Khonji testimonial is named and attributed but lacks a date on the visible page (only in data.ts as year: 2021) |
| ISO certification number | No | "ISO 9001:2015 certified" is stated but no certificate number, issuing body, or verification link is provided |
| CR number | Present in JSON-LD and about page metadata | Commercial Registration 2693300 is referenced — strong local entity signal |
| Named founder | Yes — Qaboos Al Khonji with photo | Good trust signal; needs to appear in structured data as a named `Person` entity |

**Critical issue — broken sameAs link:** The JSON-LD `sameAs` array contains `https://www.linkedin.com/company/al-binaa-construction`. This URL returns 404. AI systems use `sameAs` to corroborate entity identity across the web. A dead link is worse than an absent one. Either create the LinkedIn page and claim this URL, or remove the `sameAs` entry from the schema until the page exists.

---

## 6. Technical Accessibility

### Rendering Method: PASS
Next.js 14 `output: 'export'` generates fully static HTML at build time. All content components use the `'use client'` directive for interactivity (animations, tabs, accordions) but Next.js static export renders the initial HTML server-side before any JS runs. AI crawlers see complete content without executing JavaScript.

### Canonical URL Configuration: PARTIAL PASS
- Each page sets a canonical URL via `alternates.canonical` in `generateMetadata()` pointing to `https://www.albinaa.om/[locale]/[slug]`
- The staging URL (`web-production-9334f.up.railway.app`) has no canonical pointing back to the production domain
- This creates a canonicalization problem during staging: if AI crawlers index the Railway URL, the content will be treated as a separate entity from the eventual production URL
- **Fix:** Add a `<link rel="canonical" href="https://www.albinaa.om/en">` to the staging deployment's layout to indicate the canonical is the production domain

### hreflang: PASS
Correct `hreflang="en"`, `hreflang="ar"`, and `hreflang="x-default"` are present on all pages via both `<link>` tags in the layout and `alternates.languages` in page metadata. This is correctly implemented and tells AI systems the EN version is the default authoritative source.

### Meta Robots: PASS
```
robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } }
```
`max-snippet: -1` (unlimited snippets) is set, which explicitly tells Google it may use any length of text for AI Overviews. This is correct and should be confirmed in the served HTML response headers.

### Page Speed / Core Web Vitals: NOT TESTED
The hero section loads a full-bleed `<video autoPlay>` with no size/dimension hint on the `<source>` element. While a poster image is declared, video autoplay on page load will impact LCP on slow connections. This affects crawl budget and user experience signals that indirectly affect ranking.

### Sitemap: CONDITIONAL PASS
XML sitemap is well-formed with hreflang alternates, correct priorities (1.0 for home, 0.9 for services/projects, 0.8 for about/contact), and `lastmod` dates. Issue: all `<loc>` values point to `https://www.albinaa.om/` — the production domain — which may not be indexed while the site is on Railway staging.

### Accordion / Tab Content: PARTIAL FAIL
The Services page uses a CSS `max-height: 0` / `max-height: 4000px` accordion to show/hide service detail text. While this renders in static HTML (the content is in the DOM), it is hidden by CSS. Some AI crawlers do not extract CSS-hidden content. The content is technically present in the HTML source but visually collapsed. Converting the accordion body to use `hidden` attribute (which static export handles correctly) or ensuring the default open state (`useState(0)` — first item open) renders the first section visible is a low-effort improvement.

---

## 7. Top 5 Highest-Impact Changes

### Priority 1 — Create /llms.txt (Effort: 1–2 hours)
Add a `llms.txt` file to `/public/llms.txt`. This directly improves AI system understanding of site structure and content scope. Template provided in Section 8 below.

### Priority 2 — Add Individual Project Pages (Effort: 1–2 days)
The single biggest citability gap. Each completed project (Rimal I, OFFICE 1991, Al Wadi Complex, Sur Plaza Hotel, Desert Nights Resort) should have its own URL at `/en/projects/rimal-i`, `/en/projects/office-1991`, etc., with:
- A 150–200 word project description in the optimal citation-length range
- Project-specific `Project` schema JSON-LD with `name`, `description`, `startDate`, `endDate`, `contractor`, `client`, `location`, `url`
- The full project data already exists in `data.ts` — this is a routing and template problem, not a content research problem
- This would also allow question-format H2s: "What is Rimal I?" / "Who built OFFICE 1991 in Muscat?"

### Priority 3 — Fix the broken LinkedIn sameAs + Create or Verify LinkedIn Page (Effort: 2–4 hours)
The JSON-LD `sameAs` link to LinkedIn returns 404. This actively confuses AI entity resolution. Either:
- Create the LinkedIn company page at the declared URL (`/company/al-binaa-construction`) and complete the profile with founding year, employee count, and website link
- Or remove the `sameAs` entry until the page exists

A populated LinkedIn company page with 50+ followers is a stronger off-site corroboration signal than the raw URL declaration.

### Priority 4 — Restructure Content Passages to 134–167 Words (Effort: 1 day of copywriting)
The two about-page paragraphs (`story_p1` + `story_p2`) combined reach 114 words — 20 words short of the minimum optimal range. Expanding them to a single 150-word block — and doing the same for the services descriptions and heritage chapters — would make these passages directly extractable by AI citation systems without any template changes.

Specifically, the Heritage chapters in `AboutContent.tsx` ("2015–21 Landmark Scale", "2024–25 Active Pipeline") have the highest citation potential because they contain specific, verifiable, numeric facts. Expanding each to 150 words and adding ISO certification source attribution would make these strong AI Overview candidates for queries like "Al Binaa Construction projects" or "construction companies Muscat Oman".

### Priority 5 — Add a YouTube Video (Effort: 1–3 days for production, ongoing)
YouTube mentions correlate at ~0.737 with AI citations — the strongest single off-site signal identified in GEO research. A 2–3 minute company overview video showing the Rimal I and OFFICE 1991 projects, narrated with the key facts (242 units, OMR 13.6M, delivered on schedule), uploaded to a named YouTube channel and embedded on the homepage, would be the single highest-leverage brand corroboration investment. The existing hero video content could be repurposed as a starting point.

---

## 8. Ready-to-Use llms.txt Template

Save this as `/Users/paolaarango/Desktop/al-binaa/public/llms.txt`:

```
# Al Binaa Construction & Industry SAOC

> Al Binaa Construction & Industry SAOC is a premium construction contractor based in Muscat, Oman. Founded in 1997 under the Al Khonji Group, the company delivers structural, MEP (mechanical, electrical and plumbing), and interior finishing services under a single contract and management structure. Commercial Registration: 2693300. ISO 9001:2015 certified.

## Key Facts

- Founded: 1997
- Location: 1212 Way 2708, Muscat 100, Oman
- Phone: +968 24 693300
- Sectors: Residential, Commercial, Hospitality
- Employees: 600+ directly employed (not agency-sourced)
- Projects completed: 20+ across Oman
- Total contract value delivered: OMR 52M+
- Certifications: ISO 9001:2015

## Pages

- [Home](https://www.albinaa.om/en): Company overview, key statistics, services summary, featured projects, client testimonials
- [About](https://www.albinaa.om/en/about): Company history since 1997, founding by Qaboos Al Khonji under Al Khonji Group, team structure, heritage chapters, CSR commitments, plant and equipment
- [Services](https://www.albinaa.om/en/services): Three integrated divisions — Structure & Civil, MEP Systems, Interior Finishing & Quality — with scope of work for each
- [Projects](https://www.albinaa.om/en/projects): Portfolio of completed and ongoing construction projects in Oman including Rimal I (242 residential units), OFFICE 1991 (9-storey commercial tower, Al Khuwair), Al Wadi Complex (21 townhouses), Sur Plaza Hotel, Desert Nights Resort (18,000 sqm renovation, Wahiba Sands), and ongoing projects Rimal II (148 units), Ibis Style Hotel Ruwi (183 rooms), Souq Al Hamidiyya (190 shops)
- [Contact](https://www.albinaa.om/en/contact): Enquiry form, address, and phone number

## Notable Completed Projects

- Rimal I — 242-unit residential complex, Bausher, Muscat. Client: AQAR Al Khonji Real Estate. Contract value: OMR 13.6M. Delivered on schedule.
- OFFICE 1991 — 9-storey commercial tower, Al Khuwair, Muscat. Client: Al Khonji Real Estate & Development LLC. Contract value: OMR 12.1M. Delivered ahead of schedule.
- Al Wadi Complex — 21 luxury townhouses, Muscat
- Sur Plaza Hotel — Best Western-branded hotel renovation, Sur, Oman. Client: Oman Hotels.
- Desert Nights Resort — 18,000 sqm full renovation, Wahiba Sands, Oman

## Optional: Arabic Version

The site is fully available in Arabic at https://www.albinaa.om/ar with identical content.
```

---

## Appendix: Scoring Rationale

### Citability (52/100)
Strong content intent with specific verifiable figures throughout. FAQPage JSON-LD schema is the site's strongest citation asset. Held back by passage lengths consistently 30–70 words below the 134–167 word optimal extraction range, no question-format headings in HTML (only in structured data), truncated project descriptions on card views, and no individual project URLs.

### Structural Readability (60/100)
H1/H2/H3 hierarchy is correctly implemented. Section labels provide semantic context. Heading text is descriptive and specific ("Seven Reasons Serious Developers Come Back", "From Brief to Handover"). Losses: no question-format H2/H3s; scope-of-work bullet lists use `<div>` rather than `<ul><li>`, reducing semantic extractability; statistics are rendered in visual grid cells rather than `<table>` or definition lists; accordion content is CSS-hidden by default (except first item).

### Multi-Modal Content (55/100)
Good alt text on images. Hero video exists but has no transcript, no captions, and no YouTube presence. No blog, case studies, or editorial content to generate long-tail citation opportunities. Project descriptions are hardcoded in `data.ts` but programmatically truncated before rendering.

### Authority & Brand Signals (38/100)
CR number and ISO certification are stated on-site. Named founder with photo. One attributed client testimonial (2021). All points deducted: Wikipedia entity absent (name conflicts with Iraqi political party); LinkedIn sameAs link is a dead 404; no YouTube channel; no Reddit presence; no external source citations for statistics; no named authors on any page; no certificate verification link; Google Business Profile status unknown.

### Technical Accessibility (68/100)
Next.js static export is the correct architectural choice — full marks for SSR implementation. Penalised for: staging URL not self-canonicalizing to production domain; sitemap and robots.txt Sitemap directive pointing to production domain while site is live on Railway staging; no llms.txt; accordion detail content CSS-hidden by default on Services page; hero video autoplay with no dimension hints.
