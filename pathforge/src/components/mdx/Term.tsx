export function Term({ word, reading, children }: { word: string; reading?: string; children?: React.ReactNode }) {
  return (
    <span className="inline-flex items-baseline gap-1 whitespace-nowrap">
      <strong className="text-pf-navy">{word}</strong>
      {reading && (
        <span className="font-display text-[0.9em] italic text-pf-gold-muted">（{reading}）</span>
      )}
      {children}
    </span>
  );
}
