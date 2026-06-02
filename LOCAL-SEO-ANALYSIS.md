# Local SEO Analysis — Al Binaa Construction & Industry SAOC
**Domain:** albinaa.om | **Analyzed:** 2026-06-01 | **Basis:** Static build at localhost:3002

---

## Local SEO Score: 61/100

| Dimension | Weight | Score | Notes |
|-----------|--------|-------|-------|
| GBP Signals | 25% | 8/25 | No confirmed GBP link/embed on site |
| Reviews & Reputation | 20% | 4/20 | No review schema, no public review widget |
| Local On-Page SEO | 20% | 17/20 | Strong title/H1/NAP; dedicated service pages now live |
| NAP Consistency & Citations | 15% | 10/15 | On-site NAP consistent; Tier 1 citation status unverified |
| Local Schema Markup | 10% | 9/10 | LocalBusiness + geo + sameAs + hours — now complete |
| Local Authority Signals | 10% | 5/10 | Al Khonji affiliation is strong but no chamber/BBB/press visible |
| AI Local Readiness | Bonus | +8 | llms.txt present, FAQ schema, dedicated service pages, qualifications page |

---

## Business Type: Hybrid SAB
**Detection signals:** Physical office address (1212 Way 2708, Muscat 100) present in footer + schema, but services delivered at project sites across Oman (Muscat, Sohar, Sur, Wahiba Sands). Construction companies are inherently SAB — they serve clients at the client's location.

**Impact on analysis:** Physical address signals apply in full. `areaServed` correctly set to Oman + Muscat. No embedded map needed for ranking (SAB allowance) but recommended for trust.

---

## Industry Vertical: General Contractor / Construction
No restaurant, healthcare, legal, or automotive signals detected. Applying **Home Services / Construction** vertical path.

---

## 1. GBP Signals — 8/25 ⚠️ CRITICAL GAP

### What's present
- Physical address consistent across footer, contact page, and JSON-LD schema
- Business hours visible (Sun–Thu 8 AM–5 PM) and now in `openingHoursSpecification`
- Phone number with `tel:` link on contact page

### What's missing
| Signal | Status | Priority |
|--------|--------|----------|
| Google Business Profile — confirmed, claimed | ❌ Not detectable from site | CRITICAL |
| GBP embed or widget on website | ❌ None | High |
| GBP link in footer/contact page | ❌ None | High |
| Google Maps iframe on contact page | ❌ Only "Get Directions" text link | Medium |
| GBP posts (active) | ❌ Unverifiable | Medium |
| Photos/video on GBP | ❌ Unverifiable | Medium |
| Q&A / AI Ask Maps content | ❌ Unverifiable | Medium |
| Google Verified badge | ❌ Unverifiable | Low |

**Note:** The most important local pack ranking factor (Whitespark 2026, score 193) is GBP primary category correctness. For Al Binaa, the correct primary category is **"General Contractor"** with recommended secondary categories: Residential Contractor, Commercial Contractor, Building Contractor, MEP Contractor. If GBP is claimed, verify this immediately.

---

## 2. Reviews & Reputation — 4/20 ⚠️ HIGH RISK

### What's present
- 7 client testimonials on website (Mohamed Al Khonji ×5, Fred Vessali ×2)
- High-quality attribution (named, titled, company)

### What's missing
| Signal | Status |
|--------|--------|
| `aggregateRating` in schema | ❌ Missing — cannot inject without real review data |
| Google review count | ❌ Unknown — GBP not confirmed |
| Star rating ≥ 4.5 | ❌ Unknown |
| Review recency (last 3 months) | ❌ Unknown |
| Owner response pattern | ❌ Unknown |
| Multi-platform presence (Yelp, BBB, etc.) | ❌ Not detectable |

**18-day rule:** Rankings cliff when no new reviews for 3 weeks (Sterling Sky). If GBP has <10 reviews or stale activity, this is the single highest-ROI fix available.

**Action required:** Confirm GBP exists, check review count, implement a review generation strategy targeting existing clients (Al Khonji Group, Oman Hotels and Tourism).

---

## 3. Local On-Page SEO — 17/20 ✅ STRONG

| Check | Status |
|-------|--------|
| Title tag with city + service | ✅ "General Contractor Muscat Oman \| Civil, MEP & Finishing" |
| SR-only H1 with local intent | ✅ "General Contractor in Muscat, Oman — Civil, MEP & Interior Finishing Since 1997" |
| Visual H1 brand | ✅ "Built to Last in Oman." (aria-hidden, no duplication) |
| NAP visible in footer HTML | ✅ Name, address, phone, email, hours all present |
| Click-to-call `tel:` link | ✅ `/en/contact` has `tel:+96824693300` |
| Dedicated service pages | ✅ 3 new pages: /services/structure, /services/mep, /services/finishing |
| Dedicated project pages | ✅ 9 new pages with project-specific JSON-LD |
| Qualifications page | ✅ /qualifications with ISO 9001:2015, C.R. 2693300 |
| Meta description with city/service | ✅ "General contractor in Muscat since 1997…" |
| Internal linking (hub-and-spoke) | ✅ Services → Detail, Projects → Detail, Footer nav |
| Embedded Google Maps iframe | ❌ "Get Directions" link only — no iframe |
| Contact page `ContactPoint` schema | ❌ Not in JSON-LD |
| Service page `areaServed` | ✅ Present on Service JSON-LD |
| Doorway page risk | ✅ None — 3 service pages have genuinely distinct content |

