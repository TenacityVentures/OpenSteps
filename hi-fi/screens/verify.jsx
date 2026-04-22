// Verification / Review — 4 variants
// A: editor workbench · B: card-swipe triage · C: then/now diff · D: public validation + reputation

const V_QUEUE = [
  { t:'Register a business · Step 3', what:'Fee updated Le 75,000 → Le 80,000', who:'Amina M.', when:'2h ago', type:'fee',      need:1, active:true  },
  { t:'Passport renewal',              what:'New guide proposed · 6 steps',      who:'Foday K.',  when:'5h ago', type:'new',      need:2 },
  { t:'NASSIT enrollment',             what:'Step 2 office moved',               who:'Isatu C.',  when:'1d ago', type:'move',     need:3 },
  { t:"Driver's license · Step 5",     what:'Evidence added — road test',        who:'Editor B.', when:'1d ago', type:'evidence', need:2 },
  { t:'TIN registration',              what:'Typo in fee amount',                who:'Amina M.',  when:'2d ago', type:'edit',     need:1 },
  { t:'Birth certificate',             what:'New receipt photos uploaded',       who:'Foday K.',  when:'3d ago', type:'evidence', need:2 },
];

const V_PEOPLE = [
  { name:'Amina M.',    initial:'A', acc:'98%', count:'412',  domains:['Business','ID'],      since:'2024', loc:'Freetown',  active:'2h ago',  role:'verifier', streak:12 },
  { name:'Foday K.',    initial:'F', acc:'94%', count:'208',  domains:['Business'],           since:'2024', loc:'Bo',        active:'4h ago',  role:'verifier', streak:8  },
  { name:'Isatu C.',    initial:'I', acc:'91%', count:'147',  domains:['Health','NASSIT'],    since:'2025', loc:'Freetown',  active:'1d ago',  role:'verifier', streak:5  },
  { name:'Editor Bash', initial:'B', acc:null,  count:'1,024',domains:['All'],                since:'2024', loc:'Freetown',  active:'30m ago', role:'editor',   streak:30 },
];

