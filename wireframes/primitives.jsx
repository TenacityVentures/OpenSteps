// Shared primitives for OpenSteps wireframes

const Line = ({ w = 100, sh = false }) => (
  <div className={`sk-line ${sh ? 'sh' : ''} w${w}`} />
);
const Scribble = ({ thick = false, style }) => (
  <div className={`sk-scribble ${thick ? 'thick' : ''}`} style={style} />
);

const Btn = ({ children, primary, ghost, xs, icon, ...rest }) => (
  <span className={`sk-btn ${primary ? 'primary' : ''} ${ghost ? 'ghost' : ''} ${xs ? 'xs' : ''}`} {...rest}>
    {icon && <span className={`ico ${icon}`} />}
    {children}
  </span>
);

const Chip = ({ children, on }) => <span className={`sk-chip ${on ? 'on' : ''}`}>{children}</span>;
const Badge = ({ children, ok, warn }) => <span className={`sk-badge ${ok ? 'ok' : ''} ${warn ? 'warn' : ''}`}>{children}</span>;

const Input = ({ ph, lg, left, right }) => (
  <div className={`sk-input ${lg ? 'lg' : ''}`}>
    {left}
    <span className="ph grow">{ph}</span>
    {right}
  </div>
);

const Img = ({ children, style }) => <div className="sk-img" style={style}>{children}</div>;
const Avatar = ({ children }) => <span className="sk-avatar">{children}</span>;
const Divider = () => <div className="sk-divider" />;
const Label = ({ children }) => <div className="sk-label">{children}</div>;
const H = ({ children, sm, lg }) => <div className={`sk-h ${sm ? 'sm' : ''} ${lg ? 'lg' : ''}`}>{children}</div>;
const P = ({ children }) => <div className="sk-p">{children}</div>;

const Box = ({ children, dashed, soft, style, className = '' }) => (
  <div className={`sk-box ${dashed ? 'dashed' : ''} ${soft ? 'soft' : ''} ${className}`} style={style}>{children}</div>
);

const Step = ({ n, title, sub, done, children }) => (
  <div className={`sk-step ${done ? 'done' : ''}`}>
    <span className="num">{done ? '✓' : n}</span>
    <div>
      <div style={{ fontWeight: 700, fontSize: 15 }}>{title}</div>
      {sub && <div className="small">{sub}</div>}
      {children}
    </div>
  </div>
);

const Anno = ({ children, pos = 'bl', style }) => {
  const cls = { bl: '', br: 'r', tl: 'u', tr: 'ru' }[pos] || '';
  return <div className={`anno ${cls}`} style={style}>{children}</div>;
};
const Caption = ({ children }) => <div className="caption">{children}</div>;

// Phone frame
const Phone = ({ children, title = 'opensteps.org' }) => (
  <div className="phone">
    <div className="phone-screen" style={{ position: 'relative' }}>
      <div className="phone-statusbar">
        <span>9:41</span>
        <span>●●● 3G</span>
      </div>
      {children}
    </div>
  </div>
);

// Desktop frame
const Desk = ({ children, url = 'opensteps.org/sl/register-a-business' }) => (
  <div className="desk">
    <div className="desk-bar">
      <span className="dot" /><span className="dot" /><span className="dot" />
      <span className="url">{url}</span>
    </div>
    <div className="desk-body">{children}</div>
  </div>
);

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

const ScreenHead = ({ num, title, sub }) => (
  <div className="screen-head">
    <h2 className="sk-h lg" style={{ margin: 0 }}>
      <span className="num mono">{num}</span>{title}
    </h2>
    <div className="screen-sub">{sub}</div>
  </div>
);

const PhoneTabBar = () => (
  <div className="phone-tabbar">
    <span className="on">Browse</span>
    <span>Saved</span>
    <span>Contribute</span>
    <span>Me</span>
  </div>
);

Object.assign(window, {
  Line, Scribble, Btn, Chip, Badge, Input, Img, Avatar, Divider, Label, H, P, Box, Step,
  Anno, Caption, Phone, Desk, Variant, ScreenHead, PhoneTabBar,
});