**One gap:** Service page title for MEP shows `MEP Contractor Oman — Mechanical, Electrical & Plumbing | Al Binaa` — "Al Binaa" is the brand suffix. **Fixed** — no longer doubles as `| Al Binaa | Al Binaa`.

---

## 4. NAP Consistency — 10/15 ⚠️ VERIFY EXTERNALLY

### On-site NAP (all sources agree ✅)
| Source | Name | Address | Phone |
|--------|------|---------|-------|
| Footer HTML | Al Binaa Construction & Industry SAOC | 1212 Way 2708, Muscat 100, Oman | +968 24 693300 |
| JSON-LD schema | Al Binaa Construction & Industry SAOC | 1212 Way 2708, postalCode 100, Muscat, OM | +96824693300 |
| Contact page meta | — | — | +968 24693300 |

**Minor inconsistency:** Phone formatted differently across sources:
- Footer: `+968 24 693300`
- Schema: `+96824693300` (E.164, correct for schema)
- Contact meta description: `+968 24693300` (missing space after country code)

**Recommendation:** Standardize display format to `+968 24 693300` in all visible text. Schema E.164 `+96824693300` is correct and should remain.

### Citation Tier 1 — Not verified (requires external tools)
| Directory | Status |
|-----------|--------|
| Google Business Profile | ❌ Not confirmed from site |
| Apple Business Connect | ❌ Unknown — recommend claiming |
| Bing Places | ❌ Unknown — **CRITICAL for ChatGPT/Copilot visibility** |
| Facebook Business | ✅ Linked in footer (facebook.com/albinaaom) |
| Instagram | ✅ Linked in footer (instagram.com/albinaa_om) |
| LinkedIn | ✅ Linked in footer (linkedin.com/company/al-binaa) |
| Yelp | ❌ Unknown |
| BBB / Arab equivalent | ❌ Unknown |
| MOCIPI (Oman gov.) | Linked via C.R. 2693300 |

**High priority:** Claim and fully optimize **Bing Places** — this is the data source for ChatGPT local recommendations, Bing Copilot, and Amazon Alexa. Construction company searches on ChatGPT pull from Bing index.

---

## 5. Local Schema — 9/10 ✅ NOW COMPLETE

### After today's fixes (layout.tsx):
```json
{
  "@type": ["LocalBusiness", "GeneralContractor"],
  "@id": "https://www.albinaa.om/#org",
  "telephone": "+96824693300",
  "email": "info@albinaa-om.com",
  "geo": { "@type": "GeoCoordinates", "latitude": 23.588, "longitude": 58.3829 },
  "hasMap": "https://maps.google.com/?q=1212+Way+2708+Muscat+Oman",
  "openingHoursSpecification": [{ "dayOfWeek": ["Sunday",...,"Thursday"], "opens": "08:00", "closes": "17:00" }],
  "sameAs": ["instagram.com/albinaa_om", "facebook.com/albinaaom", "linkedin.com/company/al-binaa"],
  "address": { "streetAddress": "1212 Way 2708", "postalCode": "100", "addressLocality": "Muscat", "addressRegion": "Muscat Governorate", "addressCountry": "OM" }
}
```

### Still missing (cannot inject without live data):
- `aggregateRating` — requires real Google/review data
- `contactPoint` with `ContactType: "customer service"` — add to layout.tsx

### Correct subtype: ✅
`GeneralContractor` is the correct Schema.org subtype for a construction company. More specific than generic `LocalBusiness`.

---

## 6. Local Authority Signals — 5/10

### Detected
- ✅ **Al Khonji Group** parent affiliation — significant regional authority signal
- ✅ **ISO 9001:2015 certification** — credibility signal visible on qualifications page
- ✅ **C.R. 2693300** — Oman government registration, linkable to MOCIPI

