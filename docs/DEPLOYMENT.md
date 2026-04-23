# Deployment

## Web — Vercel

The webapp deploys to Vercel from the `main` branch.

### First deploy

```bash
cd webapp
npx vercel
```

Set the following environment variables in the Vercel dashboard:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key (server only) |

Set the **Root Directory** to `webapp` and the **Build Command** to `pnpm build`.

### ISR revalidation

Guide pages cache at 5 minutes (`revalidate = 300`). The home page caches at 60 seconds. To force-revalidate after a database change, call:

```
POST /api/revalidate?path=/sl/[slug]&secret=[REVALIDATE_SECRET]
```

Add `REVALIDATE_SECRET` to your Vercel environment variables and wire up the route handler when needed.

---

## Mobile — EAS (Expo Application Services)

### Preview builds (internal testing)

```bash
cd mobile
eas build --profile preview --platform all
```

### Production builds

```bash
eas build --profile production --platform all
eas submit --platform all
```

### Environment variables for EAS

Add to `mobile/eas.json` under each build profile:

```json
{
  "build": {
    "production": {
      "env": {
        "EXPO_PUBLIC_SUPABASE_URL": "...",
        "EXPO_PUBLIC_SUPABASE_ANON_KEY": "..."
      }
    }
  }
}
```

Do **not** commit secrets to `eas.json`. Use EAS Secrets (`eas secret:create`) for anything sensitive.

---

## Supabase

### Promoting a schema change

1. Write the migration SQL in `packages/supabase/migrations/NNN_description.sql`
2. Test against a local Supabase instance (`supabase start`)
3. Apply to production via the Supabase dashboard SQL editor or `supabase db push`

### Storage buckets (one-time setup)

Create in Supabase → Storage:

| Bucket | Public | Notes |
|---|---|---|
| `evidence-originals` | No | Raw uploads |
| `evidence-redacted` | Yes | Enable image transformations |

### Realtime

Enable Realtime on the `community_feed` table in Supabase → Database → Replication.
