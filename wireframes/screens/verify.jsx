// Verification / review workflow — 4 variations

function VerifyScreen() {
  return (
    <div>
      <ScreenHead num="04" title="Verification / Review" sub="How the community validates submissions. Diff view, evidence check, vote, editor fast-track." />
      <div className="grid">

        <Variant name="A — Queue + detail (classic review)" tag="editor workbench">
          <Phone>
            <div className="col" style={{ gap: 8 }}>
              <div className="between"><H sm>Review queue</H><span className="small mono">14 waiting</span></div>
              {[
                ['Register a business · Step 3','fee updated','Amina M.','2h'],
                ['Passport renewal','new guide','Foday K.','5h'],
                ['NASSIT enrollment','office moved','Isatu C.','1d'],
              ].map(([t, what, who, when]) => (
                <Box key={t}>
                  <div style={{ fontWeight: 700 }}>{t}</div>
                  <div className="small">{what}</div>
                  <div className="small mono mt-1">{who} · {when}</div>
                  <div className="row mt-1"><Btn xs>Review</Btn><Btn xs primary>✓</Btn><Btn xs>✕</Btn></div>
                </Box>
              ))}
              <PhoneTabBar />
            </div>
          </Phone>
          <Desk>
            <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 16 }}>
              <div className="col">
                <Label>Review queue · 14</Label>
                <Input ph="filter…" />
                <div className="col" style={{ gap: 6 }}>
                  {['Business · Step 3 fee','Passport renewal · new','NASSIT · office moved','Driver\u2019s license · Step 5','TIN · typo','Birth cert · evidence'].map((t, i) => (
                    <Box key={t} style={{ padding: 8, background: i===0 ? 'var(--accent-soft)' : 'transparent' }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{t}</div>
                      <div className="small mono">needs {3-i%3} more ✓</div>
                    </Box>
                  ))}
                </div>
              </div>
              <div className="col">
                <div className="between">
                  <H>Register a business · Step 3 — fee update</H>
                  <div className="row"><Badge>2 of 3 verifications</Badge><Badge warn>evidence pending</Badge></div>
                </div>
                <div className="small mono">Amina M. · 2h ago · previous author: Foday K.</div>
                <Divider />
                <Box>
                  <Label>Diff</Label>
                  <div className="mono small" style={{ lineHeight: 1.7 }}>
                    <div style={{ background: '#f5c7c2', padding: '0 6px' }}>- Pay Le 75,000 to CAC escrow account at any commercial bank.</div>
                    <div style={{ background: '#cfe9d1', padding: '0 6px' }}>+ Pay Le 80,000 to CAC escrow account at any commercial bank.</div>
                  </div>
                </Box>
                <Box>
                  <Label>Evidence attached</Label>
                  <div className="row">
                    <Img style={{ width: 120, minHeight: 80 }}>receipt · 14 Apr</Img>
                    <Img style={{ width: 120, minHeight: 80 }}>receipt · 12 Apr</Img>
                  </div>
                </Box>
                <Box soft>
                  <Label>Verifier notes</Label>
                  <div className="sk-p">“Confirmed at CAC this morning — new rate posted at counter.” <i>— Amina M.</i></div>
                </Box>
                <div className="between">
                  <div className="row"><Btn>✕ Reject</Btn><Btn>? Needs info</Btn></div>
                  <div className="row"><Btn primary>✓ Verify</Btn><Btn>Fast-track</Btn></div>
                </div>
              </div>
            </div>
          </Desk>
          <Caption>Workbench for active reviewers. Diff is the core.</Caption>
        </Variant>

        <Variant name="B — Single-card stack (Tinder-style triage)" tag="novel / fast">
          <Phone>
            <div className="col" style={{ gap: 10 }}>
              <div className="between"><H sm>Verify · 1 of 14</H><span className="small mono">streak: 8 🔥</span></div>
              <Box style={{ minHeight: 320, position: 'relative', transform: 'rotate(-1deg)' }}>
                <Label>Claim</Label>
                <div style={{ fontWeight: 700 }}>“CAC filing fee is now Le 80,000”</div>
                <Divider />
                <Img style={{ minHeight: 110 }}>receipt photo · 14 Apr</Img>
                <div className="small mt-1">Amina M. · 2h ago · Freetown</div>
                <div className="small mono mt-1">2 / 3 verifications needed</div>
              </Box>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <Btn>✕ Reject</Btn><Btn>? Skip</Btn><Btn primary>✓ Confirm</Btn>
              </div>
              <div className="small mono" style={{ textAlign: 'center' }}>swipe left/right on mobile</div>
              <PhoneTabBar />
            </div>
          </Phone>
          <Desk>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 18 }}>
              <div className="col" style={{ alignItems: 'center' }}>
                <div style={{ position: 'relative', width: 420 }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{
                      position: i===0 ? 'relative' : 'absolute', inset: 0,
                      transform: `translate(${i*8}px, ${i*8}px) rotate(${(i-0.5)*-2}deg)`,
                      border: '2px solid var(--rule)', borderRadius: 12, padding: 18, background: 'var(--paper)',
                      zIndex: 5 - i, opacity: 1 - i*0.2,
                    }}>
                      <Label>Claim {i+1}</Label>
                      <H sm>“CAC filing fee is now Le 80,000 as of April 2026.”</H>
                      <Divider />
                      <div className="row">
                        <Img style={{ width: 140, minHeight: 90 }}>receipt</Img>
                        <Img style={{ width: 140, minHeight: 90 }}>counter photo</Img>
                      </div>
                      <div className="small mt-1">Amina M. · Freetown · 2 hours ago</div>
                      <div className="small mono">2 of 3 verifications · 0 disputes</div>
                    </div>
                  ))}
                </div>
                <div className="row mt-3" style={{ gap: 24 }}>
                  <Btn>✕ Reject</Btn>
                  <Btn>? Needs info</Btn>
                  <Btn primary>✓ Confirm</Btn>
                </div>
                <div className="small mono mt-2">keyboard: ← reject   ↑ skip   → confirm</div>
              </div>
              <div className="col">
                <Box soft>
                  <Label>Your impact this week</Label>
                  <div className="row" style={{ gap: 20 }}>
                    <div><div className="small">Verified</div><H sm>47</H></div>
                    <div><div className="small">Streak</div><H sm>8 days</H></div>
                  </div>
                </Box>
                <Box dashed>
                  <Label>Rules</Label>
                  <div className="small">Confirm only if you\u2019ve personally seen or can cross-reference. Evidence required for fees.</div>
                </Box>
                <Box><Label>Next</Label><div className="small">13 more in queue · 2 need editor review</div></Box>
              </div>
            </div>
          </Desk>
          <Caption>Volunteer-friendly. Gamifies the chore. Keep stakes clear.</Caption>
        </Variant>

        <Variant name="C — Side-by-side then/now (diff view)" tag="transparency">
          <Phone>
            <div className="col" style={{ gap: 8 }}>
              <H sm>Before → After</H>
              <div className="small mono">Step 3 · filing fee</div>
              <Box>
                <Label>Before</Label>
                <div className="small" style={{ textDecoration: 'line-through', color: 'var(--ink-3)' }}>Pay Le 75,000 at any commercial bank.</div>
              </Box>
              <Box style={{ borderColor: 'var(--accent)' }}>
                <Label>After</Label>
                <div>Pay <b>Le 80,000</b> at any commercial bank.</div>
              </Box>
              <div className="row"><Btn>✕</Btn><Btn primary>✓ Approve</Btn></div>
              <PhoneTabBar />
            </div>
          </Phone>
          <Desk>
            <div className="col">
              <H lg>What exactly changed?</H>
              <div className="small mono">Register a business · revision #34 by Amina M. · 2h ago</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
                <Box>
                  <div className="between"><Label>Before · v33</Label><Badge>Foday K. · Feb</Badge></div>
                  <div style={{ lineHeight: 1.6 }}>
                    <div><b>Step 3 — Pay the filing fee</b></div>
                    <div className="small">Deposit <s>Le 75,000</s> into the CAC Escrow account at any commercial bank. Keep both copies of the teller slip.</div>
                  </div>
                </Box>
                <Box style={{ borderColor: 'var(--accent)' }}>
                  <div className="between"><Label>After · v34 (proposed)</Label><Badge ok>Amina M. · today</Badge></div>
                  <div style={{ lineHeight: 1.6 }}>
                    <div><b>Step 3 — Pay the filing fee</b></div>
                    <div className="small">Deposit <b style={{ background: 'var(--accent-soft)' }}>Le 80,000</b> into the CAC Escrow account at any commercial bank. <b style={{ background: 'var(--accent-soft)' }}>New 2026 rate — confirmed at counter.</b></div>
                  </div>
                </Box>
              </div>
              <Divider />
              <div className="row" style={{ gap: 18, alignItems: 'flex-start' }}>
                <Box style={{ flex: 1 }}>
                  <Label>Evidence for the change</Label>
                  <div className="row">
                    <Img style={{ width: 120, minHeight: 80 }}>receipt · 14 Apr</Img>
                    <Img style={{ width: 120, minHeight: 80 }}>counter sign</Img>
                    <Img style={{ width: 120, minHeight: 80 }}>email confirm</Img>
                  </div>
                </Box>
                <Box style={{ width: 220 }}>
                  <Label>Discussion (3)</Label>
                  <div className="small"><b>Bash:</b> matches what I saw Tuesday.</div>
                  <div className="small"><b>Isatu:</b> confirmed by phone w/ counter.</div>
                  <div className="small"><b>Foday:</b> receipts look legit.</div>
                </Box>
              </div>
              <div className="between mt-2">
                <div className="small mono">2 of 3 verifications · 0 disputes · evidence ✓</div>
                <div className="row"><Btn>Request changes</Btn><Btn primary>Approve & publish</Btn></div>
              </div>
            </div>
          </Desk>
          <Caption>Maximum transparency. Every change is inspectable.</Caption>
        </Variant>

        <Variant name="D — Public validation + reputation" tag="radical transparency">
          <Phone>
            <div className="col" style={{ gap: 8 }}>
              <H sm>Verifiers</H>
              <Box>
                <div className="between"><b>Amina M.</b><Badge ok>98% accurate</Badge></div>
                <div className="small">412 verifications · contributor since 2024</div>
              </Box>
              <Box>
                <div className="between"><b>Foday K.</b><Badge ok>94%</Badge></div>
                <div className="small">208 verifications · business domain</div>
              </Box>
              <Box dashed>
                <div className="between"><b>Editor Bash</b><span className="stamp">EDITOR</span></div>
                <div className="small">Can fast-track · 38 guides owned</div>
              </Box>
              <Btn primary>Apply to verify</Btn>
              <PhoneTabBar />
            </div>
          </Phone>
          <Desk>
            <div className="col">
              <div className="between"><H lg>Who verified this, and how well.</H><Btn>How verification works</Btn></div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[
                  ['Amina M.','98%','412',['business','ID']],
                  ['Foday K.','94%','208',['business']],
                  ['Editor Bash','EDITOR','1,024',['all']],
                ].map(([name, acc, n, domains]) => (
                  <Box key={name}>
                    <div className="row"><Avatar>{name[0]}</Avatar><div className="grow"><b>{name}</b><div className="small mono">since 2024</div></div>{acc === 'EDITOR' ? <span className="stamp">EDITOR</span> : <Badge ok>{acc}</Badge>}</div>
                    <Divider />
                    <div className="small"><b>{n}</b> verifications · domains: {domains.join(', ')}</div>
                    <div className="small mono mt-1">last active 2h ago · Freetown</div>
                  </Box>
                ))}
              </div>
              <Divider />
              <H sm>Guide trust score</H>
              <Box>
                <div className="row" style={{ gap: 20, flexWrap: 'wrap' }}>
                  <div><Label>Score</Label><H>8.7 / 10</H></div>
                  <div><Label>Verifiers</Label><H sm>12</H></div>
                  <div><Label>Receipts</Label><H sm>34</H></div>
                  <div><Label>Last verified</Label><H sm>14 Apr 2026</H></div>
                  <div><Label>Disputes open</Label><H sm>0</H></div>
                </div>
                <Divider />
                <div className="small">Score = evidence quality × verifier reputation × recency. <u>How we calculate</u>.</div>
              </Box>
            </div>
          </Desk>
          <Caption>Shifts trust from authority to reputation. Radical transparency principle.</Caption>
        </Variant>

      </div>
    </div>
  );
}

window.VerifyScreen = VerifyScreen;
