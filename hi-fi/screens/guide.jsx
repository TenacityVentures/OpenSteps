// Guide Detail — A (wiki 3-col) + B (linear step) + C (timeline) + D (pre-flight scan)

const STEPS = [
  { n:1, title:'Reserve your business name',        sub:'Online at CAC portal or in person. Have 3 name options ready.',                        cost:'Le 10,000', office:'CAC · online',      done:true,  evidence:2, day:1 },
  { n:2, title:'Fill Form A (CAC-BN-01)',            sub:'Download from CAC website or collect at office. Two signatures required for partnerships.', cost:'—',         office:'CAC / download',    done:true,  evidence:1, day:1 },
  { n:3, title:'Pay the filing fee at a commercial bank', sub:'Deposit into CAC Escrow. Keep both copies — the yellow carbon is needed at Step 4.',     cost:'Le 50,000', office:'Rokel · SLCB · UBA',done:true,  evidence:4, day:2, current:true },
  { n:4, title:'Submit Form A + receipt + 2 IDs',    sub:'Counter 3, ground floor CAC. Processing 2 business days. Keep your intake slip.',           cost:'—',         office:'CAC · counter 3',   done:false, evidence:0, day:2 },
  { n:5, title:'Collect your certificate',           sub:'Bring intake slip and your national ID. Certificate of Incorporation issued on collection.', cost:'—',         office:'CAC',                done:false, evidence:0, day:3 },
  { n:6, title:'Apply for TIN at NRA',               sub:'Separate process — follow linked guide. Required before opening a business bank account.',    cost:'Le 20,000', office:'NRA Wellington',     done:false, evidence:0, day:4 },
  { n:7, title:'Register with NASSIT',               sub:'Only required if you will employ staff. Link to NASSIT enrolment guide.',                   cost:'Le 5,000',   office:'NASSIT HQ',          done:false, evidence:0, day:5 },
];

const TIPS = [
  { text:'Go to the bank before 11am — queues are shortest then.',         who:'Foday K.',  when:'3 weeks ago', up: 34 },
  { text:'Ask the teller for the yellow carbon copy specifically — some give only the printed slip.', who:'Amina M.', when:'1 month ago', up: 28 },
  { text:'CAC name-reservation now works on mobile — saved me a trip to town.', who:'Isatu C.', when:'2 weeks ago', up: 22 },
];

const VERIFIERS = [
  ['Amina M.',    'A', '98%', '412 edits',  false],
  ['Foday K.',    'F', '94%', '208 edits',  false],
  ['Editor Bash', 'B', null,  '1,024 edits', true],
];

