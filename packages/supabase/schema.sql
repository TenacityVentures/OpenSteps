-- ============================================================
-- OpenSteps — Supabase schema
-- Run this in the Supabase SQL editor (Project > SQL Editor > New query)
-- ============================================================

-- ── Extensions ───────────────────────────────────────────────────────────
create extension if not exists "pg_trgm";
create extension if not exists "unaccent";

-- ── offices ──────────────────────────────────────────────────────────────
create table public.offices (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  address    text,
  hours      text,
  lat        numeric(9,6),
  lng        numeric(9,6),
  created_at timestamptz not null default now()
);

-- ── categories ───────────────────────────────────────────────────────────
create table public.categories (
  id       uuid primary key default gen_random_uuid(),
  key      text not null unique,
  label    text not null,
  subtitle text,
  count    int  not null default 0
);

insert into public.categories (key, label, subtitle) values
  ('business',  'Start a business',    'Register · TIN · NASSIT'),
  ('id',        'ID & documents',      'NIN · passport · birth cert'),
  ('transport', 'Driving & vehicles',  'Learner''s · road test · reg.'),
  ('health',    'Health & NASSIT',     'Enrolment · dependants'),
  ('education', 'Education',           'Scholarships · enrolment'),
  ('tax',       'Tax & compliance',    'TIN · filing · returns'),
  ('property',  'Property & land',     'Survey · title · transfer'),
  ('travel',    'Travel & passport',   'Passport · visa · clearance');

-- ── guides ───────────────────────────────────────────────────────────────
create table public.guides (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  slug             text not null unique,
  category         text not null references public.categories(key),
  description      text,
  steps_count      int  not null default 0,
  total_cost       int  not null default 0,
  duration_days    int4range,            -- e.g. '[2,3]' for "2–3 days"
  trust_score      numeric(4,2) default 0.0,
  language         text[] not null default '{en}',
  follower_count   int not null default 0,
  last_verified_at timestamptz,
  published        boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  fts              tsvector generated always as (
    to_tsvector('english', coalesce(title,'') || ' ' || coalesce(description,''))
  ) stored
);

create index idx_guides_category  on public.guides(category);
create index idx_guides_slug      on public.guides(slug);
create index idx_guides_published on public.guides(published) where published = true;
create index idx_guides_fts       on public.guides using gin(fts);
create index idx_guides_followers on public.guides(follower_count desc) where published = true;
create index idx_guides_trust     on public.guides(trust_score desc)    where published = true;

-- ── steps ────────────────────────────────────────────────────────────────
create table public.steps (
  id             uuid primary key default gen_random_uuid(),
  guide_id       uuid not null references public.guides(id) on delete cascade,
  n              int  not null,
  title          text not null,
  description    text,
  cost           int  not null default 0,
  office         text,
  office_id      uuid references public.offices(id),
  day            int,
  evidence_count int  not null default 0,
  unique (guide_id, n)
);

create index idx_steps_guide on public.steps(guide_id, n);

-- ── documents_needed ─────────────────────────────────────────────────────
create table public.documents_needed (
  id       uuid primary key default gen_random_uuid(),
  guide_id uuid not null references public.guides(id) on delete cascade,
  step_id  uuid references public.steps(id) on delete set null,
  label    text not null,
  required boolean not null default true
);

create index idx_docs_guide on public.documents_needed(guide_id);

-- ── budget_lines ─────────────────────────────────────────────────────────
create table public.budget_lines (
  id           uuid primary key default gen_random_uuid(),
  guide_id     uuid not null references public.guides(id) on delete cascade,
  step_id      uuid references public.steps(id) on delete set null,
  label        text not null,
  amount       int  not null default 0,
  office       text,
  payment_type text  -- 'bank' | 'cash' | 'mobile_money' | 'unofficial'
);

create index idx_budget_guide on public.budget_lines(guide_id);

-- ── verifiers ────────────────────────────────────────────────────────────
create table public.verifiers (
  id                 uuid primary key references auth.users(id) on delete cascade,
  display_name       text not null,
  accuracy_pct       int  not null default 0,
  verification_count int  not null default 0,
  domains            text[],
  role               text not null default 'verifier',
  streak_weeks       int  not null default 0,
  location           text,
  created_at         timestamptz not null default now()
);

-- ── tips ─────────────────────────────────────────────────────────────────
create table public.tips (
  id         uuid primary key default gen_random_uuid(),
  guide_id   uuid not null references public.guides(id) on delete cascade,
  step_id    uuid references public.steps(id) on delete set null,
  author_id  uuid references auth.users(id) on delete set null,
  text       text not null,
  upvotes    int  not null default 0,
  created_at timestamptz not null default now()
);

create index idx_tips_guide on public.tips(guide_id, upvotes desc);

