import { prisma } from '@/lib/prisma';
import { getCurrentUserId } from '@/lib/auth/role';
import Link from 'next/link';
import { Target, RefreshCw } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function PracticePage() {
  const userId = await getCurrentUserId();

  // Find all chapters the user has attempted (including failed attempts)
  const attempted = await prisma.chapterProgress.findMany({
    where: {
      userId,
      attempts: { gt: 0 },
    },
    include: {
      chapter: {
        include: {
          quest: true,
          _count: { select: { questions: true } },
        },
      },
    },
    orderBy: { updatedAt: 'desc' },
  });

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Practice</h1>
        <p className="text-muted-foreground mt-2">
          {attempted.length === 0
            ? 'まずチャプターの Trial を完了するとここに表示されます。'
            : `${attempted.length} 件の Trial を再挑戦できます。`}
        </p>
      </div>

      {attempted.length === 0 ? (
        <div className="text-center py-16 bg-muted/30 rounded-lg border border-dashed">
          <Target className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-2">
            まだ挑戦した Trial がありません。
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            チャプターを学習し、Trial を受けると、ここで再挑戦・復習ができます。
          </p>
          <Link href="/my-learning" className={buttonVariants()}>
            My learning へ
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {attempted.map((p) => {
            const isPassed = p.status === 'completed';
            const trialHref = `/quest/${p.chapter.quest.slug}/${p.chapter.slug}/trial`;

            return (
              <div
                key={p.id}
                className="bg-background border rounded-lg p-5"
              >
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  {p.chapter.quest.title_ja}
                </p>
                <h3 className="text-base font-medium mb-3 line-clamp-2">
                  {p.chapter.title_ja}
                </h3>

                <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                  <Stat label="ベスト" value={`${p.bestScore}%`} />
                  <Stat label="挑戦" value={`${p.attempts} 回`} />
                  <Stat label="問題" value={`${p.chapter._count.questions}`} />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      isPassed
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {isPassed ? '合格' : '未合格'}
                  </span>
                  <Link href={trialHref} className={buttonVariants({ size: 'sm', variant: 'outline' })}>
                    <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                    もう一度
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium mt-0.5">{value}</p>
    </div>
  );
}
