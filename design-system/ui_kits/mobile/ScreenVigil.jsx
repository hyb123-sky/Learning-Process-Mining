function ScreenVigil({ onBack, onStart }) {
  const days = [
    {d:'M',done:true},{d:'T',done:true},{d:'W',done:true},{d:'T',done:true},
    {d:'F',done:true},{d:'S',done:true},{d:'S',done:false,today:true},
  ];
  return (
    <div style={{ height:'100%', overflow:'auto', background: pfColors.white }}>
      <PFAppBar title="Daily vigil" onBack={onBack}/>
      <div style={{ padding:'28px 22px 20px', textAlign:'center', borderBottom:`1px solid ${pfColors.line}` }}>
        <div style={{ display:'flex', justifyContent:'center', marginBottom: 10 }}>
          <PFCrestLine variant="flame" size={110} stroke={1.1}/>
        </div>
        <div style={{ fontFamily: pfFont.serif, fontSize: 64, fontWeight: 500, color: pfColors.black,
          lineHeight: 1, marginTop: 8, letterSpacing:'-0.03em' }}>7</div>
        <PFEyebrow style={{ marginTop: 10 }}>Days tended</PFEyebrow>
        <p style={{ fontFamily: pfFont.serif, fontStyle:'italic', fontSize: 15, color: pfColors.text2, margin:'18px auto 0', maxWidth: 260 }}>
          "Your vigil holds. The candle does not gutter."
        </p>
      </div>
      {/* Week strip */}
      <div style={{ padding:'22px 22px 22px', borderBottom:`1px solid ${pfColors.line}` }}>
        <div style={{ display:'flex', justifyContent:'space-between', gap: 4 }}>
          {days.map((x,i) => (
            <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap: 8 }}>
              <div style={{
                width: 32, height: 32,
                background: x.done ? pfColors.black : 'transparent',
                border: x.today ? `1px dashed ${pfColors.black}` : x.done ? 'none' : `1px solid ${pfColors.line}`,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                {x.done && <PFIcon name="check" size={16} color={pfColors.white}/>}
                {x.today && <PFIcon name="flame" size={14} color={pfColors.black}/>}
              </div>
              <div style={{ fontFamily: pfFont.mono, fontSize: 10, fontWeight: x.today ? 700 : 400,
                color: x.today ? pfColors.black : pfColors.mute, letterSpacing:'0.12em' }}>{x.d}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Today's chapter */}
      <div style={{ padding:'24px 20px' }}>
        <PFEyebrow style={{ marginBottom: 10 }}>Today's chapter</PFEyebrow>
        <div style={{ fontFamily: pfFont.serif, fontSize: 22, fontWeight: 500, color: pfColors.black, margin:'6px 0 6px' }}>
          Case IDs & Timestamps
        </div>
        <div style={{ fontFamily: pfFont.mono, fontSize: 11, color: pfColors.mute, letterSpacing:'0.08em', marginBottom: 20 }}>
          14 MIN &nbsp;·&nbsp; 210 INSIGHT
        </div>
        <PFButton full onClick={onStart}>Tend the vigil</PFButton>
      </div>
    </div>
  );
}
Object.assign(window, { ScreenVigil });
