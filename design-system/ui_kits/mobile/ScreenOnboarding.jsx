function ScreenOnboarding({ onComplete }) {
  const [lang, setLang] = React.useState('en');
  const langs = [
    { id:'en', label:'English', sub:'Begin your quest' },
    { id:'zh', label:'中文', sub:'开启你的征程' },
    { id:'ja', label:'日本語', sub:'旅を始めよう' },
  ];
  const copy = {
    en:{ title:'Forge your path', body:'Process mining, learned by trial. Earn your oath.', cta:'Begin' },
    zh:{ title:'铸就你的道路', body:'在试炼中精通流程挖掘，立下誓言。', cta:'开始' },
    ja:{ title:'道を鍛えよ', body:'試練によりプロセスマイニングを学び、誓いを得る。', cta:'始める' },
  }[lang];
  return (
    <div style={{ height:'100%', background: pfColors.white, display:'flex', flexDirection:'column', padding:'72px 28px 36px' }}>
      <div style={{ display:'flex', justifyContent:'center', marginBottom: 32 }}>
        <PFCrestLine variant="shield" size={88} stroke={1.3}/>
      </div>
      <PFEyebrow style={{ textAlign:'center', marginBottom: 18, color: pfColors.black }}>PathForge</PFEyebrow>
      <h1 style={{ fontFamily: pfFont.serif, fontSize: 44, fontWeight: 500, lineHeight: 1.1,
        color: pfColors.black, textAlign:'center', margin:'0 0 16px', letterSpacing:'-0.02em' }}>{copy.title}</h1>
      <p style={{ fontFamily: pfFont.sans, fontSize: 14, lineHeight: 1.6, color: pfColors.text2,
        textAlign:'center', margin:'0 auto 44px', maxWidth: 260 }}>{copy.body}</p>
      <div style={{ flex:1 }}/>
      <div style={{ display:'flex', flexDirection:'column', gap: 0, marginBottom: 24, borderTop:`1px solid ${pfColors.line}` }}>
        {langs.map(l => {
          const on = lang===l.id;
          return <button key={l.id} onClick={() => setLang(l.id)} style={{
            display:'flex', alignItems:'center', gap: 14, padding:'16px 4px',
            background: 'transparent',
            borderBottom: `1px solid ${pfColors.line}`, border:'none', borderBottom:`1px solid ${pfColors.line}`,
            cursor:'pointer', color: pfColors.black, textAlign:'left',
          }}>
            <div style={{ width: 16, height: 16, borderRadius:'50%', border:`1px solid ${pfColors.black}`,
              background: on ? pfColors.black : 'transparent', flexShrink:0 }}/>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily: pfFont.sans, fontSize: 15, fontWeight: 600 }}>{l.label}</div>
              <div style={{ fontFamily: pfFont.serif, fontStyle:'italic', fontSize: 13, color: pfColors.mute }}>{l.sub}</div>
            </div>
          </button>;
        })}
      </div>
      <PFButton full onClick={onComplete}>{copy.cta}</PFButton>
    </div>
  );
}
Object.assign(window, { ScreenOnboarding });
