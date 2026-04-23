# Database

OpenSteps uses Supabase (Postgres 15). The full schema is at `packages/supabase/schema.sql`.

## Tables

| Table | Description |
|---|---|
| `guides` | One row per documented process. Published guides are public. |
| `steps` | Numbered steps within a guide. |
| `documents_needed` | Documents required per guide or step. |
| `budget_lines` | Itemised costs — official, cash, mobile money, unofficial. |
| `evidence` | Uploaded photos/receipts linked to guide + step. |
| `tips` | Community-submitted tips ordered by upvotes. |
| `verifiers` | Verified contributors (references `auth.users`). |
| `guide_verifications` | Junction: which verifier verified which guide. |
| `related_guides` | Junction: cross-links between guides. |
| `community_feed` | Activity stream — edits, verifications, contributions. |
| `categories` | 8 category rows with denormalised guide count. |
| `offices` | Government offices with address and hours. |

## Key Columns

### `guides`
- `slug` — URL-safe identifier, used in routes `/sl/[slug]`
- `duration_days` — `int4range`, e.g. `'[2,3]'` for "2–3 days"
- `trust_score` — `numeric(4,2)`, updated by verifications
- `fts` — generated `tsvector` column for full-text search
- `published` — all RLS SELECT policies filter on this

### `budget_lines`
- `payment_type` — `'bank' | 'cash' | 'mobile_money' | 'unofficial'`
- Unofficial rows are shown at reduced opacity in the UI to distinguish them from official costs

### `evidence`
- `storage_path` — private bucket (`evidence-originals`)
- `redacted_path` — public CDN bucket (`evidence-redacted`), used in UI
- `confidence` — 0–1 float, auto-match confidence from future ML pipeline

## Triggers

| Trigger | Table | Effect |
|---|---|---|
| `trg_steps_count` | `steps` | Keeps `guides.steps_count` accurate on insert/delete |
| `trg_evidence_count` | `evidence` | Keeps `steps.evidence_count` accurate |
| `trg_category_count` | `guides` | Keeps `categories.count` accurate on publish/unpublish |

## Row Level Security

All tables have RLS enabled. The MVP read path is fully public:

```sql
-- Example
create policy "public_read_guides"
  on public.guides for select
  using (published = true);
```

Write policies will be added when auth is introduced.

## Storage Buckets

| Bucket | Access | Purpose |
|---|---|---|
| `evidence-originals` | Private | Raw uploads before redaction |
| `evidence-redacted` | Public CDN | Served to users; CDN transforms enabled |

## Running Migrations

The schema is a single `schema.sql` file. To apply:

1. Open Supabase → SQL Editor → New query
2. Paste `packages/supabase/schema.sql` and run
3. Paste `packages/supabase/seed.sql` and run

For future changes, add numbered migration files to `packages/supabase/migrations/` (format: `001_description.sql`).
