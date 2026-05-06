import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Map } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminTrailsPage() {
  const trails = await prisma.trail.findMany({
    include: {
      _count: { select: { quests: true } },
      quests: {
        include: { _count: { select: { chapters: true } } },
      },
    },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Trails</h1>
        <p className="text-muted-foreground mt-2">
          {trails.length} 件の学習パス
        </p>
      </div>

      <div className="bg-amber-50/50 border border-amber-200 rounded-lg px-4 py-3 mb-6 text-sm text-amber-900">
        <strong>準備中:</strong> Trail の作成・編集機能は次のフェーズで実装予定です。
        現時点では <code className="text-xs">prisma/seed.ts</code> で定義された Trail を表示するのみです。
      </div>

      {trails.length === 0 ? (
        <div className="text-center py-16 bg-muted/30 rounded-lg border border-dashed">
          <Map className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            Trail が定義されていません。<br />
            <code className="text-xs">prisma/seed.ts</code> を編集して再シードしてください。
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {trails.map((t) => {
            const totalChapters = t.quests.reduce(
              (sum, q) => sum + q._count.chapters,
              0
            );
            return (
              <div
                key={t.id}
                className="bg-background border rounded-lg p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Map className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium">{t.title_ja}</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      slug: <code>{t.slug}</code>
                    </p>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {t.description_ja}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{t._count.quests} クエスト</span>
                      <span>·</span>
                      <span>{totalChapters} チャプター</span>
                    </div>
                  </div>
                  <Link
                    href={`/admin/quests?trailId=${t.id}`}
                    className="text-sm text-primary hover:underline shrink-0"
                  >
                    クエスト一覧 →
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
