import { cn } from "@/lib/utils";

export function Progress({
  value = 0,
  className,
}: { value?: number; className?: string }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-pf-parchment", className)}>
      <div
        className="h-full bg-gradient-to-r from-pf-gold-light to-pf-gold transition-[width] duration-500"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}
