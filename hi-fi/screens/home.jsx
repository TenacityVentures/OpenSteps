// Home & Discovery — strongest mix: A (search hero) + B (categories) + C (intent matcher) + D (live feed)

const GUIDES = [
  { title: 'Register a business', steps: 7, days: '2–3 days', cost: 'Le 150k', verified: '14 Apr', cat: 'business', follow: 482, trust: 8.7 },
  { title: "Driver's license",    steps: 9, days: '1 week',  cost: 'Le 240k', verified: '02 Apr', cat: 'transport', follow: 621, trust: 9.1 },
  { title: 'Renew passport',      steps: 6, days: '3–5 days', cost: 'Le 450k', verified: '11 Apr', cat: 'travel',   follow: 389, trust: 8.4 },
  { title: 'NASSIT registration', steps: 5, days: '1–2 days', cost: 'Le 30k',  verified: '09 Apr', cat: 'health',   follow: 248, trust: 8.9 },
  { title: 'National ID (NIN)',   steps: 4, days: '3 days',   cost: 'Le 20k',  verified: '07 Apr', cat: 'id',       follow: 712, trust: 9.3 },
  { title: 'TIN registration',    steps: 3, days: '1 day',    cost: 'Le 10k',  verified: '05 Apr', cat: 'tax',      follow: 195, trust: 8.2 },
];

const CATEGORIES = [
  { key: 'business',  label: 'Start a business', n: 72, sub: 'Register · TIN · NASSIT' },
  { key: 'id',        label: 'ID & documents',   n: 48, sub: 'NIN · passport · birth cert' },
  { key: 'transport', label: 'Driving & vehicles', n: 31, sub: "Learner's · road test · reg." },
  { key: 'health',    label: 'Health & NASSIT',  n: 26, sub: 'Enrolment · dependants' },
  { key: 'education', label: 'Education',        n: 54, sub: 'Scholarships · enrolment' },
  { key: 'tax',       label: 'Tax & compliance', n: 22, sub: 'TIN · filing · returns' },
  { key: 'property',  label: 'Property & land',  n: 18, sub: 'Survey · title · transfer' },
  { key: 'travel',    label: 'Travel & passport',n: 29, sub: 'Passport · visa · clearance' },
];

const INTENTS = [
  { ic: '🏪', q: "I'm starting a small business",  a: ['Register a business', 'Get a TIN', 'NASSIT enrol'] },
  { ic: '👶', q: 'I just had a baby',              a: ['Birth certificate', 'Vaccination card', 'NASSIT dependent'] },
  { ic: '🚗', q: 'I need to drive legally',        a: ["Learner's permit", 'Road test', 'Licence'] },
  { ic: '✈️', q: "I'm travelling abroad",          a: ['Passport', 'Police clearance', 'Yellow card'] },
];

const FEED = [
  { who: 'Amina M.',    avatar: 'A', action: 'confirmed the Step 3 CAC fee is now', hi: 'Le 80,000', when: '2h', guide: 'Register a business', verified: true },
  { who: 'Editor Bash', avatar: 'B', action: 'fast-tracked',                          hi: '"Passport renewal"',   when: '4h', guide: 'Passport renewal', editor: true },
  { who: 'Foday K.',    avatar: 'F', action: 'uploaded a receipt photo for',          hi: 'CAC filing',            when: '6h', guide: 'Register a business' },
  { who: 'Isatu C.',    avatar: 'I', action: 'flagged outdated office hours at',      hi: 'NASSIT HQ',             when: '9h', guide: 'NASSIT enrolment', warn: true },
];

