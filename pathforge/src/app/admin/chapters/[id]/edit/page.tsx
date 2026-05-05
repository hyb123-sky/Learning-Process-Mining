import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ChapterEditor } from "@/components/admin/ChapterEditor";
import { DeleteChapterButton } from "@/components/admin/DeleteChapterButton";

export const dynamic = "force-dynamic";

export default async function EditChapterPage({ params }: { params: { id: string } }) {
  const chapter = await prisma.chapter.findUnique({ where: { id: params.id } });
  if (!chapter) return notFound();
  const quests = await prisma.quest.findMany({ orderBy: { order: "asc" } });
  return (
    <div className="max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Edit chapter</h1>
        <DeleteChapterButton id={chapter.id} />
      </div>
      <ChapterEditor
        initial={{
          id: chapter.id,
          slug: chapter.slug,
          title_ja: chapter.title_ja,
          title_en: chapter.title_en,
          questId: chapter.questId,
          order: chapter.order,
          contentMdx: chapter.contentMdx,
          estimatedMinutes: chapter.estimatedMinutes,
          insightReward: chapter.insightReward,
        }}
        quests={quests.map((q) => ({ id: q.id, title: q.title_ja }))}
      />
    </div>
  );
}
