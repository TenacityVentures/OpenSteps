-- ============================================================
-- OpenSteps — Seed v2: 7 additional Sierra Leone guides
-- Run AFTER seed.sql (and after migration_v2.sql).
-- All guides use country = 'sl' (the default).
-- ============================================================

-- ── Additional Offices ────────────────────────────────────────────────────
INSERT INTO public.offices (id, name, address, hours) VALUES
  ('00000000-0000-0000-0000-000000000006', 'Driver and Vehicle Licensing Authority (DVLA)', 'Wilkinson Road, Freetown', 'Mon–Fri 9 am–4 pm'),
  ('00000000-0000-0000-0000-000000000007', 'Sierra Leone Immigration Department', 'Siaka Stevens Street, Freetown', 'Mon–Fri 9 am–3 pm'),
  ('00000000-0000-0000-0000-000000000008', 'National Telecommunications Commission (NATCOM)', '7 Charlotte Street, Freetown', 'Mon–Fri 9 am–4 pm'),
  ('00000000-0000-0000-0000-000000000009', 'Fourah Bay College Admissions Office', 'Mount Aureol, Freetown', 'Mon–Fri 9 am–4 pm'),
  ('00000000-0000-0000-0000-000000000010', 'Office of Administrator and Registrar General (OARG)', 'Walpole Street, Freetown', 'Mon–Fri 9 am–4 pm'),
  ('00000000-0000-0000-0000-000000000011', 'Sierra Leone Roads Authority', 'Wilkinson Road, Freetown', 'Mon–Fri 9 am–4 pm')
ON CONFLICT (id) DO NOTHING;

-- ══════════════════════════════════════════════════════════════════════════
-- GUIDE 2: Get a Driver's Licence
-- ══════════════════════════════════════════════════════════════════════════
INSERT INTO public.guides (
  id, title, slug, category, country, description,
  steps_count, total_cost, duration_days, trust_score, language,
  follower_count, last_verified_at, published
) VALUES (
  '10000000-0000-0000-0000-000000000002',
  'Get a Driver''s Licence',
  'get-a-drivers-licence',
  'transport', 'sl',
  'How to obtain a Sierra Leone driver''s licence for the first time. Covers the eye test, written knowledge test, practical driving test, and collection at the DVLA office in Freetown.',
  6, 185000, '[3,5]', 7.8,
  '{en}', 890, now() - interval '5 days', true
);

INSERT INTO public.steps (id, guide_id, n, title, description, cost, office, office_id, day) VALUES
  ('20000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000002', 1,
   'Book a medical / eye test',
   'Visit any registered optician or clinic for a basic eye test. You need a certificate confirming your eyesight meets the DVLA minimum standard. This can be done at any clinic or hospital — Connaught is the most popular. Cost is usually Le 20,000–30,000.',
   25000, 'Registered clinic / optician', null, 1),

  ('20000000-0000-0000-0000-000000000009', '10000000-0000-0000-0000-000000000002', 2,
   'Collect and complete application forms',
   'Visit the DVLA office on Wilkinson Road to collect Form DL1 (Learner Driver Application). Fill in your personal details, attach your eye-test certificate, two passport photos, and a copy of your NIN slip or national ID.',
   0, 'DVLA · Freetown', '00000000-0000-0000-0000-000000000006', 1),

  ('20000000-0000-0000-0000-000000000010', '10000000-0000-0000-0000-000000000002', 3,
   'Pay the learner licence fee',
   'Pay Le 50,000 at the designated bank (usually Rokel Commercial Bank) into the DVLA account. Keep both copies of the teller. Return to DVLA with all documents and the teller to receive your provisional/learner licence.',
   50000, 'DVLA · Freetown', '00000000-0000-0000-0000-000000000006', 1),

  ('20000000-0000-0000-0000-000000000011', '10000000-0000-0000-0000-000000000002', 4,
   'Pass the written knowledge test',
   'Study the Sierra Leone Highway Code (available at DVLA for Le 10,000 or online). The written test covers road signs, right-of-way rules, and vehicle safety. It is multiple-choice and taken at the DVLA office. A pass score is 70%. If you fail, you may retake after one week.',
   10000, 'DVLA · Freetown', '00000000-0000-0000-0000-000000000006', 2),

  ('20000000-0000-0000-0000-000000000012', '10000000-0000-0000-0000-000000000002', 5,
   'Pass the practical driving test',
   'A DVLA examiner will assess your driving on a designated route near the DVLA office. The test includes: vehicle safety checks, moving off and stopping, junctions, roundabouts, and emergency stop. Book your practical test date when you receive your written test pass certificate.',
   0, 'DVLA · Freetown', '00000000-0000-0000-0000-000000000006', 3),

  ('20000000-0000-0000-0000-000000000013', '10000000-0000-0000-0000-000000000002', 6,
   'Pay the full licence fee and collect your licence',
   'After passing both tests, pay the full driver''s licence fee (Le 100,000) at the bank and return to DVLA. Your licence is usually printed and ready the same day or next working day. The licence is valid for 5 years.',
   100000, 'DVLA · Freetown', '00000000-0000-0000-0000-000000000006', 5);

