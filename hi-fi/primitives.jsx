// OpenSteps hi-fi primitives · v3
// Real-looking building blocks for a civic product, not wireframe placeholders.

// ── Basic atoms ────────────────────────────────────────────────────────────

const Btn = ({ children, primary, ghost, soft, xs, lg, block, icon, style, onClick }) => (
  <span
    className={`sk-btn${primary ? ' primary' : ''}${ghost ? ' ghost' : ''}${soft ? ' soft' : ''}${xs ? ' xs' : ''}${lg ? ' lg' : ''}${block ? ' block' : ''}`}
    style={style}
    onClick={onClick}
  >
    {icon && <span className={`ico ${icon}`} />}
    {children}
  </span>
);

const Chip = ({ children, on, active, soft, xs, onClick, style }) => (
  <span className={`sk-chip${(on||active) ? ' on' : ''}${soft ? ' soft' : ''}${xs ? ' xs' : ''}`} style={style} onClick={onClick}>{children}</span>
);

const Badge = ({ children, ok, warn, err, info, solid, dot }) => (
  <span className={`sk-badge${ok ? ' ok' : ''}${warn ? ' warn' : ''}${err ? ' err' : ''}${info ? ' info' : ''}${solid ? ' solid' : ''}${dot ? ' dot' : ''}`}>
    {children}
  </span>
);

const Input = ({ ph, lg, xl, left, right, style }) => (
  <div className={`sk-input${lg ? ' lg' : ''}${xl ? ' xl' : ''}`} style={style}>
    {left}
    <span className="ph grow">{ph}</span>
    {right}
  </div>
);

const Img = ({ children, style }) => (
  <div className="sk-img" style={style}>{children || '[ photo ]'}</div>
);

const Divider = ({ thick, dashed, style }) => (
  <div className={`sk-divider${thick ? ' thick' : ''}${dashed ? ' dashed' : ''}`} style={style} />
);

const Label   = ({ children, style }) => <div className="sk-label" style={style}>{children}</div>;

const H = ({ children, sm, lg, xl, style, className = '' }) => (
  <div className={`sk-h${sm ? ' sm' : ''}${lg ? ' lg' : ''}${xl ? ' xl' : ''} ${className}`} style={style}>{children}</div>
);

const P = ({ children, style }) => <div className="sk-p" style={style}>{children}</div>;

const Eyebrow = ({ children }) => <div className="eyebrow">{children}</div>;

const Box = ({ children, dashed, soft, accent, raised, tight, style, className = '', onClick }) => (
  <div
    className={`sk-box${dashed ? ' dashed' : ''}${soft ? ' soft' : ''}${accent ? ' accent' : ''}${raised ? ' raised' : ''}${tight ? ' tight' : ''} ${className}`}
    style={style}
    onClick={onClick}
  >
    {children}
  </div>
);

// ── Avatar w/ color palette ────────────────────────────────────────────────
const AVATAR_COLORS = {
  A: 'c-1', B: 'c-2', C: 'c-3', D: 'c-4', E: 'c-5',
  F: 'c-2', G: 'c-3', H: 'c-4', I: 'c-5', J: 'c-1',
  K: 'c-3', L: 'c-4', M: 'c-5', N: 'c-1', O: 'c-2',
  P: 'c-4', Q: 'c-5', R: 'c-1', S: 'c-2', T: 'c-3',
  U: 'c-5', V: 'c-1', W: 'c-2', X: 'c-3', Y: 'c-4', Z: 'c-5',
};
const NAMED_COLORS = { green: 'c-2', amber: 'c-1', teal: 'c-3', coral: 'c-4', ink: 'c-5' };
const Avatar = ({ children, size, sm, lg, color, style }) => {
  const initial = (String(children || '?'))[0].toUpperCase();
  const c = color
    ? (NAMED_COLORS[color] || AVATAR_COLORS[color] || AVATAR_COLORS[initial] || 'c-1')
    : (AVATAR_COLORS[initial] || 'c-1');
  return (
    <span
      className={`sk-avatar ${c}${lg ? ' lg' : ''}${sm ? ' sm' : ''}`}
      style={{ ...(size ? { width: size, height: size, fontSize: size * 0.42 } : {}), ...style }}
    >
      {children}
    </span>
  );
};

