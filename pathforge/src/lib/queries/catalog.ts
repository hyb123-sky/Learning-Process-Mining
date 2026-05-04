import { prisma } from '@/lib/prisma';
import { getCurrentUserId } from '@/lib/auth/role';

export type CatalogTrail = {
  id: string;
  slug: string;
  title_ja: string;
  description_ja: string;
  quests: CatalogQuest[];
};

export type CatalogQuest = {
  id: string;
  slug: string;
  title_ja: string;
  description_ja: string;
  trailId: string;
  trailSlug: string;
  trailTitle: string;
  chapterCount: number;
  questionCount: number;
  estimatedMinutes: number;
  completedChapters: number;
  status: 'not_started' | 'in_progress' | 'completed';
};

export async function getCatalog(opts: {
  q?: string;
  trailSlug?: string;
}): Promise<CatalogTrail[]> {
  const userId = await getCurrentUserId();
  const trails = await prisma.trail.findMany({
    where: opts.trailSlug ? { slug: opts.trailSlug } : undefined,
    orderBy: { order: 'asc' },
    include: {
      quests: {
        orderBy: { order: 'asc' },
        include: {
          chapters: {
            include: {
              _count: { select: { questions: true } },
              progress: { where: { userId } },
            },
          },
        },
      },
    },
  });

  const q = opts.q?.toLowerCase().trim();
  const result: CatalogTrail[] = trails.map((t) => {
    const quests: CatalogQuest[] = t.quests
      .filter((quest) => {
        if (!q) return true;
        const hay = [
          quest.title_ja,
          quest.title_en,
          quest.description_ja,
          ...quest.chapters.map((c) => c.title_ja),
          ...quest.chapters.map((c) => c.title_en),
        ]
          .join(' ')
          .toLowerCase();
        return hay.includes(q);
      })
      .map((quest) => {
        const completedChapters = quest.chapters.filter(
          (c) => c.progress[0]?.status === 'completed'
        ).length;
        const inProgress = quest.chapters.some(
          (c) => c.progress[0]?.status === 'in_progress'
        );
        const status: CatalogQuest['status'] =
          completedChapters === quest.chapters.length && quest.chapters.length > 0
            ? 'completed'
            : completedChapters > 0 || inProgress
            ? 'in_progress'
            : 'not_started';

        return {
          id: quest.id,
          slug: quest.slug,
          title_ja: quest.title_ja,
          description_ja: quest.description_ja,
          trailId: t.id,
          trailSlug: t.slug,
          trailTitle: t.title_ja,
          chapterCount: quest.chapters.length,
          questionCount: quest.chapters.reduce(
            (sum, c) => sum + c._count.questions,
            0
          ),
          estimatedMinutes: quest.estimatedMinutes,
          completedChapters,
          status,
        };
      });

    return {
      id: t.id,
      slug: t.slug,
      title_ja: t.title_ja,
      description_ja: t.description_ja,
      quests,
    };
  });

  return result.filter((t) => t.quests.length > 0);
}

export async function getCatalogStats() {
  const [trails, quests, chapters] = await Promise.all([
    prisma.trail.count(),
    prisma.quest.count(),
    prisma.chapter.count(),
  ]);
  return { trails, quests, chapters };
}
