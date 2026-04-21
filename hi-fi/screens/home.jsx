// Home & Discovery — mix of A (search-first) + B (categories) + D (live feed)

const GUIDES = [
  { title: 'Register a business', steps: 7, days: '2–3 days', cost: 'Le 150k', verified: '14 Apr', category: 'Business' },
  { title: "Driver's license",    steps: 9, days: '1 week',  cost: 'Le 240k', verified: '02 Apr', category: 'Transport' },
  { title: 'Renew passport',      steps: 6, days: '3–5 days', cost: 'Le 450k', verified: '11 Apr', category: 'ID & Docs' },
  { title: 'NASSIT registration', steps: 5, days: '1–2 days', cost: 'Le 30k',  verified: '09 Apr', category: 'Health' },
  { title: 'National ID card',    steps: 4, days: '3 days',   cost: 'Le 20k',  verified: '07 Apr', category: 'ID & Docs' },
  { title: 'TIN registration',    steps: 3, days: '1 day',    cost: 'Le 10k',  verified: '05 Apr', category: 'Tax' },
];

const CATEGORIES = [
  ['Business','72'],['ID & Docs','48'],['Transport','31'],
  ['Health','26'],['Education','54'],['Tax','22'],['Property','18'],['Travel','29'],
];

const FEED = [
  { who: 'Amina M.',   action: 'confirmed Step 3 fee is now Le 80k', guide: 'Register a business', when: '2h ago',  avatar: 'A' },
  { who: 'Editor Bash',action: 'fast-tracked "Passport renewal"',     guide: 'Passport renewal',   when: '4h ago',  avatar: 'E' },
  { who: 'Foday K.',   action: 'uploaded receipt for CAC filing',      guide: 'Register a business', when: '6h ago',  avatar: 'F' },
  { who: 'Isatu C.',   action: 'flagged outdated office hours',         guide: "Driver's license",   when: '9h ago',  avatar: 'I' },
];

function GuideCard({ g }) {
  return (
    <Box style={{ cursor: 'pointer' }}>
      <div className="between">
        <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{g.title}</div>
        <Badge ok>✓ {g.verified}</Badge>
      </div>
      <div className="row mt-1" style={{ gap: 6 }}>
        <Badge>{g.steps} steps</Badge>
        <Badge>{g.days}</Badge>
        <Badge>{g.cost}</Badge>
      </div>
    </Box>
  );
}

