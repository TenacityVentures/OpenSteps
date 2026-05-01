# Changelog

All notable changes to OpenSteps are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Planned
- Evidence upload flow (mobile + web)
- SMS OTP authentication via Supabase × Twilio (Africell / Orange SL)
- Krio language stub
- ISR revalidation webhook
- OpenGraph / WhatsApp share metadata on guide pages
- Additional country activations (Nigeria, Ghana, South Africa)

---

## [0.4.0] — 2026-05-01

### Added

#### Country switching
- **`CountrySwitcher` component** — searchable dropdown in `AppHeader`; clicking a country navigates and writes a `preferred_country` cookie (1-year, `SameSite=Lax`)
- **`preferred_country` cookie** — middleware refreshes it on every valid country request; root `page.tsx` reads it to redirect on first visit; middleware already handled session refresh
- **Sign-up country field** — dropdown shown when more than one country is active; sets `preferred_country` cookie on account creation

#### Verify queue — swipeable cards
- **Drag + fling gesture** — `SwipeStack` card responds to pointer events (mouse, touch, stylus); dragging > 80 px triggers a fling animation (220 ms cubic-bezier) then advances or retreats
- **Keyboard navigation** — left/right arrow keys navigate the queue
- **Visual hints** — subtle "← Back" / "Next →" overlays appear while dragging; "swipe to navigate" hint shown below card when multiple guides exist
- **`onRetreat` prop** wired through `VerifyQueue` so backward navigation works

#### Footer
- **`AppFooter` component** — country-aware footer on all `[country]/*` routes; shows country flag + name, nav links (Browse, Verify, Contribute, Leaderboard), legal links, and copyright

#### Pages & UI
- **Category page** (`/[country]/category/[key]`) — breadcrumb, category icon, guide count, empty-state CTA
- **Search** — `SearchInput` upgraded to live debounced search (320 ms); updates URL with `router.replace` as user types; search page gets its own `layout.tsx`; empty state shows suggested search terms
- **Search page** — removed inline `<AppHeader />` (now via layout), improved empty and no-results states
- **Admin & dashboard layouts** — `app/admin/layout.tsx` and `app/dashboard/layout.tsx` added so `AppHeader` renders on those routes (fixes missing header)

### Fixed
- **`/admin` non-editor redirect** — changed from `redirect('/dashboard')` to `notFound()` (clearer intent)
- **`/admin/edit-requests` RLS** — switched to `createAdminClient()` so editors can see all requests (policy previously only showed own requests)
- **Upvote persistence** — added `revalidatePath` to `upvoteTip`, `removeUpvote`, and `addTip` server actions so ISR cache is busted immediately
- **Category links 404** — `CategoryGrid` now receives `country` prop and generates `/${country}/category/${key}` links instead of hardcoded `/sl/${key}`
- **Hardcoded `/sl` links removed** — `GuideHeader`, `UserMenu`, `auth/signin`, `auth/signup`, `auth/callback`, `auth/layout`, `dashboard/page` all updated to use cookie-derived or path-derived country
- **PendingList clickable rows** — entire desktop table row now navigates to the review page, not just the "Review →" cell
- **Verify editor edit** — `updateStep` and `updateDocument` server actions added; `ReviewPanel` now supports inline editing of step titles, step descriptions, document labels, and required/optional toggle

### Database
- No schema changes in this release (all additions were in 0.3.0)

---

## [0.3.0] — 2026-04-28

### Added — Production auth, multi-country routing, verification & community features

#### Authentication
- **Sign-up page** (`/auth/signup`) — display name, email, password; DB trigger auto-creates `verifiers` row with `role = 'verifier'`
- **Sign-in page** (`/auth/signin`) — email + password with `next` redirect param
- **Auth callback** (`/auth/callback/route.ts`) — handles Supabase OAuth/magic-link code exchange
- **`useUser` hook** — client-side session subscription via `onAuthStateChange`; used by `UserMenu` and auth-gated UI
- **`UserMenu` component** — avatar + display name in `AppHeader`; dropdown with dashboard link, editor queue link (role-gated), sign-out
- **Service role client** (`lib/supabase/admin.ts`) — bypasses RLS for editor write operations

#### Multi-country routing
- **`/[country]/` dynamic segment** replaces `/sl/` — all guide, contribute, verify, leaderboard, and category routes are now country-scoped
- **`@opensteps/constants` — `countries.ts`** — `COUNTRIES`, `COUNTRY_MAP`, `ACTIVE_COUNTRY_CODES`, `CountryCode` type; Sierra Leone active, Nigeria/Ghana/South Africa stubbed
- **Middleware** (`webapp/src/middleware.ts`) — refreshes Supabase session on every request; validates `[country]` against `ACTIVE_COUNTRY_CODES`; protects `/dashboard` and `/admin` routes
- **`CountryProvider`** — React context propagating country metadata to child components; uses `createElement` to avoid React 18/19 dual-types issue
- **Country layout** (`/[country]/layout.tsx`) — validates country against `COUNTRY_MAP`, calls `notFound()` for unknowns, wraps children in `CountryProvider`
- **Root `page.tsx`** — redirects to first active country (`/sl`)
- **Contribute wizard** — country field replaced with `<select>` of active countries; `submitGuide` action stores `country`
- **`GuideCard`** — links updated to `/${guide.country}/guide/${guide.slug}`

