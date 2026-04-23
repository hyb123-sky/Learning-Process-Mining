import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "gold" | "success" | "warning" | "muted";
const styles: Record<Variant, string> = {
  default: "bg-pf-navy text-pf-ivory",
  gold: "bg-gradient-to-br from-pf-gold-light to-pf-gold text-pf-navy",
  success: "bg-pf-success/10 text-pf-success border border-pf-success/30",
  warning: "bg-pf-warning/15 text-pf-navy border border-pf-warning/40",
  muted: "bg-pf-ivory-warm text-pf-text-secondary border border-border",
};

export function Badge({
  variant = "default",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide",
        styles[variant],
        className
      )}
      {...props}
    />
  );
}