function HomeScreen() {
  return (
    <div>
      <ScreenHead
        num="01"
        title="Home & Discovery"
        sub="Entry point. Mix: A search-first hero + B category grid + D live community feed. Mobile-first, low-bandwidth."
      />
      <div className="grid">

        {/* ── Variant 1: Mobile ── */}
        <Variant name="Mobile — search + browse + recent" tag="320px · 3G">
          <Phone>
            <div className="col" style={{ gap: 10 }}>
              {/* Header */}
              <div className="between">
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>OpenSteps</div>
                  <div className="small mono">Sierra Leone · 847 guides</div>
                </div>
                <Avatar>A</Avatar>
              </div>

              {/* Hero search */}
              <Input lg ph="What do you need to do?" left={<span style={{ fontSize: 16 }}>🔍</span>} />

              {/* Category pills — horizontal scroll */}
              <div>
                <Label>Browse by topic</Label>
                <div className="row mt-1" style={{ gap: 6, flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: 4 }}>
                  {['All','Business','ID','Health','Tax','Travel'].map((c, i) => (
                    <Chip key={c} on={i === 0}>{c}</Chip>
                  ))}
                </div>
              </div>

              {/* Natural-language intent shortcuts (mix-in of C) */}
              <Box soft style={{ background: 'var(--accent-soft)', borderColor: 'var(--accent)', borderStyle: 'dashed', padding: 10 }}>
                <Label>Or describe your situation</Label>
                <div className="col mt-1" style={{ gap: 4 }}>
                  {[
                    ['🏪', "I'm starting a small shop"],
                    ['🆔', 'I lost my national ID'],
                    ['👶', 'My child needs a birth certificate'],
                  ].map(([ico, q]) => (
                    <div key={q} className="between" style={{
                      background: 'var(--surface)', padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                      border: '1px solid var(--border)',
                    }}>
                      <span style={{ fontSize: 12 }}><span style={{ marginRight: 6 }}>{ico}</span>"{q}"</span>
                      <span style={{ color: 'var(--accent)', fontSize: 14 }}>→</span>
                    </div>
                  ))}
                </div>
              </Box>

              <Divider />

              {/* Top guides */}
              <Label>Most followed this month</Label>
              <div className="col" style={{ gap: 6 }}>
                {GUIDES.slice(0, 4).map(g => (
                  <div key={g.title} className="between sk-box" style={{ padding: '10px 12px', cursor: 'pointer' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{g.title}</div>
                      <div className="small">{g.steps} steps · {g.cost}</div>
                    </div>
                    <div className="col" style={{ alignItems: 'flex-end', gap: 4 }}>
                      <Badge ok>✓ {g.verified}</Badge>
                      <span style={{ color: 'var(--text-3)', fontSize: 14 }}>›</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live update */}
              <Box soft>
                <div className="between">
                  <Label>Live · 4 updates today</Label>
                  <span style={{ fontSize: 10, color: 'var(--green)', fontFamily: 'var(--mono)', fontWeight: 600 }}>● LIVE</span>
                </div>
                <div className="col mt-1" style={{ gap: 6 }}>
                  {FEED.slice(0, 2).map(f => (
                    <div key={f.who} className="row" style={{ gap: 8, alignItems: 'flex-start' }}>
                      <Avatar>{f.avatar}</Avatar>
                      <div className="grow">
                        <div style={{ fontSize: 12 }}><b>{f.who}</b> {f.action}</div>
                        <div className="small mono">{f.when}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Box>

              <PhoneTabBar active="Browse" />
            </div>
          </Phone>
        </Variant>

        {/* ── Variant 2: Desktop ── */}
        <Variant name="Desktop — 3-col: search + guides + live feed" tag="1280px · full">
          <Desk url="opensteps.org">
            <div className="col" style={{ gap: 16 }}>

              {/* Top bar inside app */}
              <div className="between">
                <div>
                  <H lg>Find your way through any process.</H>
                  <P style={{ marginTop: 4 }}>Community-verified, evidence-backed guides for real-world bureaucracy in Sierra Leone.</P>
                </div>
                <div className="row">
                  <Chip>Sierra Leone ▾</Chip>
                  <Btn xs>Sign in</Btn>
                  <Btn primary xs>Contribute</Btn>
                </div>
              </div>

              {/* Hero search */}
              <Input
                lg
                ph="Search 847 guides · e.g. 'business', 'passport', 'NASSIT'…"
                left={<span style={{ fontSize: 18 }}>🔍</span>}
                right={<Btn primary xs>Search</Btn>}
              />

              {/* Natural-language intent matcher (mix-in of variant C) */}
              <Box soft style={{ padding: 14, background: 'var(--accent-soft)', borderColor: 'var(--accent)', borderStyle: 'dashed' }}>
                <div className="between" style={{ marginBottom: 8 }}>
                  <div className="row" style={{ gap: 6 }}>
                    <Label>Or describe your situation</Label>
                    <span className="small mono" style={{ color: 'var(--accent)', fontWeight: 600 }}>· in your own words</span>
                  </div>
                  <Btn ghost xs>More situations →</Btn>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                  {[
                    ['🏪', "I'm starting a small business",   'Register · TIN · NASSIT'],
                    ['👶', 'I just had a baby',               'Birth cert · vaccination · NASSIT'],
                    ['🚗', 'I need to drive legally',         "Learner's · road test · license"],
                    ['✈️', "I'm moving abroad",               'Passport · clearance · yellow card'],
                  ].map(([ico, q, a]) => (
                    <Box key={q} style={{ cursor: 'pointer', padding: 10, background: 'var(--surface)' }}>
                      <div style={{ fontSize: 18 }}>{ico}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4, lineHeight: 1.3 }}>"{q}"</div>
                      <div className="small mono mt-1" style={{ color: 'var(--text-3)' }}>→ {a}</div>
                    </Box>
                  ))}
                </div>
              </Box>

              {/* Category chips */}
              <div className="row" style={{ gap: 6 }}>
                {CATEGORIES.map(([c, n], i) => (
                  <Chip key={c} on={i === 0}>{c} <span className="mono" style={{ opacity: 0.6, marginLeft: 4 }}>{n}</span></Chip>
                ))}
              </div>

              <Divider />

              {/* 3-col layout */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 280px', gap: 16, alignItems: 'start' }}>

                {/* Column 1 — guide cards */}
                <div className="col">
                  <div className="between">
                    <Label>Most followed this month</Label>
                    <span className="small mono">847 total</span>
                  </div>
                  {GUIDES.slice(0, 3).map(g => <GuideCard key={g.title} g={g} />)}
                </div>

                {/* Column 2 — more guides */}
                <div className="col">
                  <div className="between">
                    <Label>Recently verified</Label>
                    <Btn ghost xs>See all →</Btn>
                  </div>
                  {GUIDES.slice(3).map(g => <GuideCard key={g.title} g={g} />)}
                  <Box dashed style={{ textAlign: 'center', padding: 16 }}>
                    <div style={{ fontWeight: 600, marginBottom: 6 }}>Know a process not listed?</div>
                    <Btn primary xs>Contribute a guide</Btn>
                  </Box>
                </div>

                {/* Column 3 — live feed */}
                <div className="col">
                  <div className="between">
                    <Label>Live community</Label>
                    <span style={{ fontSize: 10, color: 'var(--green)', fontFamily: 'var(--mono)', fontWeight: 700 }}>● LIVE</span>
                  </div>
                  <Box soft style={{ padding: 10 }}>
                    <div className="row" style={{ gap: 16, marginBottom: 8 }}>
                      <Stat label="Guides" value="847" />
                      <Stat label="Contributors" value="2,103" />
                      <Stat label="Today" value="18 edits" />
                    </div>
                  </Box>
                  <div className="col" style={{ gap: 6 }}>
                    {FEED.map(f => (
                      <Box key={f.who} style={{ padding: 10 }}>
                        <div className="row" style={{ alignItems: 'flex-start' }}>
                          <Avatar>{f.avatar}</Avatar>
                          <div className="grow">
                            <div style={{ fontSize: 12, lineHeight: 1.4 }}><b>{f.who}</b> {f.action}</div>
                            <div className="small mono" style={{ marginTop: 2 }}>{f.when} · {f.guide}</div>
                          </div>
                        </div>
                      </Box>
                    ))}
                  </div>
                  <Divider />
                  <Label>Top contributors this week</Label>
                  {[['Amina M.','A','412 edits'],['Foday K.','F','208 edits']].map(([n,a,e]) => (
                    <div key={n} className="row">
                      <Avatar>{a}</Avatar>
                      <div className="grow" style={{ fontSize: 13 }}><b>{n}</b></div>
                      <span className="small mono">{e}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Desk>
          <Caption>Search-first hero (A) · category taxonomy (B) · live feed sidebar (D). No friction to first result.</Caption>
        </Variant>

        {/* ── Variant 3: Question-led intent (C) for mobile ── */}
        <Variant name="Mobile — intent matching ('I want to…')" tag="variant C · conversational">
          <Phone>
            <div className="col" style={{ gap: 12 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-3)' }}>hello 👋 · Freetown</div>
              <H>What are you trying to do today?</H>
              <Input lg ph="Type it like you'd say it…" />
              <Label>Common situations</Label>
              <div className="col" style={{ gap: 6 }}>
                {[
                  ['I want to start a small shop',         '→ Register a business · TIN · NASSIT'],
                  ['I lost my national ID',                '→ NIN replacement · police report'],
                  ['My child needs a birth certificate',   '→ Birth cert · vaccination · NASSIT'],
                  ['I need to drive legally',              "→ Learner's · road test · license"],
                ].map(([q, a]) => (
                  <Box key={q} dashed style={{ cursor: 'pointer' }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{q}</div>
                    <div className="small mono mt-1">{a}</div>
                  </Box>
                ))}
              </div>
              <P style={{ fontSize: 12 }}>We'll match you to the right community-verified guide.</P>
              <PhoneTabBar active="Browse" />
            </div>
          </Phone>
        </Variant>

        {/* ── Variant 4: Category grid desktop (B) ── */}
        <Variant name="Desktop — category grid, browse-first" tag="variant B · taxonomy">
          <Desk url="opensteps.org/browse">
            <div className="col">
              <div className="between">
                <H lg>Browse by what you're trying to do.</H>
                <Input ph="Or search…" left={<span>🔍</span>} style={{ width: 260 }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 8 }}>
                {[
                  ['Start a business','72','Register, TIN, NASSIT'],
                  ['ID & papers','48','NIN, passport, birth cert'],
                  ['Driving & vehicles','31','License, road test, reg'],
                  ['Health & NASSIT','26','Enrollment, dependants'],
                  ['Education','54','Scholarships, enrolment'],
                  ['Tax & compliance','22','TIN, filing, compliance'],
                  ['Property & land','18','Survey, title, transfer'],
                  ['Travel & passport','29','Passport, visa, clearance'],
                ].map(([c, n, sub]) => (
                  <Box key={c} style={{ cursor: 'pointer', minHeight: 120 }}>
                    <div className="ico doc" style={{ marginBottom: 8 }} />
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{c}</div>
                    <div className="small mono mt-1">{n} guides</div>
                    <Divider />
                    <div className="small">{sub}</div>
                  </Box>
                ))}
              </div>
              <Caption>Good for users who don't know the process name — lets them orient by life situation.</Caption>
            </div>
          </Desk>
        </Variant>

      </div>
    </div>
  );
}

window.HomeScreen = HomeScreen;