// ── Desktop — 3-col wiki ──────────────────────────────────────────────────
function DesktopGuide() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 300px', gap: 32, alignItems: 'start' }}>

      {/* LEFT — TOC */}
      <div style={{ position: 'sticky', top: 12 }}>
        <div className="micro mono" style={{ color: 'var(--text-3)', marginBottom: 8 }}>SL › Business</div>
        <Label>On this page</Label>
        <div className="stack-4" style={{ marginTop: 8 }}>
          {[
            ['Overview', false],
            ['What to bring', false],
            ['Steps', true],
            ['Fees', false],
            ['Offices', false],
            ['Community tips', false],
            ['Evidence (34)', false],
            ['History (34 edits)', false],
          ].map(([s, on]) => (
            <div key={s} style={{
              fontSize: 13, padding: '5px 10px', borderRadius: 8,
              borderLeft: `2px solid ${on ? 'var(--accent)' : 'transparent'}`,
              background: on ? 'var(--accent-tint)' : 'transparent',
              color: on ? 'var(--accent)' : 'var(--text-2)',
              fontWeight: on ? 600 : 400,
              cursor: 'pointer',
            }}>{s}</div>
          ))}
        </div>
        <Divider />
        <Label>Related guides</Label>
        <div className="stack-4" style={{ marginTop: 6 }}>
          {['Get a TIN', 'NASSIT enrolment', 'Open a business bank account', 'Get business insurance'].map(r => (
            <div key={r} style={{ fontSize: 12.5, color: 'var(--text-2)', cursor: 'pointer' }}>→ {r}</div>
          ))}
        </div>
      </div>

      {/* CENTRE */}
      <div className="stack-14">
        <div>
          <div className="micro mono" style={{ color: 'var(--text-3)' }}>Sierra Leone › Business › Registration</div>
          <H lg style={{ marginTop: 6, fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 38, letterSpacing: '-0.6px' }}>
            Register a business
          </H>
          <P style={{ marginTop: 8 }}>
            Register a sole-proprietorship or limited liability company with the Corporate Affairs
            Commission (CAC) in Freetown. Community-verified across 12 independent sources.
          </P>
          <div className="row" style={{ gap: 6, marginTop: 12 }}>
            <Badge ok dot>Verified 14 Apr 2026</Badge>
            <Badge>7 steps</Badge>
            <Badge>Le 150k total</Badge>
            <Badge>2–3 working days</Badge>
            <Badge info>Medium difficulty</Badge>
          </div>
        </div>

        {/* Timeline — variant C inline */}
        <Box soft style={{ padding: 18 }}>
          <div className="between" style={{ marginBottom: 10 }}>
            <div className="row">
              <Label>Your path</Label>
              <span className="small">· realistic timeline</span>
            </div>
            <span className="micro mono">3 of 7 complete · ~2 days left</span>
          </div>
          <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
            {['Day 1','Day 2','Day 3','Day 4','Day 5'].map((d, i) => {
              const done = i < 2;
              const cur  = i === 2;
              return (
                <div key={d} style={{ flex: 1, position: 'relative', paddingRight: i === 4 ? 0 : 0 }}>
                  <div style={{
                    height: 4, background: done ? 'var(--accent)' : cur ? 'linear-gradient(90deg, var(--accent) 0%, var(--accent) 40%, var(--surface-3) 40%, var(--surface-3) 100%)' : 'var(--surface-3)',
                    borderRadius: 999,
                  }} />
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%',
                    border: `2px solid ${done || cur ? 'var(--accent)' : 'var(--border-mid)'}`,
                    background: done ? 'var(--accent)' : 'var(--surface)',
                    margin: '-13px auto 10px',
                    display: 'grid', placeItems: 'center',
                    color: '#fff', fontSize: 11, fontWeight: 800,
                    boxShadow: cur ? '0 0 0 5px var(--accent-tint)' : 'none',
                  }}>{done ? '✓' : ''}</div>
                  <div style={{ textAlign: 'center' }}>
                    <div className="mono" style={{ fontSize: 10.5, color: done || cur ? 'var(--accent)' : 'var(--text-3)', fontWeight: 600, letterSpacing: '0.05em' }}>{d}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>
                      {['Reserve + Form A', 'Pay + submit', 'Collect cert.', 'Apply TIN', 'Register NASSIT'][i]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Box>

        <div>
          <div className="between">
            <H sm style={{ fontSize: 20 }}>Steps</H>
            <div className="row">
              <Btn ghost xs>Expand all</Btn>
              <Btn soft xs icon="check">Mark all done</Btn>
            </div>
          </div>

          <div style={{ marginTop: 10 }}>
            {STEPS.map(s => (
              <div key={s.n} className={`sk-step${s.done ? ' done' : ''}${s.current ? ' current' : ''}`}>
                <span className="num">{s.done ? '✓' : s.n}</span>
                <div>
                  <div className="between" style={{ alignItems: 'flex-start' }}>
                    <div style={{ fontWeight: 600, fontSize: 15.5, lineHeight: 1.3 }}>{s.title}</div>
                    <span className="mono" style={{ fontSize: 10.5, color: 'var(--text-3)', marginLeft: 10 }}>Day {s.day}</span>
                  </div>
                  <div className="small" style={{ marginTop: 4 }}>{s.sub}</div>
                  <div className="row" style={{ gap: 6, marginTop: 8 }}>
                    {s.cost !== '—' && <Badge solid>{s.cost}</Badge>}
                    <span className="micro mono">📍 {s.office}</span>
                    {s.evidence > 0 && <Badge ok>📎 {s.evidence} receipts</Badge>}
                    {s.current && <Badge warn dot>You are here</Badge>}
                  </div>
                  {s.current && (
                    <Box dashed style={{ marginTop: 10, padding: 12, borderColor: 'var(--accent)' }}>
                      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <Label>Example receipt from this step</Label>
                          <div className="small" style={{ marginTop: 4 }}>
                            Le 50,000 + Le 5,000 stamp duty → CAC Escrow account <span className="mono">003-1-004-0xxx</span>.
                            Yellow carbon is required at Step 4.
                          </div>
                          <div className="row" style={{ marginTop: 8 }}>
                            <Btn primary xs icon="check">Mark done</Btn>
                            <Btn xs>+ Add my receipt</Btn>
                            <Btn ghost xs>Report a problem</Btn>
                          </div>
                        </div>
                        <div style={{ width: 140, flex: 'none' }}>
                          <Receipt
                            title="ROKEL COMMERCIAL BANK"
                            lines={[
                              ['DATE',     '14/04/26 · 10:23'],
                              ['BRANCH',   'Siaka Stevens'],
                              ['PAYEE',    'CAC ESCROW'],
                              ['REF',      '003-1-004-7812'],
                              ['NAME',     '', 'blur'],
                              ['AMOUNT',   'Le 50,000'],
                              ['STAMP',    'Le 5,000'],
                            ]}
                            total="Le 55,000"
                            tilt={-1}
                          />
                        </div>
                      </div>
                    </Box>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div>
          <div className="between">
            <H sm style={{ fontSize: 18 }}>Community tips</H>
            <Btn ghost xs>+ Share a tip</Btn>
          </div>
          <div className="stack-10" style={{ marginTop: 10 }}>
            {TIPS.map((t, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '40px 1fr auto', gap: 14,
                padding: 14, background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 12,
              }}>
                <Avatar>{t.who[0]}</Avatar>
                <div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 17, lineHeight: 1.35, color: 'var(--text)' }}>
                    "{t.text}"
                  </div>
                  <div className="micro mono" style={{ marginTop: 6 }}>— {t.who} · {t.when}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--accent)' }}>▲ {t.up}</div>
                  <div className="micro mono">helpful</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — trust panel */}
      <div style={{ position: 'sticky', top: 12 }} className="stack-14">
        <Box raised>
          <Label>Overview</Label>
          <div className="stack-6" style={{ marginTop: 8, fontSize: 13 }}>
            {[
              ['⏱ Realistic time', '2–3 days'],
              ['💰 Total cost',    'Le 150,000'],
              ['📍 Office',        'CAC · Freetown'],
              ['⚡ Difficulty',    'Medium'],
              ['🌍 Language',      'English · Krio'],
            ].map(([k, v]) => (
              <div key={k} className="between">
                <span style={{ color: 'var(--text-3)' }}>{k}</span>
                <span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
          <Divider />
          <Btn primary block>✓ I completed this step</Btn>
        </Box>

        {/* Trust */}
        <Box>
          <div className="between">
            <Label>Trust score</Label>
            <span className="mono" style={{ fontSize: 10, color: 'var(--text-3)' }}>since 2024</span>
          </div>
          <div style={{ marginTop: 8 }}>
            <TrustBar score={8.7} />
          </div>
          <div className="stack-4" style={{ marginTop: 14, fontSize: 12.5 }}>
            <div className="between"><span className="muted">Verifiers</span><b>12</b></div>
            <div className="between"><span className="muted">Receipts</span><b>34</b></div>
            <div className="between"><span className="muted">Last verified</span><b>14 Apr 2026</b></div>
            <div className="between"><span className="muted">Disputes open</span><b>0</b></div>
          </div>
          <Divider dashed />
          <div className="micro">Score = evidence × verifier reputation × recency. <u style={{ cursor: 'pointer' }}>How we calculate</u></div>
        </Box>

        {/* What to bring — scan (D) */}
        <Box>
          <div className="between">
            <Label>What to bring</Label>
            <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700 }}>3 / 5 ready</span>
          </div>
          <div style={{ marginTop: 8 }}>
            <CheckRow done>NIN / National ID</CheckRow>
            <CheckRow done>2 passport photos</CheckRow>
            <CheckRow done>3 business name options</CheckRow>
            <CheckRow right={<Btn ghost xs>How to get</Btn>}>Residential address proof</CheckRow>
            <CheckRow right={<Btn ghost xs>How to get</Btn>}>Partner ID (for Ltd)</CheckRow>
          </div>
        </Box>

        {/* Money breakdown */}
        <Box soft>
          <Label>Money breakdown</Label>
          <div className="stack-4" style={{ marginTop: 8, fontSize: 12.5 }}>
            {[
              ['Name reservation',       'Le 10k'],
              ['CAC filing fee',         'Le 50k'],
              ['Stamp duty',             'Le 5k'],
              ['TIN processing',         'Le 20k'],
              ['Transport & incidentals','~Le 65k'],
            ].map(([k, v]) => (
              <div key={k} className="between">
                <span className="muted">{k}</span>
                <b>{v}</b>
              </div>
            ))}
            <Divider />
            <div className="between" style={{ fontSize: 14, fontWeight: 700 }}>
              <span>Total realistic</span>
              <span style={{ color: 'var(--accent)' }}>Le 150,000</span>
            </div>
          </div>
          <Btn xs block style={{ marginTop: 10 }}>↓ Save as printable prep sheet</Btn>
        </Box>

        {/* Verifiers */}
        <Box>
          <Label>Verified by</Label>
          <div className="stack-6" style={{ marginTop: 8 }}>
            {VERIFIERS.map(([n, a, acc, edits, isEd]) => (
              <div key={n} className="row" style={{ justifyContent: 'space-between' }}>
                <div className="row" style={{ gap: 10, flex: 1, minWidth: 0 }}>
                  <Avatar>{a}</Avatar>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 12.5 }}>{n}</div>
                    <div className="micro mono">{edits}</div>
                  </div>
                </div>
                {isEd ? <span className="stamp">EDITOR</span> : <Badge ok>{acc}</Badge>}
              </div>
            ))}
          </div>
        </Box>
      </div>
    </div>
  );
}

// ── Mobile: linear step walkthrough ───────────────────────────────────────
function MobileGuide() {
  return (
    <>
      <MobileHeader title="Register a business" locale="SL" avatar="A" back />
      <div style={{ marginTop: 4 }}>
        <div className="between">
          <div className="mono" style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600, letterSpacing: '0.08em' }}>STEP 3 OF 7 · DAY 2</div>
          <span className="mono" style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700 }}>43%</span>
        </div>
        <div style={{ marginTop: 6 }}>
          <SegProgress total={7} current={3} />
        </div>
      </div>

      <div>
        <H sm style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 400, lineHeight: 1.2 }}>
          Pay the filing fee
        </H>
        <div className="small" style={{ marginTop: 4 }}>
          Any commercial bank · Le 50,000 + Le 5,000 stamp duty · Keep the <b>yellow carbon copy</b>.
        </div>
      </div>

      <Box tight>
        <Label>Where to pay</Label>
        <div className="stack-4" style={{ marginTop: 8, fontSize: 13 }}>
          <div className="between">
            <span className="muted">Amount</span>
            <b>Le 50,000 <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>+ Le 5k stamp</span></b>
          </div>
          <div className="between">
            <span className="muted">Banks</span>
            <span style={{ fontSize: 12 }}>Rokel · SLCB · UBA · Ecobank</span>
          </div>
          <div className="between">
            <span className="muted">Account</span>
            <span className="mono" style={{ fontSize: 11 }}>CAC-ESC-003-1-004</span>
          </div>
        </div>
      </Box>

      {/* Receipt mock */}
      <div>
        <Label>What you'll get back</Label>
        <div style={{
          marginTop: 8, padding: 14,
          background: 'linear-gradient(180deg, var(--surface-2) 0%, var(--surface) 100%)',
          borderRadius: 12, border: '1px dashed var(--border-mid)',
        }}>
          <Receipt
            title="ROKEL COMMERCIAL BANK"
            lines={[
              ['DATE',   '14/04/26'],
              ['BRANCH', 'Siaka Stevens'],
              ['PAYEE',  'CAC ESCROW'],
              ['REF',    '003-1-004-7812'],
              ['NAME',   '', 'blur'],
              ['FEE',    'Le 50,000'],
              ['STAMP',  'Le 5,000'],
            ]}
            total="Le 55,000"
          />
          <div className="micro mono" style={{ marginTop: 8, textAlign: 'center' }}>
            🗂 Keep the yellow copy — needed at Step 4
          </div>
        </div>
      </div>

      <Box soft tight>
        <div className="between">
          <Label>Community tip · 34 ▲</Label>
          <span className="micro mono">3 weeks ago</span>
        </div>
        <div className="serif" style={{ fontSize: 15, lineHeight: 1.4, marginTop: 6, fontFamily: 'var(--serif)' }}>
          "{TIPS[0].text}"
        </div>
        <div className="micro mono" style={{ marginTop: 6 }}>— Foday K.</div>
      </Box>

      {/* Evidence thumbnails */}
      <div>
        <div className="between">
          <Label>Evidence · 34 receipts</Label>
          <span className="micro mono" style={{ color: 'var(--accent)' }}>See all →</span>
        </div>
        <div className="row" style={{ gap: 6, marginTop: 8, flexWrap: 'nowrap', overflow: 'hidden' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 68, height: 86, flex: 'none',
              background: '#fdfbf5', borderRadius: 6,
              border: '1px solid var(--border)',
              padding: 5, fontFamily: 'var(--mono)', fontSize: 7,
              color: '#3d372c', lineHeight: 1.3, overflow: 'hidden',
              transform: `rotate(${(i - 1) * 1.5}deg)`,
              boxShadow: 'var(--e-xs)',
            }}>
              <div style={{ textAlign: 'center', fontWeight: 700, marginBottom: 4 }}>ROKEL</div>
              <div>DATE 14/04</div>
              <div>CAC ESCROW</div>
              <div>Le 50,000</div>
              <div style={{ textAlign: 'center', marginTop: 6, fontSize: 6, color: 'var(--red)', fontWeight: 700 }}>PAID</div>
            </div>
          ))}
          <div style={{
            width: 68, height: 86, flex: 'none',
            display: 'grid', placeItems: 'center',
            background: 'var(--accent-tint)',
            border: '1px solid var(--accent-soft)',
            borderRadius: 6, fontWeight: 700, color: 'var(--accent)',
            fontSize: 13,
          }}>+31</div>
        </div>
      </div>

      <div className="row" style={{ justifyContent: 'space-between', marginTop: 4 }}>
        <Btn>← Step 2</Btn>
        <Btn primary icon="check">Mark done →</Btn>
      </div>

      <div style={{ height: 64 }} />
      <PhoneTabBar active="browse" />
    </>
  );
}

