import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container max-w-5xl py-8">
      <div className="mb-6 flex items-center gap-4 border-b border-border pb-4">
        <Link href="/admin" className="font-display text-2xl text-pf-navy">Admin</Link>
        <span className="text-pf-text-muted">·</span>
        <Link href="/admin/quests" className="eyebrow hover:text-pf-navy">Quests</Link>
        <Link href="/admin/chapters" className="eyebrow hover:text-pf-navy">Chapters</Link>
        <Link href="/admin/questions" className="eyebrow hover:text-pf-navy">Questions</Link>
        <span className="ml-auto text-[11px] font-semibold uppercase tracking-widest text-pf-text-muted">Phase 1 · No Auth</span>
      </div>
      {children}
    </div>
  );
}
