# Al Binaa — Claude Code Instructions

## Design System
Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.

## Stack
- Next.js 14, static export (`output: 'export'`)
- next-intl for EN/AR bilingual routing
- Tailwind CSS v3 + inline styles (no Tailwind v4 syntax)
- No external animation libraries — CSS transitions only

## Key Conventions
- Use `isRTL` (not `isAr`) to gate locale-specific logic
- `SITE_URL` from `src/lib/config.ts` for all absolute URLs — never hardcode the domain
- `setRequestLocale(locale)` at the top of every page component
- All components in `src/components/`, all pages in `src/app/[locale]/`

## Skill routing
When the user's request matches an available skill, invoke it via the Skill tool.

Key routing rules:
- Design system / UI decisions → invoke /design-consultation
- Visual polish / page review → invoke /design-review
- Code review / diff check → invoke /review
- Bugs / errors → invoke /investigate
- Ship / deploy / PR → invoke /ship
