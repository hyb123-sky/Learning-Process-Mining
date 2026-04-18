function ScreenHome({ lang='en', onOpenChapter, onOpenCrest }) {
  const chapters = [
    { n:1, title:'Foundations of Process', status:'done' },
    { n:2, title:'Reading the Event Log', status:'done' },
    { n:3, title:'Case IDs & Timestamps', status:'current' },
    { n:4, title:'Variants & Frequency', status:'locked' },
    { n:5, title:'Conformance Checking', status:'locked' },
  ];
  const s = {
    en:{ hi:'Welcome, paladin', path:'P2P Certification', vigil:'Vigil', days:'days', chapter:'Ch.', aph:'The path forward is clear — but seldom easy.' },
    zh:{ hi:'欢迎，圣徒', path:'P2P 认证', vigil:'守夜', days:'天', chapter:'章', aph:'前路清晰，却从不易行。' },
    ja:{ hi:'ようこそ、聖騎士', path:'P2P 認定', vigil:'夜警', days:'日', chapter:'章', aph:'道は明らかなれど、決して易からず。' },
  }[lang];
  return (
    <div style={{ height:'100%', overflow:'auto', background: pfColors.white }}>
      <PFAppBar title="PathForge" trailing={
        <div style={{ fontFamily: pfFont.mono, fontSize: 11, color: pfColors.text, letterSpacing:'0.1em' }}>2,140</div>
      }/>
      {/* Hero — inverted panel */}
      <div style={{ padding:'20px 20px 24px', background: pfColors.black, color: pfColors.white }}>
        <PFEyebrow style={{ color: pfColors.white, opacity: 0.6 }}>{s.hi}</PFEyebrow>
        <div style={{ fontFamily: pfFont.serif, fontSize: 32, fontWeight: 500, margin:'10px 0 4px', letterSpacing:'-0.01em' }}>{s.path}</div>
        <div style={{ fontFamily: pfFont.mono, fontSize: 11, color: pfColors.mute, marginBottom: 20, letterSpacing:'0.08em' }}>
          CHAPTER 03 / 12 &nbsp;·&nbsp; 62% FORGED
        </div>
        <div style={{ height: 1, background: pfColors.white, opacity: 0.15, margin:'0 0 20px' }}/>
        <div style={{ display:'flex', alignItems:'center', gap: 16 }}>
          <PFProgressRing value={0.62} size={52} stroke={2} color={pfColors.white} trackColor="rgba(255,255,255,0.18)">
            <span style={{ fontFamily: pfFont.mono, fontSize: 11, color: pfColors.white }}>62</span>
          </PFProgressRing>
          <PFButton onClick={() => onOpenChapter(3)} variant="onDark">Resume</PFButton>
        </div>
      </div>
      {/* Stats row */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', borderBottom:`1px solid ${pfColors.line}` }}>
        <div onClick={() => onOpenCrest('flame')} style={{ padding:'18px 20px', borderRight:`1px solid ${pfColors.line}`, cursor:'pointer' }}>
          <PFEyebrow>{s.vigil}</PFEyebrow>
          <div style={{ fontFamily: pfFont.serif, fontSize: 40, fontWeight: 500, color: pfColors.black, lineHeight: 1, marginTop: 4, letterSpacing:'-0.02em' }}>
            7 <span style={{ fontSize: 14, color: pfColors.mute, fontFamily: pfFont.sans, fontWeight: 400 }}>{s.days}</span>
          </div>
        </div>
        <div style={{ padding:'18px 20px' }}>
          <PFEyebrow>Today</PFEyebrow>
          <div style={{ fontFamily: pfFont.serif, fontSize: 40, fontWeight: 500, color: pfColors.black, lineHeight: 1, marginTop: 4, letterSpacing:'-0.02em' }}>
            14 <span style={{ fontSize: 14, color: pfColors.mute, fontFamily: pfFont.sans, fontWeight: 400 }}>min</span>
          </div>
        </div>
      </div>
      {/* Chapters */}
      <div style={{ padding:'24px 20px 14px' }}>
        <PFEyebrow style={{ marginBottom: 14 }}>Your path</PFEyebrow>
        {chapters.map((c, i) => (
          <div key={c.n} onClick={() => c.status !== 'locked' && onOpenChapter(c.n)}
            style={{ display:'flex', gap: 16, alignItems:'center', padding:'16px 0',
              borderBottom: i < chapters.length-1 ? `1px solid ${pfColors.line}` : 'none',
              cursor: c.status!=='locked' ? 'pointer' : 'default', opacity: c.status==='locked' ? 0.4 : 1 }}>
            <div style={{
              width: 28, height: 28,
              background: c.status==='done' ? pfColors.black : 'transparent',
              border: `1px solid ${pfColors.black}`,
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
            }}>
              {c.status==='done' ? <PFIcon name="check" size={14} color={pfColors.white}/> :
               c.status==='locked' ? <PFIcon name="lock" size={12} color={pfColors.black}/> :
               <span style={{ fontFamily: pfFont.mono, fontSize: 12, fontWeight: 700, color: pfColors.black }}>{c.n}</span>}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily: pfFont.mono, fontSize: 10, letterSpacing:'0.16em', color: pfColors.mute, textTransform:'uppercase' }}>
                {s.chapter} {String(c.n).padStart(2,'0')}
              </div>
              <div style={{ fontFamily: pfFont.serif, fontSize: 18, fontWeight: 500, color: pfColors.black, marginTop: 1,
                fontWeight: c.status==='current' ? 600 : 500 }}>{c.title}</div>
            </div>
            {c.status==='current' && <PFIcon name="arrowRight" size={18} color={pfColors.black}/>}
          </div>
        ))}
      </div>
      <div style={{ padding:'14px 30px 28px', fontFamily: pfFont.serif, fontStyle:'italic',
        fontSize: 14, color: pfColors.mute, textAlign:'center' }}>— {s.aph} —</div>
    </div>
  );
}
Object.assign(window, { ScreenHome });
