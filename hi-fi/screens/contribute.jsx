// Contribute — A (wizard) + B (brain-dump) + C (block builder) + D (guided interview)

function DesktopWizard() {
  const steps = [
    ['Basics',         true],
    ['Requirements',   true],
    ['Steps',          'cur'],
    ['Fees',           false],
    ['Offices',        false],
    ['Evidence',       false],
    ['Review & submit',false],
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 260px', gap: 28 }}>
      {/* Progress rail */}
      <div>
        <Eyebrow>New guide · draft</Eyebrow>
        <H sm style={{ fontSize: 18, marginTop: 6 }}>Register a business</H>
        <div className="small" style={{ marginTop: 4 }}>Saved 2 min ago</div>

        <Divider />
        <Label>Progress · 3 of 7</Label>
        <div className="stack-4" style={{ marginTop: 10 }}>
          {steps.map(([s, state], i) => {
            const done = state === true;
            const cur  = state === 'cur';
            return (
              <div key={s} style={{
                display: 'grid', gridTemplateColumns: '22px 1fr', gap: 10, alignItems: 'center',
                padding: '6px 10px', borderRadius: 8,
                background: cur ? 'var(--accent-tint)' : 'transparent',
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  border: `1.5px solid ${done || cur ? 'var(--accent)' : 'var(--border-mid)'}`,
                  background: done ? 'var(--accent)' : 'var(--surface)',
                  color: '#fff', fontWeight: 800, fontSize: 11,
                  display: 'grid', placeItems: 'center',
                  boxShadow: cur ? '0 0 0 3px var(--accent-tint)' : 'none',
                }}>{done ? '✓' : ''}</div>
                <span style={{
                  fontWeight: cur ? 600 : 400, fontSize: 13,
                  color: done ? 'var(--text-3)' : cur ? 'var(--accent)' : 'var(--text-2)',
                }}>{i + 1}. {s}</span>
              </div>
            );
          })}
        </div>

        <Divider />
        <Box soft tight>
          <Label>Autosave</Label>
          <div className="small" style={{ marginTop: 6 }}>
            ✓ Draft saved locally<br/>
            ✓ Synced to your device queue<br/>
            ⏱ Offline-safe
          </div>
        </Box>
      </div>

      {/* Main form */}
      <div className="stack-14">
        <div className="between">
          <div>
            <H lg style={{ fontSize: 28, fontFamily: 'var(--serif)', fontWeight: 400 }}>Add the steps</H>
            <P>Break the process into small actions. Each step becomes a card in the final guide.</P>
          </div>
          <div className="row">
            <Btn ghost>Save draft</Btn>
            <Btn>← Back</Btn>
            <Btn primary>Next: Fees →</Btn>
          </div>
        </div>

        <Box>
          <Label>Steps so far · 3 added</Label>
          <div className="stack-10" style={{ marginTop: 12 }}>
            {[
              ['Reserve a business name', 'CAC · online portal', 'Le 10,000', 'receipt.jpg',   true],
              ['Fill Form A (CAC-BN-01)', 'CAC · download',      '—',         'form-a.pdf',    true],
              ['Pay filing fee at bank',  'Rokel / SLCB / UBA',  'Le 50,000', 'receipt.jpg',   true],
            ].map(([t, where, fee, att, done], i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '28px 24px 1fr 110px 140px auto', gap: 10, alignItems: 'center',
                padding: 12, background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 10,
              }}>
                <span className="mono" style={{ fontSize: 11, color: 'var(--text-3)', cursor: 'grab' }}>⋮⋮</span>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: 'var(--accent)', color: '#fff',
                  display: 'grid', placeItems: 'center',
                  fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700,
                }}>{i + 1}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{t}</div>
                  <div className="small" style={{ marginTop: 2 }}>{where}</div>
                </div>
                <span className="mono" style={{ fontSize: 12, fontWeight: 600 }}>{fee}</span>
                <div className="row" style={{ gap: 5 }}>
                  <Badge ok dot>{att}</Badge>
                </div>
                <div className="row" style={{ gap: 4 }}>
                  <Btn ghost xs>✎</Btn>
                  <Btn ghost xs>⋮</Btn>
                </div>
              </div>
            ))}

            <div style={{
              padding: 20, textAlign: 'center',
              border: '2px dashed var(--border-mid)', borderRadius: 10,
              background: 'var(--bg)',
            }}>
              <Btn primary icon="plus">Add a step</Btn>
              <div className="micro mono" style={{ marginTop: 8 }}>Tip: one concrete action per step. Keep it to the verb.</div>
            </div>
          </div>
        </Box>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Box soft>
            <Label>Why this matters</Label>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 16, marginTop: 8, lineHeight: 1.4 }}>
              Your guide fills a gap that cost the last citizen three days of wrong counters.
            </div>
          </Box>
          <Box soft>
            <Label>What we'll check</Label>
            <div className="stack-4 small" style={{ marginTop: 8 }}>
              <div>· Each step has a clear action verb</div>
              <div>· Offices and fees have sources</div>
              <div>· At least 1 evidence photo per paying step</div>
              <div>· Two independent verifiers before publish</div>
            </div>
          </Box>
        </div>
      </div>

      {/* Helper column */}
      <div className="stack-10" style={{ position: 'sticky', top: 12 }}>
        <Box raised>
          <Label>Live preview</Label>
          <div style={{ marginTop: 8, padding: 10, background: 'var(--bg)', borderRadius: 8 }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--text-3)' }}>SL › Business ›</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 18, lineHeight: 1.15, marginTop: 4 }}>Register a business</div>
            <div className="row" style={{ gap: 4, marginTop: 6 }}>
              <Badge>3 steps</Badge>
              <Badge>Le 60k so far</Badge>
              <Badge warn>draft</Badge>
            </div>
            <Divider dashed />
            <div className="stack-4" style={{ fontSize: 11 }}>
              <div style={{ display: 'flex', gap: 6 }}><span style={{ color: 'var(--accent)' }}>①</span>Reserve a business name</div>
              <div style={{ display: 'flex', gap: 6 }}><span style={{ color: 'var(--accent)' }}>②</span>Fill Form A</div>
              <div style={{ display: 'flex', gap: 6 }}><span style={{ color: 'var(--accent)' }}>③</span>Pay filing fee at bank</div>
            </div>
          </div>
        </Box>

        <Box>
          <Label>Helpers</Label>
          <div className="stack-6" style={{ marginTop: 8 }}>
            <div className="small">📋 Paste from WhatsApp</div>
            <div className="small">🎤 Dictate the next step</div>
            <div className="small">📷 Photograph your receipts</div>
            <div className="small">🤖 Let AI split a paragraph into steps</div>
          </div>
        </Box>

        <Box dashed>
          <Label>SMS fallback</Label>
          <div className="small" style={{ marginTop: 6 }}>
            Send "<span className="mono">OSADD</span>" to <b>1234</b> to continue this draft by SMS when you lose data.
          </div>
        </Box>
      </div>
    </div>
  );
}

