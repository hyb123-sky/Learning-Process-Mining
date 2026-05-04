import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Edit2 } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function QuestsListPage() {
  const quests = await prisma.quest.findMany({
    include: {
      trail: true,
      _count: { select: { chapters: true } },
    },
    orderBy: [{ trail: { order: 'asc' } }, { order: 'asc' }],
  });

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold">Quests</h1>
          <p className="text-muted-foreground mt-2">
            {quests.length} quest{quests.length !== 1 ? 's' : ''} across all trails.
          </p>
        </div>
        <Link href="/admin/quests/new" className={cn(buttonVariants(), 'inline-flex items-center gap-2')}>
          <Plus className="h-4 w-4" />
          New quest
        </Link>
      </div>

      {quests.length === 0 ? (
        <div className="text-center py-16 bg-muted/30 rounded-lg border border-dashed">
          <p className="text-muted-foreground mb-4">No quests yet.</p>
          <Link href="/admin/quests/new" className={buttonVariants()}>
            Create your first quest
          </Link>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Trail</th>
                <th className="px-4 py-3">Chapters</th>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3 w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {quests.map((quest) => (
                <tr key={quest.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/quests/${quest.id}/edit`}
                      className="font-medium hover:underline underline-offset-4"
                    >
                      {quest.title_ja}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">{quest.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-sm">{quest.trail.title_ja}</td>
                  <td className="px-4 py-3 text-sm">{quest._count.chapters}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{quest.order}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/quests/${quest.id}/edit`}
                      className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
