# Changelog

All notable changes to OpenSteps are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Planned
- Evidence upload flow (mobile + web)
- Verification workbench for editors
- SMS OTP authentication via Supabase × Twilio (Africell / Orange SL)
- Krio language stub
- ISR revalidation webhook
- OpenGraph / WhatsApp share metadata on guide pages
- 5 additional guides: Driver's Licence, Passport, NIN, NASSIT, TIN

---

## [0.2.0] — 2026-04-23

### Added — Mobile app (Expo SDK 52)

- **App shell** — `PersistQueryClientProvider`, font loading via `@expo-google-fonts/inter`, splash screen
- **Tab navigator** — 5-tab layout: Browse / Saved / Add / Verify / Me
- **HomeScreen** — search bar, category grid, guide list, community feed; pull-to-refresh
- **GuideScreen** — full guide detail with steps, evidence strip, community tips
- **Overview screen** — pre-flight checklist (documents + budget breakdown) with CTA
- **TanStack Query v5** with AsyncStorage persister — offline reads for 24 hours
- **UI components** — Badge, TrustBar, CategoryIcon (SVG), Avatar, CheckRow
- **Home components** — SearchBar, CategoryGrid, GuideCard, FeedItem
- **Guide components** — GuideHeader, SegmentedProgress, StepCard, EvidenceStrip, TipCard, ChecklistSection
- **Hooks** — `useGuides`, `useGuide`, `useGuideDetail`, `useFeed`, `useCategories`
- **Low-bandwidth** — Supabase CDN image transforms (`width=120&quality=50`) via `expo-image`

---

## [0.1.0] — 2026-04-23

### Added — Monorepo foundation + webapp

#### Monorepo
- pnpm workspace configuration (`pnpm-workspace.yaml`)
- Shared TypeScript base config (`tsconfig.base.json`) — strict, `moduleResolution: Bundler`
- `.env.example` with Supabase environment variable template

#### `@opensteps/types`
- Core domain interfaces: `Guide`, `Step`, `Evidence`, `Tip`, `Verifier`, `FeedItem`, `BudgetLine`, `DocumentNeeded`, `Category`, `Office`
- Derived types: `GuideListItem`, `GuideDetail`, `FeedItemWithActor`
- Utility types: `CategoryKey`, `VerifierRole`, `EvidenceType`, `PaymentType`, `FeedEventType`

#### `@opensteps/constants`
- `CATEGORIES` — 8 category definitions with SVG icon path data
- `CATEGORY_MAP` — keyed lookup by `CategoryKey`
- `INTENTS` — 4 common intent cards for the home discovery flow

#### `@opensteps/supabase`
- Supabase client factory — reads from `NEXT_PUBLIC_` or `EXPO_PUBLIC_` env vars
- Query functions: `getGuides`, `getGuideBySlug`, `searchGuides`, `getGuidesByCategory`, `getRelatedGuides`
- Query functions: `getStepsByGuide`, `getDocumentsByGuide`, `getBudgetLines`
- Query functions: `getEvidenceByGuide`, `getEvidenceByStep`, `evidenceThumbnailUrl`, `evidenceFullUrl`
- Query functions: `getFeed`, `getTipsByGuide`, `getVerifiersByGuide`, `getTopVerifiers`, `getCategories`

#### Database
- Full Postgres schema (`packages/supabase/schema.sql`): 12 tables, 9 indexes, 3 denormalisation triggers, RLS with public SELECT policies
- Seed data (`packages/supabase/seed.sql`): "Register a Business" — 7 steps, 5 offices, 6 budget lines, 3 tips, 4 feed events

#### Webapp (Next.js 15)
- App Router layout with `next/font` — Inter, Instrument Serif, JetBrains Mono
- Tailwind CSS v4 `@theme` design tokens from the hi-fi design system
- `/sl` — Home discovery page: search hero, intent matcher, category grid, guide list, live feed rail
- `/sl/[slug]` — Guide detail: 3-column layout (TOC · content · trust panel), ISR at 5 minutes
- `/search` — Full-text search via Postgres `tsvector`
- `LiveFeedRail` — Supabase Realtime subscription, degrades to SSR data
- Components: `AppHeader`, `SearchHero`, `IntentMatcher`, `CategoryGrid`, `GuideCard`, `GuideList`, `TrustStats`
- Guide components: `GuideHeader`, `GuideTOC`, `StepList`, `WhatToBring`, `BudgetBreakdown`, `CommunityTips`, `VerifierList`, `EvidenceThumbs`, `GuideTrustPanel`, `RelatedGuides`

#### Design
- Hi-fi prototype (`hi-fi/`) — complete interactive mock covering all 5 screens and 4 variants each
- Wireframes (`wireframes/`) — original lo-fi wireframes

---

[Unreleased]: https://github.com/opensteps-sl/opensteps/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/opensteps-sl/opensteps/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/opensteps-sl/opensteps/releases/tag/v0.1.0
