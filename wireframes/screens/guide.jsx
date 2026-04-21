// Guide detail — 4 variations

function GuideScreen() {
  return (
    <div>
      <ScreenHead num="02" title="Guide Detail" sub="The actual step-by-step. Overview box, steps, required documents, fees, offices, evidence, tips, history." />
      <div className="grid">

        <Variant name="A — Wikipedia orthodox" tag="reference document">
          <Phone>
            <div className="col" style={{ gap: 8 }}>
              <div className="small mono">Sierra Leone › Business</div>
              <H>Register a business</H>
              <div className="row"><Badge ok>Verified 14 Apr</Badge><Badge>7 steps</Badge><Badge>Le 150k</Badge></div>
              <Box soft>
                <Label>Overview</Label>
                <div className="small">Time: 2–3 days · Difficulty: medium · Office: CAC, Freetown</div>
              </Box>
              <Label>Contents</Label>
              <div className="col" style={{ gap: 4 }}>
                {['1. Reserve a name','2. Fill CAC form A','3. Pay at bank','4. Submit at CAC','5. Collect certificate','6. Get TIN','7. Register NASSIT'].map(s => <div key={s} className="small" style={{ borderLeft: '2px solid var(--rule)', paddingLeft: 8 }}>{s}</div>)}
              </div>
              <PhoneTabBar />
            </div>
          </Phone>
          <Desk>
            <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 200px', gap: 18 }}>
              <div className="col">
                <Label>Contents</Label>
                {['Overview','Requirements','Steps','Fees','Offices','Evidence','Tips','History'].map((s,i) => <div key={s} className="small" style={{ padding: '3px 0', color: i===2 ? 'var(--accent)' : 'inherit', fontWeight: i===2 ? 700 : 400 }}>{s}</div>)}
              </div>
              <div className="col">
                <div className="small mono">Sierra Leone › Business › </div>
                <H lg>Register a business</H>
                <div className="row"><Badge ok>Verified 14 Apr 2026</Badge><Badge>7 steps</Badge><Badge>Le 150k</Badge><Badge>2–3 days</Badge></div>
                <P>This guide describes registering a sole-proprietorship or limited company with the Corporate Affairs Commission (CAC) in Freetown.</P>
                <Divider />
                <H sm>Steps</H>
                {[
                  ['Reserve your business name','Online or at CAC. Allow 1 business day.', true],
                  ['Fill Form A (CAC-BN-01)','Download or collect at office. Two signatures required.', true],
                  ['Pay the filing fee at a commercial bank','Le 50,000 to CAC escrow account (see receipt).', true],
                  ['Submit Form A + receipt + 2 IDs','Counter 3, ground floor. Processing: 2 business days.', false],
                  ['Collect certificate','Bring your intake slip and ID.', false],
                  ['Apply for TIN at NRA','Separate step — see linked guide.', false],
                  ['Register with NASSIT','Only if you will have employees.', false],
                ].map(([t, s, d], i) => (
                  <Step key={i} n={i+1} title={t} sub={s} done={d} />
                ))}
              </div>
              <div className="col">
                <Box>
                  <Label>Overview</Label>
                  <div className="sk-p"><b>Time</b> 2–3 days<br/><b>Cost</b> Le 150,000<br/><b>Office</b> CAC, Freetown<br/><b>Difficulty</b> Medium</div>
                </Box>
                <Box dashed>
                  <Label>Last verified</Label>
                  <div><b>14 Apr 2026</b> by Amina M.</div>
                  <div className="small mono mt-1">12 verifiers · 34 receipts</div>
                </Box>
                <Btn primary>✓ I completed this</Btn>
              </div>
            </div>
          </Desk>
          <Caption>Safe, scannable. Sidebar = persistent trust panel.</Caption>
        </Variant>

        <Variant name="B — Linear walkthrough" tag="one step at a time">
          <Phone>
            <div className="col" style={{ gap: 10 }}>
              <div className="between"><span className="small mono">STEP 3 / 7</span><span className="small mono">46% ▓▓▓▓▓░░</span></div>
              <H sm>Pay the filing fee</H>
              <Box soft>
                <div className="small"><b>Where:</b> Any Rokel, Sierra Leone Commercial, or UBA branch</div>
                <div className="small"><b>Amount:</b> Le 50,000 + Le 5,000 stamp</div>
                <div className="small"><b>Account:</b> CAC Escrow · 003-1-004-0...</div>
              </Box>
              <Box dashed>
                <Label>What you\u2019ll get</Label>
                <Img style={{ minHeight: 100 }}>receipt photo placeholder</Img>
                <div className="small mt-1">Keep both copies. You need the yellow one at Step 4.</div>
              </Box>
              <Box>
                <Label>Community tip</Label>
                <div className="sk-p">“Go before 11am — queues are shortest then.” — <i>Foday K.</i></div>
              </Box>
              <div className="row"><Btn>← Back</Btn><Btn primary>Mark done →</Btn></div>
              <PhoneTabBar />
            </div>
          </Phone>
          <Desk>
            <div className="col">
              <div className="between">
                <H lg>Register a business · Step 3 of 7</H>
                <div className="row"><Badge>Le 50k fee</Badge><Badge ok>Verified</Badge></div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {[1,2,3,4,5,6,7].map(i => (
                  <div key={i} style={{ flex: 1, height: 8, border: '2px solid var(--rule)', background: i<=3 ? 'var(--accent)' : 'transparent', borderRadius: 3 }} />
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 18, marginTop: 10 }}>
                <div className="col">
                  <H>Pay the filing fee at a commercial bank</H>
                  <P>Deposit Le 50,000 into the CAC Escrow account at any commercial bank. Keep both copies of the teller slip — you\u2019ll need the yellow carbon at Step 4.</P>
                  <Box soft>
                    <div className="row" style={{ gap: 20 }}>
                      <div><Label>Amount</Label><div><b>Le 50,000</b> + Le 5,000 stamp</div></div>
                      <div><Label>Account</Label><div className="mono small">CAC-ESCROW-003-1-004-0xxx</div></div>
                      <div><Label>Accepted banks</Label><div className="small">Rokel · SLCB · UBA · Ecobank</div></div>
                    </div>
                  </Box>
                  <Divider />
                  <Label>Evidence from the community (34)</Label>
                  <div className="row">
                    {[1,2,3,4].map(i => <Img key={i} style={{ width: 96, minHeight: 72 }}>receipt {i}</Img>)}
                    <Box style={{ width: 96, minHeight: 72, display: 'grid', placeItems: 'center' }}>+30</Box>
                  </div>
                </div>
                <div className="col">
                  <Box dashed>
                    <Label>Tips from people who did this</Label>
                    <div className="sk-p">“Go before 11am — queues are shortest.”<div className="small mono">— Foday K., 3 wks ago</div></div>
                    <Divider />
                    <div className="sk-p">“Ask for the yellow copy specifically.”<div className="small mono">— Amina M., 1 mo ago</div></div>
                  </Box>
                  <Btn primary>Mark step done →</Btn>
                  <Btn ghost xs>Report a problem</Btn>
                </div>
              </div>
            </div>
          </Desk>
          <Caption>Hand-holding. Great for first-timers. Jumpable from sidebar in A.</Caption>
        </Variant>

        <Variant name="C — Timeline / journey map" tag="visual spatial">
          <Phone>
            <div className="col" style={{ gap: 6 }}>
              <H sm>Register a business · map</H>
              <div style={{ position: 'relative', paddingLeft: 24, borderLeft: '2px dashed var(--rule)' }}>
                {[
                  ['Day 1', 'Reserve name', 'Online', true],
                  ['Day 1', 'Form A', 'CAC', true],
                  ['Day 2', 'Pay at bank', 'Rokel', true],
                  ['Day 2', 'Submit', 'CAC counter 3', false],
                  ['Day 3', 'Collect cert', 'CAC', false],
                  ['Day 4', 'TIN', 'NRA', false],
                  ['Day 5', 'NASSIT', 'NASSIT HQ', false],
                ].map(([d, t, where, done], i) => (
                  <div key={i} style={{ position: 'relative', padding: '8px 0' }}>
                    <div style={{ position: 'absolute', left: -30, top: 10, width: 14, height: 14, borderRadius: '50%', background: done ? 'var(--accent)' : 'var(--paper)', border: '2px solid var(--rule)' }} />
                    <div className="small mono">{d}</div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{t}</div>
                    <div className="small">@ {where}</div>
                  </div>
                ))}
              </div>
              <PhoneTabBar />
            </div>
          </Phone>
          <Desk>
            <div className="col">
              <div className="between">
                <H lg>Your path to a registered business</H>
                <div className="row"><Badge>5 working days</Badge><Badge>3 offices</Badge></div>
              </div>
              <div style={{ display: 'flex', gap: 0, alignItems: 'stretch', marginTop: 12 }}>
                {[
                  ['Day 1','Reserve name\nFill Form A','CAC online'],
                  ['Day 2','Pay Le 50k\nSubmit form','Bank → CAC'],
                  ['Day 3','Pick up certificate','CAC'],
                  ['Day 4','Apply for TIN','NRA'],
                  ['Day 5','Register NASSIT','NASSIT HQ'],
                ].map(([d, what, where], i) => (
                  <div key={i} style={{ flex: 1, position: 'relative', padding: '0 8px' }}>
                    <div style={{ height: 4, background: i < 2 ? 'var(--accent)' : 'var(--ink-4)', borderRadius: 2 }} />
                    <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid var(--rule)', background: i < 2 ? 'var(--accent)' : 'var(--paper)', margin: '-11px auto 10px' }} />
                    <Box>
                      <div className="small mono">{d}</div>
                      <div style={{ fontWeight: 700, whiteSpace: 'pre-line' }}>{what}</div>
                      <div className="small mt-1">@ {where}</div>
                    </Box>
                  </div>
                ))}
              </div>
              <Divider />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <Box><Label>Total time</Label><H sm>5 days</H><div className="small">realistic · official says 3</div></Box>
                <Box><Label>Total cost</Label><H sm>Le 150,000</H><div className="small">Le 130k official + Le 20k incidentals</div></Box>
                <Box><Label>Offices to visit</Label><H sm>3</H><div className="small">CAC · Rokel Bank · NRA · NASSIT</div></Box>
              </div>
            </div>
          </Desk>
          <Caption>Best for multi-office, multi-day processes. Highlights the real shape.</Caption>
        </Variant>

        <Variant name="D — Budget / checklist card" tag="action mode">
          <Phone>
            <div className="col" style={{ gap: 10 }}>
              <Box soft>
                <Label>What you need to bring</Label>
                <div className="col" style={{ gap: 4 }}>
                  {[['NIN / National ID',true],['2 passport photos',true],['Le 155,000 cash',false],['Business name (3 options)',true],['Partner ID if company',false]].map(([t, d], i) => (
                    <div key={i} className="row"><span className={`ico ${d ? 'check' : ''}`} /><span className={d ? '' : 'small'} style={{ textDecoration: d ? 'line-through' : 'none' }}>{t}</span></div>
                  ))}
                </div>
              </Box>
              <Box>
                <Label>Money breakdown</Label>
                <div className="small"><span style={{ display: 'inline-block', width: 140 }}>Name reservation</span> <b>Le 10,000</b></div>
                <div className="small"><span style={{ display: 'inline-block', width: 140 }}>CAC filing fee</span> <b>Le 50,000</b></div>
                <div className="small"><span style={{ display: 'inline-block', width: 140 }}>Stamp duty</span> <b>Le 5,000</b></div>
                <div className="small"><span style={{ display: 'inline-block', width: 140 }}>TIN processing</span> <b>Le 20,000</b></div>
                <Divider />
                <div><b>Total  Le 85,000</b> <span className="small">(+ ~Le 65k transport/incidentals)</span></div>
              </Box>
              <Btn primary>Start this guide</Btn>
              <PhoneTabBar />
            </div>
          </Phone>
          <Desk>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              <div className="col">
                <H lg>Before you start</H>
                <P>This guide takes ~5 working days and Le 150,000. Here\u2019s everything you need lined up.</P>
                <Box>
                  <Label>Documents checklist</Label>
                  {['NIN / National ID card','2 passport photographs','3 proposed business names','Residential address proof','Partner ID (for company)'].map((d,i) => (
                    <div key={d} className="row" style={{ padding: '4px 0', borderBottom: '1.5px dashed var(--muted-line)' }}>
                      <span className={`ico ${i<3 ? 'check' : ''}`} />
                      <span className="grow">{d}</span>
                      {i >= 3 && <Btn xs>How to get</Btn>}
                    </div>
                  ))}
                </Box>
                <Box>
                  <Label>Fee breakdown</Label>
                  {[['Name reservation','10,000','CAC'],['Filing fee','50,000','CAC'],['Stamp duty','5,000','Govt'],['TIN processing','20,000','NRA'],['Transport / incidentals','~65,000','—']].map(([k,v,w]) => (
                    <div key={k} className="row" style={{ padding: '3px 0' }}>
                      <span style={{ width: 160 }}>{k}</span>
                      <span style={{ flex: 1 }} className="small mono">{w}</span>
                      <span><b>Le {v}</b></span>
                    </div>
                  ))}
                  <Divider />
                  <div className="between"><b>Total</b><b>Le 150,000</b></div>
                </Box>
              </div>
              <div className="col">
                <Box dashed>
                  <Label>Offices you\u2019ll visit</Label>
                  <div className="col" style={{ gap: 8 }}>
                    {[['CAC Headquarters','1 Lightfoot Boston St, Freetown','Mon–Fri · 9–4'],['Rokel Commercial Bank','Any branch','Mon–Sat · 8–3'],['NRA','Wellington','Mon–Fri · 9–3']].map(([n,a,h]) => (
                      <div key={n}>
                        <div style={{ fontWeight: 700 }}>{n}</div>
                        <div className="small">{a}</div>
                        <div className="small mono">{h}</div>
                      </div>
                    ))}
                  </div>
                </Box>
                <Box>
                  <Label>Estimated total</Label>
                  <div className="row" style={{ gap: 20 }}>
                    <div><div className="small">Money</div><H>Le 150k</H></div>
                    <div><div className="small">Time</div><H>5 days</H></div>
                    <div><div className="small">Trips</div><H>6</H></div>
                  </div>
                </Box>
                <Btn primary>Save this checklist</Btn>
              </div>
            </div>
          </Desk>
          <Caption>Practical. Doubles as printable prep sheet for low-bandwidth users.</Caption>
        </Variant>
      </div>
    </div>
  );
}

window.GuideScreen = GuideScreen;