INSERT INTO public.documents_needed (guide_id, step_id, label, required) VALUES
  ('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000009', 'Eye test / medical certificate', true),
  ('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000009', 'National ID card or NIN slip', true),
  ('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000009', 'Two recent passport photos (white background)', true),
  ('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000010', 'Bank teller slip for learner fee', true),
  ('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000013', 'Written test pass certificate', true),
  ('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000013', 'Practical test pass certificate', true);

INSERT INTO public.budget_lines (guide_id, step_id, label, amount, office, payment_type) VALUES
  ('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000008', 'Eye / medical test fee', 25000, 'Clinic', 'cash'),
  ('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000010', 'Learner licence fee', 50000, 'Bank', 'bank'),
  ('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000011', 'Highway code booklet', 10000, 'DVLA', 'cash'),
  ('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000013', 'Full licence fee', 100000, 'Bank', 'bank'),
  ('10000000-0000-0000-0000-000000000002', null, 'Passport photos', 15000, 'Photo studio', 'cash');

INSERT INTO public.tips (guide_id, step_id, text, upvotes) VALUES
  ('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000011',
   'The written test is straightforward if you study the Highway Code booklet thoroughly. Focus on road signs — those are the most common questions.', 31),
  ('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000010',
   'Go to the DVLA counter early (before 9 am). The queue builds up quickly and can run to 2–3 hours by midday.', 24),
  ('10000000-0000-0000-0000-000000000002', null,
   'Bring all your documents in a clear plastic folder. The DVLA officers will check everything at the gate before letting you join the queue.', 18);

-- ══════════════════════════════════════════════════════════════════════════
-- GUIDE 3: Apply for a Passport
-- ══════════════════════════════════════════════════════════════════════════
INSERT INTO public.guides (
  id, title, slug, category, country, description,
  steps_count, total_cost, duration_days, trust_score, language,
  follower_count, last_verified_at, published
) VALUES (
  '10000000-0000-0000-0000-000000000003',
  'Apply for a Sierra Leone Passport',
  'apply-for-a-passport',
  'travel', 'sl',
  'How to apply for a Sierra Leone biometric passport for the first time. Includes photo requirements, form submission at the Immigration Department, biometric capture, and collection. Processing takes 7–14 working days.',
  5, 450000, '[7,14]', 8.2,
  '{en}', 1560, now() - interval '2 days', true
);

