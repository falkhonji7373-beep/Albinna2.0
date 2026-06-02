# Security Review — Al Binaa Construction Website

**Reviewed:** 2026-05-07  
**Stack:** Next.js 14.2.35 (static export), Formspree (external form handler), `serve` static file server  
**Scope:** Full client-side codebase (`src/`), configuration files, dependency manifest

---

## Summary

| Severity | Count |
|---|---|
| 🔴 High | 1 |
| 🟠 Medium | 3 |
| 🟡 Low | 3 |
| ℹ️ Info | 2 |

The site has a lean attack surface — it is a fully static export with no server-side API routes, no database, and no authentication. Most risks are configuration-level rather than code-level. The single high-severity issue is a redirect-injection vector via unvalidated `localStorage`.

---

## 🔴 HIGH — Open Redirect via Unvalidated localStorage

**File:** `src/app/page.tsx`, line 8–9

```tsx
const saved = localStorage.getItem('locale') || 'en';
router.replace(`/${saved}`);
```

**Risk:** `localStorage` is writable by any JavaScript running on the same origin. If the site ever ships an XSS vulnerability (even in a third-party script loaded via Google Fonts CDN or Formspree), an attacker can plant an arbitrary value in `localStorage['locale']` and cause the root page to redirect to any path, including paths that serve attacker-controlled content or trigger unexpected application states.

Even without XSS, a malicious browser extension or injected script can manipulate this value.

**Fix:** Validate the value against the declared locale allowlist before using it:

```tsx
const LOCALES = ['en', 'ar'] as const;
type Locale = typeof LOCALES[number];

const saved = localStorage.getItem('locale') as Locale | null;
const locale = LOCALES.includes(saved as Locale) ? saved : 'en';
router.replace(`/${locale}`);
```

---

## 🟠 MEDIUM — No Content Security Policy (CSP)

**File:** `next.config.mjs` — no `headers()` configured  
**Context:** `output: 'export'` disables Next.js `headers()` API; `serve` has no header configuration

**Risk:** Without a CSP, the browser will execute any script injected via XSS, third-party CDN compromise (Google Fonts, Formspree), or malicious browser extension. The absence of `X-Frame-Options` also means the site can be embedded in iframes (clickjacking vector).

**Fix:** Since this is a static site served via `npx serve`, add a `serve.json` or configure the host (e.g. Railway, Netlify, Vercel) to inject security headers:

```json
// serve.json (for npx serve)
{
  "headers": [
    {
      "source": "**",
      "headers": [
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://formspree.io; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://formspree.io; frame-ancestors 'none';"
        }
      ]
    }
  ]
}
```

For Railway/production, configure headers in the platform dashboard or `nixpacks.toml`.

---

## 🟠 MEDIUM — Formspree Form ID is a Placeholder in Source Code

**File:** `src/lib/config.ts`, line 9

```ts
const FORM_ID = 'YOUR_FORM_ID'; // ← replace this with your Formspree form ID
```

**Risk:** The placeholder makes all three form submission flows silently fail in production (`/contact` page, contact form in `ContactContent.tsx`, and `QuickQuotePanel.tsx`). Leads reach the site and submit enquiries that are never delivered. This is a data integrity issue with business impact.

Additionally, the form ID is hardcoded in client-bundled JavaScript — it will appear in the browser's source and in the `out/` static build. While Formspree form IDs are by design semi-public (they authenticate via the endpoint, not a secret key), it is better practice to keep it as an environment variable to allow per-environment overrides without code changes.

**Fix:**

1. Replace `'YOUR_FORM_ID'` with the real Formspree form ID immediately.
2. Move to an environment variable for flexibility:

```ts
// src/lib/config.ts
const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? '';

if (!FORM_ID) {
  console.warn('[config] NEXT_PUBLIC_FORMSPREE_ID is not set — form submissions will fail.');
}

export const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORM_ID}`;
```

Then add `NEXT_PUBLIC_FORMSPREE_ID=your_real_id` to `.env.local` (locally) and to the Railway/host environment variables.

---

## 🟠 MEDIUM — No Input Length or Format Validation on Form Fields

**Files:** `src/components/QuickQuotePanel.tsx`, `src/components/ContactContent.tsx`, `src/app/contact/page.tsx`

**Risk:** The forms only validate presence (non-empty). The phone field accepts any arbitrary string of any length. The name and message fields have no `maxLength` constraint. While Formspree sanitises on their end, excessively long payloads can cause issues with downstream email clients and logging systems, and empty-string bypasses (e.g. whitespace-only) are possible.

**Fix:**

```tsx
// Add to validation logic
if (form.phone.trim().length < 7) errs.phone = true; // min phone length
if (form.name.trim().length > 120) errs.name = true;  // max length guard

