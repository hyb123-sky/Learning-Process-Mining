import { prisma } from '@/lib/prisma';
import { QuestForm } from '@/components/admin/QuestForm';
import { DeleteQuestButton } from '@/components/admin/DeleteQuestButton';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditQuestPage({ params }: { params: { id: string } }) {
  const [quest, trails] = await Promise.all([
    prisma.quest.findUnique({ where: { id: params.id } }),
    prisma.trail.findMany({ orderBy: { order: 'asc' } }),
  ]);

  if (!quest) notFound();

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/quests"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to quests
      </Link>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Edit quest</h1>
        <DeleteQuestButton id={quest.id} />
      </div>
      <QuestForm quest={quest} trails={trails} />
    </div>
  );
}