// ── Step list item ─────────────────────────────────────────────────────────
const Step = ({ n, title, sub, done, current, children }) => (
  <div className={`sk-step${done ? ' done' : ''}${current ? ' current' : ''}`}>
    <span className="num">{done ? '✓' : n}</span>
    <div>
      <div style={{ fontWeight: 600, fontSize: 14.5, lineHeight: 1.3 }}>{title}</div>
      {sub && <div className="small" style={{ marginTop: 3 }}>{sub}</div>}
      {children}
    </div>
  </div>
);

// ── Progress ───────────────────────────────────────────────────────────────
const ProgressBar = ({ pct = 0, value }) => (
  <div className="progress-track">
    <div className="progress-fill" style={{ width: (value !== undefined ? value : pct) + '%' }} />
  </div>
);

const SegProgress = ({ total = 7, current = 0 }) => (
  <div className="progress-seg">
    {Array.from({ length: total }).map((_, i) => (
      <span key={i} className={i < current ? 'done' : i === current ? 'cur' : 'next'} />
    ))}
  </div>
);

// ── Brand mark (SVG) ───────────────────────────────────────────────────────
const BrandMark = ({ size = 36, style }) => (
  <svg className="mark" viewBox="0 0 40 40" style={{ width: size, height: size, ...style }} aria-hidden="true">
    <defs>
      <linearGradient id="bm-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"  stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    <circle cx="20" cy="20" r="17" fill="none" stroke="url(#bm-g)" strokeWidth="2.4" strokeDasharray="4 2.5" strokeLinecap="round" />
    <path d="M11 21.5 L17 27 L30 13.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Phone frame ────────────────────────────────────────────────────────────
const Phone = ({ children, battery = 88, time = '9:41' }) => (
  <div className="phone">
    <div className="phone-screen">
      <div className="phone-notch" />
      <div className="phone-statusbar">
        <span className="left">{time}</span>
        <span className="right">
          <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden="true">
            <rect x="1" y="5.5" width="2" height="4" rx="0.4" fill="currentColor" opacity="0.85"/>
            <rect x="4.5" y="3.5" width="2" height="6" rx="0.4" fill="currentColor" opacity="0.85"/>
            <rect x="8" y="1.5" width="2" height="8" rx="0.4" fill="currentColor" opacity="0.85"/>
            <rect x="11.5" y="0" width="2" height="10" rx="0.4" fill="currentColor" opacity="0.4"/>
          </svg>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600 }}>4G</span>
          <svg width="20" height="10" viewBox="0 0 24 12" aria-hidden="true">
            <rect x="0.5" y="1" width="20" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1"/>
            <rect x="21.5" y="4" width="1.5" height="4" fill="currentColor"/>
            <rect x="2" y="2.5" width={`${(battery/100)*17}`} height="7" rx="1" fill="currentColor"/>
          </svg>
        </span>
      </div>
      <div className="phone-body">{children}</div>
    </div>
  </div>
);

// ── Mobile tab bar with proper icons ───────────────────────────────────────
const TabIcon = ({ kind }) => {
  const icons = {
    browse: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <circle cx="11" cy="11" r="7"/>
        <path d="M20 20l-3.5-3.5" strokeLinecap="round"/>
      </svg>
    ),
    saved: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <path d="M6 4h12v17l-6-4-6 4V4Z" strokeLinejoin="round"/>
      </svg>
    ),
    contribute: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7v10M7 12h10" strokeLinecap="round"/>
      </svg>
    ),
    me: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 21c1.5-4.5 5-6 8-6s6.5 1.5 8 6" strokeLinecap="round"/>
      </svg>
    ),
    verify: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <path d="M12 3l8 3v6c0 5-3.5 8.3-8 9-4.5-.7-8-4-8-9V6l8-3Z" strokeLinejoin="round"/>
        <path d="M8.5 12l2.5 2.5L15.5 10" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };
  return <span className="ic">{icons[kind]}</span>;
};

