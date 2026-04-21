// Verification / Review — mix of A (queue + workbench) + C (diff view) + D (trust/reputation)

const QUEUE = [
  { id:1, guide:'Register a business · Step 3', what:'Fee updated Le 75k → Le 80k', who:'Amina M.',   when:'2h', type:'update',  needs:1 },
  { id:2, guide:'Passport renewal',              what:'New guide published · 6 steps', who:'Foday K.',   when:'5h', type:'new',    needs:2 },
  { id:3, guide:'NASSIT enrollment',             what:'Step 2 — office moved',         who:'Isatu C.',   when:'1d', type:'update',  needs:3 },
  { id:4, guide:"Driver's license · Step 5",    what:'Evidence added — road test',    who:'Editor Bash',when:'1d', type:'evidence',needs:2 },
  { id:5, guide:'TIN registration',              what:'Typo in fee amount fixed',       who:'Amina M.',   when:'2d', type:'update',  needs:1 },
  { id:6, guide:'Birth certificate',             what:'New evidence photos uploaded',   who:'Foday K.',   when:'2d', type:'evidence',needs:2 },
];

const VERIFIERS = [
  { name:'Amina M.',   avatar:'A', accuracy:'98%', count:'412', domains:['Business','ID'],    role:'verifier', streak:12 },
  { name:'Foday K.',   avatar:'F', accuracy:'94%', count:'208', domains:['Business'],         role:'verifier', streak:8  },
  { name:'Editor Bash',avatar:'E', accuracy:null,  count:'1,024',domains:['All'],             role:'editor',   streak:30 },
];