// ── Mobile: guided interview (variant D) ──────────────────────────────────
function MobileGuidedInterview() {
  return (
    <>
      <MobileHeader title="Contribute" locale="Krio ▾" avatar="A" back />
      <div>
        <Eyebrow>Walk me through it</Eyebrow>
        <H sm style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 400, lineHeight: 1.2, marginTop: 4 }}>
          Just tell us what you did.
        </H>
        <P style={{ marginTop: 4, fontSize: 12.5 }}>We'll turn your answers into a structured guide. No step will be lost.</P>
      </div>

      <div className="between" style={{ fontSize: 11 }}>
        <span className="mono" style={{ color: 'var(--text-3)' }}>Question 4 of ~10</span>
        <div style={{ display: 'flex', gap: 2 }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} style={{
              width: 16, height: 5, borderRadius: 999,
              background: i < 4 ? 'var(--accent)' : 'var(--surface-3)',
            }} />
          ))}
        </div>
      </div>

      {/* Chat transcript */}
      <div className="stack-10">
        <div style={{
          padding: 10, background: 'var(--accent-tint)',
          border: '1px solid var(--accent-soft)', borderRadius: 14,
          borderBottomLeftRadius: 3, maxWidth: '85%',
        }}>
          <div className="mono" style={{ fontSize: 9.5, color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.08em' }}>OPENSTEPS · BOT</div>
          <div style={{ fontSize: 13.5, marginTop: 2 }}>What's the first thing you did?</div>
        </div>
        <div style={{
          padding: 10, background: 'var(--surface)',
          border: '1px solid var(--border)', borderRadius: 14,
          borderBottomRightRadius: 3, maxWidth: '85%', marginLeft: 'auto',
        }}>
          <div style={{ fontFamily: 'var(--hand)', fontSize: 14.5, color: 'var(--text-2)' }}>
            I reserved the name online at CAC portal. Took about 1 day.
          </div>
        </div>

        <div style={{
          padding: 10, background: 'var(--accent-tint)',
          border: '1px solid var(--accent-soft)', borderRadius: 14,
          borderBottomLeftRadius: 3, maxWidth: '85%',
        }}>
          <div className="mono" style={{ fontSize: 9.5, color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.08em' }}>OPENSTEPS · BOT</div>
          <div style={{ fontSize: 13.5, marginTop: 2 }}>Did you pay anything at this step?</div>
        </div>

        {/* Current question */}
        <Box accent style={{ padding: 14 }}>
          <Label>Answer</Label>
          <div style={{ fontWeight: 600, fontSize: 14.5, marginTop: 4 }}>How much did you pay, and where?</div>
          <Input style={{ marginTop: 10 }} ph="e.g. Le 10,000 at the CAC office" />
          <div className="row" style={{ marginTop: 10, justifyContent: 'space-between' }}>
            <Btn ghost xs icon="plus">Receipt photo</Btn>
            <div className="row">
              <Btn xs>Skip</Btn>
              <Btn primary xs>Next question →</Btn>
            </div>
          </div>
        </Box>
      </div>

      <Box dashed tight>
        <Label>Built so far</Label>
        <div className="stack-4" style={{ marginTop: 6, fontSize: 12.5 }}>
          <div className="row"><span style={{ color: 'var(--accent)' }}>✓</span>Process: Register a business</div>
          <div className="row"><span style={{ color: 'var(--accent)' }}>✓</span>Step 1: Reserve name · 1 day</div>
          <div className="row"><span style={{ color: 'var(--accent)' }}>✓</span>Step 2: Fill Form A</div>
          <div className="row muted"><span>⋯</span>Step 3: Payment (in progress)</div>
        </div>
      </Box>

      <div className="micro mono" style={{ textAlign: 'center', color: 'var(--text-3)' }}>
        Auto-saved · you can stop anytime
      </div>

      <div style={{ height: 64 }} />
      <PhoneTabBar active="contribute" />
    </>
  );
}

// ── Desktop: brain-dump → structured (variant B) ──────────────────────────
function DesktopBrainDump() {
  return (
    <div className="stack-14">
      <div className="between">
        <div>
          <Eyebrow>Freeform</Eyebrow>
          <H lg style={{ fontSize: 30, fontFamily: 'var(--serif)', fontWeight: 400, marginTop: 4 }}>
            Just tell us what happened.
          </H>
          <P>Brain-dump in any order. Include offices, payments, forms. We'll ask follow-ups and structure the guide.</P>
        </div>
        <Btn primary>Structure this →</Btn>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        <Box style={{ minHeight: 340, padding: 22 }}>
          <Label>Your notes</Label>
          <div style={{
            fontFamily: 'var(--hand)', fontSize: 16, lineHeight: 1.7,
            marginTop: 12, color: 'var(--text-2)',
          }}>
            first i went to CAC and reserved the name, took like 20 min, paid Le 10k at the counter…
            then the next day i filled form A at home, printed it, and went back to CAC.
            paid Le 50k at Rokel on Siaka Stevens, got TWO receipts — <span style={{ background: 'var(--amber-soft)', padding: '1px 4px', borderRadius: 3 }}>yellow + white</span>.
            handed in everything at counter 3 around 10am, got an intake slip…
          </div>
          <Divider dashed />
          <div className="row" style={{ gap: 6 }}>
            <Btn xs icon="plus">Add receipt photo</Btn>
            <Btn xs icon="plus">Add voice note</Btn>
            <Btn xs>🎤 Dictate</Btn>
            <span className="grow" />
            <span className="micro mono">247 words · auto-saved 10s ago</span>
          </div>
        </Box>

        <div className="stack-10">
          <Box soft>
            <div className="between">
              <Label>What we detected</Label>
              <Badge info>confidence 86%</Badge>
            </div>
            <div className="stack-6" style={{ marginTop: 10 }}>
              {[
                ['📍 Office',  'CAC Freetown'],
                ['📍 Office',  'Rokel · Siaka Stevens'],
                ['📄 Form',    'Form A (CAC-BN-01)'],
                ['💰 Payment', 'Le 10,000'],
                ['💰 Payment', 'Le 50,000'],
                ['⏱ Duration', '~2 days'],
                ['📎 Receipt', 'yellow + white carbons'],
              ].map(([k, v]) => (
                <div key={v} className="row" style={{ fontSize: 12.5 }}>
                  <span className="mono" style={{ width: 90, color: 'var(--text-3)', fontSize: 10 }}>{k}</span>
                  <Chip>{v}</Chip>
                </div>
              ))}
            </div>
            <Divider />
            <div className="small">
              We'll ask <b>6 follow-ups</b> to fill gaps, then generate a full draft.
            </div>
          </Box>

          <Box dashed>
            <Label>Privacy</Label>
            <div className="small" style={{ marginTop: 6 }}>
              · Draft stays on your device<br/>
              · Photos processed on-device<br/>
              · Nothing published until you press Publish
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

// ── Mobile: block builder (variant C-ish) ────────────────────────────────
function MobileBuilder() {
  return (
    <>
      <MobileHeader title="Builder" locale="Draft" avatar="A" back />
      <div className="between">
        <div>
          <div className="eyebrow">Building</div>
          <H sm style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 400 }}>Register a business</H>
        </div>
        <Btn primary xs>Preview →</Btn>
      </div>

      <div className="row" style={{ gap: 5 }}>
        <Badge ok>3 steps</Badge>
        <Badge>1 photo</Badge>
        <Badge warn>fees not set</Badge>
      </div>

      <div className="stack-10">
        {[
          ['Reserve a business name', 'CAC · online',   'Le 10,000', 'receipt.jpg'],
          ['Fill Form A',             'CAC / download', '—',          'form-a.pdf'],
          ['Pay filing fee',          'Rokel Bank',     'Le 50,000', 'receipt.jpg'],
        ].map(([t, w, f, a], i) => (
          <Box key={i} tight>
            <div className="between">
              <div className="row" style={{ gap: 8 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: 'var(--accent)', color: '#fff',
                  display: 'grid', placeItems: 'center',
                  fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700,
                }}>{i + 1}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{t}</div>
                  <div className="small" style={{ fontSize: 11 }}>{w}</div>
                </div>
              </div>
              <span className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>⋮⋮</span>
            </div>
            <div className="between" style={{ marginTop: 6 }}>
              <span className="mono" style={{ fontSize: 11, color: 'var(--text-2)' }}>{f}</span>
              <Badge ok dot>{a}</Badge>
            </div>
          </Box>
        ))}
        <div style={{
          padding: 16, textAlign: 'center',
          border: '2px dashed var(--border-mid)', borderRadius: 10,
        }}>
          <Btn primary xs icon="plus">Add step</Btn>
        </div>
      </div>

      <Box soft tight>
        <div className="row" style={{ gap: 6 }}>
          <span style={{ fontSize: 14 }}>💡</span>
          <div className="small" style={{ fontSize: 11.5 }}>
            Drag to reorder. Long-press for bulk actions.
          </div>
        </div>
      </Box>

      <Btn primary block>Submit for review →</Btn>
      <div style={{ height: 64 }} />
      <PhoneTabBar active="contribute" />
    </>
  );
}

// ── Screen ─────────────────────────────────────────────────────────────────
function ContributeScreen() {
  return (
    <div>
      <ScreenHead
        num="03"
        title="Contribute a Guide"
        sub="Wizard (A) + brain-dump to AI structure (B) + block builder (C) + guided interview (D). Pick the mode that fits the contributor: editor, citizen, power user, first-timer."
      />
      <div className="grid">

        <Variant name="Desktop · Structured wizard" tag="variant A · editor / power user">
          <Desk url="opensteps.org/contribute/new/steps" shell={{ active: 'contribute' }}>
            <DesktopWizard />
          </Desk>
          <Caption>Seven-step wizard with live preview and SMS fallback. Explicit progress rail, autosave state, and an inline "why this matters" frame to keep the contributor motivated.</Caption>
        </Variant>

        <Variant name="Mobile · Guided interview" tag="variant D · first-time citizen">
          <Phone>
            <MobileGuidedInterview />
          </Phone>
          <Caption>Chat-style interview with a clear question/answer rhythm. Krio switcher at top. SMS resume path. "Built so far" anchors progress at each turn.</Caption>
        </Variant>

        <Variant name="Desktop · Brain-dump → structured" tag="variant B · low-friction">
          <Desk url="opensteps.org/contribute/dump" shell={{ active: 'contribute' }}>
            <DesktopBrainDump />
          </Desk>
        </Variant>

        <Variant name="Mobile · Block builder" tag="variant C · repeat contributors">
          <Phone>
            <MobileBuilder />
          </Phone>
        </Variant>

      </div>
    </div>
  );
}

window.ContributeScreen = ContributeScreen;
