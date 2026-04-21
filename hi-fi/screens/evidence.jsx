// Evidence Upload — mix of A (step-linked) + B (privacy-first preview) + D (offline queue)

const UPLOAD_QUEUE = [
  { name:'Rokel receipt',     size:'2.1 MB', compressed:'190 KB', pct:0,  status:'queued · offline',    step:'Step 3' },
  { name:'Form A · page 1',   size:'1.4 MB', compressed:'180 KB', pct:62, status:'uploading…',          step:'Step 2' },
  { name:'Form A · page 2',   size:'1.6 MB', compressed:'210 KB', pct:28, status:'uploading…',          step:'Step 2' },
  { name:'CAC counter photo', size:'900 KB',  compressed:'140 KB', pct:0,  status:'queued · offline',   step:'Step 4' },
];

const DETECTED_FIELDS = [
  { field:'Name',       action:'redact', redact:true  },
  { field:'ID number',  action:'redact', redact:true  },
  { field:'Signature',  action:'redact', redact:true  },
  { field:'Amount',     action:'keep',   redact:false },
  { field:'Date',       action:'keep',   redact:false },
  { field:'Branch',     action:'keep',   redact:false },
];

const GALLERY = [
  { name:'CAC receipt',    fee:'Le 50k', step:'Step 3', matched:true  },
  { name:'Rokel teller',   fee:'Le 80k', step:'unmatched', matched:false },
  { name:'Form A',         fee:'—',      step:'Step 2', matched:true  },
  { name:'Counter photo',  fee:'—',      step:'Step 4', matched:true  },
  { name:'NASSIT card',    fee:'—',      step:'Step 7', matched:true  },
  { name:'TIN letter',     fee:'—',      step:'Step 6', matched:true  },
  { name:'Bank receipt',   fee:'Le 20k', step:'unmatched', matched:false },
  { name:'Stamp duty',     fee:'Le 5k',  step:'Step 3', matched:true  },
];

