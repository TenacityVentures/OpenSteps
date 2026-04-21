// Evidence upload — 4 variations

function EvidenceScreen() {
  return (
    <div>
      <ScreenHead num="05" title="Evidence Upload" sub="Receipts, forms, office photos. The trust layer. Offline-tolerant, privacy-aware." />
      <div className="grid">

        <Variant name="A — Step-linked receipt upload" tag="baseline / in-context">
          <Phone>
            <div className="col" style={{ gap: 10 }}>
              <div className="small mono">STEP 3 · Add evidence</div>
              <H sm>Upload your receipt</H>
              <Box dashed style={{ minHeight: 180, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: 28 }}>📷</div>
                  <div>Tap to take photo</div>
                  <div className="small mono">or choose from gallery</div>
                </div>
              </Box>
              <Box soft>
                <Label>We\u2019ll auto-blur</Label>
                <div className="small">• Your name · ID number · signature<br/>• Phone numbers on receipts<br/>• Faces</div>
              </Box>
              <div className="row"><Btn>Skip</Btn><Btn primary>Upload</Btn></div>
              <PhoneTabBar />
            </div>
          </Phone>
          <Desk>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 18 }}>
              <div className="col">
                <div className="small mono">Register a business · Step 3 of 7</div>
                <H lg>Add evidence for this step</H>
                <P>A photo of your receipt, your filled form, or the office counter. This is what makes guides real — and helps the next person.</P>
                <Box dashed style={{ minHeight: 240, display: 'grid', placeItems: 'center', textAlign: 'center', background: 'var(--paper-2)' }}>
                  <div>
                    <div style={{ fontSize: 48 }}>📎</div>
                    <div><b>Drop files here</b> or click to browse</div>
                    <div className="small mono mt-1">JPG · PNG · PDF · max 8MB each</div>
                  </div>
                </Box>
                <div className="row"><Btn icon="plus">Photo</Btn><Btn icon="plus">Scan PDF</Btn><Btn icon="plus">From gallery</Btn></div>
              </div>
              <div className="col">
                <Box>
                  <Label>What makes good evidence</Label>
                  <div className="small">✓ Date visible<br/>✓ Amount paid visible<br/>✓ Office or bank name<br/>✗ No personal details needed</div>
                </Box>
                <Box soft>
                  <Label>Auto-redaction</Label>
                  <div className="small">We blur names, ID numbers, signatures, and faces before publishing.</div>
                  <Divider />
                  <div className="row"><Chip on>Auto-blur on</Chip></div>
                </Box>
              </div>
            </div>
          </Desk>
          <Caption>Anchored to the step. Privacy promise is upfront.</Caption>
        </Variant>

        <Variant name="B — Camera capture + live redaction preview" tag="novel / privacy-first">
          <Phone>
            <div className="col" style={{ gap: 10 }}>
              <Box style={{ position: 'relative', minHeight: 320, background: '#15130f', borderColor: '#15130f', color: '#efe8d8' }}>
                <div style={{ position: 'absolute', inset: 18, border: '2px dashed #efe8d833', borderRadius: 8 }} />
                <div style={{ position: 'absolute', top: 40, left: 40, right: 40, height: 30, background: '#efe8d822', border: '1px solid #efe8d855', borderRadius: 3 }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10, padding: 6 }}>[ blurred: name ]</div>
                </div>
                <div style={{ position: 'absolute', bottom: 70, left: 40, right: 40, height: 20, background: '#efe8d822', border: '1px solid #efe8d855', borderRadius: 3, display: 'grid', placeItems: 'center' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10 }}>[ blurred: ID no ]</div>
                </div>
                <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 10 }}>
                  <span>● detecting</span><span>auto-blur ON</span>
                </div>
              </Box>
              <div className="row" style={{ justifyContent: 'center' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', border: '3px solid var(--rule)', background: 'var(--paper)' }} />
              </div>
              <div className="small mono" style={{ textAlign: 'center' }}>align receipt · tap to capture</div>
              <PhoneTabBar />
            </div>
          </Phone>
          <Desk>
            <div className="col">
              <H lg>We blur the private bits before you even press upload.</H>
              <P>Point your camera. We detect names, ID numbers, signatures and faces on-device, and redact them automatically.</P>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                <Box style={{ background: '#15130f', color: '#efe8d8', minHeight: 360 }}>
                  <div className="small mono" style={{ color: '#efe8d888' }}>LIVE PREVIEW</div>
                  <div style={{ border: '2px dashed #efe8d855', borderRadius: 8, minHeight: 260, marginTop: 10, position: 'relative', padding: 16 }}>
                    <div style={{ background: '#efe8d822', padding: 6, marginBottom: 10, fontSize: 11, fontFamily: 'var(--mono)' }}>[ blurred · NAME ]</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 12, lineHeight: 1.8, color: '#efe8d8bb' }}>
                      ROKEL COMMERCIAL BANK<br/>
                      BRANCH: SIAKA STEVENS<br/>
                      DATE: 14/04/2026 · 10:23<br/>
                      CAC ESCROW · 003-1-004<br/>
                      AMOUNT: Le 80,000.00
                    </div>
                    <div style={{ background: '#efe8d822', padding: 6, marginTop: 10, fontSize: 11, fontFamily: 'var(--mono)' }}>[ blurred · SIGNATURE ]</div>
                  </div>
                  <div className="mono small" style={{ color: '#efe8d888', marginTop: 8 }}>3 regions detected · all auto-redacted</div>
                </Box>
                <div className="col">
                  <Box>
                    <Label>Detected</Label>
                    <div className="col" style={{ gap: 6 }}>
                      {[['Name','redact'],['ID number','redact'],['Signature','redact'],['Amount','keep'],['Date','keep'],['Branch','keep']].map(([f,a]) => (
                        <div key={f} className="between">
                          <span>{f}</span>
                          <Chip on={a==='redact'}>{a}</Chip>
                        </div>
                      ))}
                    </div>
                  </Box>
                  <Box dashed>
                    <Label>Processed on-device</Label>
                    <div className="small">Original photo never leaves your phone. Only the redacted version uploads.</div>
                  </Box>
                  <Btn primary>Capture & upload</Btn>
                </div>
              </div>
            </div>
          </Desk>
          <Caption>Makes privacy the feature. Differentiator in low-trust contexts.</Caption>
        </Variant>

        <Variant name="C — Evidence gallery + match to guide" tag="curation">
          <Phone>
            <div className="col" style={{ gap: 8 }}>
              <H sm>Your evidence · 7</H>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {[1,2,3,4,5,6].map(i => (
                  <Img key={i} style={{ minHeight: 80 }}>receipt {i}</Img>
                ))}
              </div>
              <Box dashed>
                <Label>We suggest attaching this to</Label>
                <div className="small">→ Register a business · Step 3</div>
                <div className="row mt-1"><Btn primary xs>Attach</Btn><Btn xs>Not this</Btn></div>
              </Box>
              <PhoneTabBar />
            </div>
          </Phone>
          <Desk>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 18 }}>
              <div className="col">
                <div className="between"><H lg>Your receipts library</H><Btn icon="plus" primary>Upload new</Btn></div>
                <div className="row"><Chip on>All (24)</Chip><Chip>Unmatched (6)</Chip><Chip>Published (18)</Chip></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 8 }}>
                  {[
                    ['CAC receipt','Le 50k','Step 3',true],
                    ['Rokel teller','Le 80k','unmatched',false],
                    ['Form A','—','Step 2',true],
                    ['Counter photo','—','Step 4',true],
                    ['NASSIT card','—','Step 7',true],
                    ['TIN letter','—','Step 6',true],
                    ['Bank receipt','Le 20k','unmatched',false],
                    ['Stamp duty','Le 5k','Step 3',true],
                  ].map(([t, fee, where, matched], i) => (
                    <Box key={i} style={{ padding: 8 }}>
                      <Img style={{ minHeight: 90 }}>{t}</Img>
                      <div className="small mt-1" style={{ fontWeight: 700 }}>{t}</div>
                      <div className="small mono">{fee}</div>
                      <div className="row mt-1">
                        {matched ? <Badge ok>{where}</Badge> : <Badge warn>{where}</Badge>}
                      </div>
                    </Box>
                  ))}
                </div>
              </div>
              <div className="col">
                <Box soft>
                  <Label>Auto-matched</Label>
                  <div className="sk-p">We read receipt text and suggest which guide + step this belongs to. You confirm.</div>
                </Box>
                <Box>
                  <Label>Suggestion</Label>
                  <div style={{ fontWeight: 700 }}>Rokel teller · Le 80k</div>
                  <div className="small">→ Register a business · Step 3</div>
                  <div className="small mono mt-1">confidence: high (98%)</div>
                  <div className="row mt-1"><Btn primary xs>✓ Attach</Btn><Btn xs>Change</Btn></div>
                </Box>
              </div>
            </div>
          </Desk>
          <Caption>Treats evidence as a first-class archive. Good for repeat contributors.</Caption>
        </Variant>

        <Variant name="D — Offline-first, progressive upload" tag="Sierra Leone / low bandwidth">
          <Phone>
            <div className="col" style={{ gap: 10 }}>
              <Box soft>
                <div className="between"><Label>Connection</Label><Badge warn>offline</Badge></div>
                <div className="small">3 items queued · will send when online</div>
              </Box>
              <div className="col" style={{ gap: 6 }}>
                {[
                  ['Rokel receipt','2.1 MB','queued'],
                  ['Form A photo','1.4 MB','compressed → 180 KB'],
                  ['Counter photo','900 KB','queued'],
                ].map(([n, s, st], i) => (
                  <Box key={i}>
                    <div className="between"><span style={{ fontWeight: 700, fontSize: 14 }}>{n}</span><span className="small mono">{s}</span></div>
                    <div className="small mono">{st}</div>
                    <div style={{ height: 6, border: '1.5px solid var(--rule)', borderRadius: 3, marginTop: 6 }}>
                      <div style={{ width: ['0%','60%','0%'][i], height: '100%', background: 'var(--accent)' }} />
                    </div>
                  </Box>
                ))}
              </div>
              <Box dashed>
                <Label>Settings</Label>
                <div className="between"><span className="small">Data saver</span><Chip on>on</Chip></div>
                <div className="between"><span className="small">Wi-Fi only</span><Chip on>on</Chip></div>
              </Box>
              <PhoneTabBar />
            </div>
          </Phone>
          <Desk>
            <div className="col">
              <div className="between"><H lg>Upload queue</H><div className="row"><Badge warn>offline — 3G disconnected</Badge><Btn>Retry now</Btn></div></div>
              <P>Your evidence is saved on-device. Uploads resume when you\u2019re back online. We compress to ~200 KB per photo so it works on 2G.</P>
              <div className="col" style={{ gap: 10 }}>
                {[
                  ['Rokel receipt','queued · will send when online','2.1 MB → 190 KB',0],
                  ['Form A filled page 1','uploading · Step 2','1.4 MB → 180 KB',62],
                  ['Form A filled page 2','uploading · Step 2','1.6 MB → 210 KB',28],
                  ['CAC counter photo','queued','900 KB → 140 KB',0],
                ].map(([n, st, sizes, pct], i) => (
                  <Box key={i}>
                    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 160px 180px 60px', gap: 12, alignItems: 'center' }}>
                      <Img style={{ minHeight: 48 }}>ev {i+1}</Img>
                      <div>
                        <div style={{ fontWeight: 700 }}>{n}</div>
                        <div className="small">{st}</div>
                      </div>
                      <div className="small mono">{sizes}</div>
                      <div style={{ height: 8, border: '1.5px solid var(--rule)', borderRadius: 3 }}>
                        <div style={{ width: pct+'%', height: '100%', background: 'var(--accent)' }} />
                      </div>
                      <div className="small mono">{pct}%</div>
                    </div>
                  </Box>
                ))}
              </div>
              <Divider />
              <div className="row" style={{ gap: 18 }}>
                <Box style={{ flex: 1 }}><Label>Data saver</Label><div className="small">Auto-compress · strip EXIF · <b>on</b></div></Box>
                <Box style={{ flex: 1 }}><Label>Wi-Fi only uploads</Label><div className="small">Hold until Wi-Fi · <b>on</b></div></Box>
                <Box style={{ flex: 1 }}><Label>SMS fallback</Label><div className="small">Notify editor by SMS if upload stalls &gt; 24h</div></Box>
              </div>
            </div>
          </Desk>
          <Caption>Explicitly for flaky connections. This is the feature that makes it work in SL.</Caption>
        </Variant>

      </div>
    </div>
  );
}

window.EvidenceScreen = EvidenceScreen;
