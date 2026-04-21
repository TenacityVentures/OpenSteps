// Guide Detail — mix of A (3-col wiki) + B (linear step-by-step) + C (timeline)

const STEPS = [
  { n:1, title:'Reserve your business name',      sub:'Online at CAC portal or in person. Allow 1 business day. Have 3 name options ready.', cost:'Le 10,000', office:'CAC online', done:true,  evidence:2 },
  { n:2, title:'Fill Form A (CAC-BN-01)',         sub:'Download from CAC website or collect at office. Two signatures required if partnership.', cost:'—',        office:'CAC / download', done:true,  evidence:1 },
  { n:3, title:'Pay the filing fee at a bank',    sub:'Deposit into CAC Escrow at any commercial bank. Keep both copies — yellow one for Step 4.', cost:'Le 50,000', office:'Rokel · SLCB · UBA', done:true,  evidence:4 },
  { n:4, title:'Submit Form A + receipt + 2 IDs', sub:'Counter 3, ground floor CAC. Processing takes 2 business days. Collect intake slip.', cost:'—',        office:'CAC Counter 3', done:false, evidence:0 },
  { n:5, title:'Collect your certificate',        sub:'Bring intake slip and your national ID. Certificate of Incorporation issued on collection.', cost:'—',        office:'CAC',         done:false, evidence:0 },
  { n:6, title:'Apply for TIN at NRA',            sub:'Separate process — see linked guide "Get a TIN". Required before opening a bank account.', cost:'Le 20,000', office:'NRA Wellington', done:false, evidence:0 },
  { n:7, title:'Register with NASSIT',            sub:'Only required if you will employ staff. Link to NASSIT enrollment guide.', cost:'Le 5,000',  office:'NASSIT HQ',   done:false, evidence:0 },
];

const TIPS = [
  { text:'"Go to the bank before 11am — queues are shortest then."',   who:'Foday K.',   when:'3 wks ago' },
  { text:'"Ask the teller for the yellow carbon copy specifically."',  who:'Amina M.',   when:'1 mo ago'  },
  { text:'"CAC name reservation now works on mobile — saved me a trip."', who:'Isatu C.', when:'2 wks ago' },
];

