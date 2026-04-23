import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminQuestsList() {
  const quests = await prisma.quest.findMany({
    orderBy: { order: "asc" },
    include: { trail: true, chapters: true },
  });
  return (
    <div>
      <p className="eyebrow mb-1">Quests</p>
      <h1 className="font-display text-3xl text-pf-navy">クエストの管理</h1>
      <div className="mt-6 space-y-2">
        {quests.map((q) => (
          <div key={q.id} className="flex items-center gap-3 rounded-md border border-border p-3">
            <div className="eyebrow w-32">{q.trail.title_ja}</div>
            <div className="flex-1">
              <div className="font-display text-pf-navy">{q.title_ja}</div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-pf-text-muted">
                /{q.slug} · {q.chapters.length} chapters
              </div>
            </div>
            <Link className="eyebrow hover:text-pf-navy" href={`/quest/${q.slug}`}>View →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