-- ── evidence ─────────────────────────────────────────────────────────────
create table public.evidence (
  id              uuid primary key default gen_random_uuid(),
  guide_id        uuid not null references public.guides(id) on delete cascade,
  step_id         uuid references public.steps(id) on delete set null,
  uploaded_by     uuid references auth.users(id) on delete set null,
  type            text not null, -- 'receipt' | 'form' | 'photo'
  storage_path    text not null,
  redacted_path   text,
  matched_step_id uuid references public.steps(id) on delete set null,
  confidence      numeric(5,4),
  published       boolean not null default false,
  created_at      timestamptz not null default now()
);

create index idx_evidence_guide on public.evidence(guide_id) where published = true;
create index idx_evidence_step  on public.evidence(step_id)  where published = true;

-- ── community_feed ───────────────────────────────────────────────────────
create table public.community_feed (
  id          uuid primary key default gen_random_uuid(),
  type        text not null, -- 'edit' | 'verify' | 'contribute' | 'flag'
  guide_id    uuid references public.guides(id) on delete cascade,
  actor_id    uuid references auth.users(id) on delete set null,
  description text not null,
  created_at  timestamptz not null default now()
);

create index idx_feed_recent on public.community_feed(created_at desc);

-- ── guide_verifications ──────────────────────────────────────────────────
create table public.guide_verifications (
  guide_id    uuid not null references public.guides(id) on delete cascade,
  verifier_id uuid not null references public.verifiers(id) on delete cascade,
  verified_at timestamptz not null default now(),
  primary key (guide_id, verifier_id)
);

-- ── related_guides ───────────────────────────────────────────────────────
create table public.related_guides (
  guide_id         uuid not null references public.guides(id) on delete cascade,
  related_guide_id uuid not null references public.guides(id) on delete cascade,
  primary key (guide_id, related_guide_id)
);

-- ── Triggers: denormalized step count ────────────────────────────────────
create or replace function update_guide_steps_count()
returns trigger language plpgsql as $$
begin
  update public.guides
     set steps_count = (
       select count(*) from public.steps
       where guide_id = coalesce(new.guide_id, old.guide_id)
     )
   where id = coalesce(new.guide_id, old.guide_id);
  return coalesce(new, old);
end $$;

create trigger trg_steps_count
after insert or delete on public.steps
for each row execute function update_guide_steps_count();

-- ── Triggers: denormalized evidence count per step ────────────────────────
create or replace function update_step_evidence_count()
returns trigger language plpgsql as $$
begin
  update public.steps
     set evidence_count = (
       select count(*) from public.evidence
       where step_id = coalesce(new.step_id, old.step_id)
         and published = true
     )
   where id = coalesce(new.step_id, old.step_id);
  return coalesce(new, old);
end $$;

create trigger trg_evidence_count
after insert or update or delete on public.evidence
for each row execute function update_step_evidence_count();

-- ── Triggers: update category guide count ────────────────────────────────
create or replace function update_category_count()
returns trigger language plpgsql as $$
begin
  update public.categories
     set count = (
       select count(*) from public.guides
       where category = coalesce(new.category, old.category)
         and published = true
     )
   where key = coalesce(new.category, old.category);
  return coalesce(new, old);
end $$;

create trigger trg_category_count
after insert or update or delete on public.guides
for each row execute function update_category_count();

-- ── Row Level Security ────────────────────────────────────────────────────
alter table public.guides              enable row level security;
alter table public.steps               enable row level security;
alter table public.evidence            enable row level security;
alter table public.tips                enable row level security;
alter table public.community_feed      enable row level security;
alter table public.documents_needed    enable row level security;
alter table public.budget_lines        enable row level security;
alter table public.offices             enable row level security;
alter table public.categories          enable row level security;
alter table public.verifiers           enable row level security;
alter table public.guide_verifications enable row level security;
alter table public.related_guides      enable row level security;

-- Public read (no auth required for MVP read path)
create policy "public_read_guides"      on public.guides              for select using (published = true);
create policy "public_read_steps"       on public.steps               for select using (true);
create policy "public_read_evidence"    on public.evidence            for select using (published = true);
create policy "public_read_tips"        on public.tips                for select using (true);
create policy "public_read_feed"        on public.community_feed      for select using (true);
create policy "public_read_docs"        on public.documents_needed    for select using (true);
create policy "public_read_budget"      on public.budget_lines        for select using (true);
create policy "public_read_offices"     on public.offices             for select using (true);
create policy "public_read_categories"  on public.categories          for select using (true);
create policy "public_read_verifiers"   on public.verifiers           for select using (true);
create policy "public_read_verif_join"  on public.guide_verifications for select using (true);
create policy "public_read_related"     on public.related_guides      for select using (true);
