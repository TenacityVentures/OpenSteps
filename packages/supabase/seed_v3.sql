-- ============================================================
-- OpenSteps — Seed v3: Comprehensive test data for all features
-- Run AFTER seed.sql, seed_v2.sql, and migration_v2.sql.
--
-- What this seeds:
--   • 8 test auth users  (password for all: Test1234!)
--   • 8 verifier profiles (1 editor + 7 verifiers / contributors)
--   • 4 new pending guides in different verification states
--   • 15 guide verifications across published + pending guides
--     (populates leaderboard; guide 9 sits at 4/5 → one click away from auto-publish)
--   • 3 edit requests — pending / approved / rejected
--   • 11 tips on existing published + pending guides with explicit IDs
--   • 16 tip upvotes (trigger auto-syncs tips.upvotes)
--   • 14 community feed events (contribute / verify / flag / edit)
--
-- ──────────────────────────────────────────────────────────────
-- TEST ACCOUNTS  (email / password)
-- ──────────────────────────────────────────────────────────────
--   editor@test.opensteps.app  / Test1234!  — role: editor
--   alice@test.opensteps.app   / Test1234!  — verifier (domains: business, health)
--   bob@test.opensteps.app     / Test1234!  — verifier (domains: transport, travel)
--   carol@test.opensteps.app   / Test1234!  — verifier (domains: id, tax)
--   dave@test.opensteps.app    / Test1234!  — verifier (domain: property)
--   eve@test.opensteps.app     / Test1234!  — verifier (domain: education)
--   frank@test.opensteps.app   / Test1234!  — contributor (1 guide submitted, pending)
--   grace@test.opensteps.app   / Test1234!  — contributor (1 guide submitted, pending)
-- ──────────────────────────────────────────────────────────────
-- GUIDE VERIFICATION STATES (for testing the verify queue)
-- ──────────────────────────────────────────────────────────────
--   Guide 9  (Open a Bank Account)          — 4/5 verifications → auto-publishes on next verify
--   Guide 10 (Get a Motorbike Licence)      — 2/5 verifications → verify button active
--   Guide 11 (Register a Trademark)         — 0/5 verifications → fresh, editable inline
--   Guide 12 (Apply for Police Clearance)   — 0/5 verifications → flagged in feed
-- ──────────────────────────────────────────────────────────────
-- EDIT REQUEST STATES
-- ──────────────────────────────────────────────────────────────
--   edit_requests[1]  — pending   (guide 1 · requested by alice)
--   edit_requests[2]  — approved  (guide 8 · approved by editor → guide 8 now unpublished)
--   edit_requests[3]  — rejected  (guide 3 · rejected by editor)
-- ============================================================


-- ═══════════════════════════════════════════════════════════════════════
-- 1. TEST AUTH USERS
--    The handle_new_user trigger won't fire for direct inserts,
--    so we also insert verifier profiles manually in section 2.
-- ═══════════════════════════════════════════════════════════════════════

INSERT INTO auth.users (
  id, instance_id, aud, role,
  email, encrypted_password, email_confirmed_at,
  raw_user_meta_data, raw_app_meta_data,
  created_at, updated_at,
  confirmation_token, recovery_token,
  email_change_token_new, email_change
) VALUES
  (
    'aa000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    'editor@test.opensteps.app', crypt('Test1234!', gen_salt('bf')), now(),
    '{"display_name":"Admin Editor"}'::jsonb,
    '{"provider":"email","providers":["email"]}'::jsonb,
    now() - interval '30 days', now() - interval '1 day',
    '', '', '', ''
  ),
  (
    'aa000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    'alice@test.opensteps.app', crypt('Test1234!', gen_salt('bf')), now(),
    '{"display_name":"Alice Kamara"}'::jsonb,
    '{"provider":"email","providers":["email"]}'::jsonb,
    now() - interval '25 days', now() - interval '2 days',
    '', '', '', ''
  ),
  (
    'aa000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    'bob@test.opensteps.app', crypt('Test1234!', gen_salt('bf')), now(),
    '{"display_name":"Bob Johnson"}'::jsonb,
    '{"provider":"email","providers":["email"]}'::jsonb,
    now() - interval '20 days', now() - interval '3 days',
    '', '', '', ''
  ),
  (
    'aa000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    'carol@test.opensteps.app', crypt('Test1234!', gen_salt('bf')), now(),
    '{"display_name":"Carol Williams"}'::jsonb,
    '{"provider":"email","providers":["email"]}'::jsonb,
    now() - interval '18 days', now() - interval '1 day',
    '', '', '', ''
  ),
  (
    'aa000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    'dave@test.opensteps.app', crypt('Test1234!', gen_salt('bf')), now(),
    '{"display_name":"Dave Conteh"}'::jsonb,
    '{"provider":"email","providers":["email"]}'::jsonb,
    now() - interval '15 days', now() - interval '4 days',
    '', '', '', ''
  ),
  (
    'aa000000-0000-0000-0000-000000000006',
    '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    'eve@test.opensteps.app', crypt('Test1234!', gen_salt('bf')), now(),
    '{"display_name":"Eve Koroma"}'::jsonb,
    '{"provider":"email","providers":["email"]}'::jsonb,
    now() - interval '10 days', now() - interval '5 days',
    '', '', '', ''
  ),
  (
    'aa000000-0000-0000-0000-000000000007',
    '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    'frank@test.opensteps.app', crypt('Test1234!', gen_salt('bf')), now(),
    '{"display_name":"Frank Bangura"}'::jsonb,
    '{"provider":"email","providers":["email"]}'::jsonb,
    now() - interval '7 days', now() - interval '7 days',
    '', '', '', ''
  ),
  (
    'aa000000-0000-0000-0000-000000000008',
    '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    'grace@test.opensteps.app', crypt('Test1234!', gen_salt('bf')), now(),
    '{"display_name":"Grace Sesay"}'::jsonb,
    '{"provider":"email","providers":["email"]}'::jsonb,
    now() - interval '5 days', now() - interval '5 days',
    '', '', '', ''
  )
