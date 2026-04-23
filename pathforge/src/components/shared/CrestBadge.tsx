import * as React from "react";
import { cn } from "@/lib/utils";

export function CrestBadge({
  variant = "shield",
  size = 120,
  stroke = 1.2,
  muted = false,
  className,
}: {
  variant?: "shield" | "flame" | "chalice" | "key";
  size?: number;
  stroke?: number;
  muted?: boolean;
  className?: string;
}) {
  const color = muted ? "hsl(var(--pf-text-muted))" : "hsl(var(--pf-navy))";
  const accent = muted ? "hsl(var(--pf-text-muted))" : "hsl(var(--pf-gold))";
  const common = {
    width: size,
    height: size * 1.16,
    viewBox: "0 0 120 140",
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    className: cn(className),
  };
  if (variant === "shield") {
    return (
      <svg {...common}>
        <path d="M60 6 L108 14 L108 58 Q108 100 60 130 Q12 100 12 58 L12 14 Z" />
        <path d="M60 14 L100 22 L100 56 Q100 92 60 118 Q20 92 20 56 L20 22 Z" />
        <line x1="60" y1="30" x2="60" y2="98" />
        <line x1="32" y1="62" x2="88" y2="62" />
        <circle cx="60" cy="30" r="3" fill={accent} stroke="none" />
        <circle cx="60" cy="98" r="3" fill={accent} stroke="none" />
        <circle cx="32" cy="62" r="2.5" fill={accent} stroke="none" />
        <circle cx="88" cy="62" r="2.5" fill={accent} stroke="none" />
      </svg>
    );
  }
  if (variant === "flame") {
    return (
      <svg {...common}>
        <circle cx="60" cy="60" r="54" />
        <circle cx="60" cy="60" r="46" />
        <path d="M60 92 C 42 80, 46 62, 54 50 C 54 60, 60 62, 60 52 C 60 40, 70 34, 66 22 C 80 36, 84 58, 74 72 C 74 64, 70 62, 70 68 C 70 78, 64 82, 64 90 Z" />
      </svg>
    );
  }
  if (variant === "chalice") {
    return (
      <svg {...common}>
        <path d="M60 6 L108 34 L108 86 L60 114 L12 86 L12 34 Z" />
        <path d="M60 18 L97 40 L97 80 L60 102 L23 80 L23 40 Z" />
        <path d="M44 42 L76 42 Q76 64 60 72 Q44 64 44 42 Z" />
        <line x1="60" y1="72" x2="60" y2="84" />
        <line x1="50" y1="84" x2="70" y2="84" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M60 6 L108 14 L108 58 Q108 100 60 130 Q12 100 12 58 L12 14 Z" />
      <circle cx="60" cy="50" r="16" />
      <line x1="60" y1="66" x2="60" y2="100" />
      <line x1="60" y1="82" x2="72" y2="82" />
      <line x1="60" y1="92" x2="68" y2="92" />
    </svg>
  );
}