function VerifyScreen() {
  return (
    <div>
      <ScreenHead
        num="04"
        title="Verification / Review"
        sub="Mix: A queue + workbench + C diff view + D trust/reputation panel. Community validates every change."
      />
      <div className="grid">

        {/* ── Variant 1: Desktop full workbench ── */}
        <Variant name="Desktop — queue · diff · trust panel" tag="mix A+C+D · editor workbench">
          <Desk url="opensteps.org/review">
            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 240px', gap: 16, alignItems: 'start' }}>

              {/* LEFT — Review queue */}
              <div className="col">
                <div className="between">
                  <Label>Review queue</Label>
                  <Badge warn>{QUEUE.length} waiting</Badge>
                </div>
                <Input ph="filter…" style={{ marginTop: 4 }} />
                <div className="col" style={{ gap: 4, marginTop: 4 }}>
                  {QUEUE.map((item, i) => (
                    <div key={item.id} style={{
                      padding: '8px 10px', borderRadius: 'var(--radius-sm)',
                      border: '1px solid ' + (i === 0 ? 'var(--accent)' : 'var(--border)'),
                      background: i === 0 ? 'var(--accent-soft)' : 'var(--surface)',
                      cursor: 'pointer',
                    }}>
                      <div style={{ fontWeight: 600, fontSize: 12, lineHeight: 1.3 }}>{item.guide}</div>
                      <div className="small" style={{ marginTop: 2 }}>{item.what}</div>
                      <div className="between mt-1">
                        <span className="small mono">{item.who} · {item.when}</span>
                        <Badge warn>needs {item.needs} ✓</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CENTRE — Diff view */}
              <div className="col">
                <div className="between">
                  <H sm>Register a business · Step 3 — fee update</H>
                  <div className="row" style={{ gap: 6 }}>
                    <Badge ok>2 of 3 verified</Badge>
                    <Badge warn>1 more needed</Badge>
                  </div>
                </div>
                <div className="small mono" style={{ color: 'var(--text-3)' }}>
                  revision #34 by Amina M. · 2h ago · previously edited by Foday K. (Feb)
                </div>

                {/* Side-by-side diff */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 4 }}>
                  <Box style={{ border: '1px solid var(--border)' }}>
                    <div className="between" style={{ marginBottom: 8 }}>
                      <Label>Before · v33</Label>
                      <Badge>Foday K. · Feb</Badge>
                    </div>
                    <div style={{ fontSize: 13, lineHeight: 1.6 }}>
                      <div style={{ fontWeight: 600 }}>Step 3 — Pay the filing fee</div>
                      <div style={{ marginTop: 4 }}>
                        Deposit <span style={{ background: '#fee2e2', padding: '1px 4px', borderRadius: 3, textDecoration: 'line-through', color: '#991b1b' }}>Le 75,000</span> into the CAC Escrow account at any commercial bank. Keep both copies of the teller slip.
                      </div>
                    </div>
                  </Box>
                  <Box style={{ border: '2px solid var(--accent)' }}>
                    <div className="between" style={{ marginBottom: 8 }}>
                      <Label>After · v34 (proposed)</Label>
                      <Badge ok>Amina M. · today</Badge>
                    </div>
                    <div style={{ fontSize: 13, lineHeight: 1.6 }}>
                      <div style={{ fontWeight: 600 }}>Step 3 — Pay the filing fee</div>
                      <div style={{ marginTop: 4 }}>
                        Deposit <span style={{ background: '#dcfce7', padding: '1px 4px', borderRadius: 3, fontWeight: 700, color: '#166534' }}>Le 80,000</span> into the CAC Escrow account at any commercial bank. <span style={{ background: '#dcfce7', padding: '1px 4px', borderRadius: 3, color: '#166534' }}>New 2026 rate — confirmed at counter.</span>
                      </div>
                    </div>
                  </Box>
                </div>

                {/* Evidence attached */}
                <Box>
                  <Label>Evidence for this change</Label>
                  <div className="row mt-1" style={{ gap: 8 }}>
                    {['receipt · 14 Apr', 'counter sign · 14 Apr', 'email confirm'].map((e, i) => (
                      <Img key={i} style={{ width: 110, minHeight: 80 }}>{e}</Img>
                    ))}
                  </div>
                </Box>

                {/* Discussion */}
                <Box soft>
                  <Label>Discussion (3)</Label>
                  <div className="col mt-1" style={{ gap: 6, fontSize: 13 }}>
                    {[
                      ['Editor Bash', 'Matches what I saw Tuesday at CAC.'],
                      ['Isatu C.',    'Confirmed by phone with the counter.'],
                      ['Foday K.',    'Receipts look legit — approving.'],
                    ].map(([who, msg]) => (
                      <div key={who} className="row" style={{ alignItems: 'flex-start', gap: 8 }}>
                        <Avatar>{who[0]}</Avatar>
                        <div><b>{who}</b> {msg}</div>
                      </div>
                    ))}
                  </div>
                  <Input ph="Add a note…" style={{ marginTop: 8 }} right={<Btn primary xs>Post</Btn>} />
                </Box>

                {/* Verifier note */}
                <Box>
                  <Label>Submitter note</Label>
                  <div style={{ fontSize: 13, fontStyle: 'italic' }}>
                    "Confirmed at CAC this morning — new rate posted at counter." — <b>Amina M.</b>
                  </div>
                </Box>

                {/* Action buttons */}
                <div className="between">
                  <div className="row">
                    <Btn>✕ Reject</Btn>
                    <Btn>? Request info</Btn>
                  </div>
                  <div className="row">
                    <Btn primary>✓ Verify</Btn>
                    <Btn>⚡ Fast-track</Btn>
                  </div>
                </div>
              </div>

              {/* RIGHT — Trust + reputation */}
              <div className="col">
                <Label>Verifiers on this change</Label>
                {VERIFIERS.map(v => (
                  <Box key={v.name} style={{ padding: 10 }}>
                    <div className="between">
                      <div className="row" style={{ gap: 8 }}>
                        <Avatar>{v.avatar}</Avatar>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{v.name}</div>
                          <div className="small mono">{v.count} verifications</div>
                        </div>
                      </div>
                      {v.role === 'editor'
                        ? <span className="stamp">EDITOR</span>
                        : <Badge ok>{v.accuracy}</Badge>}
                    </div>
                    <div className="row mt-1" style={{ gap: 4, flexWrap: 'wrap' }}>
                      {v.domains.map(d => <Chip key={d} style={{ fontSize: 11, padding: '2px 8px' }}>{d}</Chip>)}
                    </div>
                  </Box>
                ))}

                <Divider />

                <Box soft>
                  <Label>Guide trust score</Label>
                  <TrustBar score={8.7} />
                  <div className="col mt-2" style={{ gap: 3, fontSize: 12 }}>
                    <div className="between"><span>Verifiers</span><b>12</b></div>
                    <div className="between"><span>Receipts</span><b>34</b></div>
                    <div className="between"><span>Open disputes</span><b style={{ color: 'var(--green)' }}>0</b></div>
                    <div className="between"><span>Last verified</span><b>14 Apr 2026</b></div>
                  </div>
                  <Divider />
                  <div className="small" style={{ color: 'var(--text-3)' }}>
                    Score = evidence quality × verifier reputation × recency
                  </div>
                </Box>

                <Box>
                  <Label>Your impact this week</Label>
                  <div className="row mt-1" style={{ gap: 16 }}>
                    <Stat label="Verified" value="47" />
                    <Stat label="Streak" value="8d 🔥" />
                  </div>
                </Box>

                <Box dashed>
                  <Label>Ground rules</Label>
                  <div className="small" style={{ marginTop: 4 }}>Confirm only if you've personally seen or can cross-reference. Evidence required for fee changes.</div>
                </Box>
              </div>
            </div>
          </Desk>
          <Caption>Queue (A) · side-by-side diff (C) · trust panel with reputation (D). Every change is inspectable.</Caption>
        </Variant>

        {/* ── Variant 2: Mobile card stack + swipe ── */}
        <Variant name="Mobile — claim card, swipe to verify" tag="variant B · volunteer-friendly">
          <Phone>
            <div className="col" style={{ gap: 10 }}>
              <div className="between">
                <H sm>Verify · 1 of 14</H>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--amber)', fontWeight: 700 }}>streak: 8 🔥</span>
              </div>

              {/* Stacked card effect */}
              <div style={{ position: 'relative', height: 340 }}>
                {[2, 1, 0].map(i => (
                  <div key={i} style={{
                    position: 'absolute', inset: 0,
                    transform: `translate(${i * 6}px, ${i * 6}px) rotate(${(i - 1) * -1.5}deg)`,
                    border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)',
                    padding: 14, background: 'var(--surface)',
                    boxShadow: 'var(--shadow-sm)',
                    zIndex: 5 - i, opacity: 1 - i * 0.15,
                  }}>
                    {i === 0 && (
                      <div className="col" style={{ gap: 8 }}>
                        <Label>Claim</Label>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>
                          "CAC filing fee is now Le 80,000 as of April 2026."
                        </div>
                        <div className="row" style={{ gap: 6 }}>
                          <Badge warn>2 / 3 verifications</Badge>
                          <Badge>0 disputes</Badge>
                        </div>
                        <Divider />
                        <Img style={{ minHeight: 110 }}>receipt photo · 14 Apr 2026</Img>
                        <div className="small">Amina M. · Freetown · 2 hours ago</div>
                        <div className="between" style={{ marginTop: 4 }}>
                          <Btn>← Reject</Btn>
                          <Btn ghost>Skip</Btn>
                          <Btn primary>Confirm →</Btn>
                        </div>
                        <div className="small mono" style={{ textAlign: 'center', color: 'var(--text-3)' }}>swipe left/right</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Box soft>
                <Label>Rules</Label>
                <div className="small" style={{ marginTop: 4 }}>Confirm only if you've personally seen it or can cross-reference. Evidence required for fees.</div>
              </Box>

              <PhoneTabBar active="Browse" />
            </div>
          </Phone>
        </Variant>

        {/* ── Variant 3: Desktop reputation board (D) ── */}
        <Variant name="Desktop — verifier reputation board" tag="variant D · radical transparency">
          <Desk url="opensteps.org/review/verifiers">
            <div className="col">
              <div className="between">
                <H lg>Who verified this, and how well.</H>
                <Btn>How verification works ↗</Btn>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[
                  { name:'Amina M.',   avatar:'A', acc:'98%', n:'412', domains:['Business','ID'],  since:'2024', active:'2h ago',  role:'verifier' },
                  { name:'Foday K.',   avatar:'F', acc:'94%', n:'208', domains:['Business'],        since:'2024', active:'4h ago',  role:'verifier' },
                  { name:'Editor Bash',avatar:'E', acc:null,  n:'1,024',domains:['All'],            since:'2023', active:'30m ago', role:'editor'   },
                ].map(v => (
                  <Box key={v.name}>
                    <div className="between">
                      <div className="row" style={{ gap: 10 }}>
                        <Avatar size={38}>{v.avatar}</Avatar>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14 }}>{v.name}</div>
                          <div className="small mono">since {v.since}</div>
                        </div>
                      </div>
                      {v.role === 'editor' ? <span className="stamp">EDITOR</span> : <Badge ok>{v.acc}</Badge>}
                    </div>
                    <Divider />
                    <div className="col" style={{ gap: 4, fontSize: 13 }}>
                      <div className="between"><span style={{ color:'var(--text-3)' }}>Verifications</span><b>{v.n}</b></div>
                      <div className="between"><span style={{ color:'var(--text-3)' }}>Last active</span><span>{v.active}</span></div>
                      <div className="between"><span style={{ color:'var(--text-3)' }}>Domains</span><span>{v.domains.join(', ')}</span></div>
                    </div>
                    <div className="row mt-1" style={{ gap: 4 }}>
                      {v.domains.map(d => <Chip key={d}>{d}</Chip>)}
                    </div>
                  </Box>
                ))}
              </div>

              <Divider />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Box>
                  <Label>Guide trust score breakdown</Label>
                  <div style={{ marginTop: 8 }}>
                    <TrustBar score={8.7} />
                  </div>
                  <div className="col mt-2" style={{ gap: 5 }}>
                    {[
                      ['Score','8.7 / 10'],['Verifiers','12'],['Receipts','34'],
                      ['Last verified','14 Apr 2026'],['Disputes open','0'],
                    ].map(([k,v]) => (
                      <div key={k} className="between" style={{ fontSize: 13 }}>
                        <span style={{ color:'var(--text-3)' }}>{k}</span><b>{v}</b>
                      </div>
                    ))}
                    <Divider />
                    <div className="small" style={{ color:'var(--text-3)' }}>
                      Score = evidence quality × verifier reputation × recency decay.{' '}
                      <u style={{ cursor:'pointer' }}>How we calculate</u>
                    </div>
                  </div>
                </Box>
                <Box soft>
                  <Label>Become a verifier</Label>
                  <P style={{ marginTop: 6 }}>Complete 5 verifications and pass a short accuracy test to become a trusted verifier.</P>
                  <div className="col mt-2" style={{ gap: 6 }}>
                    {[['✓ Complete 5 verifications', true],['✓ Accuracy test ≥ 85%', true],['→ Verifier badge granted', false]].map(([s, done]) => (
                      <div key={s} className="row" style={{ gap: 8 }}>
                        <div style={{
                          width: 18, height: 18, borderRadius: '50%', flex: 'none',
                          background: done ? 'var(--accent)' : 'var(--surface-3)',
                          border: '2px solid ' + (done ? 'var(--accent)' : 'var(--border-strong)'),
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {done && <span style={{ color:'white', fontSize:9, fontWeight:700 }}>✓</span>}
                        </div>
                        <span style={{ fontSize: 13 }}>{s.replace(/^[✓→] /,'')}</span>
                      </div>
                    ))}
                  </div>
                  <Btn primary style={{ marginTop: 8 }}>Apply to verify</Btn>
                </Box>
              </div>
              <Caption>Trust is earned, transparent, and decaying — high-reputation verifiers carry more weight.</Caption>
            </div>
          </Desk>
        </Variant>

        {/* ── Variant 4: Mobile review detail ── */}
        <Variant name="Mobile — review detail, before/after" tag="variant C · mobile diff">
          <Phone>
            <div className="col" style={{ gap: 8 }}>
              <div className="small mono" style={{ color: 'var(--text-3)' }}>STEP 3 · FILING FEE</div>
              <H sm>What changed</H>

              <Box style={{ background: '#fee2e2', border: '1px solid #fca5a5' }}>
                <Label>Before</Label>
                <div style={{ marginTop: 4, fontSize: 13, textDecoration: 'line-through', color: '#991b1b' }}>
                  Pay Le 75,000 at any commercial bank.
                </div>
              </Box>

              <Box style={{ background: '#dcfce7', border: '1px solid #86efac' }}>
                <Label>After</Label>
                <div style={{ marginTop: 4, fontSize: 13, color: '#166534', fontWeight: 600 }}>
                  Pay Le 80,000 at any commercial bank. New 2026 rate.
                </div>
              </Box>

              <Box>
                <Label>Evidence (2 receipts)</Label>
                <div className="row mt-1" style={{ gap: 6 }}>
                  <Img style={{ flex: 1, minHeight: 70 }}>receipt · 14 Apr</Img>
                  <Img style={{ flex: 1, minHeight: 70 }}>counter sign</Img>
                </div>
              </Box>

              <Box soft>
                <div style={{ fontSize: 13, fontStyle: 'italic' }}>
                  "Confirmed at CAC this morning — new rate posted at counter." — <b>Amina M.</b>
                </div>
              </Box>

              <div className="between">
                <div className="row"><Btn>✕ Reject</Btn><Btn>? Info</Btn></div>
                <Btn primary>✓ Approve</Btn>
              </div>

              <div className="small mono" style={{ textAlign: 'center', color: 'var(--text-3)' }}>2 of 3 verifications · 0 disputes</div>

              <PhoneTabBar active="Browse" />
            </div>
          </Phone>
        </Variant>

      </div>
    </div>
  );
}

window.VerifyScreen = VerifyScreen;
