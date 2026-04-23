import { Sparkle } from "lucide-react";

export function InsightCounter({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1 font-mono text-[11px] tracking-widest text-pf-gold-muted">
      <Sparkle className="h-3 w-3 text-pf-gold" />
      {value.toLocaleString()}
      <span className="uppercase">Insight</span>
    </span>
  );
}