ON CONFLICT (id) DO NOTHING;

-- Email provider identities (required for password sign-in to work)
INSERT INTO auth.identities (
  id, user_id, provider_id, identity_data, provider,
  last_sign_in_at, created_at, updated_at
) VALUES
  ('bb000000-0000-0000-0000-000000000001',
   'aa000000-0000-0000-0000-000000000001', 'editor@test.opensteps.app',
   '{"sub":"aa000000-0000-0000-0000-000000000001","email":"editor@test.opensteps.app","email_verified":true,"phone_verified":false}'::jsonb,
   'email', now(), now(), now()),
  ('bb000000-0000-0000-0000-000000000002',
   'aa000000-0000-0000-0000-000000000002', 'alice@test.opensteps.app',
   '{"sub":"aa000000-0000-0000-0000-000000000002","email":"alice@test.opensteps.app","email_verified":true,"phone_verified":false}'::jsonb,
   'email', now(), now(), now()),
  ('bb000000-0000-0000-0000-000000000003',
   'aa000000-0000-0000-0000-000000000003', 'bob@test.opensteps.app',
   '{"sub":"aa000000-0000-0000-0000-000000000003","email":"bob@test.opensteps.app","email_verified":true,"phone_verified":false}'::jsonb,
   'email', now(), now(), now()),
  ('bb000000-0000-0000-0000-000000000004',
   'aa000000-0000-0000-0000-000000000004', 'carol@test.opensteps.app',
   '{"sub":"aa000000-0000-0000-0000-000000000004","email":"carol@test.opensteps.app","email_verified":true,"phone_verified":false}'::jsonb,
   'email', now(), now(), now()),
  ('bb000000-0000-0000-0000-000000000005',
   'aa000000-0000-0000-0000-000000000005', 'dave@test.opensteps.app',
   '{"sub":"aa000000-0000-0000-0000-000000000005","email":"dave@test.opensteps.app","email_verified":true,"phone_verified":false}'::jsonb,
   'email', now(), now(), now()),
  ('bb000000-0000-0000-0000-000000000006',
   'aa000000-0000-0000-0000-000000000006', 'eve@test.opensteps.app',
   '{"sub":"aa000000-0000-0000-0000-000000000006","email":"eve@test.opensteps.app","email_verified":true,"phone_verified":false}'::jsonb,
   'email', now(), now(), now()),
  ('bb000000-0000-0000-0000-000000000007',
   'aa000000-0000-0000-0000-000000000007', 'frank@test.opensteps.app',
   '{"sub":"aa000000-0000-0000-0000-000000000007","email":"frank@test.opensteps.app","email_verified":true,"phone_verified":false}'::jsonb,
   'email', now(), now(), now()),
  ('bb000000-0000-0000-0000-000000000008',
   'aa000000-0000-0000-0000-000000000008', 'grace@test.opensteps.app',
   '{"sub":"aa000000-0000-0000-0000-000000000008","email":"grace@test.opensteps.app","email_verified":true,"phone_verified":false}'::jsonb,
   'email', now(), now(), now())
ON CONFLICT (provider_id, provider) DO NOTHING;


-- ═══════════════════════════════════════════════════════════════════════
-- 2. VERIFIER PROFILES
--    verification_count reflects all-time history (not just rows below).
--    The leaderboard reads this column directly.
-- ═══════════════════════════════════════════════════════════════════════

INSERT INTO public.verifiers (
  id, display_name, role, verification_count, accuracy_pct,
  domains, streak_weeks, location, created_at
) VALUES
  ('aa000000-0000-0000-0000-000000000001', 'Admin Editor',   'editor',   45, 98,
   '{business,health,education,transport}', 8,  'Freetown', now() - interval '30 days'),
  ('aa000000-0000-0000-0000-000000000002', 'Alice Kamara',   'verifier', 23, 91,
   '{business,health}',                    5,  'Freetown', now() - interval '25 days'),
  ('aa000000-0000-0000-0000-000000000003', 'Bob Johnson',    'verifier', 18, 88,
   '{transport,travel}',                   4,  'Freetown', now() - interval '20 days'),
  ('aa000000-0000-0000-0000-000000000004', 'Carol Williams', 'verifier', 12, 95,
   '{id,tax}',                             3,  'Freetown', now() - interval '18 days'),
  ('aa000000-0000-0000-0000-000000000005', 'Dave Conteh',    'verifier',  8, 85,
   '{property}',                           2,  'Bo',       now() - interval '15 days'),
  ('aa000000-0000-0000-0000-000000000006', 'Eve Koroma',     'verifier',  5, 80,
   '{education}',                          1,  'Kenema',   now() - interval '10 days'),
  ('aa000000-0000-0000-0000-000000000007', 'Frank Bangura',  'verifier',  1, 100,
   '{business}',                           0,  'Freetown', now() - interval '7 days'),
  ('aa000000-0000-0000-0000-000000000008', 'Grace Sesay',    'verifier',  0,   0,
   '{}',                                   0,  'Makeni',   now() - interval '5 days')
