import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CURRENT_USER_ID } from "@/lib/constants";
import { ensureUserStats } from "@/actions/progress";
import { CrestBadge } from "@/components/shared/CrestBadge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Sparkle, Flame, ShieldCheck, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  await ensureUserStats();
  const [stats, quests, chapters, progressRows] = await Promise.all([
    prisma.userStats.findUnique({ where: { userId: CURRENT_USER_ID } }),
    prisma.quest.findMany({
      orderBy: { order: "asc" },
      include: { chapters: { orderBy: { order: "asc" } } },
    }),
    prisma.chapter.findMany(),
    prisma.chapterProgress.findMany({ where: { userId: CURRENT_USER_ID } }),
  ]);

  const progMap = new Map(progressRows.map((p) => [p.chapterId, p]));

  return (
    <div className="container max-w-4xl py-10">
      <p className="eyebrow mb-2">本日の旅</p>
      <h1 className="font-display text-[2.75rem] leading-tight text-pf-navy">
        おかえりなさい、旅人よ。
      </h1>
      <p className="mt-2 max-w-xl font-display italic text-pf-text-secondary">
        道は明らかなれど、決して易からず。今日も一歩、前へ。
      </p>

      {/* Stats row */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="relative overflow-hidden">
          <div className="eyebrow">Daily Vigil</div>
          <div className="mt-2 flex items-baseline gap-2">
            <Flame className="h-6 w-6 text-pf-gold" />
            <span className="font-display text-4xl font-medium tabular-nums text-pf-navy">
              {stats?.currentStreak ?? 0}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-pf-text-muted">
              日連続
            </span>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="eyebrow">Total Insight</div>
          <div className="mt-2 flex items-baseline gap-2">
            <Sparkle className="h-5 w-5 text-pf-gold" />
            <span className="font-display text-4xl font-medium tabular-nums text-pf-navy">
              {(stats?.totalInsight ?? 0).toLocaleString()}
            </span>
          </div>
          <div className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-pf-text-muted">
            {stats?.rank ?? "Apprentice"}
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="eyebrow">Crests</div>
          <div className="mt-2 flex items-baseline gap-2">
            <ShieldCheck className="h-5 w-5 text-pf-gold" />
            <span className="font-display text-4xl font-medium tabular-nums text-pf-navy">
              {stats?.questsCompleted ?? 0}
            </span>
            <span className="text-xs uppercase tracking-widest text-pf-text-muted">獲得</span>
          </div>
        </Card>
      </div>

      {/* Active quests */}
      <div className="mt-12">
        <p className="eyebrow mb-3">Active Quests</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {quests.length === 0 && (
            <Card>
              <p className="text-sm text-pf-text-secondary">
                クエストがまだありません。<Link href="/admin" className="underline">Admin</Link> から Seed を確認してください。
              </p>
            </Card>
          )}
          {quests.map((q) => {
            const total = q.chapters.length || 1;
            const done = q.chapters.filter((c) => progMap.get(c.id)?.status === "completed").length;
            const pct = Math.round((done / total) * 100);
            return (
              <Link key={q.id} href={`/quest/${q.slug}`} className="pf-card-hover">
                <Card className="h-full">
                  <div className="flex items-start gap-4">
                    <CrestBadge variant="shield" size={48} stroke={1.4} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="eyebrow">{q.crestName}</div>
                        <ArrowRight className="h-4 w-4 text-pf-text-muted" />
                      </div>
                      <h3 className="font-display text-xl font-medium text-pf-navy">{q.title_ja}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-pf-text-secondary">
                        {q.description_ja}
                      </p>
                      <div className="mt-3 flex items-center gap-3">
                        <Progress value={pct} className="flex-1" />
                        <span className="font-mono text-[11px] tabular-nums text-pf-text-muted">
                          {done} / {total} · {pct}%
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-10 text-center text-[11px] uppercase tracking-widest text-pf-text-muted">
        PathForge · {chapters.length} Chapters Available
      </div>
    </div>
  );
}