INSERT INTO public.steps (id, guide_id, n, title, description, cost, office, office_id, day) VALUES
  ('20000000-0000-0000-0000-000000000014', '10000000-0000-0000-0000-000000000003', 1,
   'Get biometric passport photos',
   'Have two passport-size photos taken at a professional photo studio. Photos must be: 35×45 mm, white background, full face, no glasses. Digital photos are accepted but must meet the same specifications. Most studios near the Immigration Department offer this for Le 20,000–30,000.',
   25000, 'Photo studio', null, 1),

  ('20000000-0000-0000-0000-000000000015', '10000000-0000-0000-0000-000000000003', 2,
   'Collect and complete the passport application form',
   'Visit the Sierra Leone Immigration Department on Siaka Stevens Street to collect Form PP1. Complete all sections in black ink. You will need your birth certificate or national ID, NIN, and a guarantor (a Sierra Leonean citizen of good standing who holds a valid passport).',
   0, 'Immigration Department', '00000000-0000-0000-0000-000000000007', 1),

  ('20000000-0000-0000-0000-000000000016', '10000000-0000-0000-0000-000000000003', 3,
   'Pay the passport fee at the designated bank',
   'The current fee for a standard 32-page passport is Le 400,000. Pay at Rokel Commercial Bank or Sierra Leone Commercial Bank into the Immigration Department account. Obtain and keep the bank teller. There is an expedited (express) processing option for Le 600,000 which reduces the wait to 3–5 days.',
   400000, 'Designated bank', null, 1),

  ('20000000-0000-0000-0000-000000000017', '10000000-0000-0000-0000-000000000003', 4,
   'Submit documents and have biometrics captured',
   'Return to the Immigration Department with your completed form, bank teller, photos, birth certificate, and NIN. A clerk will review your documents and book you for biometric capture (fingerprints + digital photo). Biometric appointments are often the same day or next day.',
   0, 'Immigration Department', '00000000-0000-0000-0000-000000000007', 2),

  ('20000000-0000-0000-0000-000000000018', '10000000-0000-0000-0000-000000000003', 5,
   'Collect your passport',
   'Return to collect your passport on the date given to you — usually 7–14 working days after biometric capture. Bring your collection slip and a valid ID. Check all details carefully before leaving the building.',
   0, 'Immigration Department', '00000000-0000-0000-0000-000000000007', 14);

INSERT INTO public.documents_needed (guide_id, step_id, label, required) VALUES
  ('10000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000015', 'Birth certificate or national ID', true),
  ('10000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000015', 'National Identification Number (NIN) slip', true),
  ('10000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000015', 'Guarantor letter and guarantor''s passport copy', true),
  ('10000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000014', 'Two biometric passport photos (35×45 mm, white background)', true),
  ('10000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000017', 'Bank teller (original)', true),
  ('10000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000017', 'Completed Form PP1', true);

INSERT INTO public.budget_lines (guide_id, step_id, label, amount, office, payment_type) VALUES
  ('10000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000014', 'Biometric passport photos', 25000, 'Photo studio', 'cash'),
  ('10000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000016', 'Passport fee (32 pages)', 400000, 'Bank', 'bank'),
  ('10000000-0000-0000-0000-000000000003', null, 'Transport (2–3 trips)', 25000, 'Freetown local', 'cash');

INSERT INTO public.tips (guide_id, step_id, text, upvotes) VALUES
  ('10000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000015',
   'Your guarantor must physically sign the form in front of the Immigration clerk — a pre-signed form will be rejected. Make sure your guarantor is available on the submission day.', 52),
  ('10000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000017',
   'Go on a Tuesday or Wednesday morning — Monday is always the busiest day and Fridays can be slow because staff leave early.', 43),
  ('10000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000018',
   'Always check the passport details (name spelling, DOB, place of birth) before leaving the counter. Corrections after collection take additional time and may incur a fee.', 35);

-- ══════════════════════════════════════════════════════════════════════════
-- GUIDE 4: Register for a National Identification Number (NIN)
-- ══════════════════════════════════════════════════════════════════════════
INSERT INTO public.guides (
  id, title, slug, category, country, description,
  steps_count, total_cost, duration_days, trust_score, language,
  follower_count, last_verified_at, published
) VALUES (
  '10000000-0000-0000-0000-000000000004',
  'Register for a National ID Number (NIN)',
  'register-for-nin',
  'id', 'sl',
  'How to register for a Sierra Leone National Identification Number (NIN) at a NATCOM registration centre. The NIN is free and required for most government services. Registration takes 1 day.',
  3, 0, '[1,1]', 8.5,
  '{en}', 2100, now() - interval '1 day', true
);

