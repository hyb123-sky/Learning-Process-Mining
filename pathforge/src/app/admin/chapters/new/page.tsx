import { prisma } from '@/lib/prisma';
import { ChapterEditor } from '@/components/admin/ChapterEditor';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

const SAMPLE_MDX = `## 新しい章のタイトル

ここに本文を書きます。<Term word="View" reading="ビュー" /> のような用語コンポーネントを使えます。

<Callout type="exam">
**試験頻出**: 重要なポイントをここに書きます。
</Callout>

## サブセクション

通常の段落。
`;

export default async function NewChapterPage({
  searchParams,
}: {
  searchParams: { questId?: string };
}) {
  const quests = await prisma.quest.findMany({
    orderBy: [{ trail: { order: 'asc' } }, { order: 'asc' }],
  });

  if (quests.length === 0) {
    redirect('/admin/quests/new?reason=no-quests-for-chapter');
  }

  const defaultQuestId = searchParams.questId ?? quests[0].id;

  const lastChapter = await prisma.chapter.findFirst({
    where: { questId: defaultQuestId },
    orderBy: { order: 'desc' },
    select: { order: true },
  });
  const nextOrder = (lastChapter?.order ?? -1) + 1;

  const draft = {
    id: '',
    slug: '',
    title_ja: '',
    title_en: '',
    questId: defaultQuestId,
    order: nextOrder,
    contentMdx: SAMPLE_MDX,
    estimatedMinutes: 20,
    insightReward: 380,
  };

  return (
    <div className="max-w-7xl">
      <Link
        href="/admin/chapters"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to chapters
      </Link>
      <h1 className="text-3xl font-semibold mb-2">New chapter</h1>
      <p className="text-muted-foreground mb-8">
        Compose your chapter content in MDX. Live preview updates as you type.
      </p>
      <ChapterEditor
        initial={draft}
        quests={quests.map((q) => ({ id: q.id, title: q.title_ja }))}
      />
    </div>
  );
}
