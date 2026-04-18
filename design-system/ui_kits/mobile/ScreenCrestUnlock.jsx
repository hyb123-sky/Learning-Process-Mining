function ScreenCrestUnlock({ crest='shield', onContinue }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);
  const meta = {
    shield:{ title:'Shield of Conformance', body:'Forged for completing Chapter 2 without error. Worn by those who read the log true.' },
    flame:{ title:'Flame of Vigil', body:'Seven days tended. Your vigil holds — the candle does not gutter.' },
    chalice:{ title:'Chalice of Insight', body:'Ten thousand Insight gathered. The data reveals its shape to you.' },
  }[crest];
  return (
    <div style={{ height:'100%', background: pfColors.white, display:'flex', flexDirection:'column',
      padding:'80px 28px 36px', alignItems:'center', textAlign:'center' }}>
      <PFEyebrow>A crest is forged</PFEyebrow>
      <div style={{
        marginTop: 40, marginBottom: 32,
        transform: mounted ? 'scale(1)' : 'scale(0.92)',
        opacity: mounted ? 1 : 0,
        transition: 'all 900ms cubic-bezier(.45,.05,.25,1)',
        position:'relative',
      }}>
        {/* rays */}
        <svg width="220" height="220" viewBox="0 0 220 220" style={{ position:'absolute', inset:0, opacity: mounted ? 1 : 0, transition:'opacity 900ms ease' }}>
          {Array.from({length:24}).map((_,i) => {
            const a = (i*15) * Math.PI / 180;
            const r1 = 90, r2 = 108;
            return <line key={i} x1={110+Math.cos(a)*r1} y1={110+Math.sin(a)*r1}
              x2={110+Math.cos(a)*r2} y2={110+Math.sin(a)*r2} stroke={pfColors.black} strokeWidth="0.6"/>;
          })}
        </svg>
        <div style={{ width: 220, height: 220, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <PFCrestLine variant={crest} size={140} stroke={1.2}/>
        </div>
      </div>
      <h1 style={{ fontFamily: pfFont.serif, fontSize: 36, fontWeight: 500, lineHeight: 1.15,
        color: pfColors.black, margin:'0 0 16px', letterSpacing:'-0.02em' }}>{meta.title}</h1>
      <p style={{ fontFamily: pfFont.serif, fontStyle:'italic', fontSize: 16, lineHeight: 1.55,
        color: pfColors.text2, margin:'0 0 40px', maxWidth: 280 }}>{meta.body}</p>
      <div style={{ flex:1 }}/>
      <PFButton full onClick={onContinue}>Claim</PFButton>
    </div>
  );
}
Object.assign(window, { ScreenCrestUnlock });