INSERT INTO public.steps (id, guide_id, n, title, description, cost, office, office_id, day) VALUES
  ('20000000-0000-0000-0000-000000000019', '10000000-0000-0000-0000-000000000004', 1,
   'Locate your nearest NIN registration centre',
   'NIN registration is free and is handled by the National Civil Registration Authority (NCRA). Registration centres are located in all district capitals and at NATCOM offices in Freetown. You can check natcom.gov.sl for a list of active centres.',
   0, 'NCRA / NATCOM registration centre', '00000000-0000-0000-0000-000000000008', 1),

  ('20000000-0000-0000-0000-000000000020', '10000000-0000-0000-0000-000000000004', 2,
   'Provide biometric data and documents',
   'Bring your birth certificate and any existing ID (old ID card, voter registration card, school leaving certificate). An officer will photograph you, scan your fingerprints (all ten), and capture your iris scan. The process takes about 15 minutes per person.',
   0, 'NCRA registration centre', '00000000-0000-0000-0000-000000000008', 1),

  ('20000000-0000-0000-0000-000000000021', '10000000-0000-0000-0000-000000000004', 3,
   'Receive your NIN slip',
   'After biometric capture you receive a printed NIN slip on the spot. This slip is your proof of NIN until the full national ID card is issued (which may take several months as the national roll-out continues). Keep the slip safe — it is accepted by most government offices.',
   0, 'NCRA registration centre', '00000000-0000-0000-0000-000000000008', 1);

INSERT INTO public.documents_needed (guide_id, step_id, label, required) VALUES
  ('10000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000020', 'Birth certificate', true),
  ('10000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000020', 'Any existing government ID (voter card, old national ID, etc.)', false);

INSERT INTO public.budget_lines (guide_id, step_id, label, amount, office, payment_type) VALUES
  ('10000000-0000-0000-0000-000000000004', null, 'NIN registration fee', 0, 'NCRA — free', 'cash'),
  ('10000000-0000-0000-0000-000000000004', null, 'Transport to registration centre', 10000, 'Freetown local', 'cash');

INSERT INTO public.tips (guide_id, step_id, text, upvotes) VALUES
  ('10000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000020',
   'If you don''t have a birth certificate, registration is still possible with a sworn affidavit from a Commissioner for Oaths. Many people use this route.', 61),
  ('10000000-0000-0000-0000-000000000004', null,
   'NIN registration is completely free. If anyone at the centre asks for payment, report it to the NCRA supervisory officer.', 55);

-- ══════════════════════════════════════════════════════════════════════════
-- GUIDE 5: File an Individual Income Tax Return (TIN)
-- ══════════════════════════════════════════════════════════════════════════
INSERT INTO public.guides (
  id, title, slug, category, country, description,
  steps_count, total_cost, duration_days, trust_score, language,
  follower_count, last_verified_at, published
) VALUES (
  '10000000-0000-0000-0000-000000000005',
  'File an Individual Income Tax Return',
  'file-income-tax-return',
  'tax', 'sl',
  'How to file an individual income tax return with the National Revenue Authority (NRA) in Sierra Leone. Required for self-employed individuals and employees with additional income. Filing deadline is 31 March each year.',
  4, 10000, '[1,2]', 7.5,
  '{en}', 340, now() - interval '7 days', true
);

INSERT INTO public.steps (id, guide_id, n, title, description, cost, office, office_id, day) VALUES
  ('20000000-0000-0000-0000-000000000022', '10000000-0000-0000-0000-000000000005', 1,
   'Register for a TIN (if you don''t have one)',
   'If you are not already registered, visit the NRA office on Gloucester Street to register for a Taxpayer Identification Number (TIN). Bring your NIN, national ID, and proof of income or business. Registration is free and usually completed the same day.',
   0, 'NRA · Freetown', '00000000-0000-0000-0000-000000000003', 1),

  ('20000000-0000-0000-0000-000000000023', '10000000-0000-0000-0000-000000000005', 2,
   'Collect the Individual Tax Form (ITF1)',
   'Collect the ITF1 form from the NRA office or download from nra.gov.sl. Complete Sections A (personal details), B (income for the year), and C (allowable deductions). Gather supporting documents: P60/pay slips, business accounts, or rental income receipts.',
   0, 'NRA · Freetown', '00000000-0000-0000-0000-000000000003', 1),

  ('20000000-0000-0000-0000-000000000024', '10000000-0000-0000-0000-000000000005', 3,
   'Submit your return at the NRA',
   'Submit your completed ITF1 with all supporting documents to the NRA taxpayer services desk. A clerk will review and stamp your form. You receive an acknowledgement receipt. For self-employed individuals, submit before 31 March. Employees who only have PAYE income may not need to file.',
   0, 'NRA · Freetown', '00000000-0000-0000-0000-000000000003', 1),

  ('20000000-0000-0000-0000-000000000025', '10000000-0000-0000-0000-000000000005', 4,
   'Pay any tax owed',
   'If your return shows tax is owed, pay the amount at any NRA-designated bank. The NRA will issue an assessment after reviewing your return — this can take a few weeks. Keep copies of all receipts. Late filing incurs a Le 10,000 penalty per month.',
   10000, 'Designated bank', null, 2);