// ── Mobile body ────────────────────────────────────────────────────────────
function MobileHome() {
  return (
    <>
      <MobileHeader title="OpenSteps" locale="🇸🇱 Freetown" avatar="A" />

      <div style={{ marginTop: 8 }}>
        <div className="eyebrow" style={{ marginBottom: 6 }}>Good morning · 847 guides</div>
        <H sm style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 24, lineHeight: 1.15 }}>
          Find your way through any process.
        </H>
      </div>

      <Input
        lg
        ph="Search or ask in your own words…"
        left={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5" strokeLinecap="round"/></svg>}
        right={<span className="key">↵</span>}
      />

      {/* Intent shortcuts (variant C) — the signature feature */}
      <Box accent style={{ padding: 14 }}>
        <div className="between" style={{ marginBottom: 8 }}>
          <Label>Describe your situation</Label>
          <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700 }}>NEW</span>
        </div>
        <div className="stack-6">
          {INTENTS.slice(0, 3).map(({ ic, q, a }) => (
            <div key={q} style={{
              display: 'grid', gridTemplateColumns: '28px 1fr 14px', gap: 10, alignItems: 'center',
              background: 'var(--surface)', padding: '10px 12px',
              borderRadius: 10, border: '1px solid var(--border)',
            }}>
              <span style={{ fontSize: 18 }}>{ic}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>"{q}"</div>
                <div className="micro mono" style={{ marginTop: 2 }}>→ {a.join(' · ')}</div>
              </div>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>›</span>
            </div>
          ))}
        </div>
      </Box>

      {/* Categories */}
      <div>
        <div className="between">
          <Label>Browse by topic</Label>
          <span className="micro mono">8 categories</span>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginTop: 6,
        }}>
          {CATEGORIES.slice(0, 6).map(c => (
            <div key={c.key} style={{
              padding: 10, background: 'var(--surface)',
              border: '1px solid var(--border)', borderRadius: 10,
              textAlign: 'center',
            }}>
              <div style={{ color: 'var(--accent)', marginBottom: 4 }}>
                <CategoryIcon kind={c.key} size={22} />
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, lineHeight: 1.2 }}>{c.label}</div>
              <div className="micro mono" style={{ marginTop: 2 }}>{c.n}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Most-followed */}
      <div>
        <div className="between">
          <Label>Most followed this month</Label>
          <span className="micro mono" style={{ color: 'var(--accent)' }}>See all →</span>
        </div>
        <div className="stack-6" style={{ marginTop: 6 }}>
          {GUIDES.slice(0, 3).map(g => (
            <div key={g.title} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '10px 12px',
            }}>
              <div className="between">
                <div style={{ fontWeight: 600, fontSize: 13.5, lineHeight: 1.2 }}>{g.title}</div>
                <Badge ok dot>{g.verified}</Badge>
              </div>
              <div className="row" style={{ gap: 5, marginTop: 6 }}>
                <Badge>{g.steps} steps</Badge>
                <Badge>{g.days}</Badge>
                <Badge>{g.cost}</Badge>
              </div>
              <div className="between" style={{ marginTop: 8 }}>
                <span className="micro mono">{g.follow} following · trust {g.trust}</span>
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>›</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live feed teaser */}
      <Box soft tight>
        <div className="between">
          <Label>Verified today</Label>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: 9.5,
            color: 'var(--green)', fontWeight: 700, letterSpacing: '0.08em',
            display: 'inline-flex', gap: 4, alignItems: 'center',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: 'var(--green)',
              boxShadow: '0 0 0 3px rgba(26,107,67,0.15)',
            }} />
            LIVE · 18 edits
          </span>
        </div>
        <div className="stack-6" style={{ marginTop: 8 }}>
          {FEED.slice(0, 2).map(f => (
            <div key={f.who} className="row" style={{ alignItems: 'flex-start', gap: 8 }}>
              <Avatar>{f.avatar}</Avatar>
              <div className="grow" style={{ fontSize: 12, lineHeight: 1.35 }}>
                <b>{f.who}</b> {f.action} <b style={{ color: 'var(--accent)' }}>{f.hi}</b>
                <div className="micro mono" style={{ marginTop: 2 }}>{f.when} ago · {f.guide}</div>
              </div>
            </div>
          ))}
        </div>
      </Box>

      <div style={{ height: 64 }} />
      <PhoneTabBar active="browse" />
    </>
  );
}

