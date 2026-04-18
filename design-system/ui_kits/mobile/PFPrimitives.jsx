// PathForge mobile primitives — pure white paladin / Celonis monochrome variant
// Stark black + white. Gold reserved for a single accent per screen (crest glow only).

const pfColors = {
  white: '#FFFFFF',
  off:   '#FAFAFA',   // faintest ivory cast, almost pure
  line:  '#E6E6E6',   // hairline
  line2: '#D0D0D0',   // stronger divider
  mute:  '#8A8A8A',
  text2: '#4A4A4A',
  text:  '#0A0A0A',
  black: '#000000',
  gold:  '#B8933A',   // single accent — desaturated, only for live progress / one crest glyph
  goldSoft: '#EFE3C4',
  success: '#0A0A0A', // monochrome — check icon only
  danger:  '#7A1F19',
};

const pfFont = {
  serif: '"Cormorant Garamond", Georgia, serif',
  sans: '"Manrope", -apple-system, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, Menlo, monospace',
};

function PFIcon({ name, size = 20, color = 'currentColor', style = {} }) {
  const paths = {
    home: <><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></>,
    flame: <path d="M12 2s4 4 4 9a4 4 0 01-8 0c0-2 1-3 2-4-1-2 0-4 2-5z"/>,
    book: <><path d="M4 4h10a4 4 0 014 4v12H8a4 4 0 01-4-4V4z"/><path d="M4 16h14"/></>,
    award: <><circle cx="12" cy="9" r="6"/><path d="M8.5 14l-2 7 5.5-3 5.5 3-2-7"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-7 8-7s8 3 8 7"/></>,
    check: <path d="M4 12l5 5L20 6"/>,
    chevronRight: <path d="M9 6l6 6-6 6"/>,
    chevronLeft: <path d="M15 6l-6 6 6 6"/>,
    lock: <><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    sparkle: <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z"/>,
    arrowRight: <><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></>,
    x: <path d="M6 6l12 12M18 6l-12 12"/>,
    volume: <><path d="M11 5L6 9H3v6h3l5 4V5z"/><path d="M15 9a4 4 0 010 6"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={style}>{paths[name]}</svg>;
}

function PFEyebrow({ children, color = pfColors.mute, style = {} }) {
  return <div style={{
    fontFamily: pfFont.sans, fontSize: 10.5, fontWeight: 700,
    letterSpacing: '0.24em', textTransform: 'uppercase', color, ...style
  }}>{children}</div>;
}

function PFProgressRing({ value = 0, size = 64, stroke = 3, children, color = pfColors.black, trackColor = pfColors.line }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} stroke={trackColor} strokeWidth={stroke} fill="none"/>
        <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c*(1-value)}/>
      </svg>
      {children && <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>{children}</div>}
    </div>
  );
}

function PFProgress({ value = 0, height = 2 }) {
  return <div style={{ height, background: pfColors.line, overflow: 'hidden' }}>
    <div style={{ width: `${value*100}%`, height: '100%', background: pfColors.black }}/>
  </div>;
}

function PFButton({ children, onClick, variant = 'primary', full = false, disabled = false, style = {} }) {
  const base = {
    border: 0, cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: pfFont.sans, fontWeight: 600, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase',
    padding: '16px 22px', borderRadius: 0, width: full ? '100%' : 'auto',
    transition: 'all 140ms cubic-bezier(.22,1,.36,1)',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
  };
  const variants = {
    primary:   { background: pfColors.black, color: pfColors.white },
    onDark:    { background: pfColors.white, color: pfColors.black },
    secondary: { background: 'transparent', color: pfColors.black, border: `1px solid ${pfColors.black}`, padding:'15px 21px' },
    ghost:     { background: 'transparent', color: pfColors.text, padding: '13px 16px' },
  };
  const dis = disabled ? { background: pfColors.line, color: pfColors.mute } : {};
  return <button onClick={disabled ? undefined : onClick} style={{ ...base, ...variants[variant], ...dis, ...style }}>{children}</button>;
}

function PFCard({ featured = false, onClick, children, style = {} }) {
  return <div onClick={onClick} style={{
    background: pfColors.white,
    border: `1px solid ${featured ? pfColors.black : pfColors.line}`,
    padding: 18, cursor: onClick ? 'pointer' : 'default',
    ...style,
  }}>{children}</div>;
}

