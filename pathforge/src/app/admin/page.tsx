import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const [trails, quests, chapters, questions] = await Promise.all([
    prisma.trail.count(),
    prisma.quest.count(),
    prisma.chapter.count(),
    prisma.question.count(),
  ]);
  return (
    <div>
      <p className="eyebrow mb-1">Overview</p>
      <h1 className="font-display text-3xl text-pf-navy">コンテンツ管理</h1>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "Trails", value: trails, href: "/admin" },
          { label: "Quests", value: quests, href: "/admin/quests" },
          { label: "Chapters", value: chapters, href: "/admin/chapters" },
          { label: "Questions", value: questions, href: "/admin/questions" },
        ].map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="pf-card-hover">
              <div className="eyebrow">{s.label}</div>
              <div className="mt-1 font-display text-3xl text-pf-navy tabular-nums">{s.value}</div>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-8 rounded-md border border-pf-gold/40 bg-pf-gold/5 p-4 text-sm">
        <div className="eyebrow mb-1 text-pf-gold-muted">Tip</div>
        Chapters ページで各章を編集すると、MDX のプレビューが右側にライブ表示されます。Server Action で保存され、/quest 側のページも revalidate されます。
      </div>
    </div>
  );
}