// ── Desktop ────────────────────────────────────────────────────────────────
function DesktopHome() {
  return (
    <div className="stack-14">

      {/* Hero */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 40, alignItems: 'center', padding: '8px 0 20px' }}>
        <div>
          <Eyebrow>The Wikipedia of bureaucracy</Eyebrow>
          <div className="display" style={{ marginTop: 10, fontSize: 46 }}>
            Find your way through any <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontFamily: 'var(--serif)' }}>government process</em> — with real receipts.
          </div>
          <P style={{ marginTop: 12, fontSize: 15 }}>
            Community-verified, step-by-step guides for Sierra Leone. Offices, forms, fees, timings
            — curated by people who just did it, with photo evidence.
          </P>

          <div style={{ marginTop: 20, position: 'relative' }}>
            <Input
              xl
              ph="Search 847 guides — or say it in your own words…"
              left={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5" strokeLinecap="round"/></svg>}
              right={<Btn primary>Find steps →</Btn>}
            />
            <div className="row" style={{ marginTop: 10, gap: 6 }}>
              <span className="micro mono" style={{ color: 'var(--text-3)' }}>Try:</span>
              {['I want to start a business', "I lost my national ID", 'I need a police clearance'].map(t => (
                <Chip key={t} soft style={{ fontSize: 11 }}>"{t}"</Chip>
              ))}
            </div>
          </div>
        </div>

        {/* Right: trust rail */}
        <Box raised style={{ padding: 20, background: 'var(--surface)' }}>
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14 }}>
            <div className="eyebrow">Live trust</div>
            <span className="micro mono">updated 2 min ago</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Stat label="Guides" value="847" sub="across 8 categories" />
            <Stat label="Contributors" value="2,103" sub="412 active this week" />
            <Stat label="Receipts" value="12,846" sub="verified evidence" />
            <Stat label="Today" value="18 edits" sub="3 pending review" />
          </div>
          <Divider />
          <Label>Edits per day · last 14 days</Label>
          <div style={{ marginTop: 6 }}>
            <Sparkline data={[6,9,7,12,10,14,11,18,15,22,19,24,20,26]} />
          </div>
          <div className="between" style={{ marginTop: 10 }}>
            <span className="small">Growth</span>
            <Badge ok dot>+34% MoM</Badge>
          </div>
        </Box>
      </div>

      <Divider />

      {/* Intent matcher — signature */}
      <div>
        <div className="between" style={{ marginBottom: 10 }}>
          <div>
            <Eyebrow>Intent matcher</Eyebrow>
            <H sm style={{ marginTop: 4, fontSize: 20 }}>Don't know the official name? Describe what you're trying to do.</H>
          </div>
          <div className="row">
            <Chip soft>Krio ▾</Chip>
            <Btn ghost xs>More situations →</Btn>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {INTENTS.map(({ ic, q, a }) => (
            <div key={q} style={{
              padding: 16, borderRadius: 14,
              background: 'linear-gradient(180deg, var(--surface) 0%, var(--accent-tint) 140%)',
              border: '1px solid var(--accent-soft)',
              cursor: 'pointer', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ fontSize: 28 }}>{ic}</div>
              <div style={{ fontWeight: 600, fontSize: 14, marginTop: 8, lineHeight: 1.3, letterSpacing: '-0.1px' }}>
                "{q}"
              </div>
              <Divider />
              <div className="col" style={{ gap: 4 }}>
                {a.map((step, i) => (
                  <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5 }}>
                    <span className="mono" style={{ color: 'var(--accent)', fontSize: 10, fontWeight: 700 }}>0{i + 1}</span>
                    <span style={{ color: 'var(--text-2)' }}>{step}</span>
                  </div>
                ))}
              </div>
              <div style={{ position: 'absolute', right: 12, top: 12, color: 'var(--accent)', fontSize: 16 }}>→</div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories strip */}
      <div>
        <div className="between" style={{ marginBottom: 10 }}>
          <H sm style={{ fontSize: 18 }}>Or browse by category</H>
          <span className="micro mono">8 · {GUIDES.length + 242} total guides</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {CATEGORIES.map(c => (
            <div key={c.key} style={{
              padding: 14, borderRadius: 12,
              background: 'var(--surface)', border: '1px solid var(--border)',
              cursor: 'pointer', transition: 'box-shadow .15s',
            }}>
              <div className="between">
                <span style={{ color: 'var(--accent)' }}>
                  <CategoryIcon kind={c.key} size={26} />
                </span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600 }}>{c.n}</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 14, marginTop: 10 }}>{c.label}</div>
              <div className="small" style={{ marginTop: 2 }}>{c.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: 24, marginTop: 4 }}>

        {/* Most-followed list with full cards */}
        <div>
          <div className="between" style={{ marginBottom: 10 }}>
            <H sm style={{ fontSize: 18 }}>Most followed this month</H>
            <div className="row">
              <Chip on>All</Chip>
              <Chip>Business</Chip>
              <Chip>ID</Chip>
              <Chip>Travel</Chip>
            </div>
          </div>
          <div className="stack-10">
            {GUIDES.slice(0, 4).map(g => (
              <div key={g.title} style={{
                display: 'grid', gridTemplateColumns: '42px 1fr auto', gap: 14,
                padding: 14, background: 'var(--surface)',
                border: '1px solid var(--border)', borderRadius: 12,
                alignItems: 'center', cursor: 'pointer',
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 10,
                  background: 'var(--accent-tint)', color: 'var(--accent)',
                  display: 'grid', placeItems: 'center',
                }}>
                  <CategoryIcon kind={g.cat} size={22} />
                </div>
                <div>
                  <div className="between">
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{g.title}</div>
                    <span className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>#{String(GUIDES.indexOf(g) + 1).padStart(2,'0')}</span>
                  </div>
                  <div className="row" style={{ gap: 6, marginTop: 6 }}>
                    <Badge>{g.steps} steps</Badge>
                    <Badge>{g.days}</Badge>
                    <Badge>{g.cost}</Badge>
                    <Badge ok dot>Verified {g.verified}</Badge>
                  </div>
                  <div className="between" style={{ marginTop: 8, fontSize: 12 }}>
                    <span className="small">{g.follow} following · trust <b style={{ color: 'var(--accent)' }}>{g.trust}</b></span>
                    <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Open guide →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live community rail */}
        <div className="stack-14">
          <div>
            <div className="between">
              <H sm style={{ fontSize: 16 }}>Live community</H>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: 10,
                color: 'var(--green)', fontWeight: 700, letterSpacing: '0.08em',
                display: 'inline-flex', gap: 4, alignItems: 'center',
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', background: 'var(--green)',
                  boxShadow: '0 0 0 3px rgba(26,107,67,0.15)',
                }} />
                LIVE
              </span>
            </div>
            <Box style={{ padding: 0, marginTop: 10, overflow: 'hidden' }}>
              {FEED.map((f, i) => (
                <div key={f.who} style={{
                  padding: 12, borderBottom: i < FEED.length - 1 ? '1px solid var(--border)' : 'none',
                  display: 'grid', gridTemplateColumns: '32px 1fr', gap: 10,
                }}>
                  <Avatar>{f.avatar}</Avatar>
                  <div>
                    <div style={{ fontSize: 13, lineHeight: 1.4 }}>
                      <b>{f.who}</b> {f.action}{' '}
                      <b style={{ color: f.warn ? 'var(--amber)' : 'var(--accent)' }}>{f.hi}</b>
                      {f.editor && <span className="stamp" style={{ marginLeft: 6, fontSize: 8, padding: '1px 4px' }}>EDITOR</span>}
                    </div>
                    <div className="micro mono" style={{ marginTop: 3 }}>
                      {f.when} ago · {f.guide}
                      {f.verified && <span style={{ color: 'var(--accent)' }}> · ✓ confirmed</span>}
                    </div>
                  </div>
                </div>
              ))}
            </Box>
          </div>

          <div>
            <Label>Top contributors · this week</Label>
            <div className="stack-6" style={{ marginTop: 8 }}>
              {[
                ['Amina M.',    'A', '412', '98% acc', false],
                ['Foday K.',    'F', '208', '94% acc', false],
                ['Editor Bash', 'B',  '1,024', null, true],
              ].map(([n, a, edits, acc, isEd]) => (
                <div key={n} className="row" style={{ justifyContent: 'space-between' }}>
                  <div className="row" style={{ gap: 10, minWidth: 0, flex: 1 }}>
                    <Avatar>{a}</Avatar>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{n}</div>
                      <div className="micro mono">{edits} edits · Freetown</div>
                    </div>
                  </div>
                  {isEd ? <span className="stamp">EDITOR</span> : <Badge ok>{acc}</Badge>}
                </div>
              ))}
            </div>
          </div>

          <Box dashed style={{ textAlign: 'center' }}>
            <Label>Missing a process?</Label>
            <div style={{ fontWeight: 600, fontSize: 14, margin: '6px 0 10px' }}>
              You know something. Someone else needs it.
            </div>
            <Btn primary block>Contribute a guide →</Btn>
          </Box>
        </div>
      </div>
    </div>
  );
}

