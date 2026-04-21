// Shared primitives — hi-fi OpenSteps components
// Same exported API as wireframe version; visual upgrade only.

const Line = ({ w = 100, sh = false }) => (
  <div className={`sk-line ${sh ? 'sh' : ''} w${w}`} />
);
const Scribble = ({ thick = false, style }) => (
  <div className={`sk-scribble ${thick ? 'thick' : ''}`} style={style} />
);

const Btn = ({ children, primary, ghost, xs, icon, style, onClick }) => (
  <span
    className={`sk-btn${primary ? ' primary' : ''}${ghost ? ' ghost' : ''}${xs ? ' xs' : ''}`}
    style={style}
    onClick={onClick}
  >
    {icon && <span className={`ico ${icon}`} />}
    {children}
  </span>
);

const Chip = ({ children, on, onClick }) => (
  <span className={`sk-chip${on ? ' on' : ''}`} onClick={onClick}>{children}</span>
);

const Badge = ({ children, ok, warn, err }) => (
  <span className={`sk-badge${ok ? ' ok' : ''}${warn ? ' warn' : ''}${err ? ' err' : ''}`}>
    {children}
  </span>
);

const Input = ({ ph, lg, left, right, style }) => (
  <div className={`sk-input${lg ? ' lg' : ''}`} style={style}>
    {left}
    <span className="ph grow">{ph}</span>
    {right}
  </div>
);

const Img = ({ children, style }) => (
  <div className="sk-img" style={style}>{children || '[ photo ]'}</div>
);

const Avatar = ({ children, size }) => (
  <span className="sk-avatar" style={size ? { width: size, height: size, fontSize: size * 0.42 } : {}}>
    {children}
  </span>
);

const Divider = () => <div className="sk-divider" />;
const Label   = ({ children }) => <div className="sk-label">{children}</div>;

const H = ({ children, sm, lg, style }) => (
  <div className={`sk-h${sm ? ' sm' : ''}${lg ? ' lg' : ''}`} style={style}>{children}</div>
);

const P = ({ children }) => <div className="sk-p">{children}</div>;

const Box = ({ children, dashed, soft, style, className = '' }) => (
  <div
    className={`sk-box${dashed ? ' dashed' : ''}${soft ? ' soft' : ''} ${className}`}
    style={style}
  >
    {children}
  </div>
);

const Step = ({ n, title, sub, done, children }) => (
  <div className={`sk-step${done ? ' done' : ''}`}>
    <span className="num">{done ? '✓' : n}</span>
    <div>
      <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>{title}</div>
      {sub && <div className="small" style={{ marginTop: 3 }}>{sub}</div>}
      {children}
    </div>
  </div>
);

// Progress track
const ProgressBar = ({ pct = 0 }) => (
  <div className="progress-track">
    <div className="progress-fill" style={{ width: pct + '%' }} />
  </div>
);

const Anno = ({ children, pos = 'bl', style }) => {
  const cls = { bl: '', br: 'r', tl: 'u', tr: 'ru' }[pos] || '';
  return <div className={`anno ${cls}`} style={style}>{children}</div>;
};

const Caption = ({ children }) => <div className="caption">{children}</div>;

// ── Phone frame ───────────────────────────────
const Phone = ({ children, title = 'opensteps.org' }) => (
  <div className="phone">
    <div className="phone-screen" style={{ position: 'relative' }}>
      <div className="phone-statusbar">
        <span style={{ fontWeight: 700 }}>9:41</span>
        <span>●●● 4G</span>
      </div>
      {children}
    </div>
  </div>
);

// ── Desktop frame ─────────────────────────────
const Desk = ({ children, url = 'opensteps.org/sl/register-a-business' }) => (
  <div className="desk">
    <div className="desk-bar">
      <span className="dot" /><span className="dot" /><span className="dot" />
      <span className="url">{url}</span>
    </div>
    <div className="desk-body">{children}</div>
  </div>
);

// ── Variant card ──────────────────────────────
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

// ── Screen heading ────────────────────────────
const ScreenHead = ({ num, title, sub }) => (
  <div className="screen-head">
    <h2 className="sk-h lg" style={{ margin: 0 }}>
      <span className="num mono" style={{ color: 'var(--text-3)', fontFamily: 'var(--mono)', fontSize: 16, marginRight: 10 }}>{num}</span>
      {title}
    </h2>
    <div className="screen-sub">{sub}</div>
  </div>
);

// ── Phone tab bar ─────────────────────────────
const PhoneTabBar = ({ active = 'Browse' }) => (
  <div className="phone-tabbar">
    {['Browse', 'Saved', 'Contribute', 'Me'].map(t => (
      <span key={t} className={t === active ? 'on' : ''}>{t}</span>
    ))}
  </div>
);

// ── Trust score bar ───────────────────────────
const TrustBar = ({ score = 8.7 }) => {
  const pct = (score / 10) * 100;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div className="progress-track" style={{ flex: 1 }}>
        <div className="progress-fill" style={{ width: pct + '%' }} />
      </div>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--green)', fontWeight: 600 }}>{score}</span>
    </div>
  );
};

// ── Stat block ────────────────────────────────
const Stat = ({ label, value, sub }) => (
  <div>
    <div className="sk-label">{label}</div>
    <div style={{ fontWeight: 700, fontSize: 20, letterSpacing: '-0.3px', marginTop: 2 }}>{value}</div>
    {sub && <div className="small">{sub}</div>}
  </div>
);

// Expose everything on window (babel standalone pattern)
Object.assign(window, {
  Line, Scribble, Btn, Chip, Badge, Input, Img, Avatar, Divider, Label, H, P, Box, Step,
  ProgressBar, Anno, Caption, Phone, Desk, Variant, ScreenHead, PhoneTabBar, TrustBar, Stat,
});
