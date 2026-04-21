// Contribute flow — 4 variations

function ContributeScreen() {
  return (
    <div>
      <ScreenHead num="03" title="Contribute a Guide" sub="How a contributor submits a new procedure. Structured template, evidence upload, save-for-later, offline-tolerant." />
      <div className="grid">

        <Variant name="A — Form-first (structured template)" tag="baseline">
          <Phone>
            <div className="col" style={{ gap: 10 }}>
              <div className="small mono">CONTRIBUTE · DRAFT</div>
              <H sm>New guide</H>
              <Label>Title</Label>
              <Input ph="e.g. Register a small business" />
              <Label>Category</Label>
              <div className="row">{['Business','ID','Health','Tax'].map((c,i) => <Chip key={c} on={i===0}>{c}</Chip>)}</div>
              <Label>Country · Region</Label>
              <Input ph="Sierra Leone · Freetown" />
              <Label>Estimated time / cost</Label>
              <div className="row"><Input ph="2–3 days" /><Input ph="Le 150k" /></div>
              <Btn primary>Next: add steps →</Btn>
              <PhoneTabBar />
            </div>
          </Phone>
          <Desk>
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 18 }}>
              <div className="col">
                <Label>Progress</Label>
                {['1. Basics','2. Requirements','3. Steps','4. Fees','5. Offices','6. Evidence','7. Review'].map((s,i) => (
                  <div key={s} className="small" style={{ padding: '4px 0', fontWeight: i===0?700:400, color: i===0?'var(--accent)':'inherit' }}>{s}</div>
                ))}
              </div>
              <div className="col">
                <H lg>Start a new guide</H>
                <P>Tell us what this process is, where it happens, and how long it takes. You can always come back and edit.</P>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div><Label>Title</Label><Input ph="Register a business" /></div>
                  <div><Label>Category</Label><Input ph="Business ▾" /></div>
                  <div><Label>Country</Label><Input ph="Sierra Leone" /></div>
                  <div><Label>City / region</Label><Input ph="Freetown" /></div>
                  <div><Label>Estimated time</Label><Input ph="2–3 business days" /></div>
                  <div><Label>Estimated cost</Label><Input ph="Le 150,000" /></div>
                </div>
                <Label>Short description</Label>
                <Box dashed><Scribble /><div className="mt-1"><Scribble /></div><div className="mt-1"><Scribble style={{ width: '60%' }} /></div></Box>
                <div className="row" style={{ justifyContent: 'flex-end' }}><Btn ghost>Save draft</Btn><Btn primary>Next: Requirements →</Btn></div>
              </div>
            </div>
          </Desk>
          <Caption>Wizard. Low cognitive load. Saves on every step.</Caption>
        </Variant>

        <Variant name="B — Freeform capture, AI structures later" tag="novel / low-friction">
          <Phone>
            <div className="col" style={{ gap: 10 }}>
              <H sm>Tell us how you did it.</H>
              <P>Type, voice-note, or photograph your receipts. We\u2019ll organize.</P>
              <Box dashed style={{ minHeight: 200 }}>
                <Scribble /><div className="mt-1"><Scribble /></div>
                <div className="mt-1"><Scribble style={{ width: '80%' }} /></div>
                <div className="mt-2"><Scribble style={{ width: '40%' }} /></div>
              </Box>
              <div className="row"><Btn icon="plus">Photo</Btn><Btn icon="plus">Voice</Btn><Btn icon="plus">Text</Btn></div>
              <Btn primary>Let OpenSteps structure it →</Btn>
              <div className="small mono" style={{ textAlign: 'center' }}>your draft stays private until you publish</div>
              <PhoneTabBar />
            </div>
          </Phone>
          <Desk>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 18 }}>
              <div className="col">
                <H lg>Just tell us what happened.</H>
                <P>Brain-dump in any order. Include who you spoke to, what you paid, what you brought. We\u2019ll ask follow-ups and turn it into a guide.</P>
                <Box style={{ minHeight: 260 }}>
                  <div className="small hand" style={{ fontSize: 15, lineHeight: 1.6 }}>
                    first i went to CAC reserved the name took like 20 min, paid Le 10k at the counter… then the next day I filled form A at home printed it, went back and paid Le 50k at Rokel on Siaka Stevens, got two receipts yellow+white…
                  </div>
                  <Divider />
                  <div className="row"><Btn icon="plus" xs>Add photo</Btn><Btn icon="plus" xs>Add voice note</Btn><Btn xs>🎤 Dictate</Btn></div>
                </Box>
                <Btn primary>Structure this →</Btn>
              </div>
              <div className="col">
                <Box soft>
                  <Label>What we detected</Label>
                  <div className="col" style={{ gap: 6 }}>
                    {['CAC Freetown','Rokel Bank','Form A','Le 10k + Le 50k','~2 days','Yellow receipt'].map(t => <Chip key={t}>{t}</Chip>)}
                  </div>
                  <Divider />
                  <div className="small">We\u2019ll ask you 6 follow-up questions to finish the guide.</div>
                </Box>
                <Box dashed>
                  <Label>Drafts auto-saved</Label>
                  <div className="small">3 entries · last 12 min ago · offline-safe</div>
                </Box>
              </div>
            </div>
          </Desk>
          <Caption>Lowest-friction entry. Risk: variable output quality, needs editor pass.</Caption>
        </Variant>

        <Variant name="C — Step-by-step builder" tag="block editor">
          <Phone>
            <div className="col" style={{ gap: 8 }}>
              <div className="small mono">BUILDER · 3 steps so far</div>
              {[
                ['Reserve a business name','At CAC online portal',true],
                ['Fill out Form A','Download PDF',true],
                ['Pay at a commercial bank','Le 50,000',false],
              ].map(([t,s,d], i) => (
                <Box key={i}>
                  <div className="between">
                    <div>
                      <div className="small mono">Step {i+1}</div>
                      <div style={{ fontWeight: 700 }}>{t}</div>
                      <div className="small">{s}</div>
                    </div>
                    <div className="col" style={{ gap: 4, alignItems: 'flex-end' }}>
                      <span className="small mono">⋮⋮</span>
                      {d && <Badge ok>receipt</Badge>}
                    </div>
                  </div>
                </Box>
              ))}
              <Box dashed style={{ textAlign: 'center' }}><Btn icon="plus">Add step</Btn></Box>
              <PhoneTabBar />
            </div>
          </Phone>
          <Desk>
            <div className="col">
              <div className="between"><H lg>Building: Register a business</H><div className="row"><Btn>Preview</Btn><Btn primary>Submit for review</Btn></div></div>
              <div className="row"><Badge>7 steps</Badge><Badge>3 with evidence</Badge><Badge warn>fees not set</Badge></div>
              <Divider />
              <div className="col" style={{ gap: 8 }}>
                {[
                  ['Reserve a business name','CAC · online','Le 10,000','receipt.jpg'],
                  ['Fill Form A','CAC · download','—','form-a.pdf'],
                  ['Pay filing fee','Any commercial bank','Le 50,000','receipt.jpg'],
                  ['Submit form','CAC counter 3','—',null],
                ].map(([t, where, fee, att], i) => (
                  <Box key={i}>
                    <div style={{ display: 'grid', gridTemplateColumns: '30px 1fr 180px 140px 100px', gap: 10, alignItems: 'center' }}>
                      <div className="sk-avatar">{i+1}</div>
                      <div>
                        <div style={{ fontWeight: 700 }}>{t}</div>
                        <div className="small">{where}</div>
                      </div>
                      <div className="small">{fee}</div>
                      <div className="small mono">{att || '— no evidence'}</div>
                      <div className="row"><Btn xs>✎</Btn><Btn xs>⋮</Btn></div>
                    </div>
                  </Box>
                ))}
                <Box dashed style={{ textAlign: 'center' }}><Btn icon="plus">Add step</Btn></Box>
              </div>
            </div>
          </Desk>
          <Caption>Power-user mode. Great for editors seeding many guides.</Caption>
        </Variant>

        <Variant name="D — “Walk me through it” guided interview" tag="conversational">
          <Phone>
            <div className="col" style={{ gap: 10 }}>
              <Box soft><div className="small mono">OPENSTEPS</div><div>What\u2019s the first thing you did?</div></Box>
              <Box style={{ marginLeft: 30 }}><div className="small hand">I reserved the name online at CAC portal</div></Box>
              <Box soft><div className="small mono">OPENSTEPS</div><div>How long did that take?</div></Box>
              <Box style={{ marginLeft: 30 }}><div className="small hand">about 1 day</div></Box>
              <Box soft><div className="small mono">OPENSTEPS</div><div>Did you pay anything? Can you share the receipt?</div></Box>
              <Input ph="Type your answer…" right={<span>📎</span>} />
              <div className="small mono" style={{ textAlign: 'center' }}>step 1 of ~6</div>
              <PhoneTabBar />
            </div>
          </Phone>
          <Desk>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 18 }}>
              <div className="col">
                <H lg>Let\u2019s turn your experience into a guide.</H>
                <P>We\u2019ll ask plain questions. Your answers become the steps. You can edit anything at the end.</P>
                <Box>
                  <div className="col" style={{ gap: 8 }}>
                    <div><Label>Question 4 of ~10</Label><H sm>How much did you pay and where?</H></div>
                    <Input ph="e.g. Le 50,000 at Rokel Bank, Siaka Stevens branch" />
                    <div className="small mono">attach receipt (optional)</div>
                    <Box dashed style={{ minHeight: 90, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
                      <div><span className="ico plus" /> drop receipt photo here</div>
                    </Box>
                    <div className="row" style={{ justifyContent: 'flex-end' }}><Btn>Skip</Btn><Btn primary>Next →</Btn></div>
                  </div>
                </Box>
                <div className="row" style={{ justifyContent: 'center' }}>
                  {[1,2,3,4,5,6,7,8,9,10].map(i => <div key={i} style={{ width: 14, height: 6, background: i<=4 ? 'var(--accent)' : 'var(--paper-2)', border: '1.5px solid var(--rule)', borderRadius: 2 }} />)}
                </div>
              </div>
              <div className="col">
                <Box soft>
                  <Label>Built so far</Label>
                  <div className="col" style={{ gap: 4 }}>
                    <div className="small">✓ Process: Register a business</div>
                    <div className="small">✓ Step 1: Reserve name (1 day)</div>
                    <div className="small">✓ Step 2: Form A</div>
                    <div className="small" style={{ color: 'var(--ink-4)' }}>… Step 3: Payment</div>
                  </div>
                </Box>
                <Box dashed>
                  <Label>You can stop anytime</Label>
                  <div className="small">Your draft is saved after every answer. Return via SMS link.</div>
                </Box>
              </div>
            </div>
          </Desk>
          <Caption>Lowers barrier for first-time contributors. Civic-onboarding feel.</Caption>
        </Variant>

      </div>
    </div>
  );
}

window.ContributeScreen = ContributeScreen;
