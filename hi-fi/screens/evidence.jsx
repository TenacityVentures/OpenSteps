// Evidence Upload — 4 variants
// A: step-linked upload · B: live camera + on-device redaction · C: gallery + auto-match · D: offline-first queue

const EV_QUEUE = [
  { name:'Rokel Commercial receipt', size:'2.1 MB', compressed:'190 KB', step:'Step 3', pct:0,  status:'queued'    },
  { name:'Form A · page 1',          size:'1.4 MB', compressed:'180 KB', step:'Step 2', pct:62, status:'uploading' },
  { name:'Form A · page 2',          size:'1.6 MB', compressed:'210 KB', step:'Step 2', pct:28, status:'uploading' },
  { name:'CAC counter photo',        size:'900 KB', compressed:'140 KB', step:'Step 4', pct:0,  status:'queued'    },
];

const GALLERY_ITEMS = [
  { label:'Rokel teller',   fee:'Le 80k', step:'Step 3', matched:true  },
  { label:'Form A filled',  fee:'—',      step:'Step 2', matched:true  },
  { label:'CAC counter',    fee:'—',      step:'Step 4', matched:true  },
  { label:'Bank receipt',   fee:'Le 20k', step:null,     matched:false },
  { label:'NASSIT card',    fee:'—',      step:'Step 7', matched:true  },
  { label:'TIN letter',     fee:'—',      step:'Step 6', matched:true  },
  { label:'Stamp duty',     fee:'Le 5k',  step:'Step 3', matched:true  },
  { label:'Counter sign',   fee:'—',      step:null,     matched:false },
];

