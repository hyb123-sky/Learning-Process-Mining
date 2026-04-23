import { Flame } from "lucide-react";

export function StreakFlame({ days }: { days: number }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-pf-ivory-warm px-3 py-1">
      <Flame className="h-4 w-4 text-pf-gold" />
      <span className="font-display text-lg font-medium tabular-nums text-pf-navy">{days}</span>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-pf-gold-muted">日連続</span>
    </div>
  );
}
