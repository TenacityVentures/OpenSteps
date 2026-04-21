// Home / Discovery — 4 variations

function HomeScreen() {
  return (
    <div>
      <ScreenHead
        num="01"
        title="Home & Discovery"
        sub="Entry point. Mobile-first. Goal: get a citizen from 'I need to do X' to the right guide in seconds, on a flaky 3G connection."
      />
      <div className="grid">
        <Variant name="A — Search-first, Wikipedia calm" tag="baseline / high-confidence">
          <Phone>
            <div className="col" style={{ gap: 10 }}>
              <div className="between">
                <H sm>OpenSteps</H>
                <span className="ico circle" />
              </div>
              <Input lg ph="What do you need to do?" left={<span>🔍</span>} />
              <Label>Popular right now</Label>
              <div className="col" style={{ gap: 6 }}>
                {['Register a business','Get a driver\u2019s license','NASSIT registration','Renew passport'].map(t => (
                  <Box key={t}><div className="between"><span>{t}</span><span className="small">→</span></div></Box>
                ))}
              </div>
              <Label>Verified today</Label>
              <Box soft>
                <div className="small mono">14 Apr · Freetown</div>
                <div style={{ fontWeight: 700 }}>Register a business</div>
                <div className="small">3 steps updated · 2 new receipts</div>
              </Box>
              <PhoneTabBar />
            </div>
          </Phone>
          <Desk url="opensteps.org">
            <div className="col">
              <div className="between">
                <H lg>Find your way through any process.</H>
                <div className="row"><Chip>Sierra Leone ▾</Chip><Btn xs>Sign in</Btn></div>
              </div>
              <P>Community-verified, evidence-backed step-by-step guides for real-world bureaucracy.</P>
              <Input lg ph="Search 847 guides · e.g. 'business', 'passport', 'scholarship'" left={<span>🔍</span>} right={<Btn primary xs>Search</Btn>} />
              <div className="row" style={{ marginTop: 8 }}>
                {['All','Business','ID & Documents','Health','Education','Tax','Property','Transport'].map((c,i) => <Chip key={c} on={i===0}>{c}</Chip>)}
              </div>
              <Divider />
              <Label>Most-followed this month</Label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[
                  ['Register a business','7 steps · 2–3 days','Le 150k','Verified 14 Apr'],
                  ['Driver\u2019s license','9 steps · 1 week','Le 240k','Verified 02 Apr'],
                  ['Renew passport','6 steps · 3–5 days','Le 450k','Verified 11 Apr'],
                ].map(([t,meta,fee,v]) => (
                  <Box key={t}>
                    <div style={{ fontWeight: 700 }}>{t}</div>
                    <div className="small">{meta}</div>
                    <div className="row mt-1"><Badge>{fee}</Badge><Badge ok>{v}</Badge></div>
                  </Box>
                ))}
              </div>
            </div>
          </Desk>
          <Anno style={{ top: 90, left: 12 }}>Search is the hero. Everything else supports.</Anno>
          <Caption>Low density. Wikipedia-like trust. Works as first impression.</Caption>
        </Variant>

        <Variant name="B — Category grid, bazaar-style" tag="browsable / visual">
          <Phone>
            <div className="col" style={{ gap: 10 }}>
              <H sm>What do you need?</H>
              <Input ph="Search…" left={<span>🔍</span>} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {['Business','ID / Papers','Driving','Health','School','Tax','Property','Travel'].map(c => (
                  <Box key={c} style={{ aspectRatio: '1.4/1', display: 'grid', placeItems: 'center', textAlign: 'center' }}>
                    <div>
                      <div className="ico doc" style={{ margin: '0 auto 6px' }} />
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{c}</div>
                      <div className="small mono">{Math.floor(20 + Math.random()*80)} guides</div>
                    </div>
                  </Box>
                ))}
              </div>
              <PhoneTabBar />
            </div>
          </Phone>
          <Desk>
            <div className="col">
              <H lg>Browse by what you\u2019re trying to do.</H>
              <Input ph="Or search…" left={<span>🔍</span>} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 8 }}>
                {[
                  ['Start a business','72'],['ID & papers','48'],['Driving & vehicles','31'],
                  ['Health & NASSIT','26'],['Education','54'],['Tax & compliance','22'],
                  ['Property & land','18'],['Travel & passport','29'],
                ].map(([c, n]) => (
                  <Box key={c} style={{ minHeight: 110 }}>
                    <div className="ico doc" />
                    <div className="mt-1" style={{ fontWeight: 700, fontSize: 16 }}>{c}</div>
                    <div className="small mono mt-1">{n} verified guides</div>
                    <Divider />
                    <div className="small">Top: “{c.split(' ')[0]} step 1”, “fees”, “forms”</div>
                  </Box>
                ))}
              </div>
            </div>
          </Desk>
          <Caption>Good when users don\u2019t know what to search. Taxonomy-driven.</Caption>
        </Variant>

        <Variant name="C — Question-led (natural language)" tag="novel / conversational">
          <Phone>
            <div className="col" style={{ gap: 12 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)' }}>hello 👋</div>
              <H>What are you trying to do today?</H>
              <Input lg ph="Type it like you\u2019d say it…" />
              <Label>Try one of these</Label>
              <div className="col" style={{ gap: 6 }}>
                {[
                  'I want to start a small shop',
                  'I lost my national ID',
                  'I need a police clearance',
                  'My child needs a birth certificate',
                ].map(t => <Box key={t} dashed><span>“{t}”</span></Box>)}
              </div>
              <P>We\u2019ll match you to a community-verified guide.</P>
              <PhoneTabBar />
            </div>
          </Phone>
          <Desk>
            <div className="col" style={{ gap: 14 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)' }}>freetown · english ▾ · krio ▾</div>
              <H lg>Tell us what you\u2019re trying to do.</H>
              <P>We\u2019ll translate it into the right office, the right forms, the right order.</P>
              <Input lg ph="e.g. 'I want to register a small business with one partner'" right={<Btn primary xs>Find steps</Btn>} />
              <Divider />
              <Label>Common intents</Label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                {[
                  ['I\u2019m starting a business','→ Register a business · NASSIT · TIN'],
                  ['I\u2019m moving abroad','→ Passport · Police clearance · Yellow card'],
                  ['I just had a baby','→ Birth cert · NASSIT dependent · Vaccination'],
                  ['I need to drive','→ Learner\u2019s · Road test · License'],
                ].map(([q, a]) => (
                  <Box key={q}>
                    <div style={{ fontWeight: 700 }}>{q}</div>
                    <div className="small mono mt-1">{a}</div>
                  </Box>
                ))}
              </div>
            </div>
          </Desk>
          <Caption>Lowers the 'I don\u2019t know what this is called' barrier. Risk: matching quality.</Caption>
        </Variant>

        <Variant name="D — Feed: what the community just verified" tag="social proof / living">
          <Phone>
            <div className="col" style={{ gap: 10 }}>
              <div className="between"><H sm>Verified today</H><span className="sk-label">SL · 42</span></div>
              <Input ph="Search…" left={<span>🔍</span>} />
              {[
                ['Amina M.', 'confirmed Step 3 fee is now Le 80k', '2h'],
                ['Editor Bash', 'fast-tracked \u201CPassport renewal\u201D', '4h'],
                ['Foday K.', 'uploaded receipt for CAC filing', '6h'],
                ['Isatu C.', 'flagged outdated office hours', '9h'],
              ].map(([who, what, when]) => (
                <Box key={who}>
                  <div className="row">
                    <Avatar>{who[0]}</Avatar>
                    <div className="grow">
                      <div style={{ fontSize: 14 }}><b>{who}</b> {what}</div>
                      <div className="small mono">{when} · Register a business</div>
                    </div>
                  </div>
                </Box>
              ))}
              <PhoneTabBar />
            </div>
          </Phone>
          <Desk>
            <div className="col">
              <div className="between">
                <H lg>The live ledger of Sierra Leone\u2019s bureaucracy.</H>
                <div className="row"><Btn xs>Filter ▾</Btn><Btn primary xs>Contribute</Btn></div>
              </div>
              <P>847 guides · 2,103 contributors · 18 edits in the last hour.</P>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 18, marginTop: 8 }}>
                <div className="col">
                  <Label>Recent activity</Label>
                  {[
                    ['Business registration','Fee updated from Le 75k → Le 80k at CAC','2h ago','Amina M.',3],
                    ['Driver\u2019s license','Step 5 evidence added — road test receipt','3h ago','Foday K.',5],
                    ['NASSIT enrollment','Step 2 marked needs review — office moved','5h ago','Editor Bash',1],
                    ['Passport renewal','New guide published · 6 steps','7h ago','Isatu C.',8],
                  ].map(([g, what, when, who, votes], i) => (
                    <Box key={i}>
                      <div className="between">
                        <div>
                          <div style={{ fontWeight: 700 }}>{g}</div>
                          <div className="small">{what}</div>
                          <div className="small mono mt-1">{who} · {when}</div>
                        </div>
                        <div className="col" style={{ alignItems: 'flex-end' }}>
                          <Badge ok>+{votes} verified</Badge>
                          <Btn xs>Open →</Btn>
                        </div>
                      </div>
                    </Box>
                  ))}
                </div>
                <div className="col">
                  <Label>Top contributors</Label>
                  {['Amina M.','Foday K.','Editor Bash','Isatu C.'].map((n,i) => (
                    <Box key={n}>
                      <div className="row"><Avatar>{n[0]}</Avatar><div className="grow"><b>{n}</b><div className="small mono">{90-i*12} edits</div></div></div>
                    </Box>
                  ))}
                </div>
              </div>
            </div>
          </Desk>
          <Caption>Feels alive. Risk: noisy for casual citizens — good for editors.</Caption>
        </Variant>
      </div>
    </div>
  );
}

window.HomeScreen = HomeScreen;