### Not detectable from site
- ❌ Chamber of Commerce of Oman membership (high Trust Flow signal)
- ❌ BBB-equivalent (Oman Business Rating Board or Arab equivalent)
- ❌ Local press mentions / Oman Observer, Times of Oman
- ❌ "Best Contractor in Oman" type list placements (Whitespark #1 AI visibility factor)
- ❌ Industry association memberships (Oman Contractors Association, etc.)

---

## 7. AI Local Readiness — +8 Bonus

| Signal | Status |
|--------|--------|
| llms.txt | ✅ Present at /llms.txt |
| FAQ schema on homepage | ✅ 4 questions with detailed answers |
| Service-specific pages | ✅ 3 dedicated service pages |
| Project case study pages | ✅ 9 project detail pages |
| Qualifications page | ✅ ISO cert, C.R., founding date, workforce |
| AI crawlers allowed in robots.txt | ✅ `Allow: *` |
| Bing Places (ChatGPT source) | ❌ Not confirmed |

---

## Lighthouse Audit Results (localhost)

| Category | Score |
|----------|-------|
| SEO | **100/100** ✅ |
| Best Practices | **100/100** ✅ |
| Accessibility | **90/100** ✅ |
| Performance | **76/100** ⚠️ |

All SEO audits passed: title, meta description, link text, robots.txt, image alt text, hreflang, canonical, font sizes, crawlable anchors.

Performance 76 is primarily a static asset/image optimization concern — not a local SEO blocker.

---

## Backlinks — Limited Signal (No External API)

Without Moz, Ahrefs, or Bing Webmaster Tools access, backlink profile cannot be audited. Site-level observations:

| Signal | Status |
|--------|--------|
| `sameAs` social profiles now linked in schema | ✅ Fixed today |
| Internal link equity distribution | ✅ Good — hub-and-spoke from services/projects |
| External authority signals visible on site | ❌ No badge embeds (BBB, chamber, ISO issuer) |
| "Get a quote" anchor text to contact | ✅ Present on all pages |

**Recommendation:** Run `/seo-backlinks` with Moz or Bing Webmaster Tools credentials for full domain authority and referring domain analysis.

---

## DataForSEO Status

DataForSEO MCP tools not detected in this environment. To run live local pack rankings, GBP data extraction, and citation audits, configure DataForSEO credentials and run `/seo-dataforseo`.

---

## Top 10 Prioritized Actions

### 🔴 Critical
1. **Claim/verify Google Business Profile** — confirm it exists, set primary category to "General Contractor", add 4 secondary categories (Residential Contractor, Commercial Contractor, Building Contractor, MEP Contractor). If GBP doesn't exist, create it. This is the #1 local pack ranking factor.
2. **Review generation campaign** — email past clients (start with Al Khonji Group contacts and Oman Hotels & Tourism) requesting Google reviews. Target 10+ reviews with 4.5+ average. Maintain 18-day cadence minimum.

### 🟠 High
3. **Claim Bing Places** — complete profile at bingplaces.com. This directly feeds ChatGPT, Bing Copilot, and Alexa local recommendations. Construction company queries on ChatGPT pull Bing index data.
4. **Claim Apple Business Connect** — usage doubled to 27% (BrightLocal 2026). Free, takes 20 minutes.
5. **Add Google Maps iframe to contact page** — even a lazy-loaded static map image reinforces geographic signal. Full iframe preferred.

### 🟡 Medium
6. **Add `ContactPoint` to schema** — add `"contactPoint": { "@type": "ContactPoint", "telephone": "+96824693300", "contactType": "customer service", "availableLanguage": ["English","Arabic"], "areaServed": "OM" }` to the LocalBusiness node.
7. **Fix phone format in contact page meta description** — standardize to `+968 24 693300`.
8. **Submit to data aggregators** — Data Axle (formerly Infogroup), Foursquare, Neustar/TransUnion. Free/low-cost submissions distribute NAP to hundreds of downstream directories including those cited by AI systems.
9. **Add `aggregateRating` to schema once reviews exist** — once Google reviews are live, surface the rating in schema for rich snippet eligibility.

### 🟢 Low / Long-term
10. **Pursue "best contractor Oman" list placements** — this is the #1 AI visibility factor per Whitespark 2026. Target: Oman Observer "Top Contractors" feature, regional business award programs, industry association directories. A single placement drives disproportionate AI citation value.

---

## Changes Made in This Session

| File | Change |
|------|--------|
| `src/app/[locale]/layout.tsx` | Added `geo`, `email`, `openingHoursSpecification`, `sameAs` (3 social profiles), `hasMap` to LocalBusiness schema |
| `src/app/[locale]/services/[slug]/page.tsx` | Fixed `title: { absolute: ... }` to prevent double `\| Al Binaa` |
| `src/app/[locale]/projects/[slug]/page.tsx` | Fixed `title: { absolute: ... }` |
| `src/app/[locale]/qualifications/page.tsx` | Fixed `title: { absolute: ... }` |
| `public/sitemap.xml` | Expanded from 10 to 36 URLs — added all service detail, project detail, qualifications pages |

---

## Limitations

This analysis could **NOT** assess:
- **Geo-grid ranking** — actual local pack position by proximity grid (requires DataForSEO or BrightLocal)
- **GBP Insights** — views, calls, direction requests, photo views from Google's dashboard
- **Comprehensive backlink profile** — Domain Authority, referring domains, anchor text distribution (requires Moz, Ahrefs, or Semrush)
- **Real-time local pack position** — where albinaa.om appears for "general contractor Muscat" queries today
- **Competitor comparison** — local pack competitors' GBP optimization level
- **Citation audit** — full NAP consistency across 50+ directories (requires Yext, BrightLocal, or Whitespark)
- **GBP review sentiment** — actual review content and owner response quality

Tools that fill these gaps: BrightLocal (geo-grid, citations), DataForSEO (`/seo-dataforseo`), Moz Pro (`/seo-backlinks`), Google Search Console (organic click data).
