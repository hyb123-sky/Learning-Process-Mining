import { prisma } from '@/lib/prisma';
import { QuestForm } from '@/components/admin/QuestForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function NewQuestPage() {
  const trails = await prisma.trail.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/quests"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to quests
      </Link>
      <h1 className="text-3xl font-semibold mb-8">New quest</h1>
      <QuestForm trails={trails} />
    </div>
  );
}
