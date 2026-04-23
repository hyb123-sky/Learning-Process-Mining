import Link from "next/link";
import { CrestBadge } from "@/components/shared/CrestBadge";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-30 border-b border-border/80 bg-pf-ivory/85 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2">
          <CrestBadge variant="shield" size={22} stroke={1.4} />
          <span className="font-display text-lg tracking-tight text-pf-navy">PathForge</span>
        </Link>
        <div className="flex items-center gap-5 text-[11px] font-semibold uppercase tracking-widest text-pf-text-secondary">
          <Link href="/" className="hover:text-pf-navy">Path</Link>
          <Link href="/trails" className="hover:text-pf-navy">Trails</Link>
          <Link href="/profile" className="hover:text-pf-navy">Profile</Link>
          <Link href="/admin" className="hover:text-pf-navy">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