const PhoneTabBar = ({ active = 'browse' }) => (
  <div className="phone-tabbar">
    {[
      ['browse',     'Browse'],
      ['saved',      'Saved'],
      ['contribute', 'Add'],
      ['verify',     'Verify'],
      ['me',         'Me'],
    ].map(([k, label]) => (
      <div key={k} className={`tab-item${k === active ? ' on' : ''}`}>
        <TabIcon kind={k} />
        <span>{label}</span>
      </div>
    ))}
  </div>
);

// ── Mobile header (under status bar) ───────────────────────────────────────
const MobileHeader = ({ title = 'OpenSteps', sub, locale = 'SL', avatar, back }) => (
  <div className="m-header">
    <div className="brand-micro">
      {back ? (
        <span style={{ fontSize: 18, color: 'var(--text-2)', marginRight: 4 }}>‹</span>
      ) : (
        <BrandMark size={22} />
      )}
      <span>{title}</span>
      {sub && <span className="small mono" style={{ color: 'var(--text-3)', marginLeft: 4 }}>{sub}</span>}
    </div>
    <span className="loc">{locale}</span>
    {typeof avatar === 'string' && <span className="avatar-sm">{avatar}</span>}
  </div>
);

// ── Desktop frame w/ optional app shell ────────────────────────────────────
const Desk = ({ children, url = 'opensteps.org/sl/register-a-business', shell }) => (
  <div className="desk">
    <div className="desk-bar">
      <span className="dot" /><span className="dot" /><span className="dot" />
      <span className="url"><span className="lock">🔒</span>{url}</span>
    </div>
    <div className="desk-body">
      {shell ? <AppShell {...shell}>{children}</AppShell> : <div style={{ padding: 28 }}>{children}</div>}
    </div>
  </div>
);

// ── App shell with nav (desktop) ───────────────────────────────────────────
const AppShell = ({ children, active = 'home' }) => (
  <div className="app-shell">
    <div className="app-header">
      <div className="app-brand">
        <BrandMark size={26} />
        <span className="name">OpenSteps</span>
        <span className="locale">🇸🇱 Sierra Leone</span>
      </div>
      <div className="app-nav">
        <a className={active === 'home' ? 'on' : ''}>Browse</a>
        <a className={active === 'guide' ? 'on' : ''}>Guides</a>
        <a className={active === 'contribute' ? 'on' : ''}>Contribute</a>
        <a className={active === 'verify' ? 'on' : ''}>Verify</a>
        <a>My activity</a>
      </div>
      <div className="app-actions">
        <Btn ghost xs>🔔</Btn>
        <Btn xs>Sign in</Btn>
        <Btn primary xs>Contribute</Btn>
      </div>
    </div>
    <div className="app-body">{children}</div>
  </div>
);

// ── Variant card ───────────────────────────────────────────────────────────
const Variant = ({ name, tag, children }) => (
  <div className="variant">
    <div className="variant-head">
      <span className="v-name">{name}</span>
      <span className="v-tag">{tag}</span>
    </div>
    <div className="variant-body">
      <div className="frames">{children}</div>
    </div>
  </div>
);

const Caption = ({ children }) => <div className="caption">{children}</div>;

const ScreenHead = ({ num, title, sub }) => (
  <div className="screen-head">
    <div>
      <h2 className="sk-h lg" style={{ margin: 0 }}>
        <span className="num">{num}</span>
        {title}
      </h2>
    </div>
    <div className="screen-sub">{sub}</div>
  </div>
);

const Anno = ({ children, pos = 'bl', style }) => {
  const cls = { bl: '', br: 'r', tl: 'u', tr: 'ru' }[pos] || '';
  return <div className={`anno ${cls}`} style={style}>{children}</div>;
};