INSERT INTO public.documents_needed (guide_id, step_id, label, required) VALUES
  ('10000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000023', 'Pay slips or P60 from employer', true),
  ('10000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000023', 'NIN and TIN certificates', true),
  ('10000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000023', 'Business accounts or records (if self-employed)', false),
  ('10000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000023', 'Rental income receipts (if applicable)', false);

INSERT INTO public.budget_lines (guide_id, step_id, label, amount, office, payment_type) VALUES
  ('10000000-0000-0000-0000-000000000005', null, 'Late filing penalty (if applicable)', 10000, 'NRA', 'bank'),
  ('10000000-0000-0000-0000-000000000005', null, 'Tax due (varies by income)', 0, 'Designated bank', 'bank');

INSERT INTO public.tips (guide_id, step_id, text, upvotes) VALUES
  ('10000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000023',
   'The NRA iTax online portal (itax.nra.gov.sl) lets you file your return online and is faster than going in person. You still need to print and submit the acknowledgement page.', 28),
  ('10000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000024',
   'File before the March 31 deadline even if you can''t pay the tax yet — the late-filing penalty accumulates monthly and is separate from the interest on unpaid tax.', 22);

-- ══════════════════════════════════════════════════════════════════════════
-- GUIDE 6: Register with NASSIT as an Employee
-- ══════════════════════════════════════════════════════════════════════════
INSERT INTO public.guides (
  id, title, slug, category, country, description,
  steps_count, total_cost, duration_days, trust_score, language,
  follower_count, last_verified_at, published
) VALUES (
  '10000000-0000-0000-0000-000000000006',
  'Register with NASSIT as an Employee',
  'register-with-nassit',
  'health', 'sl',
  'How to register with the National Social Security and Insurance Trust (NASSIT) as a new employee in Sierra Leone. Registration is free and entitles you to social security benefits. Your employer handles monthly contributions.',
  3, 0, '[1,2]', 8.0,
  '{en}', 450, now() - interval '4 days', true
);

INSERT INTO public.steps (id, guide_id, n, title, description, cost, office, office_id, day) VALUES
  ('20000000-0000-0000-0000-000000000026', '10000000-0000-0000-0000-000000000006', 1,
   'Ask your employer to initiate registration',
   'NASSIT registration is typically initiated by your employer within 30 days of joining. Your employer completes an Employee Registration Form (ERF) with your personal details and submits it to NASSIT. If your employer hasn''t done this, request it in writing.',
   0, 'Your employer''s HR department', null, 1),

  ('20000000-0000-0000-0000-000000000027', '10000000-0000-0000-0000-000000000006', 2,
   'Submit your personal documents at NASSIT',
   'Visit the NASSIT office at 10 Wilkinson Road with your NIN, national ID, birth certificate, and employment letter. A NASSIT officer will verify your identity, enter your details in the system, and issue a NASSIT registration number.',
   0, 'NASSIT Head Office', '00000000-0000-0000-0000-000000000004', 1),

  ('20000000-0000-0000-0000-000000000028', '10000000-0000-0000-0000-000000000006', 3,
   'Receive your NASSIT card',
   'Your NASSIT card is usually ready within 1–2 weeks. It will be sent to your employer or you can collect it from the NASSIT office. Keep it safe — you will need it to claim benefits in future. Monthly contributions are 5% of gross salary (employee) + 10% (employer).',
   0, 'NASSIT Head Office', '00000000-0000-0000-0000-000000000004', 2);

INSERT INTO public.documents_needed (guide_id, step_id, label, required) VALUES
  ('10000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000027', 'NIN slip or national ID', true),
  ('10000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000027', 'Birth certificate', true),
  ('10000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000027', 'Employment letter from employer', true);