// ── Desktop — timeline/budget (variant C focus) ───────────────────────────
function DesktopTimeline() {
  return (
    <div className="stack-14">
      <div className="between">
        <div>
          <Eyebrow>Pre-flight</Eyebrow>
          <H lg style={{ marginTop: 4, fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 32 }}>Your path to a registered business</H>
          <P>Across 5 working days, 3 offices, ~Le 150,000. This is the view to send to someone before they start.</P>
        </div>
        <div className="row">
          <Btn>↓ Print prep sheet</Btn>
          <Btn primary>Start this guide →</Btn>
        </div>
      </div>

      {/* Journey timeline */}
      <Box>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0 }}>
          {[
            ['Day 1', 'Reserve name · Form A',       'CAC online + office',    ['CAC']],
            ['Day 2', 'Pay Le 55k · Submit form',    'Bank → CAC counter 3',   ['Bank', 'CAC']],
            ['Day 3', 'Collect certificate',         'CAC (intake slip)',      ['CAC']],
            ['Day 4', 'Apply for TIN',               'NRA Wellington',         ['NRA']],
            ['Day 5', 'Register NASSIT (if staff)',  'NASSIT HQ',              ['NASSIT']],
          ].map(([d, what, where, offices], i) => {
            const done = i < 2;
            const cur  = i === 2;
            return (
              <div key={d} style={{
                padding: '0 8px',
                borderRight: i < 4 ? '1px dashed var(--border)' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%',
                    background: done ? 'var(--accent)' : cur ? 'var(--surface)' : 'var(--surface-2)',
                    border: `2px solid ${done || cur ? 'var(--accent)' : 'var(--border-mid)'}`,
                    boxShadow: cur ? '0 0 0 4px var(--accent-tint)' : 'none',
                    display: 'grid', placeItems: 'center',
                    color: '#fff', fontSize: 11, fontWeight: 800,
                  }}>{done ? '✓' : ''}</div>
                  <div className="mono" style={{ fontSize: 11, color: done || cur ? 'var(--accent)' : 'var(--text-3)', fontWeight: 700, letterSpacing: '0.06em' }}>
                    {d}
                  </div>
                </div>
                <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{what}</div>
                <div className="small" style={{ marginTop: 4 }}>@ {where}</div>
                <div className="row" style={{ gap: 4, marginTop: 8 }}>
                  {offices.map(o => <Chip key={o} soft={cur || done} style={{ fontSize: 10, padding: '2px 8px' }}>{o}</Chip>)}
                </div>
              </div>
            );
          })}
        </div>
      </Box>

      {/* Budget + offices */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        <Box>
          <div className="between">
            <Label>Money breakdown · realistic</Label>
            <Badge warn>+ ~Le 65k incidentals</Badge>
          </div>
          <div style={{ marginTop: 12 }}>
            {[
              ['Name reservation',       'CAC',  'Le 10,000', true],
              ['CAC filing fee',         'CAC',  'Le 50,000', true],
              ['Stamp duty',             'Govt', 'Le 5,000',  true],
              ['TIN processing',         'NRA',  'Le 20,000', false],
              ['Transport & incidentals','—',    '~Le 65,000', false],
            ].map(([k, o, v, paid]) => (
              <div key={k} style={{
                display: 'grid', gridTemplateColumns: '18px 1fr 80px 80px', gap: 10, alignItems: 'center',
                padding: '9px 0', borderBottom: '1px solid var(--border)', fontSize: 13,
              }}>
                <span style={{
                  width: 16, height: 16, borderRadius: '50%',
                  background: paid ? 'var(--accent)' : 'var(--surface-3)',
                  display: 'grid', placeItems: 'center', color: '#fff', fontSize: 10, fontWeight: 800,
                }}>{paid ? '✓' : ''}</span>
                <span>{k}</span>
                <span className="mono muted" style={{ fontSize: 11 }}>{o}</span>
                <b style={{ textAlign: 'right' }}>{v}</b>
              </div>
            ))}
            <div className="between" style={{ marginTop: 12, paddingTop: 10, borderTop: '2px solid var(--text)', fontWeight: 700 }}>
              <span>Total · realistic</span>
              <span style={{ color: 'var(--accent)', fontSize: 18, fontFamily: 'var(--serif)' }}>Le 150,000</span>
            </div>
          </div>
        </Box>

        <Box>
          <Label>Offices you'll visit</Label>
          <div className="stack-10" style={{ marginTop: 12 }}>
            <OfficeCard
              name="CAC Headquarters"
              addr="1 Lightfoot Boston St, Freetown"
              hours="Mon–Fri · 9:00–16:00"
              tag="3 steps here"
            />
            <OfficeCard
              name="Rokel Commercial Bank"
              addr="Any branch (Siaka Stevens recommended)"
              hours="Mon–Sat · 8:00–15:00"
              tag="1 step here"
            />
            <OfficeCard
              name="NRA · Wellington"
              addr="Off Wellington Industrial Road"
              hours="Mon–Fri · 9:00–15:00"
            />
          </div>
        </Box>
      </div>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        <Box><Stat label="Realistic time"  value="5 days"    sub="official says 3" /></Box>
        <Box><Stat label="Total cost"       value="Le 150k"   sub="Le 85k official" /></Box>
        <Box><Stat label="Offices"          value="3"         sub="+ 1 bank visit" /></Box>
        <Box><Stat label="Docs required"    value="5 items"   sub="3 you likely have" /></Box>
      </div>
    </div>
  );
}