// ── Trust score bar ────────────────────────────────────────────────────────
const TrustBar = ({ score, max = 10, value, big }) => {
  const s = score !== undefined ? score : (value !== undefined ? value / 10 : 8.7);
  const pct = (s / max) * 100;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div className="progress-track" style={{ flex: 1 }}>
        <div className="progress-fill" style={{ width: pct + '%' }} />
      </div>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--accent)', fontWeight: 700 }}>
        {s}<span style={{ color: 'var(--text-3)', fontWeight: 400 }}>/{max}</span>
      </span>
    </div>
  );
};

// ── Stat block ─────────────────────────────────────────────────────────────
const Stat = ({ label, value, sub, style }) => (
  <div style={style}>
    <div className="sk-label">{label}</div>
    <div style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 26, letterSpacing: '-0.5px', lineHeight: 1.1, marginTop: 4 }}>
      {value}
    </div>
    {sub && <div className="small" style={{ marginTop: 2 }}>{sub}</div>}
  </div>
);

// ── Receipt component (real-looking CAC / bank receipt) ───────────────────
const Receipt = ({ title, name, amount, date, scale = 1, lines = [], total, blurNames = true, stamp = true, tilt = 0 }) => {
  const heading = title || 'ROKEL COMMERCIAL BANK';
  const tot = total || amount || 'Le 50,000';
  const rows = lines.length ? lines : (name || amount ? [
    ['Issued to', name || '—', 'blur'],
    ['Date', date || '—'],
    ['Ref', 'OS-' + Math.floor(Math.random()*90000+10000)],
  ] : []);
  return (
    <div className="receipt" style={{ transform: `rotate(${tilt}deg) scale(${scale})`, transformOrigin: 'top left' }}>
      <h5>{heading}</h5>
      <div className="col" style={{ gap: 2 }}>
        {rows.map((ln, i) => (
          <div key={i} className="row-i">
            <span>{ln[0]}</span>
            <span style={{ textAlign: 'right' }}>
              {ln[2] === 'blur' && blurNames
                ? <span className="blur">aaaaaa</span>
                : ln[1]}
            </span>
          </div>
        ))}
      </div>
      <div className="total row-i">
        <span>TOTAL</span><span>{tot}</span>
      </div>
      {stamp && (
        <div style={{ textAlign: 'center', marginTop: 6 }}>
          <span className="stamp" style={{ color: 'var(--red)', borderColor: 'var(--red)', opacity: 0.7 }}>PAID</span>
        </div>
      )}
    </div>
  );
};

// ── Office card (with map stub) ───────────────────────────────────────────
const OfficeCard = ({ name, addr, hours, tag }) => (
  <div className="office-card">
    <div className="office-map" />
    <div>
      <div style={{ fontWeight: 600, fontSize: 13.5 }}>{name}</div>
      <div className="small" style={{ marginTop: 2 }}>{addr}</div>
      <div className="micro mono" style={{ marginTop: 4 }}>{hours}</div>
      {tag && <div style={{ marginTop: 6 }}><Badge ok>{tag}</Badge></div>}
    </div>
  </div>
);

// ── Category icon (lightweight SVG) ───────────────────────────────────────
const CategoryIcon = ({ kind, size = 28 }) => {
  const paths = {
    business: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <rect x="4" y="8" width="16" height="12" rx="1.2"/>
        <path d="M9 8V5h6v3M12 12v4"/>
      </g>
    ),
    id: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="12" rx="1.5"/>
        <circle cx="9" cy="12" r="2"/>
        <path d="M14 11h5M14 14h4"/>
      </g>
    ),
    transport: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M4 13l2-6h12l2 6v5H4v-5Z"/>
        <circle cx="8" cy="17.5" r="1.5"/>
        <circle cx="16" cy="17.5" r="1.5"/>
      </g>
    ),
    health: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M12 4c-6 6-6 10 0 14 6-4 6-8 0-14Z"/>
        <path d="M10 11h4M12 9v4"/>
      </g>
    ),
    education: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M3 9l9-4 9 4-9 4-9-4Z"/>
        <path d="M7 11v5c0 1 2 2 5 2s5-1 5-2v-5"/>
      </g>
    ),
    tax: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <rect x="6" y="4" width="12" height="16" rx="1"/>
        <path d="M9 9h6M9 13h6M9 17h4"/>
      </g>
    ),
    property: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M4 11l8-6 8 6v9H4v-9Z"/>
        <path d="M10 20v-5h4v5"/>
      </g>
    ),
    travel: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M2 16l10-1 7-8 2 1-5 9-3 1-3-1-8-1Z"/>
      </g>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      {paths[kind] || paths.business}
    </svg>
  );
};

