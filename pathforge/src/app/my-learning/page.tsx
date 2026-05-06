import { prisma } from '@/lib/prisma';
import { getCurrentUserId } from '@/lib/auth/role';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function MyLearningPage() {
  const userId = await getCurrentUserId();

  // Find all chapters that this user has started or completed
  const progress = await prisma.chapterProgress.findMany({
    where: {
      userId,
      status: { in: ['in_progress', 'completed', 'available'] },
    },
    include: {
      chapter: {
        include: {
          quest: {
            include: {
              chapters: {
                include: {
                  progress: { where: { userId } },
                },
                orderBy: { order: 'asc' },
              },
            },
          },
        },
      },
    },
    orderBy: { updatedAt: 'desc' },
  });

  // Group by quest
  const questMap = new Map<string, {
    quest: typeof progress[0]['chapter']['quest'];
    lastTouched: Date;
    completedCount: number;
    totalCount: number;
    nextChapterSlug: string | null;
  }>();

  for (const p of progress) {
    const q = p.chapter.quest;
    if (!questMap.has(q.id)) {
      const completedCount = q.chapters.filter(
        (c) => c.progress[0]?.status === 'completed'
      ).length;
      // Next chapter = first non-completed in order
      const nextChapter = q.chapters.find(
        (c) => c.progress[0]?.status !== 'completed'
      );
      questMap.set(q.id, {
        quest: q,
        lastTouched: p.updatedAt,
        completedCount,
        totalCount: q.chapters.length,
        nextChapterSlug: nextChapter?.slug ?? null,
      });
    }
  }

  const items = Array.from(questMap.values()).sort(
    (a, b) => b.lastTouched.getTime() - a.lastTouched.getTime()
  );

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">My learning</h1>
        <p className="text-muted-foreground mt-2">
          {items.length === 0
            ? 'まだクエストを始めていません。'
            : `${items.length} 件のクエストを進めています。`}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-muted/30 rounded-lg border border-dashed">
          <BookOpen className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-6">
            学習を始めるには Catalog からクエストを選んでください。
          </p>
          <Link href="/catalog" className={buttonVariants()}>
            Browse catalog
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => {
            const pct = Math.round((item.completedCount / item.totalCount) * 100);
            const isCompleted = item.completedCount === item.totalCount;
            const continueHref = item.nextChapterSlug
              ? `/quest/${item.quest.slug}/${item.nextChapterSlug}`
              : `/quest/${item.quest.slug}`;

            return (
              <Link
                key={item.quest.id}
                href={continueHref}
                className="block bg-background border rounded-lg p-5 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium mb-1">{item.quest.title_ja}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {item.quest.description_ja}
                    </p>
                  </div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {isCompleted ? '完了' : '進行中'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>
                    {item.completedCount} / {item.totalCount} 章 完了
                  </span>
                  <span>{pct}%</span>
                </div>

                <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {isCompleted ? 'もう一度復習' : '続きから学ぶ'}
                  </span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