ON CONFLICT (id) DO UPDATE
  SET display_name       = EXCLUDED.display_name,
      role               = EXCLUDED.role,
      verification_count = EXCLUDED.verification_count,
      accuracy_pct       = EXCLUDED.accuracy_pct,
      domains            = EXCLUDED.domains,
      streak_weeks       = EXCLUDED.streak_weeks,
      location           = EXCLUDED.location;


-- ═══════════════════════════════════════════════════════════════════════
-- 3. PENDING GUIDES (4 guides, 4 different verification states)
-- ═══════════════════════════════════════════════════════════════════════

-- ── Guide 9: Open a Bank Account (4/5 verifications — auto-publishes on next) ──
INSERT INTO public.guides (
  id, title, slug, category, country, description,
  steps_count, total_cost, duration_days, trust_score, language,
  follower_count, last_verified_at, published
) VALUES (
  '10000000-0000-0000-0000-000000000009',
  'Open a Bank Account',
  'open-a-bank-account',
  'business', 'sl',
  'How to open a personal or business bank account at a commercial bank in Sierra Leone. Covers eligibility, required documents, minimum deposit, and activation. Demonstrated at Union Trust Bank (UTB) — the process is similar at Rokel Commercial Bank and Sierra Leone Commercial Bank.',
  4, 30000, '[1,2]', 0.0,
  '{en}', 0, null, false
);

INSERT INTO public.steps (id, guide_id, n, title, description, cost, office, office_id, day) VALUES
  ('20000000-0000-0000-0000-000000000050',
   '10000000-0000-0000-0000-000000000009', 1,
   'Choose a bank and confirm eligibility',
   'Decide which bank suits your needs. UTB, Rokel, SLCB, and Guaranty Trust Bank are the main options. Most require: be 18+ years old (a parent/guardian can co-sign for minors), a valid national ID, and a Sierra Leone address. Business accounts additionally require your CAC business registration certificate.',
   0, null, null, 1),

  ('20000000-0000-0000-0000-000000000051',
   '10000000-0000-0000-0000-000000000009', 2,
   'Gather required documents',
   'Personal account: national ID card (or NIN slip + one form of supporting ID such as a voter ID or passport), two recent passport photos, and proof of address (utility bill, tenancy agreement, or employer letter dated within 3 months). Business account: additionally bring your CAC certificate and TIN from NRA.',
   0, null, null, 1),

  ('20000000-0000-0000-0000-000000000052',
   '10000000-0000-0000-0000-000000000009', 3,
   'Visit the branch and complete the account-opening form',
   'Go to your chosen bank branch. Ask for the personal or business account opening form at the customer service desk. Fill in all sections, attach your documents, and submit to the account-opening officer. They will verify your ID and take your biometric data (fingerprints + photo) on-site.',
   0, 'Union Trust Bank (UTB)', null, 1),

  ('20000000-0000-0000-0000-000000000053',
   '10000000-0000-0000-0000-000000000009', 4,
   'Make the initial deposit and activate your account',
   'Most banks require a minimum opening deposit: UTB requires Le 20,000 for a savings account, Le 50,000 for a current account. Pay at the teller counter. Your account number is issued immediately. Your ATM debit card is printed within 24–48 hours; collect it at the same branch or request home delivery for an extra fee.',
   30000, 'Union Trust Bank (UTB)', null, 2);

INSERT INTO public.documents_needed (guide_id, step_id, label, required) VALUES
  ('10000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000051', 'National ID card or NIN slip', true),
  ('10000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000051', 'Two recent passport photos', true),
  ('10000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000051', 'Proof of address (utility bill or tenancy agreement)', true),
  ('10000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000051', 'CAC certificate (business accounts only)', false);

INSERT INTO public.budget_lines (guide_id, step_id, label, amount, office, payment_type) VALUES
  ('10000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000053', 'Minimum opening deposit (savings)', 20000, 'Bank teller', 'cash'),
  ('10000000-0000-0000-0000-000000000009', null, 'Passport photos', 10000, 'Photo studio', 'cash');


-- ── Guide 10: Get a Motorbike Licence (2/5 verifications) ──────────────
INSERT INTO public.guides (
  id, title, slug, category, country, description,
  steps_count, total_cost, duration_days, trust_score, language,
  follower_count, last_verified_at, published
) VALUES (
  '10000000-0000-0000-0000-000000000010',
  'Get a Motorcycle Licence',
  'get-a-motorcycle-licence',
  'transport', 'sl',
  'How to obtain a Sierra Leone motorcycle (category A) driver''s licence. The process is similar to a standard car licence but uses a shorter practical test route. Required by law for all commercial okada (motorcycle taxi) and personal motorbike riders.',
  4, 165000, '[2,4]', 0.0,
  '{en}', 0, null, false
);