// ── Sparkline (tiny SVG line) ─────────────────────────────────────────────
const Sparkline = ({ data, points, color, accent }) => {
  const d2 = data || points || [3,5,4,7,6,8,10,9,11];
  const clr = color || (accent ? 'var(--amber)' : 'var(--accent)');
  const w = 100, h = 30; const mx = Math.max(...d2), mn = Math.min(...d2);
  const pts = d2.map((v, i) => [
    (i / (d2.length - 1)) * w,
    h - ((v - mn) / Math.max(1, mx - mn)) * (h - 4) - 2,
  ]);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const fill = d + ` L${w},${h} L0,${h} Z`;
  return (
    <svg className="sparkline" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <path d={fill} fill={clr} fillOpacity="0.15" />
      <path d={d} fill="none" stroke={clr} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// ── Diff line ─────────────────────────────────────────────────────────────
const DiffLine = ({ add, rem, kind, children }) => {
  const isAdd = add || kind === 'add';
  return (
    <div className={isAdd ? 'diff-add' : 'diff-rem'}>
      <span style={{ marginRight: 6, opacity: 0.6, fontWeight: 700 }}>{isAdd ? '+' : '−'}</span>
      {children}
    </div>
  );
};

// ── Checkbox row ──────────────────────────────────────────────────────────
const CheckRow = ({ done, children, right }) => (
  <div className={`check-row${done ? ' done' : ''}`}>
    <span className="cb" />
    <span className="label-text">{children}</span>
    {right && <span>{right}</span>}
  </div>
);

// ── ID card mock (SVG) ────────────────────────────────────────────────────
const IDCard = ({ scale = 1 }) => (
  <svg viewBox="0 0 280 176" width={280 * scale} height={176 * scale} style={{ borderRadius: 10, boxShadow: 'var(--e-sm)' }}>
    <defs>
      <linearGradient id="id-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1a6b43"/>
        <stop offset="100%" stopColor="#0f4a2d"/>
      </linearGradient>
    </defs>
    <rect width="280" height="176" rx="10" fill="url(#id-g)"/>
    <text x="18" y="26" fill="#fff" fontFamily="Inter, sans-serif" fontSize="10" letterSpacing="2" fontWeight="700">NATIONAL IDENTIFICATION</text>
    <text x="18" y="42" fill="#deecdf" fontFamily="Inter, sans-serif" fontSize="10" letterSpacing="1">REPUBLIC OF SIERRA LEONE</text>
    <rect x="16" y="60" width="64" height="78" rx="4" fill="#0f4a2d" opacity="0.6"/>
    <circle cx="48" cy="90" r="12" fill="#deecdf" opacity="0.3"/>
    <path d="M30 130 Q48 110 66 130 L66 138 L30 138 Z" fill="#deecdf" opacity="0.3"/>
    <text x="96" y="78"  fill="#deecdf" fontFamily="'JetBrains Mono', mono" fontSize="8"  letterSpacing="1">NAME</text>
    <text x="96" y="92"  fill="#fff"    fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600">AMINA M. KAMARA</text>
    <text x="96" y="110" fill="#deecdf" fontFamily="'JetBrains Mono', mono" fontSize="8"  letterSpacing="1">NIN</text>
    <text x="96" y="122" fill="#fff"    fontFamily="'JetBrains Mono', mono" fontSize="11">232-18-••••••</text>
    <text x="96" y="142" fill="#deecdf" fontFamily="'JetBrains Mono', mono" fontSize="8"  letterSpacing="1">DOB</text>
    <text x="96" y="154" fill="#fff"    fontFamily="'JetBrains Mono', mono" fontSize="11">11 • 03 • 199•</text>
    <rect x="16" y="156" width="248" height="8" fill="#d5821a" opacity="0.85"/>
  </svg>
);

// ── Form scan (SVG) ──────────────────────────────────────────────────────
const FormScan = ({ height = 180 }) => (
  <svg viewBox="0 0 200 260" height={height} style={{ borderRadius: 4, boxShadow: 'var(--e-xs)', background: '#fdfbf5' }}>
    <rect width="200" height="260" fill="#fdfbf5"/>
    <rect x="14" y="14" width="172" height="22" fill="#e3dcc8" rx="2"/>
    <text x="100" y="29" textAnchor="middle" fontFamily="Inter" fontSize="10" fontWeight="700" fill="#3d372c" letterSpacing="1.5">FORM A · CAC-BN-01</text>
    <text x="14" y="54" fontFamily="Inter" fontSize="8" fill="#7a7363" letterSpacing="0.5">BUSINESS NAME REGISTRATION</text>
    {[64, 84, 104, 144, 164, 184, 214].map((y, i) => (
      <g key={i}>
        <text x="14" y={y} fontFamily="Inter" fontSize="7" fill="#7a7363" letterSpacing="0.5">
          {['NAME','ADDRESS','NATIONALITY','OCCUPATION','DATE','SIGNATURE','WITNESS'][i]}
        </text>
        <line x1="14" y1={y+4} x2="186" y2={y+4} stroke="#c6bfac" strokeDasharray="2 2"/>
      </g>
    ))}
    <rect x="14" y="195" width="100" height="12" fill="none" stroke="#c6bfac" strokeDasharray="2 2"/>
    <path d="M30 203 Q40 198 50 205 T80 203" fill="none" stroke="#24557d" strokeWidth="1.2"/>
    <rect x="130" y="226" width="54" height="24" fill="none" stroke="#b8342a" strokeWidth="1" strokeDasharray="3 2" rx="2"/>
    <text x="157" y="242" textAnchor="middle" fontFamily="Inter" fontSize="8" fill="#b8342a" fontWeight="700" letterSpacing="1">STAMP</text>
  </svg>
);

// ── Bar chart mini ────────────────────────────────────────────────────────
const BarMini = ({ values, value, label, color = 'var(--accent)' }) => {
  const arr = values || (value !== undefined ? [0, value, value, 100].map((x, i) => i < 2 ? x : (i === 2 ? value : 100)) : [2,3,4,5,3,6,4]);
  const mx = Math.max(...arr);
  if (label !== undefined) {
    const pct = value || 0;
    return (
      <div style={{ marginTop: 6 }}>
        <div className="between" style={{ marginBottom: 3 }}>
          <span className="small" style={{ color: 'var(--text-3)' }}>{label}</span>
          <span className="small mono" style={{ color }}>{pct}%</span>
        </div>
        <div className="progress-track"><div className="progress-fill" style={{ width: pct + '%' }} /></div>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 36 }}>
      {arr.map((v, i) => (
        <div key={i} style={{
          flex: 1, height: `${(v / mx) * 100}%`, minHeight: 3,
          background: color, opacity: 0.3 + (v / mx) * 0.7,
          borderRadius: 2,
        }} />
      ))}
    </div>
  );
};

// ── Expose ─────────────────────────────────────────────────────────────────
Object.assign(window, {
  Btn, Chip, Badge, Input, Img, Divider, Label, H, P, Eyebrow, Box, Avatar,
  Step, ProgressBar, SegProgress, BrandMark,
  Phone, PhoneTabBar, MobileHeader, Desk, AppShell, Variant, Caption, ScreenHead,
  Anno, TrustBar, Stat, Receipt, OfficeCard, CategoryIcon, Sparkline,
  DiffLine, CheckRow, IDCard, FormScan, BarMini,
});