function EvidenceScreen() {
  return (
    <div>
      <ScreenHead
        num="05"
        title="Evidence Upload"
        sub="Mix: A step-linked upload + B on-device privacy preview + D offline-first queue. The trust layer."
      />
      <div className="grid">

        {/* ── Variant 1: Desktop full upload + privacy preview ── */}
        <Variant name="Desktop — upload · privacy preview · offline queue" tag="mix A+B+D · primary">
          <Desk url="opensteps.org/sl/register-a-business/step-3/evidence">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 18 }}>

              {/* LEFT — Upload zone + privacy */}
              <div className="col">
                <div className="small mono" style={{ color: 'var(--text-3)' }}>Register a business · Step 3 of 7</div>
                <H lg>Add evidence for this step</H>
                <P>A photo of your receipt, the filled form, or the office counter. This is what makes guides real — and helps the next person who goes through this.</P>

                {/* Drop zone */}
                <Box dashed style={{
                  minHeight: 200, display: 'grid', placeItems: 'center',
                  textAlign: 'center', background: 'var(--surface-2)', cursor: 'pointer',
                }}>
                  <div>
                    <div style={{ fontSize: 44, marginBottom: 8 }}>📎</div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>Drop files here</div>
                    <div className="small mono mt-1">JPG · PNG · PDF · max 8 MB each</div>
                    <div className="row mt-2" style={{ justifyContent: 'center', gap: 8 }}>
                      <Btn xs icon="plus">Take photo</Btn>
                      <Btn xs icon="plus">Scan PDF</Btn>
                      <Btn xs icon="plus">From gallery</Btn>
                    </div>
                  </div>
                </Box>

                {/* Live privacy preview */}
                <div>
                  <div className="between" style={{ marginBottom: 8 }}>
                    <Label>Privacy preview — on-device processing</Label>
                    <Badge ok>Auto-blur ON</Badge>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {/* Dark "camera" view */}
                    <div style={{
                      background: '#15130f', borderRadius: 'var(--radius)', padding: 14,
                      border: '1px solid #333', minHeight: 220, position: 'relative',
                    }}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: '#efe8d888', marginBottom: 8 }}>
                        LIVE PREVIEW
                      </div>
                      <div style={{
                        border: '1px dashed #efe8d855', borderRadius: 6,
                        padding: 12, minHeight: 160, position: 'relative',
                      }}>
                        {/* Blurred field */}
                        <div style={{
                          background: '#efe8d822', border: '1px solid #efe8d855',
                          padding: '4px 8px', borderRadius: 3, marginBottom: 8,
                          fontFamily: 'var(--mono)', fontSize: 10, color: '#efe8d877',
                        }}>[ blurred · NAME ]</div>
                        {/* Visible receipt lines */}
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, lineHeight: 1.8, color: '#efe8d8bb' }}>
                          ROKEL COMMERCIAL BANK<br />
                          BRANCH: SIAKA STEVENS<br />
                          DATE: 14/04/2026 · 10:23<br />
                          CAC ESCROW · 003-1-004<br />
                          <span style={{ fontWeight: 700, color: '#efe8d8' }}>AMOUNT: Le 80,000.00</span>
                        </div>
                        {/* Blurred signature */}
                        <div style={{
                          background: '#efe8d822', border: '1px solid #efe8d855',
                          padding: '4px 8px', borderRadius: 3, marginTop: 8,
                          fontFamily: 'var(--mono)', fontSize: 10, color: '#efe8d877',
                        }}>[ blurred · SIGNATURE ]</div>
                      </div>
                      <div className="small mono" style={{ color: '#efe8d866', marginTop: 6 }}>
                        3 regions detected · all auto-redacted
                      </div>
                    </div>

                    {/* Detection table */}
                    <div className="col">
                      <Box>
                        <Label>Detected fields</Label>
                        <div className="col mt-1" style={{ gap: 6 }}>
                          {DETECTED_FIELDS.map(f => (
                            <div key={f.field} className="between" style={{ fontSize: 13 }}>
                              <span>{f.field}</span>
                              <Chip on={f.redact}>{f.action}</Chip>
                            </div>
                          ))}
                        </div>
                      </Box>
                      <Box soft>
                        <Label>On-device processing</Label>
                        <div className="small" style={{ marginTop: 4 }}>
                          Original photo never leaves your phone. Only the redacted version uploads. Works fully offline.
                        </div>
                      </Box>
                    </div>
                  </div>
                </div>

                {/* Good evidence tips */}
                <Box>
                  <Label>What makes good evidence</Label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginTop: 6, fontSize: 13 }}>
                    {[
                      ['✓', 'Date visible'],['✓', 'Amount paid visible'],
                      ['✓', 'Office or bank name'],['✗', 'No personal details needed'],
                    ].map(([icon, text]) => (
                      <div key={text} style={{ display: 'flex', gap: 6, alignItems: 'center', color: icon === '✓' ? 'var(--green)' : 'var(--text-3)' }}>
                        <span style={{ fontWeight: 700 }}>{icon}</span>
                        <span style={{ color: 'var(--text-2)' }}>{text}</span>
                      </div>
                    ))}
                  </div>
                </Box>
              </div>

              {/* RIGHT — Offline queue + settings */}
              <div className="col">
                <div className="between">
                  <Label>Upload queue</Label>
                  <Badge warn>offline · 3G</Badge>
                </div>
                <div className="col" style={{ gap: 6 }}>
                  {UPLOAD_QUEUE.map((item, i) => (
                    <Box key={i} style={{ padding: 10 }}>
                      <div className="between">
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{item.name}</div>
                        <Badge>{item.step}</Badge>
                      </div>
                      <div className="small" style={{ marginTop: 2 }}>{item.status}</div>
                      <div className="small mono" style={{ marginTop: 2, color: 'var(--text-3)' }}>
                        {item.size} → {item.compressed}
                      </div>
                      <div style={{ marginTop: 6 }}>
                        <div className="progress-track">
                          <div className="progress-fill" style={{ width: item.pct + '%' }} />
                        </div>
                      </div>
                      {item.pct > 0 && (
                        <div className="small mono" style={{ textAlign: 'right', marginTop: 2 }}>{item.pct}%</div>
                      )}
                    </Box>
                  ))}
                </div>

                <P style={{ fontSize: 12 }}>
                  Evidence is saved on-device. Uploads resume automatically when you're back online. Compressed to ~200 KB for 2G.
                </P>

                <Divider />

                <Box soft>
                  <Label>Bandwidth settings</Label>
                  <div className="col mt-1" style={{ gap: 8 }}>
                    {[['Data saver (auto-compress)','on'],['Wi-Fi only uploads','on'],['SMS fallback if stalled >24h','off']].map(([k,v]) => (
                      <div key={k} className="between" style={{ fontSize: 13 }}>
                        <span>{k}</span>
                        <Chip on={v === 'on'}>{v}</Chip>
                      </div>
                    ))}
                  </div>
                </Box>

                <Btn ghost xs>Retry all now</Btn>
              </div>
            </div>
          </Desk>
          <Caption>Step-linked context (A) · live on-device privacy redaction (B) · offline queue with 2G compression (D).</Caption>
        </Variant>

        {/* ── Variant 2: Mobile camera + redaction ── */}
        <Variant name="Mobile — camera capture with live redaction" tag="variant B · privacy-first">
          <Phone>
            <div className="col" style={{ gap: 10 }}>
              <div className="small mono" style={{ fontWeight: 600 }}>STEP 3 · ADD EVIDENCE</div>
              <H sm>Upload your receipt</H>

              {/* Simulated dark camera view */}
              <div style={{
                background: '#15130f', borderRadius: 'var(--radius)', border: '2px solid #333',
                minHeight: 240, position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', inset: 14, border: '2px dashed #efe8d833', borderRadius: 6 }} />

                {/* Blurred regions overlay */}
                <div style={{
                  position: 'absolute', top: 36, left: 36, right: 36, height: 26,
                  background: '#efe8d822', border: '1px solid #efe8d855', borderRadius: 3,
                  display: 'flex', alignItems: 'center', padding: '0 8px',
                }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: '#efe8d877' }}>[ blurred: name ]</span>
                </div>
                <div style={{
                  position: 'absolute', bottom: 56, left: 36, right: 36, height: 20,
                  background: '#efe8d822', border: '1px solid #efe8d855', borderRadius: 3,
                  display: 'flex', alignItems: 'center', padding: '0 8px',
                }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: '#efe8d877' }}>[ blurred: ID no ]</span>
                </div>

                {/* Status bar */}
                <div style={{
                  position: 'absolute', bottom: 10, left: 12, right: 12,
                  display: 'flex', justifyContent: 'space-between',
                  fontFamily: 'var(--mono)', fontSize: 10, color: '#efe8d888',
                }}>
                  <span>● detecting</span>
                  <span style={{ color: '#86efac' }}>auto-blur ON</span>
                </div>
              </div>

              {/* Shutter button */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  width: 58, height: 58, borderRadius: '50%',
                  border: '3px solid var(--border-strong)', background: 'var(--surface)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', boxShadow: 'var(--shadow)',
                }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--surface-3)' }} />
                </div>
              </div>

              <div className="small mono" style={{ textAlign: 'center', color: 'var(--text-3)' }}>
                align receipt in frame · tap to capture
              </div>

              {/* Privacy guarantee */}
              <Box soft>
                <Label>Privacy promise</Label>
                <div className="small" style={{ marginTop: 4 }}>
                  Names, ID numbers, signatures and faces are blurred <b>on your device</b> before upload. Original never sent.
                </div>
              </Box>

              <div className="row" style={{ justifyContent: 'space-between' }}>
                <Btn>Skip</Btn>
                <Btn primary>Capture & upload</Btn>
              </div>

              <PhoneTabBar active="Browse" />
            </div>
          </Phone>
        </Variant>

        {/* ── Variant 3: Desktop evidence gallery ── */}
        <Variant name="Desktop — receipts library + auto-match" tag="variant C · curation">
          <Desk url="opensteps.org/my/evidence">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 18 }}>
              <div className="col">
                <div className="between">
                  <H lg>Your receipts library</H>
                  <Btn icon="plus" primary>Upload new</Btn>
                </div>
                <div className="row" style={{ gap: 6 }}>
                  <Chip on>All (24)</Chip>
                  <Chip>Unmatched (6)</Chip>
                  <Chip>Published (18)</Chip>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 8 }}>
                  {GALLERY.map((item, i) => (
                    <Box key={i} style={{ padding: 8, cursor: 'pointer' }}>
                      <Img style={{ minHeight: 80 }}>{item.name}</Img>
                      <div style={{ fontWeight: 600, fontSize: 12, marginTop: 6 }}>{item.name}</div>
                      <div className="small mono">{item.fee}</div>
                      <div style={{ marginTop: 4 }}>
                        {item.matched
                          ? <Badge ok>{item.step}</Badge>
                          : <Badge warn>{item.step}</Badge>}
                      </div>
                    </Box>
                  ))}
                </div>
              </div>

              <div className="col">
                <Box soft>
                  <Label>Auto-match</Label>
                  <P style={{ marginTop: 6, fontSize: 12 }}>
                    We read receipt text and suggest which guide + step it belongs to. You confirm.
                  </P>
                </Box>
                <Box style={{ border: '2px solid var(--accent)' }}>
                  <Label>Suggestion</Label>
                  <div style={{ fontWeight: 700, marginTop: 6 }}>Rokel teller · Le 80k</div>
                  <div className="small" style={{ marginTop: 4 }}>→ Register a business · Step 3</div>
                  <div className="small mono mt-1">confidence: 98%</div>
                  <div className="row mt-2">
                    <Btn primary xs>✓ Attach</Btn>
                    <Btn xs>Change</Btn>
                  </div>
                </Box>
                <Box>
                  <Label>Unmatched (2 remaining)</Label>
                  <div className="col mt-1" style={{ gap: 6 }}>
                    {GALLERY.filter(g => !g.matched).map((item, i) => (
                      <div key={i} className="between" style={{ fontSize: 13 }}>
                        <span>{item.name}</span>
                        <Btn xs>Match</Btn>
                      </div>
                    ))}
                  </div>
                </Box>
              </div>
            </div>
          </Desk>
          <Caption>Treats evidence as a first-class archive (C). Auto-match reduces contributor effort.</Caption>
        </Variant>

        {/* ── Variant 4: Mobile offline queue ── */}
        <Variant name="Mobile — offline upload queue" tag="variant D · low bandwidth · Sierra Leone">
          <Phone>
            <div className="col" style={{ gap: 10 }}>
              <Box soft style={{ borderLeft: '3px solid var(--amber)' }}>
                <div className="between">
                  <Label>Connection</Label>
                  <Badge warn>offline</Badge>
                </div>
                <div className="small" style={{ marginTop: 4 }}>3 items queued · will send when online</div>
              </Box>

              <div className="col" style={{ gap: 6 }}>
                {UPLOAD_QUEUE.slice(0, 3).map((item, i) => (
                  <Box key={i} style={{ padding: 10 }}>
                    <div className="between">
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{item.name}</span>
                      <span className="small mono">{item.size}</span>
                    </div>
                    <div className="small mono" style={{ marginTop: 2, color: 'var(--text-3)' }}>
                      → {item.compressed} · {item.status}
                    </div>
                    <div className="progress-track" style={{ marginTop: 6 }}>
                      <div className="progress-fill" style={{ width: item.pct + '%' }} />
                    </div>
                  </Box>
                ))}
              </div>

              <Box dashed>
                <Label>Settings</Label>
                <div className="col mt-1" style={{ gap: 6 }}>
                  {[['Data saver','on'],['Wi-Fi only','on']].map(([k,v]) => (
                    <div key={k} className="between" style={{ fontSize: 13 }}>
                      <span>{k}</span>
                      <Chip on>{v}</Chip>
                    </div>
                  ))}
                </div>
              </Box>

              <P style={{ fontSize: 12 }}>
                Photos auto-compressed to ~200 KB before upload. Works on 2G when you're back online.
              </P>

              <Btn ghost xs>Retry now</Btn>

              <PhoneTabBar active="Browse" />
            </div>
          </Phone>
        </Variant>

      </div>
    </div>
  );
}

window.EvidenceScreen = EvidenceScreen;