INSERT INTO public.steps (id, guide_id, n, title, description, cost, office, office_id, day) VALUES
  ('20000000-0000-0000-0000-000000000060',
   '10000000-0000-0000-0000-000000000010', 1,
   'Complete the eye test at a registered clinic',
   'Same as the car licence: visit any registered clinic or optician for a basic eye-test certificate. The DVLA minimum eyesight standard applies equally to motorcycle riders. This costs approximately Le 20,000–30,000 at most clinics.',
   25000, 'Registered clinic / optician', null, 1),

  ('20000000-0000-0000-0000-000000000061',
   '10000000-0000-0000-0000-000000000010', 2,
   'Collect the motorcycle licence application form (Form DL1-M)',
   'Visit the DVLA on Wilkinson Road and request the motorcycle application form (DL1-M). Attach your eye-test certificate, two passport photos, national ID or NIN slip, and pay the learner fee of Le 40,000 at the designated bank counter before submitting.',
   40000, 'DVLA · Freetown', '00000000-0000-0000-0000-000000000006', 1),

  ('20000000-0000-0000-0000-000000000062',
   '10000000-0000-0000-0000-000000000010', 3,
   'Pass the written knowledge test',
   'The motorcycle written test is the same Highway Code test as for cars. Pass score is 70%. You may sit the test the same day as your form submission if space permits, otherwise book a date. The test is free — no additional fee applies.',
   0, 'DVLA · Freetown', '00000000-0000-0000-0000-000000000006', 2),

  ('20000000-0000-0000-0000-000000000063',
   '10000000-0000-0000-0000-000000000010', 4,
   'Pass the practical test and collect your licence',
   'The motorcycle practical test is conducted on a short closed course near the DVLA compound. The examiner checks: balance, slow-speed control, emergency braking, and basic road manoeuvres. After passing, pay the full motorcycle licence fee of Le 100,000 at the bank and collect your licence (usually same or next working day).',
   100000, 'DVLA · Freetown', '00000000-0000-0000-0000-000000000006', 3);

INSERT INTO public.documents_needed (guide_id, step_id, label, required) VALUES
  ('10000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000061', 'Eye test / medical certificate', true),
  ('10000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000061', 'National ID card or NIN slip', true),
  ('10000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000061', 'Two recent passport photos (white background)', true),
  ('10000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000061', 'Bank teller for learner fee', true);

INSERT INTO public.budget_lines (guide_id, step_id, label, amount, office, payment_type) VALUES
  ('10000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000060', 'Eye / medical test fee', 25000, 'Clinic', 'cash'),
  ('10000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000061', 'Learner motorcycle licence fee', 40000, 'Bank', 'bank'),
  ('10000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000064', 'Full motorcycle licence fee', 100000, 'Bank', 'bank'),
  ('10000000-0000-0000-0000-000000000010', null, 'Passport photos', 15000, 'Photo studio', 'cash');


-- ── Guide 11: Register a Trademark (0 verifications — fresh, editable) ─
INSERT INTO public.guides (
  id, title, slug, category, country, description,
  steps_count, total_cost, duration_days, trust_score, language,
  follower_count, last_verified_at, published
) VALUES (
  '10000000-0000-0000-0000-000000000011',
  'Register a Trademark',
  'register-a-trademark',
  'business', 'sl',
  'How to register a brand name, logo, or slogan as a trademark with the Office of Administrator and Registrar General (OARG) in Sierra Leone. A registered trademark gives you exclusive rights to use the mark commercially and provides legal recourse against infringement.',
  3, 850000, '[30,60]', 0.0,
  '{en}', 0, null, false
);

INSERT INTO public.steps (id, guide_id, n, title, description, cost, office, office_id, day) VALUES
  ('20000000-0000-0000-0000-000000000070',
   '10000000-0000-0000-0000-000000000011', 1,
   'Conduct a trademark search',
   'Before filing, search the OARG trademark register to confirm your proposed mark is not already registered by another party. Visit the OARG office on Walpole Street or use their online portal. The search fee is Le 200,000. If a conflicting mark exists, you will need to modify your mark or choose a different one.',
   200000, 'Office of Administrator and Registrar General (OARG)', '00000000-0000-0000-0000-000000000010', 1),

  ('20000000-0000-0000-0000-000000000071',
   '10000000-0000-0000-0000-000000000011', 2,
   'File the trademark application',
   'Complete Form TM1 (Trademark Application) with: your full name and address, a clear representation of the mark (image or word), and the class(es) of goods or services you want to cover (use the Nice Classification system). Submit with: a certified copy of your business registration, your national ID, and the prescribed application fee. OARG will issue an application reference number.',
   500000, 'Office of Administrator and Registrar General (OARG)', '00000000-0000-0000-0000-000000000010', 2),

  ('20000000-0000-0000-0000-000000000072',
   '10000000-0000-0000-0000-000000000011', 3,
   'Await examination, publication, and registration',
   'OARG will examine your application (typically 2–4 weeks). If approved, the mark is published in the Official Gazette for 60 days to allow third-party opposition. If no opposition is filed, the Registration Certificate is issued. The full process takes 3–6 months. Pay the final registration fee of Le 150,000 on collection.',
   150000, 'Office of Administrator and Registrar General (OARG)', '00000000-0000-0000-0000-000000000010', 30);