#### Verification system
- **Community verify** — `communityVerify(guideId)` server action; inserts into `guide_verifications`; DB trigger auto-publishes guide at 5 verifications (`trust_score = 7.0`)
- **Editor approve** — `editorApprove(guideId)` sets `published = true`, `trust_score = 8.0`, logs to `community_feed` using service role client
- **Editor flag** — `editorFlag(guideId, reason)` with `community_feed` entry
- **Inline editor edit** — `ReviewPanel` gains an "Edit" mode; title, category, description become inputs; `updateGuideContent` server action saves changes (editor only)
- **`VerifyBanner`** component — shows verification progress bar + button on guide detail for pending guides; sign-in redirect for unauthenticated visitors
- **Edit requests** — `requestEdit(guideId, reason)` server action; `approveEditRequest` unpublishes guide for re-edit; `rejectEditRequest` closes request
- **`VerifyQueue`**, **`PendingList`**, **`SwipeStack`** — country-aware; links scoped to `/${country}/verify/…`

#### Community tips
- **`AddTipForm`** — auth-gated textarea; calls `addTip(guideId, text, stepId?)` server action; invokes `onAdded` callback on success
- **`TipUpvoteButton`** — optimistic toggle; calls `upvoteTip` / `removeUpvote` server actions; reverts on error
- **`CommunityTips` rewrite** — now a client component; Supabase Realtime subscription for new tips; fetches user's existing upvotes; renders `AddTipForm` + upvote buttons

#### Admin & dashboard
- **`/admin`** — editor panel with pending guide count, pending edit-request count, recent community feed; role-gated (editor only)
- **`/admin/edit-requests`** — list of all edit requests with guide title, requester, reason, status badges; approve/reject buttons
- **`/dashboard`** — profile header (avatar, display name, email, editor badge); stats (guides contributed, verifications, accuracy); "My guides" list via `community_feed`; edit request status history; quick action links

#### New pages
- **`/[country]/leaderboard`** — top 50 verifiers; desktop table + mobile cards; rank, avatar, verifications, accuracy, domains, streak weeks
- **`/[country]/category/[key]`** — guides filtered by category + country; category heading, description, guide list

#### Search
- **`SearchInput`** client component — controlled input pre-populated from `useSearchParams()`; pushes updated query to `/search?q=…`; wrapped in `Suspense` on search page
- **Search page** — search input at top; result count; country-aware "Browse all" fallback link

#### Database additions (`migration_v2.sql`)
- **`countries` table** — `code`, `name`, `currency`, `flag`, `active`; Sierra Leone seeded active
- **`guides.country`** column — FK to `countries.code`; index on `(country, published)`
- **`tip_upvotes` table** — composite PK `(tip_id, user_id)`; RLS; trigger to denormalise `tips.upvotes`
- **`edit_requests` table** — `id`, `guide_id`, `requester_id`, `reason`, `status`, `reviewed_by`, `reviewed_at`; RLS
- **`guide_verifications.note`** column
- **`handle_new_user` trigger** — auto-creates `verifiers` row on `auth.users` INSERT
- **`check_auto_publish` trigger** — fires on `guide_verifications` INSERT; publishes guide + writes `community_feed` at ≥ 5 verifications
- **RLS write policies** — tips INSERT/DELETE, guide_verifications INSERT, verifiers UPDATE, edit_requests SELECT/INSERT

#### Seed data (`seed_v2.sql`)
- 7 additional Sierra Leone guides (6 published, all with steps, documents, budget lines, tips, feed events):
  - Get a Driver's Licence (transport) — Le 185,000 · 6 steps
  - Apply for a Passport (travel) — Le 450,000 · 5 steps
  - Register for NIN (id) — free · 3 steps
  - File Income Tax Return (tax) — Le 10,000 · 4 steps
  - Register with NASSIT (health) — free · 3 steps
  - Enrol at Fourah Bay College (education) — Le 75,000 · 5 steps
  - Transfer Land Title (property) — Le 320,000 · 7 steps
- Additional offices: DVLA, Immigration Department, NATCOM, FBC Admissions, OARG, SLRA

### Changed
- `AppHeader` — converted to client component; country-aware nav links; includes `UserMenu`
- `RelatedGuides` — accepts optional `country` prop; links use `/${country}/guide/${slug}`
- `GuideTrustPanel` — passes `country` through for related guide links
- `BasicsStep` — free-text country input replaced with `<select>` of active countries
- `ContributeWizard` — imports actions from `[country]/contribute/actions`; redirects to `/${draft.country}/contribute/submitted`
- `public_read_guides` RLS policy — changed from `USING (published = true)` to `USING (true)`; code-layer filtering preserved in queries

### Removed
- `/sl/` static route segment — replaced by `/[country]/` dynamic routing

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

[Unreleased]: https://github.com/opensteps-sl/opensteps/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/opensteps-sl/opensteps/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/opensteps-sl/opensteps/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/opensteps-sl/opensteps/releases/tag/v0.1.0
