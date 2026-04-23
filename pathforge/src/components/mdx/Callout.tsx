import { BookOpen, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Type = "exam" | "warning" | "tip" | "success";

const config: Record<Type, { label: string; icon: React.ComponentType<{ className?: string }>; wrap: string; accent: string }> = {
  exam:    { label: "試験頻出",  icon: BookOpen,        wrap: "bg-pf-gold/8 border-pf-gold/50",       accent: "text-pf-gold-muted" },
  warning: { label: "注意",      icon: AlertTriangle,   wrap: "bg-pf-error/8 border-pf-error/40",     accent: "text-pf-error" },
  tip:     { label: "ヒント",    icon: Lightbulb,       wrap: "bg-pf-info/8 border-pf-info/40",       accent: "text-pf-info" },
  success: { label: "合格の鍵",  icon: CheckCircle2,    wrap: "bg-pf-success/8 border-pf-success/40", accent: "text-pf-success" },
};

export function Callout({ type = "exam", children }: { type?: Type; children: React.ReactNode }) {
  const c = config[type];
  const Icon = c.icon;
  return (
    <aside className={cn("my-6 rounded-md border-l-2 p-4 text-sm leading-relaxed", c.wrap)}>
      <div className={cn("mb-1 inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.22em]", c.accent)}>
        <Icon className="h-3.5 w-3.5" /> {c.label}
      </div>
      <div className="prose-pf text-pf-text-primary [&>p:last-child]:mb-0">{children}</div>
    </aside>
  );
}