function PFAppBar({ title, trailing, onBack }) {
  return <div style={{
    display:'flex', alignItems:'center', gap: 10,
    padding: '66px 20px 14px', minHeight: 56, background: pfColors.white,
    borderBottom: `1px solid ${pfColors.line}`,
  }}>
    {onBack && <button onClick={onBack} style={{ background:'none', border:0, padding:4, cursor:'pointer', color: pfColors.black }}>
      <PFIcon name="chevronLeft" size={22}/>
    </button>}
    <div style={{ flex:1, fontFamily: pfFont.sans, fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', textTransform:'uppercase', color: pfColors.black }}>{title}</div>
    {trailing}
  </div>;
}

function PFTabBar({ active, onChange }) {
  const tabs = [
    { id:'path', label:'Path', icon:'home' },
    { id:'trials', label:'Trials', icon:'book' },
    { id:'order', label:'Order', icon:'award' },
    { id:'profile', label:'Profile', icon:'user' },
  ];
  return <div style={{
    display:'flex', background: pfColors.white,
    borderTop:`1px solid ${pfColors.line}`,
    paddingBottom: 'env(safe-area-inset-bottom, 6px)',
  }}>
    {tabs.map(t => {
      const on = t.id === active;
      return <button key={t.id} onClick={() => onChange(t.id)} style={{
        flex:1, background:'none', border:0, cursor:'pointer',
        padding:'12px 0 10px', display:'flex', flexDirection:'column', alignItems:'center', gap:4,
        borderTop: on ? `2px solid ${pfColors.black}` : '2px solid transparent',
        marginTop: on ? -1 : 0,
        color: on ? pfColors.black : pfColors.mute,
      }}>
        <PFIcon name={t.icon} size={20} color={on ? pfColors.black : pfColors.mute}/>
        <span style={{ fontFamily: pfFont.sans, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform:'uppercase' }}>
          {t.label}
        </span>
      </button>;
    })}
  </div>;
}

// Line-art crest — pure white paladin medieval, monochrome
function PFCrestLine({ variant = 'shield', size = 140, stroke = 1.2, color = pfColors.black }) {
  if (variant === 'shield') {
    return <svg width={size} height={size*1.16} viewBox="0 0 120 140" fill="none" stroke={color} strokeWidth={stroke}>
      <path d="M60 6 L108 14 L108 58 Q108 100 60 130 Q12 100 12 58 L12 14 Z"/>
      <path d="M60 14 L100 22 L100 56 Q100 92 60 118 Q20 92 20 56 L20 22 Z"/>
      <line x1="60" y1="30" x2="60" y2="98"/>
      <line x1="32" y1="62" x2="88" y2="62"/>
      <circle cx="60" cy="30" r="3" fill={color}/>
      <circle cx="60" cy="98" r="3" fill={color}/>
      <circle cx="32" cy="62" r="2.5" fill={color}/>
      <circle cx="88" cy="62" r="2.5" fill={color}/>
    </svg>;
  }
  if (variant === 'flame') {
    return <svg width={size} height={size*1.16} viewBox="0 0 120 140" fill="none" stroke={color} strokeWidth={stroke}>
      <circle cx="60" cy="60" r="54"/>
      <circle cx="60" cy="60" r="46"/>
      {[0,45,90,135,180,225,270,315].map(a => {
        const rad = a*Math.PI/180;
        return <circle key={a} cx={60+Math.cos(rad)*50} cy={60+Math.sin(rad)*50} r="1.2" fill={color} stroke="none"/>;
      })}
      <path d="M60 92 C 42 80, 46 62, 54 50 C 54 60, 60 62, 60 52 C 60 40, 70 34, 66 22 C 80 36, 84 58, 74 72 C 74 64, 70 62, 70 68 C 70 78, 64 82, 64 90 Z"/>
    </svg>;
  }
  if (variant === 'chalice') {
    return <svg width={size} height={size*1.16} viewBox="0 0 120 140" fill="none" stroke={color} strokeWidth={stroke}>
      <path d="M60 6 L108 34 L108 86 L60 114 L12 86 L12 34 Z"/>
      <path d="M60 18 L97 40 L97 80 L60 102 L23 80 L23 40 Z"/>
      <path d="M44 42 L76 42 Q76 64 60 72 Q44 64 44 42 Z"/>
      <line x1="60" y1="72" x2="60" y2="84"/>
      <line x1="50" y1="84" x2="70" y2="84"/>
      <circle cx="60" cy="54" r="2" fill={color} stroke="none"/>
    </svg>;
  }
  // key
  return <svg width={size} height={size*1.16} viewBox="0 0 120 140" fill="none" stroke={color} strokeWidth={stroke}>
    <path d="M60 6 L108 14 L108 58 Q108 100 60 130 Q12 100 12 58 L12 14 Z"/>
    <circle cx="60" cy="50" r="16"/>
    <line x1="60" y1="66" x2="60" y2="100"/>
    <line x1="60" y1="82" x2="72" y2="82"/>
    <line x1="60" y1="92" x2="68" y2="92"/>
  </svg>;
}

Object.assign(window, { pfColors, pfFont, PFIcon, PFEyebrow, PFProgressRing, PFProgress, PFButton, PFCard, PFAppBar, PFTabBar, PFCrestLine });
