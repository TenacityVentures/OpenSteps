# Architecture

## Overview

OpenSteps is a pnpm monorepo with three workspaces: two apps (`webapp`, `mobile`) and three shared packages (`types`, `constants`, `supabase`).

```
Browser / Expo
     │
     ├── webapp (Next.js 15 RSC)
     │     └── @supabase/ssr → Supabase Postgres (server-side)
     │         LiveFeedRail  → Supabase Realtime (client-side)
     │
     └── mobile (Expo SDK 52)
           └── TanStack Query → @opensteps/supabase → Supabase
                   │
                   AsyncStorage persister (offline cache)
```

---

## Package Boundaries

### `@opensteps/types`
Single source of truth for all TypeScript interfaces. **No runtime code** — types only. Both apps import from here. Changing a type here is a cross-cutting change.

### `@opensteps/constants`
Static data that doesn't live in the database: category metadata (labels, icon SVG paths, subtitles) and intent cards for the home screen. Safe to import in any environment.

### `@opensteps/supabase`
All database query functions. Takes a Supabase client as the first argument — this keeps the package environment-agnostic (works on the server, client, and in React Native). The client itself is never a singleton here; callers create it with the appropriate factory (`createServerClient` on the server, `createClient` on mobile).

---

## Data Flow

### Web (read path)
1. Next.js RSC calls `createClient()` (server-side, reads cookies for auth context)
2. Calls query functions from `@opensteps/supabase` — e.g. `getGuideBySlug(client, slug)`
3. Query functions return typed data — components render synchronously, no client state
4. ISR at `revalidate = 300` (guide pages) and `revalidate = 60` (home) — Vercel edge cache
5. `LiveFeedRail` is the only `'use client'` component; subscribes to Supabase Realtime

### Mobile (read path)
1. Hook calls (e.g. `useGuide(slug)`) go through TanStack Query
2. Query functions call Supabase via `getClient()` singleton (AsyncStorage session)
3. Results cached in AsyncStorage via `createAsyncStoragePersister` — 24h max age
4. Offline: stale data is served from AsyncStorage; error state shown if cache is empty

### Write path (future)
- Auth: Supabase Auth with SMS OTP (Africell / Orange SL via Twilio)
- Evidence upload: mobile → Supabase Storage (`evidence-originals`, private) → redaction pipeline → `evidence-redacted` (public CDN)
- Verification: `guide_verifications` junction table + trigger updates `trust_score`

---

## Key Design Decisions

### Why no API layer?
At MVP the read path is fully public. Direct Supabase queries from RSCs are simpler, faster, and cheaper. An API layer (e.g. Django REST, tRPC) would be added when write-path business logic becomes complex enough to warrant it.

### Why TanStack Query on mobile but not web?
Web uses Next.js RSC which handles caching at the HTTP / CDN layer. Mobile needs client-side offline persistence, background refetching, and retry logic — TanStack Query solves all three.

### Why Supabase Storage for evidence?
CDN image transforms (`?width=120&quality=50`) are critical for Sierra Leone's 2G/3G network conditions. Supabase Storage supports these natively without a separate service.

### Why `int4range` for `duration_days`?
Processes in Sierra Leone have realistic ranges ("2–3 days"), not single values. Storing as a Postgres range type allows proper querying and future statistics.

---

## Environment Variables

| Variable | Used by | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | webapp | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | webapp | Public anon key |
| `EXPO_PUBLIC_SUPABASE_URL` | mobile | Supabase project URL |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | mobile | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | server only | Admin key — never expose client-side |