INSERT INTO public.documents_needed (guide_id, step_id, label, required) VALUES
  ('10000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000071', 'Completed Form TM1', true),
  ('10000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000071', 'Clear representation of the mark (image / word)', true),
  ('10000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000071', 'CAC business registration certificate', true),
  ('10000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000071', 'National ID card', true);

INSERT INTO public.budget_lines (guide_id, step_id, label, amount, office, payment_type) VALUES
  ('10000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000070', 'Trademark search fee', 200000, 'OARG', 'cash'),
  ('10000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000071', 'Application filing fee', 500000, 'OARG', 'cash'),
  ('10000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000072', 'Registration certificate fee', 150000, 'OARG', 'cash');


-- ── Guide 12: Apply for Police Clearance (0 verifications — flagged) ───
INSERT INTO public.guides (
  id, title, slug, category, country, description,
  steps_count, total_cost, duration_days, trust_score, language,
  follower_count, last_verified_at, published
) VALUES (
  '10000000-0000-0000-0000-000000000012',
  'Apply for a Police Clearance Certificate',
  'apply-for-police-clearance',
  'id', 'sl',
  'How to obtain a Police Clearance Certificate (PCC) from the Sierra Leone Police (SLP). A PCC is required for many jobs, visa applications, and higher education admissions. It confirms that the applicant has no criminal record on file.',
  3, 75000, '[5,10]', 0.0,
  '{en}', 0, null, false
);

INSERT INTO public.steps (id, guide_id, n, title, description, cost, office, office_id, day) VALUES
  ('20000000-0000-0000-0000-000000000080',
   '10000000-0000-0000-0000-000000000012', 1,
   'Obtain and complete the application form',
   'Visit the Criminal Investigation Department (CID) at the Sierra Leone Police HQ, Siaka Stevens Street, Freetown. Request the PCC application form and complete it with: your full legal name, date of birth, current address, NIN, and the purpose of the certificate. No appointment is needed.',
   0, 'Sierra Leone Police HQ — CID', null, 1),

  ('20000000-0000-0000-0000-000000000081',
   '10000000-0000-0000-0000-000000000012', 2,
   'Pay the processing fee and submit your fingerprints',
   'Pay Le 50,000 at the SLP accounts office. Return to CID with your payment receipt, national ID, and two passport photos. An officer will take your fingerprints using the inkless biometric scanner. You will receive a reference slip confirming your application.',
   50000, 'Sierra Leone Police HQ — CID', null, 1),

  ('20000000-0000-0000-0000-000000000082',
   '10000000-0000-0000-0000-000000000012', 3,
   'Collect your certificate',
   'Return to the CID after 5–10 working days (the processing time varies). Bring your reference slip and national ID. The certificate is signed by the Inspector General of Police and carries the official SLP seal. If you need the certificate apostilled for use abroad, take it to the Ministry of Foreign Affairs for an additional fee.',
   25000, 'Sierra Leone Police HQ — CID', null, 7);

INSERT INTO public.documents_needed (guide_id, step_id, label, required) VALUES
  ('10000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000081', 'National ID card or NIN slip', true),
  ('10000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000081', 'Two recent passport photos', true),
  ('10000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000081', 'Payment receipt (Le 50,000)', true),
  ('10000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000082', 'Reference slip from CID', true);

INSERT INTO public.budget_lines (guide_id, step_id, label, amount, office, payment_type) VALUES
  ('10000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000081', 'PCC processing fee', 50000, 'SLP accounts office', 'cash'),
  ('10000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000082', 'Apostille fee (if required for foreign use)', 25000, 'Ministry of Foreign Affairs', 'cash'),
  ('10000000-0000-0000-0000-000000000012', null, 'Passport photos', 15000, 'Photo studio', 'cash');


-- ═══════════════════════════════════════════════════════════════════════
-- 4. GUIDE VERIFICATIONS
--    Verifications on published guides populate the leaderboard.
--    Verifications on pending guides test the verify button + auto-publish.
--    Guide 9 has 4 rows → one more click from any test user triggers auto-publish.
--    Note: the check_auto_publish trigger fires on each insert.
-- ═══════════════════════════════════════════════════════════════════════