function DesktopWorkbench() {
  return (
    <Desk url="opensteps.org/verify" shell={{ active: 'verify' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 280px', gap: 18, alignItems: 'start' }}>

        {/* Queue */}
        <div className="col" style={{ gap: 10 }}>
          <div className="between">
            <Eyebrow>Review queue</Eyebrow>
            <Badge warn>14 waiting</Badge>
          </div>
          <Input ph="filter by guide, author…" />
          <div className="col" style={{ gap: 6 }}>
            {V_QUEUE.map((q, i) => (
              <div key={q.t} className={`queue-row ${q.active ? 'active' : ''}`}>
                <div className="between" style={{ gap: 6 }}>
                  <div style={{ fontWeight: 700, fontSize: 'var(--t-sm)' }}>{q.t}</div>
                  <span className={`tag tag-${q.type}`}>{q.type}</span>
                </div>
                <div className="small" style={{ color: 'var(--text-3)' }}>{q.what}</div>
                <div className="between small mono" style={{ marginTop: 4 }}>
                  <span>{q.who}</span>
                  <span>{q.when} · needs {q.need}</span>
                </div>
              </div>
            ))}
          </div>
          <Divider />
          <div className="col" style={{ gap: 4 }}>
            <Eyebrow>Filters</Eyebrow>
            <div className="row" style={{ flexWrap: 'wrap', gap: 4 }}>
              <Chip active>Mine</Chip><Chip>Business</Chip><Chip>ID</Chip><Chip>Fees</Chip>
            </div>
          </div>
        </div>

        {/* Workbench */}
        <div className="col" style={{ gap: 14 }}>
          <div className="between">
            <div>
              <Eyebrow>Open</Eyebrow>
              <H lg>Register a business — Step 3 · fee update</H>
              <div className="small mono" style={{ color: 'var(--text-3)' }}>
                Revision #34 · proposed by Amina M. · 2h ago · previous author Foday K.
              </div>
            </div>
            <div className="row">
              <Badge info>2 of 3 verifications</Badge>
              <Badge warn>evidence pending</Badge>
            </div>
          </div>

          <div className="diff-card">
            <div className="between">
              <Label>What changed</Label>
              <span className="small mono" style={{ color: 'var(--text-3)' }}>1 line · 1 paragraph</span>
            </div>
            <DiffLine kind="rem">Pay <b>Le 75,000</b> to CAC escrow account at any commercial bank.</DiffLine>
            <DiffLine kind="add">Pay <b>Le 80,000</b> to CAC escrow account at any commercial bank.</DiffLine>
            <DiffLine kind="add">New 2026 rate — confirmed at counter on 14 April.</DiffLine>
          </div>

          <div className="evidence-row">
            <Label>Evidence (3)</Label>
            <div className="row" style={{ gap: 10, marginTop: 6, alignItems: 'flex-start' }}>
              <Receipt tilt={-1.5} name="Issued to" amount="Le 80,000" date="14 Apr 2026" scale={0.7} />
              <Receipt tilt={2}    name="Issued to" amount="Le 80,000" date="14 Apr 2026" scale={0.7} />
              <Box dashed style={{ minWidth: 140, textAlign: 'center', paddingTop: 18 }}>
                <div style={{ fontSize: 26 }}>📧</div>
                <div className="small mono">email confirm</div>
                <div className="small" style={{ color: 'var(--text-3)' }}>CAC registry · 15 Apr</div>
              </Box>
            </div>
          </div>

          <Box soft>
            <Label>Verifier note</Label>
            <div style={{ fontSize: 'var(--t-md)' }}>
              <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
                “Confirmed at the CAC counter this morning — new rate posted by the cashier.”
              </span>
              <span className="small mono" style={{ marginLeft: 8, color: 'var(--text-3)' }}>— Amina M.</span>
            </div>
          </Box>

          <div className="discussion">
            <Label>Discussion · 3</Label>
            <div className="msg"><Avatar sm color="amber">B</Avatar><div><b>Bash:</b> matches what I saw Tuesday.</div></div>
            <div className="msg"><Avatar sm color="teal">I</Avatar><div><b>Isatu:</b> confirmed by phone with the counter.</div></div>
            <div className="msg"><Avatar sm color="coral">F</Avatar><div><b>Foday:</b> receipts look legit, +1 to approve.</div></div>
          </div>

          <div className="between" style={{ borderTop: '1px solid var(--rule)', paddingTop: 12 }}>
            <div className="row">
              <Btn>✕ Reject</Btn>
              <Btn>? Needs info</Btn>
            </div>
            <div className="row">
              <Btn primary>✓ Verify</Btn>
              <Btn soft>⚡ Fast-track</Btn>
            </div>
          </div>
        </div>

        {/* Trust rail */}
        <div className="col" style={{ gap: 10 }}>
          <Box raised>
            <Eyebrow>Guide trust</Eyebrow>
            <div className="row" style={{ alignItems: 'baseline', gap: 6 }}>
              <H xl style={{ fontFamily: 'var(--serif)' }}>8.7</H>
              <span className="small mono" style={{ color: 'var(--text-3)' }}>/ 10</span>
            </div>
            <TrustBar value={87} />
            <div className="small" style={{ color: 'var(--text-3)' }}>12 verifiers · 34 receipts · 0 disputes</div>
          </Box>

          <Box>
            <Label>On this revision</Label>
            <div className="col" style={{ gap: 6, marginTop: 4 }}>
              {V_PEOPLE.slice(0,3).map(p => (
                <div key={p.name} className="row" style={{ alignItems: 'center' }}>
                  <Avatar sm color={p.initial}>{p.initial}</Avatar>
                  <div className="grow">
                    <div style={{ fontWeight: 600, fontSize: 'var(--t-sm)' }}>{p.name}</div>
                    <div className="small mono" style={{ color: 'var(--text-3)' }}>{p.count} verifications</div>
                  </div>
                  {p.acc ? <Badge ok>{p.acc}</Badge> : <span className="stamp tiny">EDITOR</span>}
                </div>
              ))}
            </div>
          </Box>

          <Box dashed>
            <Label>Checklist before verify</Label>
            <CheckRow done>Evidence uploaded</CheckRow>
            <CheckRow done>Matches primary source</CheckRow>
            <CheckRow>Confirmed independently</CheckRow>
            <CheckRow>No open disputes</CheckRow>
          </Box>

          <Box>
            <Label>Activity</Label>
            <Sparkline points={[3,5,4,8,7,11,9]} />
            <div className="small mono" style={{ color: 'var(--text-3)' }}>47 reviews this week</div>
          </Box>
        </div>

      </div>
    </Desk>
  );
}

function MobileQueue() {
  return (
    <Phone>
      <MobileHeader title="Review queue" sub="14 waiting · 3 urgent" avatar />
      <div className="col" style={{ padding: 'var(--sp-3)', gap: 10 }}>
        <div className="row" style={{ flexWrap: 'wrap', gap: 4 }}>
          <Chip active>All</Chip><Chip>Fees</Chip><Chip>Evidence</Chip><Chip>New</Chip>
        </div>
        {V_QUEUE.slice(0,4).map((q, i) => (
          <Box key={q.t} raised={i===0} style={{ padding: 10 }}>
            <div className="between">
              <span className={`tag tag-${q.type}`}>{q.type}</span>
              <span className="small mono" style={{ color: 'var(--text-3)' }}>{q.when}</span>
            </div>
            <div style={{ fontWeight: 700, marginTop: 4 }}>{q.t}</div>
            <div className="small" style={{ color: 'var(--text-3)' }}>{q.what}</div>
            <div className="between" style={{ marginTop: 8 }}>
              <div className="row" style={{ gap: 6 }}>
                <Avatar sm color={q.who[0]}>{q.who[0]}</Avatar>
                <span className="small mono">{q.who}</span>
              </div>
              <div className="row" style={{ gap: 4 }}>
                <Btn xs>✕</Btn>
                <Btn xs primary>Review</Btn>
              </div>
            </div>
          </Box>
        ))}
      </div>
      <PhoneTabBar active="verify" />
    </Phone>
  );
}

// ────────── B · Card-swipe triage
function DesktopSwipeDeck() {
  return (
    <Desk url="opensteps.org/verify/triage" shell={{ active: 'verify' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'start' }}>
        <div className="col" style={{ alignItems: 'center', gap: 14 }}>
          <div className="between" style={{ width: 520 }}>
            <div>
              <Eyebrow>Triage</Eyebrow>
              <H lg>Verify · 1 of 14</H>
            </div>
            <div className="row" style={{ gap: 6 }}>
              <Badge solid>🔥 Streak · 8</Badge>
              <Badge info>47 this week</Badge>
            </div>
          </div>

          <div className="swipe-stack" style={{ width: 520, height: 400 }}>
            {[0,1,2].map(i => (
              <div key={i} className="swipe-card" style={{
                zIndex: 5 - i,
                transform: `translate(${i*-4}px, ${i*10}px) rotate(${(i-1)*-1.4}deg)`,
                opacity: 1 - i*0.18,
              }}>
                <div className="between">
                  <Label>Claim</Label>
                  <span className="tag tag-fee">fee</span>
                </div>
                <div style={{ fontFamily:'var(--serif)', fontSize:'var(--t-xl)', lineHeight:1.25, marginTop:6 }}>
                  “CAC filing fee is now <b>Le 80,000</b> as of April 2026.”
                </div>
                <div className="row" style={{ gap: 10, marginTop: 14 }}>
                  <Receipt name="Issued to" amount="Le 80,000" date="14 Apr" scale={0.65} tilt={-1} />
                  <div className="col" style={{ gap:6, flex:1 }}>
                    <Box soft style={{ padding: 8 }}>
                      <Label>Author</Label>
                      <div className="row">
                        <Avatar sm color="green">A</Avatar>
                        <div>
                          <div style={{ fontWeight:700, fontSize:'var(--t-sm)' }}>Amina M.</div>
                          <div className="small mono" style={{ color:'var(--text-3)' }}>98% · 412 verified</div>
                        </div>
                      </div>
                    </Box>
                    <Box style={{ padding: 8 }}>
                      <Label>Status</Label>
                      <div className="small mono">2 of 3 · 0 disputes</div>
                      <ProgressBar value={66} />
                    </Box>
                  </div>
                </div>
                <div className="small mono" style={{ color:'var(--text-3)', marginTop: 10 }}>
                  Freetown · 2h ago · cross-references v33
                </div>
              </div>
            ))}
          </div>

          <div className="row" style={{ gap: 18, marginTop: 6 }}>
            <Btn lg>✕ Reject</Btn>
            <Btn lg>? Skip</Btn>
            <Btn lg primary>✓ Confirm</Btn>
          </div>
          <div className="small mono" style={{ color:'var(--text-3)' }}>keyboard · ← reject   ↑ skip   → confirm</div>
        </div>

        <div className="col" style={{ gap: 10 }}>
          <Box raised>
            <Eyebrow>Your impact</Eyebrow>
            <div className="row" style={{ gap: 14, marginTop: 6 }}>
              <Stat label="Verified" value="47" sub="this week" />
              <Stat label="Streak" value="8d" sub="🔥" />
            </div>
            <Sparkline points={[2,4,3,6,5,9,8]} accent />
          </Box>
          <Box>
            <Label>Leaderboard · this week</Label>
            <div className="col" style={{ gap: 6, marginTop: 4 }}>
              {[['Amina M.', 63, 'A'],['You', 47, 'D'],['Foday K.', 41, 'F'],['Isatu C.', 38, 'I']].map(([n,c,ini],i) => (
                <div key={n} className="between" style={{ padding: '4px 0', borderBottom: i<3?'1px dashed var(--rule)':'none' }}>
                  <div className="row"><span className="small mono" style={{ width:18 }}>#{i+1}</span><Avatar sm color={ini}>{ini}</Avatar><span style={{ fontSize:'var(--t-sm)' }}>{n}</span></div>
                  <span className="small mono">{c}</span>
                </div>
              ))}
            </div>
          </Box>
          <Box dashed>
            <Label>Ground rules</Label>
            <div className="small" style={{ lineHeight: 1.5 }}>
              Confirm only if you’ve personally seen or can cross-reference. Evidence is required for fee changes. Skipping is free.
            </div>
          </Box>
        </div>
      </div>
    </Desk>
  );
}

function MobileSwipeCard() {
  return (
    <Phone>
      <MobileHeader title="Triage" sub="1 of 14 · 🔥 streak 8" back />
      <div className="col" style={{ padding: 'var(--sp-3)', gap: 10, alignItems: 'center' }}>
        <div className="swipe-card-m">
          <div className="between">
            <span className="tag tag-fee">fee update</span>
            <span className="small mono" style={{ color:'var(--text-3)' }}>2h ago</span>
          </div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 'var(--t-lg)', lineHeight: 1.3, marginTop: 6 }}>
            “CAC filing fee is now <b>Le 80,000</b> as of April 2026.”
          </div>
          <Receipt name="Issued to" amount="Le 80,000" date="14 Apr" scale={0.7} tilt={-1.5} />
          <div className="row" style={{ gap: 6, marginTop: 10 }}>
            <Avatar sm color="green">A</Avatar>
            <div className="grow">
              <div style={{ fontWeight: 700, fontSize: 'var(--t-sm)' }}>Amina M.</div>
              <div className="small mono" style={{ color: 'var(--text-3)' }}>Freetown · 98%</div>
            </div>
            <Badge info>2 / 3</Badge>
          </div>
        </div>
        <div className="small mono" style={{ color:'var(--text-3)' }}>swipe left reject · right confirm</div>
        <div className="row" style={{ gap: 10, width: '100%' }}>
          <Btn lg block>✕</Btn>
          <Btn lg block>?</Btn>
          <Btn lg block primary>✓</Btn>
        </div>
      </div>
      <PhoneTabBar active="verify" />
    </Phone>
  );
}