// ────────── A · Step-linked upload
function DesktopStepLinked() {
  return (
    <Desk url="opensteps.org/guide/register-a-business/step/3/evidence" shell={{ active: 'guide' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>
        <div className="col" style={{ gap: 14 }}>
          <div>
            <Eyebrow>Register a business · Step 3 of 7</Eyebrow>
            <H lg style={{ fontFamily: 'var(--serif)' }}>Add evidence for this step</H>
            <P>A photo of your receipt, filled form, or the counter. This is what makes guides real — and helps the next person find their way through.</P>
          </div>

          <Box dashed style={{ minHeight: 260, display: 'grid', placeItems: 'center', textAlign: 'center', background: 'var(--surface-2)' }}>
            <div>
              <div style={{ fontSize: 52, marginBottom: 10 }}>📎</div>
              <div style={{ fontWeight: 700, fontSize: 'var(--t-lg)' }}>Drop files here or click to browse</div>
              <div className="small mono" style={{ color: 'var(--text-3)', marginTop: 6 }}>JPG · PNG · PDF · max 8 MB each · files never leave auto-redaction before upload</div>
            </div>
          </Box>

          <div className="row">
            <Btn>📷 Take photo</Btn>
            <Btn>📄 Scan PDF</Btn>
            <Btn>🖼 From gallery</Btn>
          </div>

          <div className="ev-uploaded">
            <Eyebrow>Uploaded so far · 2</Eyebrow>
            <div className="row" style={{ gap: 14, marginTop: 8, alignItems: 'flex-start' }}>
              <div className="ev-thumb">
                <Receipt name="Issued to" amount="Le 80,000" date="14 Apr 2026" scale={0.62} tilt={-1} />
                <div className="ev-chip"><Badge ok>Step 3</Badge></div>
              </div>
              <div className="ev-thumb">
                <FormScan height={120} />
                <div className="ev-chip"><Badge ok>Step 2</Badge></div>
              </div>
            </div>
          </div>

          <div className="between" style={{ borderTop: '1px solid var(--rule)', paddingTop: 12 }}>
            <Btn>← Back to guide</Btn>
            <div className="row">
              <Btn ghost>Skip this step</Btn>
              <Btn primary>Done — continue guide →</Btn>
            </div>
          </div>
        </div>

        <div className="col" style={{ gap: 10 }}>
          <Box raised>
            <Eyebrow>What makes good evidence</Eyebrow>
            <CheckRow done>Date clearly visible</CheckRow>
            <CheckRow done>Amount paid shown</CheckRow>
            <CheckRow done>Office or bank name</CheckRow>
            <CheckRow>Your personal details not needed</CheckRow>
          </Box>

          <Box soft>
            <Eyebrow>Auto-redaction</Eyebrow>
            <div style={{ marginTop: 8 }}>
              <div className="small" style={{ lineHeight: 1.6 }}>
                We blur names, ID numbers, signatures, and faces before publishing. The original photo never leaves your device.
              </div>
            </div>
            <Divider />
            <div className="row" style={{ gap: 6 }}>
              <Chip on>Auto-blur on</Chip>
              <span className="small mono" style={{ color: 'var(--text-3)' }}>3 fields detected</span>
            </div>
          </Box>

          <Box>
            <Eyebrow>Privacy promise</Eyebrow>
            <div className="small" style={{ lineHeight: 1.6 }}>
              Evidence is reviewed before publication. Verifiers see only the redacted version. You can withdraw at any time.
            </div>
          </Box>

          <Box dashed>
            <Eyebrow>Evidence from others · Step 3</Eyebrow>
            <div className="row" style={{ gap: 8, marginTop: 8, alignItems: 'flex-start' }}>
              <Receipt name="Issued to" amount="Le 80,000" date="12 Apr" scale={0.5} tilt={2} />
              <Receipt name="Issued to" amount="Le 80,000" date="8 Apr" scale={0.5} tilt={-1.5} />
            </div>
            <div className="small mono" style={{ color: 'var(--text-3)', marginTop: 6 }}>2 receipts already attached by community</div>
          </Box>
        </div>
      </div>
    </Desk>
  );
}

function MobileStepUpload() {
  return (
    <Phone>
      <MobileHeader title="Add evidence" sub="Step 3 · filing fee" back />
      <div className="col" style={{ padding: 'var(--sp-3)', gap: 10 }}>
        <Box dashed style={{ minHeight: 160, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: 36 }}>📷</div>
            <div style={{ fontWeight: 700, marginTop: 6 }}>Tap to take photo</div>
            <div className="small mono" style={{ color: 'var(--text-3)' }}>or choose from gallery</div>
          </div>
        </Box>

        <Box soft>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>We'll auto-blur</div>
          <div className="small" style={{ lineHeight: 1.6 }}>
            • Your name and ID number<br/>
            • Signature on any document<br/>
            • Phone numbers on receipts<br/>
            • Faces in photos
          </div>
        </Box>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <Receipt name="Issued to" amount="Le 80,000" date="14 Apr" scale={0.6} tilt={-1} />
          <Box dashed style={{ minHeight: 90, display: 'grid', placeItems: 'center' }}>
            <div className="small mono" style={{ color: 'var(--text-3)', textAlign: 'center' }}>+ add another</div>
          </Box>
        </div>

        <div className="row">
          <Btn block ghost>Skip</Btn>
          <Btn block primary>Upload →</Btn>
        </div>
      </div>
      <PhoneTabBar active="contribute" />
    </Phone>
  );
}

// ────────── B · Live camera + on-device redaction
function DesktopCameraRedact() {
  return (
    <Desk url="opensteps.org/evidence/capture" shell={{ active: 'guide' }}>
      <div className="col" style={{ gap: 16 }}>
        <div>
          <Eyebrow>Privacy-first capture</Eyebrow>
          <H lg style={{ fontFamily: 'var(--serif)' }}>We blur the private bits before you even press upload.</H>
          <P>Point your camera at a receipt or form. We detect names, ID numbers, signatures, and faces on-device — and redact them automatically. The original photo never leaves your phone.</P>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="camera-view">
            <div className="camera-bar">
              <span>● detecting</span>
              <span>auto-blur ON</span>
              <span>3 regions</span>
            </div>
            <div className="camera-body">
              <div className="redact-overlay" style={{ top: 38, left: 30, right: 30, height: 22 }}>
                <span className="small mono">NAME</span>
              </div>
              <div className="camera-mono">
                <div style={{ marginTop: 36 }}>ROKEL COMMERCIAL BANK</div>
                <div>BRANCH: SIAKA STEVENS ST</div>
                <div>DATE: 14/04/2026 · 10:23</div>
                <div>REF: CAC-ESCROW · 003-1-004</div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>AMOUNT: Le 80,000.00</div>
              </div>
              <div className="redact-overlay" style={{ bottom: 48, left: 30, right: 100, height: 22 }}>
                <span className="small mono">SIGNATURE</span>
              </div>
              <div className="redact-overlay" style={{ bottom: 70, right: 20, width: 70, height: 22 }}>
                <span className="small mono">ID NO</span>
              </div>
            </div>
            <div className="camera-footer">
              <span className="small mono">3 regions detected · all will be redacted</span>
            </div>
          </div>

          <div className="col" style={{ gap: 10 }}>
            <Box>
              <Eyebrow>Detected fields</Eyebrow>
              <div className="col" style={{ gap: 6, marginTop: 6 }}>
                {[
                  ['Name',    'redact', true],
                  ['ID no.',  'redact', true],
                  ['Signature','redact',true],
                  ['Amount',  'keep',  false],
                  ['Date',    'keep',  false],
                  ['Branch',  'keep',  false],
                ].map(([field, action, red]) => (
                  <div key={field} className="between">
                    <span style={{ fontSize: 'var(--t-sm)' }}>{field}</span>
                    <Chip on={red} soft={!red}>{action}</Chip>
                  </div>
                ))}
              </div>
            </Box>

            <Box dashed>
              <Eyebrow>Processed on-device</Eyebrow>
              <div className="small" style={{ lineHeight: 1.6 }}>
                All redaction happens on your phone using an on-device ML model. The original never leaves. Only the redacted version is uploaded.
              </div>
            </Box>

            <Box soft>
              <Eyebrow>Keeps</Eyebrow>
              <CheckRow done>Fee amount · date · office name</CheckRow>
              <Eyebrow style={{ marginTop: 8 }}>Removes</Eyebrow>
              <CheckRow done>Names · ID numbers · signatures · faces</CheckRow>
            </Box>

            <Btn primary lg>Capture & upload</Btn>
            <Btn>Use photo from gallery instead</Btn>
          </div>
        </div>
      </div>
    </Desk>
  );
}

function MobileCameraView() {
  return (
    <Phone>
      <div className="camera-phone">
        <div className="camera-frame">
          <div style={{ position: 'absolute', inset: 20, border: '2px dashed rgba(239,232,216,0.3)', borderRadius: 8 }} />
          <div className="redact-phone" style={{ top: 50, left: 40, right: 40, height: 20 }}>
            <span style={{ fontSize: 9, fontFamily: 'var(--mono)' }}>NAME</span>
          </div>
          <div style={{ position: 'absolute', top: 90, left: 40, right: 40, color: 'rgba(239,232,216,0.7)', fontFamily: 'var(--mono)', fontSize: 10, lineHeight: 2 }}>
            <div>ROKEL COMMERCIAL BANK</div>
            <div>DATE: 14/04/2026</div>
            <div style={{ fontWeight: 700 }}>AMOUNT: Le 80,000</div>
          </div>
          <div className="redact-phone" style={{ bottom: 90, left: 40, right: 60, height: 18 }}>
            <span style={{ fontSize: 9, fontFamily: 'var(--mono)' }}>SIGNATURE</span>
          </div>
          <div style={{ position: 'absolute', bottom: 30, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(239,232,216,0.7)' }}>
            <span>● detecting</span>
            <span>auto-blur ON</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', border: '3px solid rgba(239,232,216,0.6)', background: 'rgba(239,232,216,0.1)' }} />
        </div>
        <div className="small mono" style={{ textAlign: 'center', color: 'rgba(239,232,216,0.5)', paddingBottom: 8 }}>
          align receipt · tap to capture
        </div>
      </div>
      <PhoneTabBar active="contribute" />
    </Phone>
  );
}

// ────────── C · Gallery + auto-match
function DesktopGallery() {
  return (
    <Desk url="opensteps.org/my/evidence" shell={{ active: 'me' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20, alignItems: 'start' }}>
        <div className="col" style={{ gap: 12 }}>
          <div className="between">
            <div>
              <Eyebrow>Evidence library</Eyebrow>
              <H lg>Your receipts · 24</H>
            </div>
            <Btn primary>+ Upload new</Btn>
          </div>

          <div className="row" style={{ flexWrap: 'wrap', gap: 6 }}>
            <Chip on>All · 24</Chip>
            <Chip>Unmatched · 6</Chip>
            <Chip>Published · 18</Chip>
            <Chip>Under review · 3</Chip>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {GALLERY_ITEMS.map((item, i) => (
              <Box key={i} style={{ padding: 8 }}>
                <div style={{ height: 90, background: i % 3 === 0 ? '#fdfbf5' : 'var(--surface-2)', borderRadius: 'var(--r-xs)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center', marginBottom: 6 }}>
                  {i % 3 === 0
                    ? <div className="small mono" style={{ color: 'var(--text-3)' }}>receipt</div>
                    : <div className="small mono" style={{ color: 'var(--text-3)' }}>photo</div>}
                </div>
                <div style={{ fontWeight: 600, fontSize: 'var(--t-xs)' }}>{item.label}</div>
                <div className="small mono" style={{ color: 'var(--text-3)' }}>{item.fee}</div>
                <div style={{ marginTop: 4 }}>
                  {item.matched
                    ? <Badge ok>{item.step}</Badge>
                    : <Badge warn>unmatched</Badge>}
                </div>
              </Box>
            ))}
          </div>
        </div>

        <div className="col" style={{ gap: 10 }}>
          <Box raised>
            <Eyebrow>Auto-match suggestion</Eyebrow>
            <div style={{ marginTop: 8 }}>
              <div style={{ fontWeight: 700 }}>Rokel teller · Le 80k</div>
              <div className="small" style={{ color: 'var(--text-3)' }}>uploaded 2h ago · unmatched</div>
            </div>
            <div style={{ marginTop: 10, padding: '8px 10px', background: 'var(--accent-tint)', borderRadius: 'var(--r-sm)', border: '1px solid var(--accent-soft)' }}>
              <div className="small mono" style={{ color: 'var(--text-3)' }}>SUGGESTED</div>
              <div style={{ fontWeight: 700, marginTop: 2 }}>Register a business · Step 3</div>
              <div className="small mono" style={{ color: 'var(--text-3)' }}>confidence: high · 98%</div>
            </div>
            <div className="row" style={{ marginTop: 10 }}>
              <Btn primary>✓ Attach</Btn>
              <Btn>Change</Btn>
              <Btn ghost>Not this</Btn>
            </div>
          </Box>

          <Box soft>
            <Eyebrow>How auto-match works</Eyebrow>
            <div className="small" style={{ lineHeight: 1.6 }}>
              We read receipt text — fee amounts, office names, form numbers — and match against known guide steps. You always confirm before it's attached.
            </div>
          </Box>

          <Box>
            <Eyebrow>Your impact</Eyebrow>
            <div className="row" style={{ gap: 14, marginTop: 6 }}>
              <Stat label="Submitted" value="24" />
              <Stat label="Published" value="18" />
              <Stat label="Used by" value="340" sub="people" />
            </div>
          </Box>
        </div>
      </div>
    </Desk>
  );
}

function MobileGallery() {
  return (
    <Phone>
      <MobileHeader title="Your evidence" sub="24 items" back />
      <div className="col" style={{ padding: 'var(--sp-3)', gap: 10 }}>
        <div className="row" style={{ flexWrap: 'wrap', gap: 4 }}>
          <Chip on>All</Chip><Chip>Unmatched</Chip><Chip>Published</Chip>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {[0,1,2,3,4,5].map(i => (
            <Box key={i} style={{ padding: 6 }}>
              <div style={{ height: 70, background: 'var(--surface-2)', borderRadius: 'var(--r-xs)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center' }}>
                <span className="small mono" style={{ color: 'var(--text-3)' }}>photo {i+1}</span>
              </div>
              <div style={{ marginTop: 4 }}>
                {GALLERY_ITEMS[i].matched
                  ? <Badge ok>{GALLERY_ITEMS[i].step}</Badge>
                  : <Badge warn>unmatched</Badge>}
              </div>
            </Box>
          ))}
        </div>
        <Box dashed>
          <Eyebrow>Suggestion</Eyebrow>
          <div className="small" style={{ marginTop: 4 }}>Rokel teller → <b>Register a business · Step 3</b></div>
          <div className="row" style={{ marginTop: 6 }}>
            <Btn xs primary>✓ Attach</Btn>
            <Btn xs>Not this</Btn>
          </div>
        </Box>
      </div>
      <PhoneTabBar active="me" />
    </Phone>
  );
}

// ────────── D · Offline-first progressive upload
function DesktopOfflineQueue() {
  return (
    <Desk url="opensteps.org/evidence/queue" shell={{ active: 'guide' }}>
      <div className="col" style={{ gap: 14 }}>
        <div className="between">
          <div>
            <Eyebrow>Offline-first · Sierra Leone</Eyebrow>
            <H lg style={{ fontFamily: 'var(--serif)' }}>Upload queue</H>
            <P>Your evidence is saved on-device. Uploads resume when you're back online. We compress to ~200 KB per photo so it works on 2G.</P>
          </div>
          <div className="row">
            <Badge warn>● offline · 3G lost</Badge>
            <Btn>Retry now</Btn>
          </div>
        </div>

        <div className="col" style={{ gap: 8 }}>
          {EV_QUEUE.map((item, i) => (
            <Box key={i} style={{ padding: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '72px 1fr 160px 220px 60px', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 72, height: 72, background: 'var(--surface-2)', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center' }}>
                  <span className="small mono" style={{ color: 'var(--text-3)' }}>img</span>
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>{item.name}</div>
                  <div className="small">{item.step} · {item.status}</div>
                </div>
                <div>
                  <div className="small mono" style={{ color: 'var(--text-3)' }}>{item.size}</div>
                  <div className="small mono" style={{ color: 'var(--accent)' }}>→ {item.compressed}</div>
                </div>
                <div>
                  <div className="between" style={{ marginBottom: 4 }}>
                    <span className="small mono" style={{ color: 'var(--text-3)' }}>{item.status}</span>
                    <span className="small mono">{item.pct}%</span>
                  </div>
                  <ProgressBar value={item.pct} />
                </div>
                <Badge warn={item.pct === 0} info={item.pct > 0}>{item.pct > 0 ? 'active' : 'queued'}</Badge>
              </div>
            </Box>
          ))}
        </div>

        <Divider />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <Box>
            <Eyebrow>Data saver</Eyebrow>
            <div className="between" style={{ marginTop: 6 }}>
              <div className="small">Auto-compress · strip EXIF</div>
              <Chip on>on</Chip>
            </div>
          </Box>
          <Box>
            <Eyebrow>Wi-Fi only uploads</Eyebrow>
            <div className="between" style={{ marginTop: 6 }}>
              <div className="small">Hold until Wi-Fi available</div>
              <Chip on>on</Chip>
            </div>
          </Box>
          <Box dashed>
            <Eyebrow>SMS fallback</Eyebrow>
            <div className="small" style={{ marginTop: 6, lineHeight: 1.5 }}>
              Notify an editor by SMS if an upload stalls for more than 24 hours.
            </div>
          </Box>
        </div>
      </div>
    </Desk>
  );
}

function MobileOfflineQueue() {
  return (
    <Phone>
      <MobileHeader title="Upload queue" sub="3 waiting" back />
      <div className="col" style={{ padding: 'var(--sp-3)', gap: 10 }}>
        <Box soft>
          <div className="between">
            <Eyebrow>Connection</Eyebrow>
            <Badge warn>● offline</Badge>
          </div>
          <div className="small" style={{ marginTop: 4, color: 'var(--text-3)' }}>
            4 items saved on-device · will send when online
          </div>
        </Box>

        {EV_QUEUE.map((item, i) => (
          <Box key={i}>
            <div className="between">
              <div style={{ fontWeight: 700, fontSize: 'var(--t-sm)' }}>{item.name}</div>
              <span className="small mono" style={{ color: 'var(--text-3)' }}>{item.size}</span>
            </div>
            <div className="between" style={{ marginTop: 4 }}>
              <span className="small mono" style={{ color: 'var(--accent)' }}>→ {item.compressed}</span>
              <span className="small mono" style={{ color: 'var(--text-3)' }}>{item.status}</span>
            </div>
            <div style={{ marginTop: 6 }}>
              <ProgressBar value={item.pct} />
            </div>
          </Box>
        ))}

        <Box dashed>
          <Eyebrow>Data settings</Eyebrow>
          <div className="between" style={{ marginTop: 6 }}><span className="small">Data saver</span><Chip on>on</Chip></div>
          <div className="between" style={{ marginTop: 6 }}><span className="small">Wi-Fi only</span><Chip on>on</Chip></div>
        </Box>
      </div>
      <PhoneTabBar active="contribute" />
    </Phone>
  );
}

function EvidenceScreen() {
  return (
    <div>
      <ScreenHead
        num="05"
        title="Evidence Upload"
        sub="Receipts, forms, office photos. The trust layer that makes guides real. Offline-tolerant, privacy-aware, matched to guide steps."
      />
      <div className="grid">

        <Variant name="A · Step-linked receipt upload — in-context" tag="baseline">
          <DesktopStepLinked />
          <MobileStepUpload />
          <Caption>Anchored to the step you're on. Privacy promise is upfront. Community evidence shown alongside.</Caption>
        </Variant>

        <Variant name="B · Live camera + on-device redaction preview" tag="novel · privacy-first">
          <DesktopCameraRedact />
          <MobileCameraView />
          <Caption>Makes privacy the feature. Original never leaves the device. Differentiator in low-trust contexts.</Caption>
        </Variant>

        <Variant name="C · Evidence gallery + auto-match to guide step" tag="curation">
          <DesktopGallery />
          <MobileGallery />
          <Caption>Treats evidence as a first-class archive. Auto-match reads receipt text and suggests which step it belongs to.</Caption>
        </Variant>

        <Variant name="D · Offline-first, progressive upload queue" tag="Sierra Leone · low bandwidth">
          <DesktopOfflineQueue />
          <MobileOfflineQueue />
          <Caption>Explicitly for flaky 2G/3G connections. Compresses, queues, retries. The feature that makes it actually work in SL.</Caption>
        </Variant>

      </div>
    </div>
  );
}

window.EvidenceScreen = EvidenceScreen;
