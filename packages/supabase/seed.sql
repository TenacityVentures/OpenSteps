-- ============================================================
-- OpenSteps — Seed data
-- Run AFTER schema.sql.
-- Seeds: "Register a Business" — the first complete guide.
-- ============================================================

-- ── Offices ──────────────────────────────────────────────────────────────
insert into public.offices (id, name, address, hours) values
  ('00000000-0000-0000-0000-000000000001', 'Corporate Affairs Commission (CAC)', 'Siaka Stevens Street, Freetown', 'Mon–Fri 9 am–4 pm'),
  ('00000000-0000-0000-0000-000000000002', 'Rokel Commercial Bank — Siaka Stevens Branch', 'Siaka Stevens Street, Freetown', 'Mon–Fri 8:30 am–3:30 pm'),
  ('00000000-0000-0000-0000-000000000003', 'National Revenue Authority (NRA)', '3 Gloucester Street, Freetown', 'Mon–Fri 9 am–4 pm'),
  ('00000000-0000-0000-0000-000000000004', 'NASSIT Head Office', '10 Wilkinson Road, Freetown', 'Mon–Fri 9 am–4 pm'),
  ('00000000-0000-0000-0000-000000000005', 'CAC Online Portal', 'cac.gov.sl', '24/7');

-- ── Guide ─────────────────────────────────────────────────────────────────
insert into public.guides (
  id, title, slug, category, description,
  total_cost, duration_days, trust_score, language,
  follower_count, last_verified_at, published
) values (
  '10000000-0000-0000-0000-000000000001',
  'Register a Business',
  'register-a-business',
  'business',
  'How to register a sole trader or limited company with the Corporate Affairs Commission (CAC) in Sierra Leone. Covers name reservation, form filing, fee payment, and certificate collection.',
  155000,
  '[2,3]',
  8.7,
  '{en}',
  1240,
  now() - interval '3 days',
  true
);

-- ── Steps ─────────────────────────────────────────────────────────────────
-- Step IDs for FK use in budget_lines and documents_needed
insert into public.steps (id, guide_id, n, title, description, cost, office, office_id, day) values
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 1,
   'Reserve your business name',
   'Search the CAC name register to confirm your preferred business name is available, then file a Name Reservation form (Form A1). The reservation is valid for 60 days. You can do this online at cac.gov.sl or at the CAC counter.',
   10000, 'CAC · online or Freetown', '00000000-0000-0000-0000-000000000005', 1),

  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 2,
   'Prepare and submit Form A',
   'Complete the Business Name Registration form (CAC-BN-01 Form A). You need: your national ID, two passport photos, your proposed business address, and a description of your business activities. Submit at the CAC office or upload via the online portal.',
   0, 'CAC · Freetown', '00000000-0000-0000-0000-000000000001', 1),

  ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 3,
   'Pay the filing fee',
   'Pay Le 80,000 into the CAC Escrow account at any commercial bank. Most people use Rokel Commercial Bank at the Siaka Stevens Street branch. Keep both copies of the teller slip — you need one for CAC and one for your records. Note: this rate was updated in early 2026; verify at the counter if filing later.',
   80000, 'Rokel Commercial Bank', '00000000-0000-0000-0000-000000000002', 1),

  ('20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', 4,
   'Submit teller slip and receive interim certificate',
   'Return to CAC with your completed Form A and the bank teller slip. A clerk will review and stamp your application. You receive an interim receipt that confirms your application is under review. Processing takes 1–2 working days.',
   0, 'CAC · Freetown', '00000000-0000-0000-0000-000000000001', 2),

  ('20000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000001', 5,
   'Collect your business registration certificate',
   'Return to CAC after 1–2 working days to collect your Certificate of Business Registration. Bring your interim receipt and a valid ID. The certificate includes your registration number, which you will need for the next steps.',
   5000, 'CAC · Freetown', '00000000-0000-0000-0000-000000000001', 3),

  ('20000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000001', 6,
   'Register for a Tax Identification Number (TIN)',
   'Take your CAC certificate to the National Revenue Authority to register for a TIN. The TIN is required for opening a business bank account, paying staff, and filing taxes. Registration is free and usually completed the same day.',
   0, 'NRA · Freetown', '00000000-0000-0000-0000-000000000003', 3),

  ('20000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000001', 7,
   'Register with NASSIT (if hiring employees)',
   'If you plan to hire any employees, register your business with the National Social Security and Insurance Trust (NASSIT). Registration is free. Both employer and employee contribute 10% and 5% of gross salary respectively each month. If you are a sole trader with no employees, this step is optional.',
   0, 'NASSIT · Freetown', '00000000-0000-0000-0000-000000000004', 3);

-- ── Documents needed ───────────────────────────────────────────────────────
insert into public.documents_needed (guide_id, step_id, label, required) values
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 'National ID card or passport', true),
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 'Two recent passport photos', true),
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 'Proof of business address (utility bill or tenancy agreement)', true),
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000003', 'Completed Form A (CAC-BN-01)', true),
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000004', 'Bank teller slip (original + copy)', true),
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000005', 'CAC interim receipt', true);

-- ── Budget lines ──────────────────────────────────────────────────────────
insert into public.budget_lines (guide_id, step_id, label, amount, office, payment_type) values
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Name reservation fee', 10000, 'CAC · online', 'bank'),
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000003', 'CAC registration filing fee', 80000, 'Rokel Commercial Bank', 'bank'),
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000005', 'Certificate collection fee', 5000, 'CAC · Freetown', 'cash'),
  ('10000000-0000-0000-0000-000000000001', null, 'Passport photos (2×)', 15000, 'Photo studio near CAC', 'cash'),
  ('10000000-0000-0000-0000-000000000001', null, 'Transport (2–3 trips)', 20000, 'Freetown local', 'cash'),
  ('10000000-0000-0000-0000-000000000001', null, 'Unofficial processing "gift" (optional)', 25000, null, 'unofficial');

-- ── Tips ──────────────────────────────────────────────────────────────────
insert into public.tips (guide_id, step_id, text, upvotes) values
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000003',
   'Go to the bank early — the CAC escrow queue at Rokel gets very long after 11 am. I arrived at 8:45 and was done by 9:30.', 47),

  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002',
   'Double-check your business name spelling on Form A before you submit. A single typo means paying to amend and waiting another day.', 38),

  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001',
   'The online portal (cac.gov.sl) works well for name reservation but is slow for form submission. If you have time, do step 1 online then go in person for step 2.', 29);

-- ── Community feed (seed with realistic events) ───────────────────────────
insert into public.community_feed (type, guide_id, description, created_at) values
  ('verify', '10000000-0000-0000-0000-000000000001', 'Amina M. verified Step 3 — fee confirmed at Le 80,000', now() - interval '2 hours'),
  ('edit',   '10000000-0000-0000-0000-000000000001', 'Foday K. updated the filing fee in Step 3 from Le 75,000 to Le 80,000', now() - interval '5 hours'),
  ('verify', '10000000-0000-0000-0000-000000000001', 'Isatu C. verified Step 5 — certificate still collected on day 3', now() - interval '1 day'),
  ('contribute', null, 'Editor Bash published a new guide: Driver''s Licence (coming soon)', now() - interval '2 days');