-- Published guides (for leaderboard history)
INSERT INTO public.guide_verifications (guide_id, verifier_id, verified_at) VALUES
  -- Guide 1 (Register a Business) — alice, bob, carol
  ('10000000-0000-0000-0000-000000000001', 'aa000000-0000-0000-0000-000000000002', now() - interval '22 days'),
  ('10000000-0000-0000-0000-000000000001', 'aa000000-0000-0000-0000-000000000003', now() - interval '21 days'),
  ('10000000-0000-0000-0000-000000000001', 'aa000000-0000-0000-0000-000000000004', now() - interval '20 days'),

  -- Guide 2 (Driver's Licence) — dave, eve
  ('10000000-0000-0000-0000-000000000002', 'aa000000-0000-0000-0000-000000000005', now() - interval '12 days'),
  ('10000000-0000-0000-0000-000000000002', 'aa000000-0000-0000-0000-000000000006', now() - interval '11 days'),

  -- Guide 3 (Passport) — carol, dave
  ('10000000-0000-0000-0000-000000000003', 'aa000000-0000-0000-0000-000000000004', now() - interval '10 days'),
  ('10000000-0000-0000-0000-000000000003', 'aa000000-0000-0000-0000-000000000005', now() - interval '9 days'),

  -- Guide 5 (Tax) — alice
  ('10000000-0000-0000-0000-000000000005', 'aa000000-0000-0000-0000-000000000002', now() - interval '8 days'),

  -- Guide 6 (NASSIT) — bob
  ('10000000-0000-0000-0000-000000000006', 'aa000000-0000-0000-0000-000000000003', now() - interval '7 days')

ON CONFLICT (guide_id, verifier_id) DO NOTHING;

-- Pending guide 9 — 4 verifications with notes (ready for auto-publish)
INSERT INTO public.guide_verifications (guide_id, verifier_id, verified_at, note) VALUES
  ('10000000-0000-0000-0000-000000000009', 'aa000000-0000-0000-0000-000000000002',
   now() - interval '5 days',
   'Confirmed with UTB customer service — minimum deposit and process is accurate as of April 2026.'),
  ('10000000-0000-0000-0000-000000000009', 'aa000000-0000-0000-0000-000000000003',
   now() - interval '4 days',
   'I went through this process myself last month. Steps 1–3 are correct. Step 4 timing: my card was ready in 24 hours.'),
  ('10000000-0000-0000-0000-000000000009', 'aa000000-0000-0000-0000-000000000004',
   now() - interval '3 days',
   'Document list is accurate. Worth noting that GTBank also accepts the same documents if UTB is too crowded.'),
  ('10000000-0000-0000-0000-000000000009', 'aa000000-0000-0000-0000-000000000005',
   now() - interval '2 days',
   'Verified. The Le 20,000 minimum savings deposit figure is correct for 2026.')
ON CONFLICT (guide_id, verifier_id) DO NOTHING;

-- Pending guide 10 — 2 verifications
INSERT INTO public.guide_verifications (guide_id, verifier_id, verified_at, note) VALUES
  ('10000000-0000-0000-0000-000000000010', 'aa000000-0000-0000-0000-000000000002',
   now() - interval '3 days',
   'Confirmed with a friend who got his okada licence in Jan 2026. Fees match exactly.'),
  ('10000000-0000-0000-0000-000000000010', 'aa000000-0000-0000-0000-000000000003',
   now() - interval '2 days',
   'Process is accurate. The practical test route is genuinely shorter than the car route — takes about 10 minutes.')
ON CONFLICT (guide_id, verifier_id) DO NOTHING;


-- ═══════════════════════════════════════════════════════════════════════
-- 5. EDIT REQUESTS
--    Tests: pending edit request badge in admin panel, approve/reject actions,
--    approved request unpublishing guide 8, dashboard edit request history.
-- ═══════════════════════════════════════════════════════════════════════

INSERT INTO public.edit_requests (
  id, guide_id, requester_id, reason, status, reviewed_by, reviewed_at, created_at
) VALUES
  -- Pending: alice requests edit of "Register a Business"
  (
    '40000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'aa000000-0000-0000-0000-000000000002',
    'Step 3 filing fee is outdated — NRA increased the business registration fee to Le 95,000 in early 2026. The guide still shows Le 80,000. Also the Rokel Bank queue times are now longer than stated.',
    'pending',
    null, null,
    now() - interval '2 days'
  ),
  -- Approved: bob''s edit of "Transfer Land Title" — editor approved → guide unpublished
  (
    '40000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000008',
    'aa000000-0000-0000-0000-000000000003',
    'Step 5 (OARG Registration) no longer requires a solicitor to be present in person — a power of attorney is now accepted. This is a significant change from 2025. Would like to update with current procedure.',
    'approved',
    'aa000000-0000-0000-0000-000000000001',
    now() - interval '1 day',
    now() - interval '3 days'
  ),
  -- Rejected: carol''s edit of "Apply for a Passport"
  (
    '40000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000003',
    'aa000000-0000-0000-0000-000000000004',
    'The express processing fee should be Le 750,000 not Le 600,000 based on my recent experience.',
    'rejected',
    'aa000000-0000-0000-0000-000000000001',
    now() - interval '12 hours',
    now() - interval '4 days'
  )
ON CONFLICT (id) DO NOTHING;

-- Approved edit request unpublishes guide 8 (Transfer Land Title)
UPDATE public.guides
SET published = false
WHERE id = '10000000-0000-0000-0000-000000000008';


-- ═══════════════════════════════════════════════════════════════════════
-- 6. TIPS ON EXISTING GUIDES (with explicit UUIDs for upvote seeding)
--    author_id links to test users so their dashboards show the tips.
--    upvotes start at 0; tip_upvotes inserts in section 7 trigger the sync.
-- ═══════════════════════════════════════════════════════════════════════

INSERT INTO public.tips (id, guide_id, step_id, author_id, text, upvotes, created_at) VALUES
  -- Guide 1: Register a Business — alice, bob
  ('30000000-0000-0000-0000-000000000100',
   '10000000-0000-0000-0000-000000000001', null,
   'aa000000-0000-0000-0000-000000000002',
   'Visit the CAC office early in the week — Mondays can be crowded from weekend backlogs but Tuesday morning is usually fast.',
   0, now() - interval '20 days'),

  ('30000000-0000-0000-0000-000000000101',
   '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000003',
   'aa000000-0000-0000-0000-000000000003',
   'Bring both the original teller slip AND a photocopy. CAC keeps the original and having a copy saves a return trip to the bank.',
   0, now() - interval '18 days'),

  -- Guide 2: Driver's Licence — carol
  ('30000000-0000-0000-0000-000000000102',
   '10000000-0000-0000-0000-000000000002', null,
   'aa000000-0000-0000-0000-000000000004',
   'The DVLA written test is held at 10 am and 2 pm only — confirm the time at the counter when you arrive.',
   0, now() - interval '15 days'),

  -- Guide 3: Passport — dave
  ('30000000-0000-0000-0000-000000000103',
   '10000000-0000-0000-0000-000000000003', null,
   'aa000000-0000-0000-0000-000000000005',
   'The Le 600,000 express option is genuinely worth it if you need the passport in under 2 weeks. Standard processing took 16 working days for me.',
   0, now() - interval '12 days'),

  -- Guide 4: NIN — eve
  ('30000000-0000-0000-0000-000000000104',
   '10000000-0000-0000-0000-000000000004', null,
   'aa000000-0000-0000-0000-000000000006',
   'Some NATCOM centres have much shorter queues than the Siaka Stevens HQ. The Lumley branch and Waterloo branch are both faster in our experience.',
   0, now() - interval '10 days'),

  -- Guide 5: Income Tax — alice
  ('30000000-0000-0000-0000-000000000105',
   '10000000-0000-0000-0000-000000000005', null,
   'aa000000-0000-0000-0000-000000000002',
   'Keep a digital and a physical copy of your TIN certificate — every subsequent NRA submission asks for it. NRA can re-issue but it takes 2 weeks.',
   0, now() - interval '9 days'),

  -- Guide 6: NASSIT — bob
  ('30000000-0000-0000-0000-000000000106',
   '10000000-0000-0000-0000-000000000006', null,
   'aa000000-0000-0000-0000-000000000003',
   'You can register at any NASSIT office nationwide — the Koidu and Bo branches handle all the same processes as Freetown HQ.',
   0, now() - interval '8 days'),

  -- Guide 7: FBC — carol
  ('30000000-0000-0000-0000-000000000107',
   '10000000-0000-0000-0000-000000000007', null,
   'aa000000-0000-0000-0000-000000000004',
   'The Admissions Office closes for lunch from 1–2 pm and is very strict about it. Arrive before 11:30 am to be safe.',
   0, now() - interval '6 days'),

  -- Guide 9: Open a Bank Account (pending) — frank (the contributor)
  ('30000000-0000-0000-0000-000000000108',
   '10000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000053',
   'aa000000-0000-0000-0000-000000000007',
   'UTB offers a free student account with no minimum balance if you bring your student ID. Not advertised but worth asking at the counter.',
   0, now() - interval '6 days'),

  -- Guide 10: Motorcycle Licence (pending) — grace (the contributor)
  ('30000000-0000-0000-0000-000000000109',
   '10000000-0000-0000-0000-000000000010', null,
   'aa000000-0000-0000-0000-000000000008',
   'The motorcycle practical test route is genuinely shorter and simpler than the car route — most people who practise for a week or two pass on their first attempt.',
   0, now() - interval '4 days'),

  -- Guide 11: Trademark (pending, fresh — for editor inline edit testing) — alice
  ('30000000-0000-0000-0000-000000000110',
   '10000000-0000-0000-0000-000000000011', null,
   'aa000000-0000-0000-0000-000000000002',
   'OARG has an online portal (oarg.gov.sl) where you can start the trademark search without visiting in person — saves a trip if the mark turns out to be taken.',
   0, now() - interval '2 days')

ON CONFLICT (id) DO NOTHING;


-- ═══════════════════════════════════════════════════════════════════════
-- 7. TIP UPVOTES
--    The trg_tip_upvotes trigger auto-updates tips.upvotes on each insert.
--    Tests: upvote button toggle, optimistic UI, upvote count display.
-- ═══════════════════════════════════════════════════════════════════════

INSERT INTO public.tip_upvotes (tip_id, user_id, created_at) VALUES
  -- Tip 100 (alice on guide 1): bob, carol, dave upvote
  ('30000000-0000-0000-0000-000000000100', 'aa000000-0000-0000-0000-000000000003', now() - interval '19 days'),
  ('30000000-0000-0000-0000-000000000100', 'aa000000-0000-0000-0000-000000000004', now() - interval '18 days'),
  ('30000000-0000-0000-0000-000000000100', 'aa000000-0000-0000-0000-000000000005', now() - interval '17 days'),

  -- Tip 101 (bob on guide 1): alice, eve upvote
  ('30000000-0000-0000-0000-000000000101', 'aa000000-0000-0000-0000-000000000002', now() - interval '17 days'),
  ('30000000-0000-0000-0000-000000000101', 'aa000000-0000-0000-0000-000000000006', now() - interval '16 days'),

  -- Tip 102 (carol on guide 2): alice, bob, frank upvote
  ('30000000-0000-0000-0000-000000000102', 'aa000000-0000-0000-0000-000000000002', now() - interval '14 days'),
  ('30000000-0000-0000-0000-000000000102', 'aa000000-0000-0000-0000-000000000003', now() - interval '13 days'),
  ('30000000-0000-0000-0000-000000000102', 'aa000000-0000-0000-0000-000000000007', now() - interval '12 days'),

  -- Tip 103 (dave on guide 3): alice, bob upvote
  ('30000000-0000-0000-0000-000000000103', 'aa000000-0000-0000-0000-000000000002', now() - interval '11 days'),
  ('30000000-0000-0000-0000-000000000103', 'aa000000-0000-0000-0000-000000000003', now() - interval '10 days'),

  -- Tip 104 (eve on guide 4): alice, carol upvote
  ('30000000-0000-0000-0000-000000000104', 'aa000000-0000-0000-0000-000000000002', now() - interval '9 days'),
  ('30000000-0000-0000-0000-000000000104', 'aa000000-0000-0000-0000-000000000004', now() - interval '8 days'),

  -- Tip 105 (alice on guide 5): bob, carol upvote
  ('30000000-0000-0000-0000-000000000105', 'aa000000-0000-0000-0000-000000000003', now() - interval '8 days'),
  ('30000000-0000-0000-0000-000000000105', 'aa000000-0000-0000-0000-000000000004', now() - interval '7 days'),

  -- Tip 108 (frank on guide 9 — pending): alice, carol upvote
  ('30000000-0000-0000-0000-000000000108', 'aa000000-0000-0000-0000-000000000002', now() - interval '5 days'),
  ('30000000-0000-0000-0000-000000000108', 'aa000000-0000-0000-0000-000000000004', now() - interval '4 days')

ON CONFLICT (tip_id, user_id) DO NOTHING;


-- ═══════════════════════════════════════════════════════════════════════
-- 8. COMMUNITY FEED EVENTS
--    Drives: admin panel "Recent activity", home LiveFeedRail.
--    Types: contribute | verify | flag | edit
-- ═══════════════════════════════════════════════════════════════════════

INSERT INTO public.community_feed (type, guide_id, actor_id, description, created_at) VALUES
  -- Contributions (for frank/grace dashboard "My guides" section)
  ('contribute',
   '10000000-0000-0000-0000-000000000009',
   'aa000000-0000-0000-0000-000000000007',
   'Frank Bangura contributed a new guide: "Open a Bank Account"',
   now() - interval '7 days'),

  ('contribute',
   '10000000-0000-0000-0000-000000000010',
   'aa000000-0000-0000-0000-000000000008',
   'Grace Sesay contributed a new guide: "Get a Motorcycle Licence"',
   now() - interval '6 days'),

  ('contribute',
   '10000000-0000-0000-0000-000000000011',
   'aa000000-0000-0000-0000-000000000002',
   'Alice Kamara contributed a new guide: "Register a Trademark"',
   now() - interval '5 days'),

  ('contribute',
   '10000000-0000-0000-0000-000000000012',
   'aa000000-0000-0000-0000-000000000003',
   'Bob Johnson contributed a new guide: "Apply for a Police Clearance Certificate"',
   now() - interval '4 days'),

  -- Verifications on published guides
  ('verify',
   '10000000-0000-0000-0000-000000000001',
   'aa000000-0000-0000-0000-000000000002',
   'Alice Kamara verified "Register a Business"',
   now() - interval '22 days'),

  ('verify',
   '10000000-0000-0000-0000-000000000001',
   'aa000000-0000-0000-0000-000000000003',
   'Bob Johnson verified "Register a Business"',
   now() - interval '21 days'),

  ('verify',
   '10000000-0000-0000-0000-000000000002',
   'aa000000-0000-0000-0000-000000000005',
   'Dave Conteh verified "Get a Driver''s Licence"',
   now() - interval '12 days'),

  -- Verifications on pending guide 9 (4 verifications)
  ('verify',
   '10000000-0000-0000-0000-000000000009',
   'aa000000-0000-0000-0000-000000000002',
   'Alice Kamara verified "Open a Bank Account" (1/5)',
   now() - interval '5 days'),

  ('verify',
   '10000000-0000-0000-0000-000000000009',
   'aa000000-0000-0000-0000-000000000004',
   'Carol Williams verified "Open a Bank Account" (3/5)',
   now() - interval '3 days'),

  -- Flag: editor flagged guide 12 (Police Clearance)
  ('flag',
   '10000000-0000-0000-0000-000000000012',
   'aa000000-0000-0000-0000-000000000001',
   'Admin Editor flagged "Apply for a Police Clearance Certificate" — fee amount unverified, needs cross-check with SLP',
   now() - interval '3 days'),

  -- Edit request actions
  ('edit',
   '10000000-0000-0000-0000-000000000001',
   'aa000000-0000-0000-0000-000000000002',
   'Alice Kamara requested edits to "Register a Business" — NRA fee increase in 2026',
   now() - interval '2 days'),

  ('edit',
   '10000000-0000-0000-0000-000000000008',
   'aa000000-0000-0000-0000-000000000001',
   'Admin Editor approved edit request for "Transfer Land Title" — guide unpublished for revision',
   now() - interval '1 day'),

  ('edit',
   '10000000-0000-0000-0000-000000000003',
   'aa000000-0000-0000-0000-000000000001',
   'Admin Editor rejected edit request for "Apply for a Sierra Leone Passport" — fee is confirmed correct',
   now() - interval '12 hours'),

  -- Editor approve of Driver's Licence (shows in recent activity)
  ('verify',
   '10000000-0000-0000-0000-000000000002',
   'aa000000-0000-0000-0000-000000000001',
   'Admin Editor approved "Get a Driver''s Licence" — trust score set to 8.0',
   now() - interval '6 days');
