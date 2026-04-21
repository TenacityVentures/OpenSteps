// Contribute a Guide — mix of A (wizard sidebar) + D (guided interview) + B (live detection)

const WIZARD_STEPS = [
  '1. Basics', '2. Requirements', '3. Steps', '4. Fees', '5. Offices', '6. Evidence', '7. Review'
];

const BUILT_SO_FAR = [
  { done: true,  text: 'Process: Register a business · Sierra Leone' },
  { done: true,  text: 'Step 1: Reserve name at CAC (1 day)' },
  { done: true,  text: 'Step 2: Fill Form A (download or collect)' },
  { done: false, text: 'Step 3: Payment — in progress…' },
];

const DETECTED = ['CAC Freetown','Rokel Bank','Form A','Le 10k + Le 50k','~2 days','Yellow receipt'];

function ContributeScreen() {
  return (
    <div>
      <ScreenHead
        num="03"
        title="Contribute a Guide"
        sub="Mix: A wizard sidebar progress + D guided interview questions + B live detection panel. Offline-tolerant."
      />
      <div className="grid">

        {/* ── Variant 1: Desktop wizard + guided questions ── */}
        <Variant name="Desktop — wizard + guided interview" tag="mix A+D · primary flow">
          <Desk url="opensteps.org/contribute">
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 280px', gap: 18 }}>

              {/* LEFT — Wizard steps */}
              <div className="col">
                <Label>Your progress</Label>
                <div className="col mt-1" style={{ gap: 2 }}>
                  {WIZARD_STEPS.map((s, i) => (
                    <div key={s} style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '6px 10px', borderRadius: 'var(--radius-sm)',
                      background: i === 2 ? 'var(--accent-soft)' : 'transparent',
                      color: i < 2 ? 'var(--text-3)' : i === 2 ? 'var(--accent)' : 'var(--text-2)',
                      fontWeight: i === 2 ? 600 : 400,
                      fontSize: 13,
                    }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: '50%', flex: 'none',
                        border: '2px solid ' + (i < 2 ? 'var(--accent)' : i === 2 ? 'var(--accent)' : 'var(--border-strong)'),
                        background: i < 2 ? 'var(--accent)' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, color: i < 2 ? 'white' : 'inherit',
                      }}>
                        {i < 2 ? '✓' : i + 1}
                      </div>
                      {s.replace(/^\d+\. /, '')}
                    </div>
                  ))}
                </div>
                <Divider />
                <Box soft style={{ fontSize: 12 }}>
                  <Label>Auto-saved</Label>
                  <div style={{ marginTop: 4 }}>Draft #3 · 12 min ago · offline-safe</div>
                </Box>
                <Btn ghost xs>Save & exit</Btn>
              </div>

              {/* CENTRE — Current question (guided interview) */}
              <div className="col">
                <div className="between">
                  <H>Building: Register a business</H>
                  <div className="row"><Badge>Step 3 · Fees</Badge></div>
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-3)' }}>
                  Question 4 of ~10
                </div>

                {/* Question card */}
                <Box style={{ border: '2px solid var(--accent)', borderRadius: 'var(--radius)' }}>
                  <H sm>How much did you pay and where?</H>
                  <P style={{ marginTop: 6 }}>Include the bank name, branch, and any stamp duty or other fees you paid separately.</P>
                  <div style={{ marginTop: 12 }}>
                    <Label>Your answer</Label>
                    <Input ph="e.g. Le 50,000 at Rokel Bank, Siaka Stevens branch" style={{ marginTop: 6 }} />
                  </div>

                  {/* Receipt drop zone */}
                  <div style={{ marginTop: 12 }}>
                    <Label>Receipt (optional — but very helpful)</Label>
                    <Box dashed style={{ minHeight: 100, display: 'grid', placeItems: 'center', textAlign: 'center', marginTop: 6, cursor: 'pointer' }}>
                      <div>
                        <div style={{ fontSize: 28, marginBottom: 6 }}>📎</div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>Drop receipt here</div>
                        <div className="small mono">or tap to choose · JPG · PDF · max 8MB</div>
                      </div>
                    </Box>
                  </div>
                </Box>

                {/* Progress dots */}
                <div className="row" style={{ justifyContent: 'center', gap: 6 }}>
                  {[1,2,3,4,5,6,7,8,9,10].map(i => (
                    <div key={i} style={{
                      width: 16, height: 5, borderRadius: 999,
                      background: i <= 4 ? 'var(--accent)' : 'var(--surface-3)',
                    }} />
                  ))}
                </div>

                <div className="row" style={{ justifyContent: 'flex-end', gap: 8 }}>
                  <Btn>← Back</Btn>
                  <Btn ghost>Skip</Btn>
                  <Btn primary>Next →</Btn>
                </div>

                {/* Previous chat history */}
                <Divider />
                <Label>Previous answers</Label>
                <div className="col" style={{ gap: 6 }}>
                  {[
                    ['What's the first thing you did?', 'Reserved the name online at CAC portal — took about 1 day.'],
                    ['Did you pay anything to reserve it?', 'Yes, Le 10,000 at the CAC counter.'],
                    ['How did you fill Form A?', 'Downloaded from CAC website, printed and filled at home.'],
                  ].map(([q, a], i) => (
                    <div key={i}>
                      <div style={{ fontSize: 12, color: 'var(--text-3)', fontStyle: 'italic' }}>{q}</div>
                      <div style={{ fontSize: 13, marginTop: 2, padding: '6px 10px', background: 'var(--surface-2)', borderRadius: 'var(--radius-sm)' }}>{a}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — Live detection + built so far */}
              <div className="col">
                <Box soft>
                  <Label>What we detected</Label>
                  <div className="row mt-1" style={{ gap: 6, flexWrap: 'wrap' }}>
                    {DETECTED.map(t => <Chip key={t}>{t}</Chip>)}
                  </div>
                  <Divider />
                  <div className="small">6 entities extracted from your answers. We'll ask follow-ups for anything missing.</div>
                </Box>

                <Box>
                  <Label>Built so far</Label>
                  <div className="col mt-1" style={{ gap: 5 }}>
                    {BUILT_SO_FAR.map((item, i) => (
                      <div key={i} className="row" style={{ gap: 6, alignItems: 'flex-start' }}>
                        <div style={{
                          width: 14, height: 14, borderRadius: 3, flex: 'none', marginTop: 1,
                          border: '2px solid ' + (item.done ? 'var(--accent)' : 'var(--border-strong)'),
                          background: item.done ? 'var(--accent)' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {item.done && <span style={{ color: 'white', fontSize: 9 }}>✓</span>}
                        </div>
                        <span style={{ fontSize: 12, color: item.done ? 'var(--text)' : 'var(--text-3)' }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </Box>

                <Box dashed>
                  <Label>You can stop anytime</Label>
                  <div className="small" style={{ marginTop: 4 }}>Draft saved after every answer. Return via email or SMS link. Works offline.</div>
                </Box>

                <Box>
                  <Label>Guide quality score</Label>
                  <TrustBar score={5.2} />
                  <div className="small mt-1">Add fees + 1 receipt to reach 7.0+</div>
                </Box>
              </div>
            </div>
          </Desk>
          <Caption>Wizard sidebar (A) + conversational questions (D) + live extraction panel (B). Lowest cognitive load.</Caption>
        </Variant>

        {/* ── Variant 2: Mobile guided interview ── */}
        <Variant name="Mobile — conversational interview" tag="mix D · one question at a time">
          <Phone>
            <div className="col" style={{ gap: 10 }}>
              <div className="between">
                <div className="small mono" style={{ fontWeight: 600 }}>STEP 3 · PAYMENT</div>
                <div className="row" style={{ gap: 4 }}>
                  {[1,2,3,4,5,6,7].map(i => (
                    <div key={i} style={{ width: 20, height: 4, borderRadius: 999, background: i <= 3 ? 'var(--accent)' : 'var(--surface-3)' }} />
                  ))}
                </div>
              </div>

              {/* Chat bubbles */}
              <Box soft style={{ borderLeft: '3px solid var(--accent)' }}>
                <div className="small mono" style={{ color: 'var(--accent)', fontWeight: 600 }}>OPENSTEPS</div>
                <div style={{ marginTop: 4, fontWeight: 600 }}>How much did you pay and where?</div>
              </Box>

              <Box style={{ marginLeft: 24 }}>
                <div style={{ fontSize: 13, fontStyle: 'italic' }}>Le 50,000 at Rokel Bank on Siaka Stevens street, got two receipts</div>
              </Box>

              <Box soft style={{ borderLeft: '3px solid var(--accent)' }}>
                <div className="small mono" style={{ color: 'var(--accent)', fontWeight: 600 }}>OPENSTEPS</div>
                <div style={{ marginTop: 4, fontWeight: 600 }}>Did you pay anything for stamp duty or a separate fee on top of that?</div>
              </Box>

              <Input ph="Type your answer…" right={<span style={{ fontSize: 16 }}>📎</span>} />

              <div className="small mono" style={{ textAlign: 'center', color: 'var(--text-3)' }}>question 4 of ~10 · draft auto-saved</div>

              {/* Built so far */}
              <Box soft style={{ fontSize: 12 }}>
                <Label>Built so far</Label>
                <div className="col mt-1" style={{ gap: 3 }}>
                  {BUILT_SO_FAR.slice(0,3).map((item, i) => (
                    <div key={i} className="row" style={{ gap: 6 }}>
                      <span>{item.done ? '✓' : '…'}</span>
                      <span style={{ color: item.done ? 'var(--text)' : 'var(--text-3)' }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </Box>

              <div className="row" style={{ justifyContent: 'flex-end', gap: 6 }}>
                <Btn>Skip</Btn>
                <Btn primary>Next →</Btn>
              </div>

              <PhoneTabBar active="Contribute" />
            </div>
          </Phone>
        </Variant>

        {/* ── Variant 3: Desktop step builder (C) ── */}
        <Variant name="Desktop — step-by-step builder" tag="variant C · power user">
          <Desk url="opensteps.org/contribute/builder">
            <div className="col">
              <div className="between">
                <H lg>Building: Register a business</H>
                <div className="row">
                  <Btn>Preview</Btn>
                  <Btn primary>Submit for review</Btn>
                </div>
              </div>
              <div className="row" style={{ gap: 6 }}>
                <Badge>4 steps added</Badge>
                <Badge ok>3 with evidence</Badge>
                <Badge warn>fees not complete</Badge>
              </div>
              <Divider />

              {/* Step table */}
              <div className="col" style={{ gap: 8 }}>
                {[
                  { n:1, title:'Reserve a business name',    where:'CAC · online', fee:'Le 10,000', att:'receipt.jpg',    has:true  },
                  { n:2, title:'Fill Form A',                where:'CAC · download', fee:'—',         att:'form-a.pdf',   has:true  },
                  { n:3, title:'Pay filing fee at bank',     where:'Any commercial bank', fee:'Le 50,000', att:'receipt.jpg', has:true },
                  { n:4, title:'Submit form at CAC counter', where:'CAC Counter 3', fee:'—',         att:null,           has:false },
                ].map((s) => (
                  <Box key={s.n} style={{ padding: '10px 14px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr 180px 140px 120px', gap: 10, alignItems: 'center' }}>
                      <Avatar style={{ width: 28, height: 28 }}>{s.n}</Avatar>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{s.title}</div>
                        <div className="small">{s.where}</div>
                      </div>
                      <div className="small" style={{ fontFamily: 'var(--mono)' }}>{s.fee}</div>
                      {s.att
                        ? <Badge ok>{s.att}</Badge>
                        : <Badge warn>no evidence</Badge>}
                      <div className="row" style={{ gap: 4 }}>
                        <Btn xs>Edit</Btn>
                        <Btn xs>⋮</Btn>
                      </div>
                    </div>
                  </Box>
                ))}
                <Box dashed style={{ textAlign: 'center', padding: 14, cursor: 'pointer' }}>
                  <Btn icon="plus">Add step</Btn>
                </Box>
              </div>
              <Caption>Power-user builder (C). Best for editors creating many guides rapidly.</Caption>
            </div>
          </Desk>
        </Variant>

        {/* ── Variant 4: Mobile freeform capture (B) ── */}
        <Variant name="Mobile — freeform brain-dump" tag="variant B · lowest friction">
          <Phone>
            <div className="col" style={{ gap: 10 }}>
              <H sm>Tell us how you did it.</H>
              <P style={{ fontSize: 12 }}>Type, voice-note, or photograph your receipts. We'll organize.</P>

              <Box style={{ minHeight: 180, fontSize: 13, lineHeight: 1.6, fontStyle: 'italic', color: 'var(--text-2)' }}>
                first i went to CAC reserved the name took like 20 min, paid Le 10k at the counter… then the next day I filled form A at home printed it, went back and paid Le 50k at Rokel on Siaka Stevens, got two receipts yellow+white…
                <Divider />
                <div className="row mt-1" style={{ gap: 6 }}>
                  <Btn xs icon="plus">Photo</Btn>
                  <Btn xs icon="plus">Voice</Btn>
                  <Btn xs>🎤 Dictate</Btn>
                </div>
              </Box>

              {/* Detection preview */}
              <Box soft>
                <Label>We detected</Label>
                <div className="row mt-1" style={{ gap: 5, flexWrap: 'wrap' }}>
                  {DETECTED.map(t => <Chip key={t}>{t}</Chip>)}
                </div>
                <Divider />
                <div className="small">We'll ask 6 follow-up questions to complete the guide.</div>
              </Box>

              <Btn primary>Let OpenSteps structure it →</Btn>
              <div className="small mono" style={{ textAlign: 'center', color: 'var(--text-3)' }}>draft stays private until you publish</div>

              <PhoneTabBar active="Contribute" />
            </div>
          </Phone>
        </Variant>

      </div>
    </div>
  );
}

window.ContributeScreen = ContributeScreen;