// ── Mobile — pre-flight checklist (variant D) ────────────────────────────
function MobileChecklist() {
  return (
    <>
      <MobileHeader title="Before you go" locale="SL" avatar="A" back />
      <div>
        <Eyebrow>Pre-flight checklist</Eyebrow>
        <H sm style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 400, marginTop: 4 }}>
          Register a business
        </H>
        <P style={{ marginTop: 4, fontSize: 13 }}>
          ~5 working days · Le 150,000 · 3 offices.
          Check these off before your first trip.
        </P>
      </div>

      <Box>
        <div className="between">
          <Label>Documents</Label>
          <Badge ok>3 of 5 ready</Badge>
        </div>
        <div style={{ marginTop: 8 }}>
          <CheckRow done>NIN / National ID</CheckRow>
          <CheckRow done>2 passport photos</CheckRow>
          <CheckRow done>3 proposed business names</CheckRow>
          <CheckRow right={<span className="mono" style={{ fontSize: 10, color: 'var(--accent)' }}>How?</span>}>Residential address proof</CheckRow>
          <CheckRow right={<span className="mono" style={{ fontSize: 10, color: 'var(--accent)' }}>How?</span>}>Partner ID (Ltd only)</CheckRow>
        </div>
      </Box>

      <Box soft>
        <Label>Money to bring</Label>
        <div className="stack-4" style={{ marginTop: 8, fontSize: 12.5 }}>
          {[
            ['Name reservation','Le 10k'],
            ['Filing fee','Le 50k'],
            ['Stamp duty','Le 5k'],
            ['TIN processing','Le 20k'],
            ['Transport','~Le 65k'],
          ].map(([k, v]) => (
            <div key={k} className="between"><span className="muted">{k}</span><b>{v}</b></div>
          ))}
          <Divider />
          <div className="between" style={{ fontSize: 14, fontWeight: 700 }}>
            <span>Total</span>
            <span style={{ color: 'var(--accent)', fontFamily: 'var(--serif)', fontSize: 18 }}>Le 150k</span>
          </div>
        </div>
      </Box>

      <Box dashed>
        <Label>Offices</Label>
        <div className="stack-6" style={{ marginTop: 8 }}>
          {[
            ['CAC HQ', 'Lightfoot Boston St'],
            ['Rokel Bank', 'Siaka Stevens br.'],
            ['NRA', 'Wellington'],
          ].map(([n, a]) => (
            <div key={n} className="between">
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{n}</div>
                <div className="small" style={{ fontSize: 11 }}>{a}</div>
              </div>
              <span style={{ color: 'var(--accent)', fontSize: 14 }}>📍</span>
            </div>
          ))}
        </div>
      </Box>

      <Btn primary block lg>Start guide · Step 1 →</Btn>
      <div style={{ height: 64 }} />
      <PhoneTabBar active="browse" />
    </>
  );
}

