import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth/role";
import { ensureUserStats } from "@/actions/progress";
import { calculateRank, nextRank, rankProgressPct } from "@/lib/gamification";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { CrestBadge } from "@/components/shared/CrestBadge";
import { Card } from "@/components/ui/card";
import { ScoreChart } from "@/components/profile/ScoreChart";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  await ensureUserStats();
  const userId = await getCurrentUserId();
  const [stats, completedProgress] = await Promise.all([
    prisma.userStats.findUnique({ where: { userId } }),
    prisma.chapterProgress.findMany({
      where: { userId, status: "completed" },
      include: { chapter: true },
      orderBy: { completedAt: "asc" },
    }),
  ]);

  const insight = stats?.totalInsight ?? 0;
  const rank = calculateRank(insight);
  const next = nextRank(insight);
  const pct = rankProgressPct(insight);

  const chartData = completedProgress.map((p, i) => ({
    name: `Ch.${String(i + 1).padStart(2, "0")}`,
    score: p.bestScore,
  }));

  const crests = [
    { variant: "shield", name: "Shield of Insight", unlocked: completedProgress.length >= 2 },
    { variant: "flame", name: "Flame of Vigil", unlocked: (stats?.currentStreak ?? 0) >= 7 },
    { variant: "chalice", name: "Chalice of Mastery", unlocked: completedProgress.some((p) => p.bestScore === 100) },
  ] as const;

  return (
    <div className="container max-w-4xl py-10">
      <p className="eyebrow">Profile</p>
      <h1 className="font-display text-4xl text-pf-navy">旅人のプロフィール</h1>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card className="flex items-center gap-4">
          <ProgressRing value={pct / 100} size={72}>
            <CrestBadge variant="shield" size={40} stroke={1.3} />
          </ProgressRing>
          <div>
            <div className="eyebrow">現在の位階</div>
            <div className="font-display text-2xl text-pf-navy">{rank.title_ja}</div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-pf-text-muted">
              {rank.name}
            </div>
            {next && (
              <div className="mt-1 text-xs text-pf-text-secondary">
                次位 {next.title_ja} まで {(next.minInsight - insight).toLocaleString()} Insight
              </div>
            )}
          </div>
        </Card>

        <Card>
          <div className="eyebrow">Total Insight</div>
          <div className="mt-2 font-display text-4xl font-medium tabular-nums text-pf-navy">
            {insight.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-pf-text-muted">累積</div>
        </Card>

        <Card>
          <div className="eyebrow">学習完了</div>
          <div className="mt-2 font-display text-4xl font-medium tabular-nums text-pf-navy">
            {completedProgress.length}
          </div>
          <div className="mt-1 text-xs text-pf-text-muted">章クリア</div>
        </Card>
      </div>

      <div className="mt-8">
        <p className="eyebrow mb-3">Crests</p>
        <div className="flex flex-wrap gap-4">
          {crests.map((c) => (
            <div
              key={c.name}
              className={`flex flex-col items-center rounded-md border p-4 text-center ${
                c.unlocked ? "border-pf-gold/60 bg-pf-gold/5" : "border-border bg-pf-ivory-warm opacity-50"
              }`}
            >
              <CrestBadge variant={c.variant} size={64} stroke={1.3} muted={!c.unlocked} />
              <div className="mt-2 font-display text-sm text-pf-navy">{c.name}</div>
              <div className="mt-0.5 text-[10px] uppercase tracking-widest text-pf-text-muted">
                {c.unlocked ? "Unlocked" : "Locked"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <p className="eyebrow mb-3">章別スコア</p>
        <Card>
          <ScoreChart data={chartData} />
        </Card>
      </div>
    </div>
  );
}
