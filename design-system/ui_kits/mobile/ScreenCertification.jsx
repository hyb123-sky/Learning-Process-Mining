function ScreenCertification({ onBack }) {
  const chapters = [
    { n:1, title:'Foundations of Process', status:'done', score:'98%' },
    { n:2, title:'Reading the Event Log', status:'done', score:'100%' },
    { n:3, title:'Case IDs & Timestamps', status:'current' },
    { n:4, title:'Variants & Frequency', status:'locked' },
    { n:5, title:'Conformance Checking', status:'locked' },
    { n:6, title:'Bottlenecks & Waste', status:'locked' },
  ];
  return (
    <div style={{ height:'100%', overflow:'auto', background: pfColors.white }}>
      <PFAppBar title="P2P Certification" onBack={onBack}/>
      {/* Hero — white with large progress ring */}
      <div style={{ padding:'28px 24px 20px', textAlign:'center', borderBottom:`1px solid ${pfColors.line}` }}>
        <PFProgressRing value={0.34} size={104} stroke={2} color={pfColors.black}>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontFamily: pfFont.serif, fontSize: 30, fontWeight: 500, color: pfColors.black, lineHeight: 1 }}>34%</div>
            <div style={{ fontFamily: pfFont.mono, fontSize: 9, color: pfColors.mute, letterSpacing:'0.16em', textTransform:'uppercase', marginTop: 3 }}>forged</div>
          </div>
        </PFProgressRing>
        <PFEyebrow style={{ marginTop: 18 }}>Oath in progress</PFEyebrow>
        <div style={{ fontFamily: pfFont.serif, fontSize: 24, fontWeight: 500, color: pfColors.black, marginTop: 8 }}>Procure-to-Pay</div>
        <div style={{ fontFamily: pfFont.mono, fontSize: 11, color: pfColors.mute, letterSpacing:'0.08em', marginTop: 6 }}>
          2 / 6 CHAPTERS &nbsp;·&nbsp; ~4 HOURS
        </div>
      </div>
      {/* Chapter list */}
      <div style={{ padding:'20px 20px 4px' }}>
        <PFEyebrow style={{ marginBottom: 12 }}>Chapters</PFEyebrow>
        {chapters.map((c, i) => (
          <div key={c.n} style={{
            display:'flex', alignItems:'center', gap: 16, padding:'16px 0',
            borderBottom: i<chapters.length-1 ? `1px solid ${pfColors.line}` : 'none',
            opacity: c.status==='locked' ? 0.4 : 1,
          }}>
            <div style={{ width: 26, height: 26, border:`1px solid ${pfColors.black}`,
              background: c.status==='done' ? pfColors.black : 'transparent',
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0 }}>
              {c.status==='done' ? <PFIcon name="check" size={12} color={pfColors.white}/> :
               c.status==='locked' ? <PFIcon name="lock" size={11}/> :
               <span style={{ fontFamily: pfFont.mono, fontSize: 12, fontWeight: 700 }}>{c.n}</span>}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily: pfFont.mono, fontSize: 10, letterSpacing:'0.14em', color: pfColors.mute, textTransform:'uppercase' }}>CH. {String(c.n).padStart(2,'0')}</div>
              <div style={{ fontFamily: pfFont.serif, fontSize: 17, fontWeight: c.status==='current' ? 600 : 500, color: pfColors.black, marginTop: 1 }}>
                {c.title}
              </div>
            </div>
            {c.status==='done' && <div style={{ fontFamily: pfFont.mono, fontSize: 11, color: pfColors.black }}>{c.score}</div>}
            {c.status==='current' && <PFIcon name="arrowRight" size={16} color={pfColors.black}/>}
          </div>
        ))}
      </div>
      {/* Crests */}
      <div style={{ padding:'22px 20px 28px' }}>
        <PFEyebrow style={{ marginBottom: 14 }}>Crests earned</PFEyebrow>
        <div style={{ display:'flex', gap: 18, alignItems:'center' }}>
          <PFCrestLine variant="flame" size={68}/>
          <PFCrestLine variant="chalice" size={68}/>
          <div style={{ width: 60, height: 68, border:`1px dashed ${pfColors.line2}`,
            display:'flex', alignItems:'center', justifyContent:'center', color: pfColors.line2 }}>
            <PFIcon name="lock" size={18}/>
          </div>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { ScreenCertification });
