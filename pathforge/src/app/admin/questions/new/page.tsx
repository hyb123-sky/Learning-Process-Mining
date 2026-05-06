import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { QuestionForm } from "@/components/admin/QuestionForm";

export const dynamic = "force-dynamic";

export default async function NewQuestionPage() {
  const chapters = await prisma.chapter.findMany({
    orderBy: [{ questId: "asc" }, { order: "asc" }],
    include: { quest: { select: { title_ja: true } } },
  });

  if (chapters.length === 0) {
    redirect("/admin/chapters/new");
  }

  const defaultChapter = chapters[0];
  const nextOrder = await prisma.question.count({
    where: { chapterId: defaultChapter.id },
  });

  const chapterChoices = chapters.map((c) => ({
    id: c.id,
    label: `${c.quest.title_ja} · ${c.title_ja}`,
  }));

  const draft = {
    id: undefined,
    chapterId: defaultChapter.id,
    order: nextOrder,
    type: "mcq" as const,
    stem_ja: "",
    options: [
      { key: "A", text_ja: "", text_en: "" },
      { key: "B", text_ja: "", text_en: "" },
    ],
    correctKeys: [],
    explain_ja: "",
    explain_en: "",
    difficulty: "medium" as const,
    tags: [],
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <p className="eyebrow mb-1">Questions</p>
        <h1 className="font-display text-3xl text-pf-navy">新しい問題</h1>
      </div>
      <QuestionForm initial={draft} chapters={chapterChoices} />
    </div>
  );
}