// ────────── C · Then/Now diff
function DesktopDiff() {
  return (
    <Desk url="opensteps.org/verify/diff" shell={{ active: 'verify' }}>
      <div className="col" style={{ gap: 14 }}>
        <div className="between">
          <div>
            <Eyebrow>Transparency · revision #34</Eyebrow>
            <H lg style={{ fontFamily: 'var(--serif)' }}>What exactly changed?</H>
            <div className="small mono" style={{ color: 'var(--text-3)' }}>
              Register a business · by Amina M. · 2 hours ago · replaces v33 from Foday K.
            </div>
          </div>
          <div className="row">
            <Btn>History</Btn>
            <Btn>View in context</Btn>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Box style={{ padding: 14 }}>
            <div className="between">
              <Label>Before · v33</Label>
              <div className="row"><Avatar sm color="coral">F</Avatar><span className="small mono">Foday K. · Feb 2026</span></div>
            </div>
            <div style={{ lineHeight: 1.6, marginTop: 8 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Step 3 — Pay the filing fee</div>
              <p>Deposit <span style={{ textDecoration: 'line-through', color: 'var(--text-3)' }}>Le 75,000</span> into the CAC Escrow account at any commercial bank. Keep both copies of the teller slip.</p>
            </div>
          </Box>
          <Box style={{ padding: 14, borderColor: 'var(--accent)', background: 'var(--accent-soft)' }}>
            <div className="between">
              <Label>After · v34 (proposed)</Label>
              <div className="row"><Avatar sm color="green">A</Avatar><span className="small mono">Amina M. · today</span></div>
            </div>
            <div style={{ lineHeight: 1.6, marginTop: 8 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Step 3 — Pay the filing fee</div>
              <p>Deposit <b className="hi">Le 80,000</b> into the CAC Escrow account at any commercial bank. <b className="hi">New 2026 rate — confirmed at counter on 14 April.</b> Keep both copies of the teller slip.</p>
            </div>
          </Box>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 14 }}>
          <Box>
            <Label>Evidence for the change</Label>
            <div className="row" style={{ gap: 12, marginTop: 8, alignItems: 'flex-start' }}>
              <Receipt tilt={-2} name="Issued to" amount="Le 80,000" date="14 Apr 2026" scale={0.75} />
              <Receipt tilt={1.5} name="Issued to" amount="Le 80,000" date="14 Apr 2026" scale={0.75} />
              <Box dashed style={{ width: 150, minHeight: 160, textAlign: 'center', paddingTop: 40 }}>
                <div style={{ fontSize: 28 }}>📧</div>
                <div className="small mono">email confirm</div>
                <div className="small" style={{ color: 'var(--text-3)' }}>CAC registry · 15 Apr</div>
              </Box>
            </div>
          </Box>
          <Box>
            <Label>Discussion · 3</Label>
            <div className="col" style={{ gap: 8, marginTop: 6 }}>
              <div className="row"><Avatar sm color="amber">B</Avatar><div><b>Bash:</b> matches what I saw Tuesday.</div></div>
              <div className="row"><Avatar sm color="teal">I</Avatar><div><b>Isatu:</b> confirmed by phone with counter.</div></div>
              <div className="row"><Avatar sm color="coral">F</Avatar><div><b>Foday:</b> receipts look legit, +1.</div></div>
            </div>
          </Box>
        </div>

        <div className="between" style={{ borderTop: '1px solid var(--rule)', paddingTop: 10 }}>
          <div className="small mono" style={{ color: 'var(--text-3)' }}>
            2 of 3 verifications · 0 disputes · evidence ✓ · inline sources ✓
          </div>
          <div className="row">
            <Btn>Request changes</Btn>
            <Btn primary>Approve & publish</Btn>
          </div>
        </div>
      </div>
    </Desk>
  );
}

function MobileDiff() {
  return (
    <Phone>
      <MobileHeader title="Before → After" sub="Step 3 · filing fee" back />
      <div className="col" style={{ padding: 'var(--sp-3)', gap: 10 }}>
        <Box>
          <div className="between"><Label>Before · v33</Label><span className="small mono" style={{ color:'var(--text-3)' }}>Foday K. · Feb</span></div>
          <div className="small" style={{ color:'var(--text-3)', textDecoration: 'line-through', marginTop: 4 }}>
            Pay Le 75,000 to CAC escrow at any commercial bank.
          </div>
        </Box>
        <Box style={{ borderColor: 'var(--accent)', background: 'var(--accent-soft)' }}>
          <div className="between"><Label>After · v34</Label><span className="small mono">Amina M. · today</span></div>
          <div style={{ marginTop: 4 }}>
            Pay <b className="hi">Le 80,000</b> to CAC escrow at any commercial bank. <b className="hi">New 2026 rate.</b>
          </div>
        </Box>
        <Receipt tilt={-1.5} name="Issued to" amount="Le 80,000" date="14 Apr 2026" scale={0.8} />
        <div className="small mono" style={{ color:'var(--text-3)' }}>2 of 3 verifications · 0 disputes</div>
        <div className="row">
          <Btn block>✕ Reject</Btn>
          <Btn block primary>✓ Approve</Btn>
        </div>
      </div>
      <PhoneTabBar active="verify" />
    </Phone>
  );
}

// ────────── D · Public validation + reputation
function DesktopReputation() {
  return (
    <Desk url="opensteps.org/trust" shell={{ active: 'verify' }}>
      <div className="col" style={{ gap: 14 }}>
        <div className="between">
          <div>
            <Eyebrow>Radical transparency</Eyebrow>
            <H lg style={{ fontFamily: 'var(--serif)' }}>Who verified this, and how well.</H>
            <P>Trust shifts from authority to reputation. Every verifier is a public record.</P>
          </div>
          <div className="row">
            <Btn>How verification works</Btn>
            <Btn primary>Apply to verify</Btn>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {V_PEOPLE.map(p => (
            <Box key={p.name} raised style={{ padding: 14 }}>
              <div className="row" style={{ alignItems:'center' }}>
                <Avatar color={p.initial}>{p.initial}</Avatar>
                <div className="grow">
                  <div style={{ fontWeight: 700 }}>{p.name}</div>
                  <div className="small mono" style={{ color:'var(--text-3)' }}>since {p.since}</div>
                </div>
                {p.acc ? <Badge ok>{p.acc}</Badge> : <span className="stamp tiny">EDITOR</span>}
              </div>
              <Divider />
              <div className="col" style={{ gap: 4 }}>
                <div className="between small"><span>Verifications</span><b>{p.count}</b></div>
                <div className="between small"><span>Streak</span><b>{p.streak} wk</b></div>
                <div className="between small"><span>Last active</span><span className="mono" style={{ color:'var(--text-3)' }}>{p.active}</span></div>
              </div>
              <Divider />
              <div className="row" style={{ flexWrap: 'wrap', gap: 4 }}>
                {p.domains.map(d => <Chip key={d} xs>{d}</Chip>)}
              </div>
              <BarMini label="Accuracy" value={p.acc ? parseInt(p.acc) : 100} />
            </Box>
          ))}
        </div>

        <Divider />

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
          <Box raised style={{ padding: 18 }}>
            <Eyebrow>Guide trust score</Eyebrow>
            <div className="row" style={{ alignItems: 'baseline', gap: 10, marginTop: 6 }}>
              <H xl style={{ fontFamily:'var(--serif)', fontSize:'var(--t-4xl)' }}>8.7</H>
              <span className="small mono" style={{ color:'var(--text-3)' }}>/ 10 · excellent</span>
            </div>
            <TrustBar value={87} big />
            <Divider />
            <div className="row" style={{ gap: 20, flexWrap: 'wrap' }}>
              <Stat label="Verifiers"     value="12" />
              <Stat label="Receipts"      value="34" />
              <Stat label="Last verified" value="14 Apr" />
              <Stat label="Disputes"      value="0"  sub="open" />
              <Stat label="Revisions"     value="34" sub="lifetime" />
            </div>
            <Divider />
            <div className="small" style={{ color:'var(--text-3)' }}>
              Score = evidence quality × verifier reputation × recency. <u>How we calculate</u>.
            </div>
          </Box>
          <div className="col" style={{ gap: 10 }}>
            <Box>
              <Label>Activity · last 30 days</Label>
              <Sparkline points={[4,6,3,8,7,11,9,12,10,8,13,15]} accent />
              <div className="between small mono" style={{ color:'var(--text-3)' }}>
                <span>47 reviews</span><span>+18% vs prior</span>
              </div>
            </Box>
            <Box dashed>
              <Label>Verifier principles</Label>
              <CheckRow done>Public reputation — every vote signed.</CheckRow>
              <CheckRow done>Evidence required for fees & procedures.</CheckRow>
              <CheckRow done>Editors can fast-track, not override.</CheckRow>
              <CheckRow done>Anyone can apply after 10 accepted guides.</CheckRow>
            </Box>
          </div>
        </div>
      </div>
    </Desk>
  );
}

function MobileReputation() {
  return (
    <Phone>
      <MobileHeader title="Verifiers" sub="Who validates OpenSteps" back />
      <div className="col" style={{ padding: 'var(--sp-3)', gap: 10 }}>
        <Box raised>
          <Eyebrow>Guide trust</Eyebrow>
          <div className="row" style={{ alignItems: 'baseline', gap: 6 }}>
            <H xl style={{ fontFamily:'var(--serif)' }}>8.7</H>
            <span className="small mono" style={{ color:'var(--text-3)' }}>/ 10</span>
          </div>
          <TrustBar value={87} />
          <div className="small" style={{ color:'var(--text-3)' }}>12 verifiers · 34 receipts · 0 disputes</div>
        </Box>

        {V_PEOPLE.slice(0,3).map(p => (
          <Box key={p.name}>
            <div className="row">
              <Avatar color={p.initial}>{p.initial}</Avatar>
              <div className="grow">
                <div style={{ fontWeight: 700 }}>{p.name}</div>
                <div className="small mono" style={{ color: 'var(--text-3)' }}>{p.count} verified · since {p.since}</div>
              </div>
              {p.acc ? <Badge ok>{p.acc}</Badge> : <span className="stamp tiny">EDITOR</span>}
            </div>
            <div className="row" style={{ flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
              {p.domains.map(d => <Chip key={d} xs>{d}</Chip>)}
            </div>
          </Box>
        ))}

        <Btn primary block>Apply to verify</Btn>
        <div className="small mono" style={{ color:'var(--text-3)', textAlign: 'center' }}>
          Open after 10 accepted guides
        </div>
      </div>
      <PhoneTabBar active="verify" />
    </Phone>
  );
}

function VerifyScreen() {
  return (
    <div>
      <ScreenHead
        num="04"
        title="Verification / Review"
        sub="How the community validates every change. Four angles: editor workbench, card-swipe triage, side-by-side diff, and public reputation."
      />
      <div className="grid">

        <Variant name="A · Editor workbench — queue, diff, trust rail" tag="classic review">
          <DesktopWorkbench />
          <MobileQueue />
          <Caption>Workbench for active reviewers. Diff is the core; trust panel shows what’s at stake.</Caption>
        </Variant>

        <Variant name="B · Card-swipe triage — gamified, fast" tag="volunteer-friendly">
          <DesktopSwipeDeck />
          <MobileSwipeCard />
          <Caption>Gamifies a chore with streaks and leaderboards. Keep the stakes clear; skipping is free.</Caption>
        </Variant>

        <Variant name="C · Then / Now — side-by-side diff" tag="transparency">
          <DesktopDiff />
          <MobileDiff />
          <Caption>Every change is inspectable. Highlights the exact words that shifted, with evidence beside.</Caption>
        </Variant>

        <Variant name="D · Public validation + reputation" tag="radical transparency">
          <DesktopReputation />
          <MobileReputation />
          <Caption>Trust comes from reputation, not authority. Every verifier is a public record with a score.</Caption>
        </Variant>

      </div>
    </div>
  );
}

window.VerifyScreen = VerifyScreen;