function GuideScreen() {
  return (
    <div>
      <ScreenHead
        num="02"
        title="Guide Detail"
        sub="Mix: A wikipedia 3-col layout + B linear step walkthrough + C timeline overview. Steps link to evidence."
      />
      <div className="grid">

        {/* ── Variant 1: Desktop 3-col ── */}
        <Variant name="Desktop — 3-col: TOC · steps · trust panel" tag="mix A+B+C">
          <Desk url="opensteps.org/sl/register-a-business">
            <div style={{ display: 'grid', gridTemplateColumns: '168px 1fr 220px', gap: 18, alignItems: 'start' }}>

              {/* LEFT — Table of contents */}
              <div className="col" style={{ position: 'sticky', top: 0 }}>
                <Label>Contents</Label>
                {['Overview','Requirements','Steps','Fees','Offices','Evidence','Tips','History'].map((s, i) => (
                  <div key={s} style={{
                    fontSize: 13, padding: '4px 8px', borderRadius: 'var(--radius-sm)',
                    background: i === 2 ? 'var(--accent-soft)' : 'transparent',
                    color: i === 2 ? 'var(--accent)' : 'var(--text-2)',
                    fontWeight: i === 2 ? 600 : 400,
                    cursor: 'pointer',
                  }}>{s}</div>
                ))}
                <Divider />
                <div className="small mono" style={{ lineHeight: 1.6 }}>
                  <div>847 following</div>
                  <div>34 receipts</div>
                  <div>12 verifiers</div>
                </div>
              </div>

              {/* CENTRE — Steps */}
              <div className="col">
                <div className="small mono" style={{ color: 'var(--text-3)' }}>Sierra Leone › Business ›</div>
                <H lg>Register a business</H>
                <div className="row" style={{ gap: 6 }}>
                  <Badge ok>Verified 14 Apr 2026</Badge>
                  <Badge>7 steps</Badge>
                  <Badge>Le 150k</Badge>
                  <Badge>2–3 days</Badge>
                </div>
                <P>This guide describes registering a sole-proprietorship or limited liability company with the Corporate Affairs Commission (CAC) in Freetown, Sierra Leone.</P>

                {/* Timeline progress — variant C */}
                <div style={{ margin: '4px 0 8px' }}>
                  <div className="between" style={{ marginBottom: 6 }}>
                    <Label>Your progress</Label>
                    <span className="small mono">3 of 7 complete</span>
                  </div>
                  <div style={{ display: 'flex', gap: 3 }}>
                    {STEPS.map((s, i) => (
                      <div key={i} style={{
                        flex: 1, height: 6, borderRadius: 999,
                        background: s.done ? 'var(--accent)' : 'var(--surface-3)',
                      }} />
                    ))}
                  </div>
                  <div className="row mt-1" style={{ gap: 12 }}>
                    <span className="small">Day 1–2 ✓</span>
                    <span className="small" style={{ color: 'var(--text-3)' }}>Day 2–3 →</span>
                    <span className="small" style={{ color: 'var(--text-3)' }}>Day 4–5</span>
                  </div>
                </div>

                <Divider />
                <H sm style={{ marginBottom: 8 }}>Steps</H>

                {STEPS.map((s) => (
                  <div key={s.n} className={`sk-step${s.done ? ' done' : ''}`}>
                    <span className="num">{s.done ? '✓' : s.n}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{s.title}</div>
                      <div className="small" style={{ marginTop: 3 }}>{s.sub}</div>
                      <div className="row mt-1" style={{ gap: 6 }}>
                        {s.cost !== '—' && <Badge>{s.cost}</Badge>}
                        <span className="small mono">{s.office}</span>
                        {s.evidence > 0 && <Badge ok>{s.evidence} receipts</Badge>}
                      </div>
                    </div>
                  </div>
                ))}

                <Divider />
                <H sm>Community tips</H>
                {TIPS.map((t, i) => (
                  <Box key={i} soft style={{ fontSize: 13 }}>
                    {t.text}
                    <div className="small mono mt-1">— {t.who} · {t.when}</div>
                  </Box>
                ))}
              </div>

              {/* RIGHT — Trust & overview panel */}
              <div className="col" style={{ position: 'sticky', top: 0 }}>
                <Box>
                  <Label>Overview</Label>
                  <div className="col mt-1" style={{ gap: 6, fontSize: 13 }}>
                    {[['Time','2–3 business days'],['Cost','Le 150,000'],['Office','CAC · Freetown'],['Difficulty','Medium']].map(([k,v]) => (
                      <div key={k} className="between">
                        <span style={{ color: 'var(--text-3)' }}>{k}</span>
                        <span style={{ fontWeight: 600 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </Box>

                {/* Documents checklist — scan view (mix-in of variant D) */}
                <Box>
                  <div className="between">
                    <Label>What to bring</Label>
                    <span className="small mono" style={{ color: 'var(--green)', fontWeight: 600 }}>3/5 ready</span>
                  </div>
                  <div className="col mt-1" style={{ gap: 5 }}>
                    {[
                      ['NIN / National ID',          true],
                      ['2 passport photos',          true],
                      ['3 business name options',    true],
                      ['Residential address proof',  false],
                      ['Partner ID (if Ltd)',        false],
                    ].map(([item, ready], i) => (
                      <div key={i} className="row" style={{ gap: 7, fontSize: 12 }}>
                        <div style={{
                          width: 14, height: 14, borderRadius: 3, flex: 'none',
                          border: '2px solid ' + (ready ? 'var(--accent)' : 'var(--border-strong)'),
                          background: ready ? 'var(--accent)' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {ready && <span style={{ color: 'white', fontSize: 9, fontWeight: 700 }}>✓</span>}
                        </div>
                        <span style={{
                          textDecoration: ready ? 'line-through' : 'none',
                          color: ready ? 'var(--text-3)' : 'var(--text-2)',
                          lineHeight: 1.3,
                        }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </Box>

                {/* Money breakdown — scan view (mix-in of variant D) */}
                <Box soft>
                  <Label>Money to bring</Label>
                  <div className="col mt-1" style={{ gap: 3, fontSize: 12 }}>
                    {[
                      ['Name reservation',  'Le 10k'],
                      ['Filing fee',        'Le 50k'],
                      ['Stamp duty',        'Le 5k'],
                      ['TIN processing',    'Le 20k'],
                      ['Transport / misc.', '~Le 65k'],
                    ].map(([k, v]) => (
                      <div key={k} className="between">
                        <span style={{ color: 'var(--text-3)' }}>{k}</span>
                        <b>{v}</b>
                      </div>
                    ))}
                    <Divider />
                    <div className="between" style={{ fontWeight: 700, fontSize: 13 }}>
                      <span>Total</span>
                      <span>Le 150k</span>
                    </div>
                  </div>
                  <Btn ghost xs style={{ marginTop: 6 }}>Print as prep sheet ↓</Btn>
                </Box>

                <Box dashed>
                  <Label>Trust score</Label>
                  <TrustBar score={8.7} />
                  <div className="col mt-2" style={{ gap: 4, fontSize: 12 }}>
                    <div className="between"><span>Verifiers</span><b>12</b></div>
                    <div className="between"><span>Receipts</span><b>34</b></div>
                    <div className="between"><span>Last verified</span><b>14 Apr 2026</b></div>
                    <div className="between"><span>Disputes</span><b>0 open</b></div>
                  </div>
                </Box>

                <Box soft>
                  <Label>Verifiers</Label>
                  <div className="col mt-1" style={{ gap: 6 }}>
                    {[['Amina M.','A','98%'],['Foday K.','F','94%'],['Editor Bash','E',null]].map(([n,a,acc]) => (
                      <div key={n} className="row">
                        <Avatar>{a}</Avatar>
                        <div className="grow" style={{ fontSize: 12 }}><b>{n}</b></div>
                        {acc ? <Badge ok>{acc}</Badge> : <span className="stamp">EDITOR</span>}
                      </div>
                    ))}
                  </div>
                </Box>

                <Btn primary>✓ I completed this step</Btn>
                <Btn ghost xs>Report a problem</Btn>
              </div>
            </div>
          </Desk>
          <Caption>TOC always visible (A). Step list is the hero (B). Trust panel persistent right (A). Timeline progress (C).</Caption>
        </Variant>

        {/* ── Variant 2: Mobile linear step ── */}
        <Variant name="Mobile — step 3 of 7, linear walkthrough" tag="mix B+C">
          <Phone>
            <div className="col" style={{ gap: 10 }}>
              {/* Progress header */}
              <div className="between">
                <span className="small mono" style={{ fontWeight: 600 }}>STEP 3 / 7</span>
                <Badge ok>3 done</Badge>
              </div>
              {/* Progress bar */}
              <div style={{ display: 'flex', gap: 3 }}>
                {STEPS.map((s, i) => (
                  <div key={i} style={{
                    flex: 1, height: 5, borderRadius: 999,
                    background: s.done ? 'var(--accent)' : i === 3 ? 'var(--amber)' : 'var(--surface-3)',
                  }} />
                ))}
              </div>

              <H sm>Pay the filing fee</H>

              {/* Scan-mode summary chips (mix-in of variant D) */}
              <Box dashed style={{ padding: 8, background: 'var(--accent-soft)', borderColor: 'var(--accent)' }}>
                <div className="between" style={{ marginBottom: 4 }}>
                  <Label>Scan full guide</Label>
                  <span className="small mono" style={{ color: 'var(--accent)' }}>3/5 docs ready</span>
                </div>
                <div className="row" style={{ gap: 4 }}>
                  <Chip>5 days</Chip>
                  <Chip>Le 150k</Chip>
                  <Chip>4 offices</Chip>
                  <Chip>2 docs missing</Chip>
                </div>
              </Box>

              <Box soft>
                <Label>Where to pay</Label>
                <div className="col mt-1" style={{ gap: 4, fontSize: 13 }}>
                  <div className="between"><span style={{ color:'var(--text-3)' }}>Amount</span><b>Le 50,000 + Le 5k stamp</b></div>
                  <div className="between"><span style={{ color:'var(--text-3)' }}>Banks</span><span>Rokel · SLCB · UBA · Ecobank</span></div>
                  <div className="between"><span style={{ color:'var(--text-3)' }}>Account</span><span className="mono" style={{ fontSize: 11 }}>CAC-ESC-003-1-004</span></div>
                </div>
              </Box>

              <Box dashed>
                <Label>What you'll get</Label>
                <Img style={{ minHeight: 90, marginTop: 6 }}>receipt photo · keep yellow copy</Img>
                <div className="small mt-1" style={{ fontWeight: 500 }}>Keep the yellow copy — you need it at Step 4.</div>
              </Box>

              <Box>
                <Label>Community tips ({TIPS.length})</Label>
                <div style={{ fontSize: 13, lineHeight: 1.5, marginTop: 4 }}>
                  {TIPS[0].text}
                  <div className="small mono mt-1">— {TIPS[0].who}</div>
                </div>
              </Box>

              {/* Evidence thumbnails */}
              <div>
                <Label>Evidence from community (34)</Label>
                <div className="row mt-1" style={{ gap: 6 }}>
                  {[1,2,3].map(i => (
                    <Img key={i} style={{ width: 72, minHeight: 56, fontSize: 9 }}>receipt {i}</Img>
                  ))}
                  <div className="sk-box" style={{ width: 72, minHeight: 56, display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 600 }}>+31</div>
                </div>
              </div>

              <div className="row" style={{ justifyContent: 'space-between' }}>
                <Btn>← Back</Btn>
                <Btn primary>Mark done →</Btn>
              </div>

              <PhoneTabBar active="Browse" />
            </div>
          </Phone>
        </Variant>

        {/* ── Variant 3: Desktop timeline / journey map (C) ── */}
        <Variant name="Desktop — timeline & budget summary" tag="variant C mix">
          <Desk url="opensteps.org/sl/register-a-business/overview">
            <div className="col">
              <div className="between">
                <H lg>Your path to a registered business</H>
                <div className="row">
                  <Badge>5 working days</Badge>
                  <Badge>3 offices to visit</Badge>
                </div>
              </div>

              {/* Visual timeline */}
              <div style={{ display: 'flex', gap: 0, alignItems: 'stretch', marginTop: 8, overflowX: 'auto' }}>
                {[
                  ['Day 1','Reserve name\nFill Form A','CAC online + office', true],
                  ['Day 2','Pay Le 55k\nSubmit form','Bank → CAC', true],
                  ['Day 3','Pick up certificate','CAC', false],
                  ['Day 4','Apply for TIN','NRA Wellington', false],
                  ['Day 5','Register NASSIT','NASSIT HQ', false],
                ].map(([d, what, where, done], i) => (
                  <div key={i} style={{ flex: 1, position: 'relative', padding: '0 6px', minWidth: 100 }}>
                    <div style={{
                      height: 5, background: done ? 'var(--accent)' : 'var(--surface-3)',
                      borderRadius: i === 0 ? '999px 0 0 999px' : i === 4 ? '0 999px 999px 0' : 0,
                    }} />
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%',
                      border: '2.5px solid ' + (done ? 'var(--accent)' : 'var(--border-strong)'),
                      background: done ? 'var(--accent)' : 'var(--surface)',
                      margin: '-11px auto 10px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {done && <span style={{ color: 'white', fontSize: 9, fontWeight: 700 }}>✓</span>}
                    </div>
                    <Box style={{ textAlign: 'center' }}>
                      <div className="small mono" style={{ color: done ? 'var(--accent)' : 'var(--text-3)', fontWeight: 600 }}>{d}</div>
                      <div style={{ fontWeight: 600, fontSize: 13, whiteSpace: 'pre-line', marginTop: 4 }}>{what}</div>
                      <div className="small" style={{ marginTop: 4, color: 'var(--text-3)' }}>@ {where}</div>
                    </Box>
                  </div>
                ))}
              </div>

              <Divider />

              {/* Budget + summary */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                <Box>
                  <Label>Official total cost</Label>
                  <H sm style={{ marginTop: 6 }}>Le 85,000</H>
                  <div className="small">+ ~Le 65k transport & incidentals</div>
                </Box>
                <Box>
                  <Label>Realistic total time</Label>
                  <H sm style={{ marginTop: 6 }}>5 working days</H>
                  <div className="small">Official says 3 — community says 5</div>
                </Box>
                <Box>
                  <Label>Offices to visit</Label>
                  <H sm style={{ marginTop: 6 }}>4 offices</H>
                  <div className="small">CAC · Bank · NRA · NASSIT</div>
                </Box>
              </div>

              {/* Fee breakdown */}
              <Box>
                <Label>Fee breakdown</Label>
                <div className="col mt-1">
                  {[
                    ['Name reservation','CAC','Le 10,000'],
                    ['CAC filing fee','CAC','Le 50,000'],
                    ['Stamp duty','Govt','Le 5,000'],
                    ['TIN processing','NRA','Le 20,000'],
                    ['Transport & incidentals','—','~Le 65,000'],
                  ].map(([item, office, cost]) => (
                    <div key={item} className="between" style={{ padding: '5px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                      <span>{item}</span>
                      <span className="small mono" style={{ color: 'var(--text-3)' }}>{office}</span>
                      <span style={{ fontWeight: 600 }}>{cost}</span>
                    </div>
                  ))}
                  <div className="between" style={{ marginTop: 8, fontWeight: 700 }}>
                    <span>Total (realistic)</span>
                    <span>Le 150,000</span>
                  </div>
                </div>
              </Box>

              <Caption>Timeline gives the real shape (C). Budget panel from D. Actionable before the user even starts.</Caption>
            </div>
          </Desk>
        </Variant>

        {/* ── Variant 4: Mobile — pre-flight checklist (D) ── */}
        <Variant name="Mobile — before you start checklist" tag="variant D">
          <Phone>
            <div className="col" style={{ gap: 10 }}>
              <H sm>Before you go</H>
              <P style={{ fontSize: 12 }}>This guide takes ~5 days and Le 150k. Check these off before your first trip.</P>

              <Box>
                <Label>Documents to bring</Label>
                <div className="col mt-1" style={{ gap: 6 }}>
                  {[
                    ['NIN / National ID card', true],
                    ['2 passport photographs', true],
                    ['3 proposed business names', true],
                    ['Residential address proof', false],
                    ['Partner ID (for Ltd company)', false],
                  ].map(([item, ready], i) => (
                    <div key={i} className="row" style={{ gap: 8 }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: 4,
                        border: '2px solid ' + (ready ? 'var(--accent)' : 'var(--border-strong)'),
                        background: ready ? 'var(--accent)' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none',
                      }}>
                        {ready && <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>✓</span>}
                      </div>
                      <span style={{ fontSize: 13, textDecoration: ready ? 'line-through' : 'none', color: ready ? 'var(--text-3)' : 'var(--text)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </Box>

              <Box soft>
                <Label>Money to bring</Label>
                <div className="col mt-1" style={{ gap: 3 }}>
                  {[['Name reservation','Le 10k'],['Filing fee','Le 50k'],['Stamp duty','Le 5k'],['TIN','Le 20k'],['Transport','~Le 65k']].map(([k,v]) => (
                    <div key={k} className="between" style={{ fontSize: 12 }}>
                      <span>{k}</span><b>{v}</b>
                    </div>
                  ))}
                  <Divider />
                  <div className="between" style={{ fontWeight: 700, fontSize: 13 }}><span>Total</span><span>Le 150k</span></div>
                </div>
              </Box>

              <Btn primary>Start this guide →</Btn>
              <PhoneTabBar active="Browse" />
            </div>
          </Phone>
        </Variant>

      </div>
    </div>
  );
}

window.GuideScreen = GuideScreen;
