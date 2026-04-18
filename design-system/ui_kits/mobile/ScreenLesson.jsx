function ScreenLesson({ lang='en', onBack, onComplete }) {
  const [answer, setAnswer] = React.useState(null);
  const [submitted, setSubmitted] = React.useState(false);
  const correct = 'b';
  const s = {
    en:{ eye:'Ch. 03 · Trial 02', title:'Case IDs & Timestamps',
      body:'Every row in an event log belongs to a case. The case ID ties activities together over time. Timestamps order them into a story.',
      quote:'"Read the log row by row. Each one is a step the case took."',
      q:'Which column tells you when an activity occurred?',
      opts:[{id:'a',t:'Case ID'},{id:'b',t:'Timestamp'},{id:'c',t:'Resource'},{id:'d',t:'Activity'}],
      submit:'Submit', next:'Forge on', correct:'Correct. Onward.', wrong:'Not quite.' },
    zh:{ eye:'第3章 · 试炼2', title:'案例编号与时间戳',
      body:'事件日志中的每一行都属于一个案例。案例编号跨时间串联活动；时间戳将其排序成故事。',
      quote:'「逐行阅读日志。每一行都是案例走过的一步。」',
      q:'哪一列告诉你活动发生的时间？',
      opts:[{id:'a',t:'案例编号'},{id:'b',t:'时间戳'},{id:'c',t:'资源'},{id:'d',t:'活动'}],
      submit:'提交', next:'继续', correct:'正确。', wrong:'再试。' },
    ja:{ eye:'第3章 · 試練2', title:'ケースIDと時刻',
      body:'ログの各行はケースに属する。ケースIDは時を超え活動を結び、タイムスタンプは順序を与える。',
      quote:'「ログを一行ずつ読め。各行は一歩である。」',
      q:'活動の時刻を示す列はどれか。',
      opts:[{id:'a',t:'ケースID'},{id:'b',t:'時刻'},{id:'c',t:'資源'},{id:'d',t:'活動'}],
      submit:'送信', next:'前進', correct:'正解。', wrong:'惜しい。' },
  }[lang];
  const isC = submitted && answer === correct;
  const isW = submitted && answer !== correct;
  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background: pfColors.white }}>
      <PFAppBar title={s.eye} onBack={onBack} trailing={
        <div style={{ width: 80, height: 2, background: pfColors.line }}>
          <div style={{ width:'45%', height:'100%', background: pfColors.black }}/>
        </div>
      }/>
      <div style={{ flex:1, overflow:'auto', padding:'18px 22px 120px' }}>
        <h1 style={{ fontFamily: pfFont.serif, fontSize: 28, fontWeight: 500, lineHeight: 1.15,
          color: pfColors.black, margin: '0 0 18px', letterSpacing:'-0.01em' }}>{s.title}</h1>
        <p style={{ fontFamily: pfFont.sans, fontSize: 15, lineHeight: 1.65, color: pfColors.text, margin:'0 0 22px' }}>{s.body}</p>
        <div style={{ borderLeft:`1px solid ${pfColors.black}`, padding:'4px 14px',
          fontFamily: pfFont.serif, fontStyle:'italic', fontSize: 17, color: pfColors.text, margin:'0 0 24px' }}>
          {s.quote}
        </div>
        <div style={{ background: pfColors.off, border:`1px solid ${pfColors.line}`, padding: 14, fontFamily: pfFont.mono,
          fontSize: 11, lineHeight: 1.8, color: pfColors.text, marginBottom: 28, overflowX:'auto' }}>
          <div style={{ color: pfColors.mute }}>case_id │ activity       │ timestamp</div>
          <div style={{ color: pfColors.line2 }}>─────────────────────────────────</div>
          <div>1042    │ Create PO      │ 2026-04-03 09:12</div>
          <div>1042    │ Approve PO     │ 2026-04-03 11:40</div>
          <div>1042    │ Receive Goods  │ 2026-04-07 14:02</div>
        </div>
        <PFEyebrow style={{ marginBottom: 12 }}>Trial</PFEyebrow>
        <div style={{ fontFamily: pfFont.serif, fontSize: 20, fontWeight: 500, color: pfColors.black, marginBottom: 14, lineHeight: 1.3 }}>
          {s.q}
        </div>
        <div style={{ display:'flex', flexDirection:'column' }}>
          {s.opts.map(o => {
            const sel = answer === o.id;
            const sc = submitted && o.id === correct;
            const sw = submitted && sel && o.id !== correct;
            return <button key={o.id} onClick={() => !submitted && setAnswer(o.id)} style={{
              display:'flex', alignItems:'center', gap: 14, padding:'14px 4px', textAlign:'left',
              background:'transparent', borderBottom:`1px solid ${pfColors.line}`, border:0, borderBottom:`1px solid ${pfColors.line}`,
              cursor: submitted ? 'default' : 'pointer',
              fontFamily: pfFont.sans, fontSize: 15, fontWeight: 500, color: pfColors.black,
            }}>
              <div style={{ width: 18, height: 18, border:`1px solid ${pfColors.black}`, borderRadius:'50%',
                background: sel||sc ? pfColors.black : 'transparent', flexShrink:0, position:'relative' }}>
                {sw && <PFIcon name="x" size={12} color={pfColors.danger} style={{ position:'absolute', inset:2 }}/>}
              </div>
              <span style={{ flex:1 }}>{o.t}</span>
              {sc && <PFIcon name="check" size={16} color={pfColors.black}/>}
            </button>;
          })}
        </div>
      </div>
      <div style={{ padding:'14px 20px', borderTop:`1px solid ${pfColors.line}`, background: pfColors.white }}>
        {isC && <div style={{ fontFamily: pfFont.serif, fontStyle:'italic', fontSize: 14, color: pfColors.black, marginBottom: 10 }}>{s.correct}</div>}
        {isW && <div style={{ fontFamily: pfFont.serif, fontStyle:'italic', fontSize: 14, color: pfColors.danger, marginBottom: 10 }}>{s.wrong}</div>}
        {!submitted ? <PFButton full disabled={!answer} onClick={() => setSubmitted(true)}>{s.submit}</PFButton>
          : isC ? <PFButton full onClick={onComplete}>{s.next}</PFButton>
          : <PFButton full onClick={() => { setSubmitted(false); setAnswer(null); }}>Retry</PFButton>}
      </div>
    </div>
  );
}
Object.assign(window, { ScreenLesson });
