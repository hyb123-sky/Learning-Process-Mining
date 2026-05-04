import { prisma } from '@/lib/prisma';
import { CURRENT_USER_ID } from '@/lib/constants';

export async function getContinueLearningHref(): Promise<string> {
  const inProgress = await prisma.chapterProgress.findFirst({
    where: { userId: CURRENT_USER_ID, status: 'in_progress' },
    orderBy: { updatedAt: 'desc' },
    include: { chapter: { include: { quest: true } } },
  });
  if (inProgress) {
    return `/quest/${inProgress.chapter.quest.slug}/${inProgress.chapter.slug}`;
  }
  const available = await prisma.chapterProgress.findFirst({
    where: { userId: CURRENT_USER_ID, status: 'available' },
    orderBy: { chapter: { order: 'asc' } },
    include: { chapter: { include: { quest: true } } },
  });
  if (available) {
    return `/quest/${available.chapter.quest.slug}/${available.chapter.slug}`;
  }
  return '/catalog';
}