INSERT INTO public.budget_lines (guide_id, step_id, label, amount, office, payment_type) VALUES
  ('10000000-0000-0000-0000-000000000006', null, 'NASSIT registration fee', 0, 'NASSIT — free', 'cash');

INSERT INTO public.tips (guide_id, step_id, text, upvotes) VALUES
  ('10000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000026',
   'Keep a copy of your NASSIT number and check it on your pay slips every month. Some employers register employees but then don''t actually remit the contributions.', 37),
  ('10000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000027',
   'If you are self-employed or a domestic worker, you can still register as a voluntary contributor. Ask at the NASSIT office for the Voluntary Contributor Form.', 19);

-- ══════════════════════════════════════════════════════════════════════════
-- GUIDE 7: Enrol at Fourah Bay College (Undergraduate)
-- ══════════════════════════════════════════════════════════════════════════
INSERT INTO public.guides (
  id, title, slug, category, country, description,
  steps_count, total_cost, duration_days, trust_score, language,
  follower_count, last_verified_at, published
) VALUES (
  '10000000-0000-0000-0000-000000000007',
  'Enrol at Fourah Bay College',
  'enrol-at-fourah-bay-college',
  'education', 'sl',
  'Step-by-step guide to applying for undergraduate admission at Fourah Bay College (FBC), University of Sierra Leone. Covers WAEC results submission, application form, admission letter, fee payment, and orientation registration.',
  5, 75000, '[14,30]', 7.2,
  '{en}', 670, now() - interval '10 days', true
);

INSERT INTO public.steps (id, guide_id, n, title, description, cost, office, office_id, day) VALUES
  ('20000000-0000-0000-0000-000000000029', '10000000-0000-0000-0000-000000000007', 1,
   'Confirm your WAEC results meet the minimum entry requirements',
   'FBC requires a minimum of 5 WAEC/BECE credits including English Language and Mathematics. Credit = grade A1–C6. Check the specific subject requirements for your chosen faculty on the FBC website or prospectus. Science faculty typically requires credits in relevant science subjects.',
   0, 'FBC Admissions Office · Mount Aureol', '00000000-0000-0000-0000-000000000009', 1),

  ('20000000-0000-0000-0000-000000000030', '10000000-0000-0000-0000-000000000007', 2,
   'Purchase and complete the application form',
   'Purchase the application form from the FBC Admissions Office (Le 50,000) or online via the University of Sierra Leone portal. The form asks for: personal details, WAEC results, programme choices (first and second), and a personal statement. You may apply for up to three programmes.',
   50000, 'FBC Admissions Office', '00000000-0000-0000-0000-000000000009', 1),

  ('20000000-0000-0000-0000-000000000031', '10000000-0000-0000-0000-000000000007', 3,
   'Submit your application with supporting documents',
   'Submit the completed form with: certified copies of WAEC/BECE results, birth certificate, passport photos, and a reference letter from your school. Certified copies must be stamped by your school principal or a Justice of the Peace.',
   0, 'FBC Admissions Office', '00000000-0000-0000-0000-000000000009', 2),

  ('20000000-0000-0000-0000-000000000032', '10000000-0000-0000-0000-000000000007', 4,
   'Receive your admission letter and pay the acceptance fee',
   'If admitted, you will receive an offer letter by post or can check the USL online portal. Pay the acceptance / registration fee (approximately Le 25,000) at the designated bank within the deadline given in your letter — usually 2 weeks from the offer date.',
   25000, 'Designated bank', null, 14),

  ('20000000-0000-0000-0000-000000000033', '10000000-0000-0000-0000-000000000007', 5,
   'Register and attend orientation',
   'Report to FBC on the date specified in your admission letter for registration and student ID issuance. Bring original documents (WAEC cert, birth cert, ID) plus your bank teller. Orientation week follows immediately — attendance is compulsory.',
   0, 'FBC campus · Mount Aureol', '00000000-0000-0000-0000-000000000009', 30);

INSERT INTO public.documents_needed (guide_id, step_id, label, required) VALUES
  ('10000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000031', 'Certified WAEC/BECE results (original + 2 copies)', true),
  ('10000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000031', 'Birth certificate (certified copy)', true),
  ('10000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000031', 'Two recent passport photos', true),
  ('10000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000031', 'Reference letter from school principal', true),
  ('10000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000033', 'Original WAEC/BECE certificate', true),
  ('10000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000033', 'Admission letter', true);