// Add to input JSX
<input maxLength={120} ... />   // name
<input maxLength={30}  ... />   // phone
<textarea maxLength={2000} ... /> // message
```

Also add `type="tel"` to the phone input in `QuickQuotePanel.tsx` (it's already on `ContactContent.tsx` but missing in the panel).

---

## 🟡 LOW — `dangerouslySetInnerHTML` on JSON-LD Script

**File:** `src/app/[locale]/layout.tsx`, line 189

```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
```

**Risk:** The `jsonLd` object is entirely static and hardcoded — no user input flows into it. `JSON.stringify()` produces valid, escaped JSON that is safe to embed. The current implementation is **not exploitable** as written.

However, if any part of `jsonLd` is ever dynamically populated (e.g. pulling a project name from a CMS or URL param), this pattern would become an XSS vector.

**Recommendation:** Add a comment to the code to document this constraint, preventing future developers from accidentally introducing dynamic values:

```tsx
// ⚠️  jsonLd is STATIC only. Never interpolate user input, URL params,
//     or CMS content here without sanitising first.
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
```

---

## 🟡 LOW — Google Fonts Loaded Without `integrity` / Subresource Integrity

**File:** `src/app/[locale]/layout.tsx`, lines 181–185

```tsx
<link href="https://fonts.googleapis.com/css2?family=Cinzel:..." rel="stylesheet" />
```

**Risk:** Google Fonts CDN is a third-party dependency. If the CDN is compromised or serves a malicious stylesheet, the browser will apply it without complaint. SRI (`integrity` attribute) is not supported for cross-origin stylesheets that vary per request (which Google Fonts does dynamically), so this is an inherent limitation of the CDN approach.

**Recommendation (optional):** Self-host the fonts in `/public/fonts/` and reference them via a local `@font-face` declaration in `globals.css`. This eliminates the third-party dependency entirely, improves load performance (no DNS + TLS round-trip), and removes the risk. The font files can be downloaded from [google-webfonts-helper](https://gwfh.mranftl.com/fonts).

---

## 🟡 LOW — Dependency Versions (next 14.2.35)

**File:** `package.json`

Next.js 14.2.35 is a patched 14.x release but the project is multiple major versions behind Next.js 15. No known critical CVEs affect 14.2.35 at time of review, but the dependency should be monitored via `npm audit` or GitHub Dependabot.

**Recommendation:** Run `npm audit` before each deployment. Consider upgrading to Next.js 15 — the `output: 'export'` static mode is fully supported.

---

## ℹ️ INFO — No `.env` File Committed

No `.env`, `.env.local`, or `.env.production` files were found in the repository. This is **correct and expected** behaviour — environment files should never be committed. Confirmed no secrets are in source.

---

## ℹ️ INFO — No `target="_blank"` Without `rel="noopener"`

Grep across all TSX files confirmed zero instances of `target="_blank"` in the codebase. All external navigation uses Next.js `<Link>` which is safe by default. No reverse tabnapping risk.

---

## Action Priority

| Priority | Action | File |
|---|---|---|
| 🔴 Do now | Validate locale from localStorage against allowlist | `src/app/page.tsx` |
| 🔴 Do now | Replace `YOUR_FORM_ID` with real Formspree ID | `src/lib/config.ts` |
| 🟠 This week | Add `serve.json` with security headers (CSP, X-Frame-Options, etc.) | project root |
| 🟠 This week | Move Formspree ID to `NEXT_PUBLIC_FORMSPREE_ID` env var | `src/lib/config.ts` |
| 🟠 This week | Add `maxLength` + phone format validation to all forms | `QuickQuotePanel.tsx`, `ContactContent.tsx`, `contact/page.tsx` |
| 🟡 Next sprint | Add safety comment to `dangerouslySetInnerHTML` usage | `[locale]/layout.tsx` |
| 🟡 Next sprint | Consider self-hosting fonts for SRI compliance + perf | `[locale]/layout.tsx`, `globals.css` |
| 🟡 Ongoing | Run `npm audit` before each deployment | — |