// ── Screen ─────────────────────────────────────────────────────────────────
function GuideScreen() {
  return (
    <div>
      <ScreenHead
        num="02"
        title="Guide Detail"
        sub="Wiki 3-col (A) + step-linear (B) + journey timeline (C) + scan checklist (D) — each mode fits a different moment: deciding, doing, preparing."
      />
      <div className="grid">

        <Variant name="Desktop · Wiki reading view" tag="mix · A + B + C + D">
          <Desk url="opensteps.org/sl/register-a-business" shell={{ active: 'guide' }}>
            <DesktopGuide />
          </Desk>
          <Caption>TOC left (A), step detail with inline receipt on the active step (B), trust rail right with what-to-bring scan checklist (D). Timeline ribbon at the top gives the journey shape (C).</Caption>
        </Variant>

        <Variant name="Mobile · Active step walkthrough" tag="one step · evidence-forward">
          <Phone>
            <MobileGuide />
          </Phone>
          <Caption>Linear walkthrough of the current step. Real receipt preview, community tip card, and the next-step CTA pinned above the tab bar. Evidence thumbnails are actual receipt-styled cards, not photo placeholders.</Caption>
        </Variant>

        <Variant name="Desktop · Timeline & budget (before-you-start)" tag="variant C primary">
          <Desk url="opensteps.org/sl/register-a-business/overview" shell={{ active: 'guide' }}>
            <DesktopTimeline />
          </Desk>
        </Variant>

        <Variant name="Mobile · Pre-flight checklist" tag="variant D · print-friendly">
          <Phone>
            <MobileChecklist />
          </Phone>
        </Variant>

      </div>
    </div>
  );
}

window.GuideScreen = GuideScreen;
