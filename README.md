# OpenSteps 🇸🇱

> The community-verified ledger of Sierra Leone's bureaucracy.

OpenSteps is an open-source, mobile-first platform where anyone can find clear, step-by-step guides for navigating government processes — with real costs, real wait times, and community-uploaded evidence.

**Starting in Sierra Leone. Built to scale across Africa.**

---

## Vision

OpenSteps is the Wikipedia of real-world procedures — an open, community-driven platform where anyone can find verified, step-by-step instructions for navigating bureaucratic processes. From registering a business to getting a driving licence, OpenSteps makes the invisible visible.

## Mission

To eliminate information asymmetry in civic processes by building the world's most reliable, community-verified database of procedures — starting in Sierra Leone, scaling across Africa.

## Principles

- **Open knowledge** — All information is free and publicly accessible
- **Community verification** — Truth emerges from collective validation, not central authority
- **Evidence-based trust** — Real receipts, real forms, real proof
- **Radical transparency** — Every edit, every review, every change is visible
- **Local first, global ambition** — Deep accuracy in one country before breadth

---

## Repository Structure

This is a **pnpm monorepo** containing the web app, mobile app, and shared packages.

```
opensteps/
├── packages/
│   ├── types/        — @opensteps/types      — Shared TypeScript interfaces
│   ├── constants/    — @opensteps/constants   — Categories, intents, static data
│   └── supabase/     — @opensteps/supabase    — Supabase client + all query functions
│
├── webapp/           — Next.js 15 (App Router, Tailwind CSS v4)
├── mobile/           — Expo SDK 52 (expo-router v4, React Native)
│
├── hi-fi/            — High-fidelity design prototype (reference only)
└── wireframes/       — Original wireframes (reference only)
```

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Web | Next.js 15 App Router | RSC-first, ISR, Vercel edge |
| Mobile | Expo SDK 52 + expo-router v4 | File-based routing, EAS builds |
| Backend | Supabase | Postgres + Auth + Realtime + Storage |
| Data fetching (web) | Native `async/await` via `@supabase/ssr` | No client state needed for read path |
| Data fetching (mobile) | TanStack Query v5 + AsyncStorage | Offline reads, 2G resilience |
| Styling | Tailwind CSS v4 | `@theme` tokens from design system |
| Monorepo | pnpm workspaces | Simple, no Turborepo overhead at MVP |

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9 — `npm install -g pnpm`
- A [Supabase](https://supabase.com) project

### 1. Clone and install

```bash
git clone https://github.com/opensteps-sl/opensteps.git
cd opensteps
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Fill in your Supabase URL and keys
```

### 3. Set up the database

In your Supabase project → SQL Editor, run in order:

```
1. packages/supabase/schema.sql   — creates all tables, indexes, triggers, RLS
2. packages/supabase/seed.sql     — seeds the first guide (Register a Business)
```

### 4. Run the web app

```bash
pnpm dev:web
# → http://localhost:3000/sl
```

### 5. Run the mobile app

```bash
cd mobile
pnpm start
# Scan QR with Expo Go, or press i/a for simulator
```

---

## Key Features (MVP)

- **Guide detail pages** — steps, documents needed, budget breakdown, community tips, evidence thumbnails
- **Community feed** — live Supabase Realtime subscription showing activity as it happens
- **Trust scoring** — per-guide accuracy score computed from community verifications
- **Offline-first mobile** — TanStack Query + AsyncStorage persists last-fetched guides for 24h
- **Low-bandwidth optimised** — Supabase CDN image transforms (`?width=120&quality=50`), ISR-served HTML
- **Full-text search** — Postgres `tsvector` with `websearch_to_tsquery`

---

## Contributing

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for the contribution workflow, code style, and how to add a new guide.

---

## Docs

| Document | Description |
|---|---|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design, data flow, package boundaries |
| [docs/DATABASE.md](docs/DATABASE.md) | Schema reference, RLS policies, triggers |
| [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) | How to contribute code or guide content |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Vercel + EAS deployment guide |
| [CHANGELOG.md](CHANGELOG.md) | Version history and release notes |

---

## Licence

MIT — see [LICENSE](LICENSE).

Built with ❤️ for Sierra Leone.
