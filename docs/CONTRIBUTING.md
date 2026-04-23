# Contributing

Thank you for helping make government processes more transparent in Sierra Leone.

There are two ways to contribute: **guide content** (no code needed) and **code**.

---

## Contributing a Guide

A guide is a verified, step-by-step walkthrough of a real government process.

### What makes a good guide

- **First-hand experience** — you completed the process yourself, or verified it with someone who did recently
- **Specific costs** — exact amounts in Sierra Leone Leone (NLe), not ranges where avoidable
- **Office names and addresses** — the specific office, not just "the ministry"
- **Realistic timings** — not the official time, the actual time
- **Evidence** — a receipt, a form, a photo of the counter. Even one piece of evidence raises the trust score significantly.

### How to submit

1. Open an issue with the label `guide-proposal` and describe the process
2. A maintainer will create the guide stub in the database
3. You fill in the steps, costs, and tips
4. At least two community members verify before the guide goes live

---

## Contributing Code

### Setup

```bash
git clone https://github.com/opensteps-sl/opensteps.git
cd opensteps
pnpm install
cp .env.example .env  # fill in your Supabase project credentials
```

### Branch naming

```
feat/short-description    — new feature
fix/short-description     — bug fix
chore/short-description   — tooling, deps, config
docs/short-description    — documentation only
```

### Commit messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(webapp): add category browse page
fix(mobile): correct CategoryIcon key for id/tax
chore: upgrade expo to 52.1
docs: update DATABASE.md with new trigger
```

Scope is the affected workspace or package: `webapp`, `mobile`, `packages/types`, `db`, etc.

### Pull requests

- One logical change per PR
- Include a screenshot for any UI change
- All TypeScript must pass `pnpm typecheck` with zero errors
- Describe what changed and why, not just what the code does

### Adding a new query function

1. Add the function to the relevant file in `packages/supabase/src/queries/`
2. Export it from `packages/supabase/src/index.ts`
3. Use it in the webapp via `import { fn } from '@opensteps/supabase'`
4. Use it in the mobile app via a hook in `mobile/src/hooks/`

### Adding a new page (webapp)

Pages live in `webapp/src/app/sl/`. They are async RSCs by default. Fetch all data in a single `Promise.all` at the top of the component. Revalidate with `export const revalidate = N`.

### Adding a new screen (mobile)

Screens live in `mobile/src/app/`. Create a hook in `mobile/src/hooks/` that wraps the query function. Use `useQueries` for parallel fetches (see `useGuideDetail.ts` as reference).

---

## Code Style

- **TypeScript strict mode** — `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`
- **No comments** unless the *why* is non-obvious
- **No abstractions** until you have three identical use cases
- **No error handling** for impossible states — only validate at system boundaries

---

## Questions

Open a GitHub Discussion or reach out via the project's WhatsApp community group.