INSERT INTO public.budget_lines (guide_id, step_id, label, amount, office, payment_type) VALUES
  ('10000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000030', 'Application form', 50000, 'FBC Admissions', 'cash'),
  ('10000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000032', 'Acceptance / registration fee', 25000, 'Bank', 'bank'),
  ('10000000-0000-0000-0000-000000000007', null, 'Document certification fee (JP or school)', 10000, 'Commissioner / school', 'cash');

INSERT INTO public.tips (guide_id, step_id, text, upvotes) VALUES
  ('10000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000031',
   'Get your WAEC results certified at your school rather than a JP — schools certify for free and officers at FBC know the principals'' stamps. JP certification can cost Le 5,000–10,000.', 29),
  ('10000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000030',
   'Put Business Administration or Public Administration as your second or third choice if your first choice is very competitive. It increases your admission chances significantly.', 21),
  ('10000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000033',
   'Arrive early on registration day — the queues can be 3–4 hours long. Bring water and snacks. The process involves multiple stations across the campus.', 16);

-- ══════════════════════════════════════════════════════════════════════════
-- GUIDE 8: Transfer Land Title (Change of Ownership)
-- ══════════════════════════════════════════════════════════════════════════
INSERT INTO public.guides (
  id, title, slug, category, country, description,
  steps_count, total_cost, duration_days, trust_score, language,
  follower_count, last_verified_at, published
) VALUES (
  '10000000-0000-0000-0000-000000000008',
  'Transfer Land Title (Change of Ownership)',
  'transfer-land-title',
  'property', 'sl',
  'How to legally transfer ownership of land or property in Sierra Leone. Covers title search, deed preparation, stamp duty assessment, deed registration at the OARG, and payment of fees. This process typically takes 3–6 weeks.',
  7, 320000, '[21,45]', 6.8,
  '{en}', 280, now() - interval '14 days', true
);

INSERT INTO public.steps (id, guide_id, n, title, description, cost, office, office_id, day) VALUES
  ('20000000-0000-0000-0000-000000000034', '10000000-0000-0000-0000-000000000008', 1,
   'Instruct a licensed surveyor to verify boundaries',
   'Hire a licensed land surveyor (Le 100,000–200,000 depending on plot size) to carry out a fresh survey. The surveyor produces a survey plan and Site Plan that will be attached to the deed. This is mandatory for freehold transfers.',
   150000, 'Licensed surveyor', null, 1),

  ('20000000-0000-0000-0000-000000000035', '10000000-0000-0000-0000-000000000008', 2,
   'Conduct a title search at the OARG',
   'Instruct a solicitor (or visit yourself) to search the land register at the Office of Administrator and Registrar General on Walpole Street. Pay a search fee (Le 10,000). The search confirms who currently holds legal title and reveals any encumbrances (mortgages, cautions).',
   10000, 'OARG · Freetown', '00000000-0000-0000-0000-000000000010', 3),

  ('20000000-0000-0000-0000-000000000036', '10000000-0000-0000-0000-000000000008', 3,
   'Prepare the Conveyance Deed',
   'Both buyer and seller should instruct a solicitor to prepare the Conveyance or Assignment Deed. The deed must include: parties'' full names and addresses, description of the property, purchase price, and the survey plan. Both parties sign in the presence of two witnesses.',
   50000, 'Solicitor''s office', null, 7),

  ('20000000-0000-0000-0000-000000000037', '10000000-0000-0000-0000-000000000008', 4,
   'Get the deed stamped by the NRA (Stamp Duty)',
   'Submit the signed deed to the NRA for assessment of stamp duty. Stamp duty is calculated at 2% of the property''s purchase price (for residential) or 3% (for commercial). This must be paid before the deed can be registered.',
   100000, 'NRA · Freetown', '00000000-0000-0000-0000-000000000003', 10),

  ('20000000-0000-0000-0000-000000000038', '10000000-0000-0000-0000-000000000008', 5,
   'Register the deed at the OARG',
   'Take the stamped deed and all supporting documents to the OARG for registration. Pay the registration fee (approximately Le 10,000 for standard deeds). The registrar will assign a registration number and date-stamp the deed. Processing can take 1–3 weeks.',
   10000, 'OARG · Freetown', '00000000-0000-0000-0000-000000000010', 14),

  ('20000000-0000-0000-0000-000000000039', '10000000-0000-0000-0000-000000000008', 6,
   'Collect the registered deed',
   'Once registered, the deed is returned to you or your solicitor. Check that the OARG registration stamp, date, volume, and folio numbers are clearly printed on the deed. Make certified copies immediately.',
   0, 'OARG · Freetown', '00000000-0000-0000-0000-000000000010', 28),

  ('20000000-0000-0000-0000-000000000040', '10000000-0000-0000-0000-000000000008', 7,
   'Update local council and NRA records',
   'Notify Freetown City Council (or the relevant district council) of the change of ownership so that property rates are billed to the new owner. Also notify the NRA if the property generates rental income so that tax records reflect the new owner.',
   0, 'Freetown City Council / NRA', null, 35);