// ── Variants ───────────────────────────────────────────────────────────────
function HomeScreen() {
  return (
    <div>
      <ScreenHead
        num="01"
        title="Home & Discovery"
        sub="Search-first hero (A) + intent matcher (C) + category grid (B) + live community rail (D). Mobile is low-bandwidth with the same signature features in a vertical rhythm."
      />
      <div className="grid">

        <Variant name="Desktop · Discovery home" tag="A + B + C + D">
          <Desk url="opensteps.org" shell={{ active: 'home' }}>
            <DesktopHome />
          </Desk>
          <Caption>The hero balances search (power users) with the intent matcher (first-timers). Live rail keeps the page breathing — new contributions show up without a refresh. Desk shell gives locale context in the header.</Caption>
        </Variant>

        <Variant name="Mobile · Discovery home" tag="360 · 3G-friendly">
          <Phone>
            <MobileHome />
          </Phone>
          <Caption>Intent matcher as the accent band — it's the most citizen-friendly entry. Categories in a 3-up grid, most-followed guides with inline trust and badges.</Caption>
        </Variant>

        <Variant name="Desktop · Category browse (variant B focus)" tag="taxonomy-first">
          <Desk url="opensteps.org/browse" shell={{ active: 'home' }}>
            <div className="stack-14">
              <div className="between">
                <div>
                  <Eyebrow>Browse</Eyebrow>
                  <H lg style={{ marginTop: 4 }}>By what you're trying to do</H>
                  <P>Pick a life situation. We organise by outcome, not by ministry.</P>
                </div>
                <Input style={{ width: 280 }} ph="Narrow this page…" left={<span>🔍</span>} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
                {CATEGORIES.map(c => (
                  <Box key={c.key} style={{ cursor: 'pointer', minHeight: 160 }}>
                    <div className="between" style={{ alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--accent)' }}>
                        <CategoryIcon kind={c.key} size={30} />
                      </span>
                      <Badge>{c.n} guides</Badge>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 16, marginTop: 12, letterSpacing: '-0.15px' }}>{c.label}</div>
                    <div className="small" style={{ marginTop: 2 }}>{c.sub}</div>
                    <Divider dashed />
                    <div className="micro mono">Top: {c.label.toLowerCase().split(' ')[0]} · fees · forms</div>
                  </Box>
                ))}
              </div>
            </div>
          </Desk>
        </Variant>

        <Variant name="Mobile · Intent-matcher detail (variant C)" tag="first-time citizens">
          <Phone>
            <MobileHeader title="Back" locale="Krio ▾" avatar="A" back />
            <div style={{ marginTop: 4 }}>
              <div className="eyebrow" style={{ marginBottom: 4 }}>Hello 👋</div>
              <H sm style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 400, lineHeight: 1.15 }}>
                What are you trying to do?
              </H>
              <P style={{ marginTop: 6, fontSize: 13 }}>Type it like you'd say it to a friend.</P>
            </div>
            <Input lg ph="e.g. I want to open a shop…" right={<Btn primary xs>Go</Btn>} />

            <Label>Common situations</Label>
            <div className="stack-6">
              {INTENTS.map(({ ic, q, a }) => (
                <div key={q} style={{
                  padding: 12, background: 'var(--surface)',
                  border: '1px solid var(--border)', borderRadius: 12,
                }}>
                  <div className="row" style={{ alignItems: 'flex-start', gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: 'var(--accent-tint)',
                      display: 'grid', placeItems: 'center', fontSize: 18,
                    }}>{ic}</div>
                    <div className="grow">
                      <div style={{ fontWeight: 600, fontSize: 13 }}>"{q}"</div>
                      <div className="micro mono" style={{ marginTop: 4 }}>→ {a.join(' · ')}</div>
                    </div>
                    <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 18 }}>›</span>
                  </div>
                </div>
              ))}
            </div>

            <Box soft tight style={{ marginTop: 8 }}>
              <div className="row" style={{ gap: 8 }}>
                <span style={{ fontSize: 14 }}>💡</span>
                <div className="small">
                  We'll match your words to a community-verified guide. If we can't,
                  a real editor reviews within 24h.
                </div>
              </div>
            </Box>
            <div style={{ height: 64 }} />
            <PhoneTabBar active="browse" />
          </Phone>
          <Caption>Conversational entry with Krio switcher right where it's needed. Lowers the "I don't know what this is called" barrier.</Caption>
        </Variant>

      </div>
    </div>
  );
}

window.HomeScreen = HomeScreen;
