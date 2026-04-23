import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminChaptersList() {
  const chapters = await prisma.chapter.findMany({
    orderBy: [{ questId: "asc" }, { order: "asc" }],
    include: { quest: true, questions: true },
  });
  return (
    <div>
      <p className="eyebrow mb-1">Chapters</p>
      <h1 className="font-display text-3xl text-pf-navy">章の管理</h1>
      <div className="mt-6 overflow-hidden rounded-md border border-border">
        <table className="w-full text-sm">
          <thead className="bg-pf-ivory-warm">
            <tr className="text-left text-[11px] uppercase tracking-widest text-pf-gold-muted">
              <th className="px-3 py-2">Quest</th>
              <th className="px-3 py-2">Order</th>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Insight</th>
              <th className="px-3 py-2">Qs</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {chapters.map((c) => (
              <tr key={c.id} className="border-t border-border">
                <td className="px-3 py-2 text-pf-text-secondary">{c.quest.title_ja}</td>
                <td className="px-3 py-2 font-mono">{String(c.order + 1).padStart(2, "0")}</td>
                <td className="px-3 py-2 font-display text-pf-navy">{c.title_ja}</td>
                <td className="px-3 py-2 font-mono">{c.insightReward}</td>
                <td className="px-3 py-2 font-mono">{c.questions.length}</td>
                <td className="px-3 py-2 text-right">
                  <Link
                    className="text-[11px] font-semibold uppercase tracking-widest text-pf-gold-muted hover:text-pf-navy"
                    href={`/admin/chapters/${c.id}/edit`}
                  >
                    Edit →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