INSERT INTO public.documents_needed (guide_id, step_id, label, required) VALUES
  ('10000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000035', 'Original title deed (seller''s copy)', true),
  ('10000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000035', 'Survey plan (current)', true),
  ('10000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000036', 'NIN and national ID of both buyer and seller', true),
  ('10000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000036', 'Proof of payment (bank transfer or teller)', true),
  ('10000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000038', 'Signed and witnessed Conveyance Deed', true),
  ('10000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000038', 'NRA stamp duty assessment notice', true);

INSERT INTO public.budget_lines (guide_id, step_id, label, amount, office, payment_type) VALUES
  ('10000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000034', 'Survey fee', 150000, 'Licensed surveyor', 'cash'),
  ('10000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000035', 'Title search fee', 10000, 'OARG', 'cash'),
  ('10000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000036', 'Solicitor / deed preparation fee', 50000, 'Solicitor', 'cash'),
  ('10000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000037', 'Stamp duty (2% of price — estimate)', 100000, 'NRA', 'bank'),
  ('10000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000038', 'OARG registration fee', 10000, 'OARG', 'cash');

INSERT INTO public.tips (guide_id, step_id, text, upvotes) VALUES
  ('10000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000035',
   'Always do the title search before paying any deposit to the seller. There are land disputes in many areas of Freetown — an encumbrance on the title can block your registration entirely.', 48),
  ('10000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000036',
   'Use a solicitor who is registered with the Sierra Leone Bar Association. There are unlicensed "deed preparers" who produce invalid deeds — the OARG will reject them.', 39),
  ('10000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000038',
   'Stamp duty is assessed on the declared purchase price. Undervaluing the property to reduce stamp duty is fraud and can result in the deed being voided.', 27);

-- ── Community feed ────────────────────────────────────────────────────────
INSERT INTO public.community_feed (type, guide_id, description, created_at) VALUES
  ('contribute', '10000000-0000-0000-0000-000000000002', 'A community member submitted a guide: Get a Driver''s Licence', now() - interval '6 days'),
  ('verify',     '10000000-0000-0000-0000-000000000002', 'Mariama K. verified: DVLA written test fee confirmed at Le 10,000', now() - interval '5 days'),
  ('contribute', '10000000-0000-0000-0000-000000000003', 'A community member submitted a guide: Apply for a Passport', now() - interval '5 days'),
  ('verify',     '10000000-0000-0000-0000-000000000003', 'Abdul J. verified: standard passport fee still Le 400,000 as of 2026', now() - interval '3 days'),
  ('contribute', '10000000-0000-0000-0000-000000000004', 'A community member submitted a guide: Register for NIN', now() - interval '4 days'),
  ('verify',     '10000000-0000-0000-0000-000000000004', 'Fatmata S. verified: NIN registration is still free at all NCRA centres', now() - interval '2 days'),
  ('contribute', '10000000-0000-0000-0000-000000000007', 'A community member submitted a guide: Enrol at Fourah Bay College', now() - interval '11 days'),
  ('contribute', '10000000-0000-0000-0000-000000000008', 'A community member submitted a guide: Transfer Land Title', now() - interval '15 days'),
  ('edit',       '10000000-0000-0000-0000-000000000008', 'Editor updated stamp duty calculation note in Land Title guide', now() - interval '8 days');
