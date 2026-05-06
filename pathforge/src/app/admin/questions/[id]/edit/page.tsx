import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { QuestionForm } from "@/components/admin/QuestionForm";
import { DeleteQuestionButton } from "@/components/admin/DeleteQuestionButton";

export const dynamic = "force-dynamic";

export default async function EditQuestionPage({ params }: { params: { id: string } }) {
  const question = await prisma.question.findUnique({ where: { id: params.id } });
  if (!question) return notFound();

  const chapters = await prisma.chapter.findMany({
    orderBy: [{ questId: "asc" }, { order: "asc" }],
    include: { quest: { select: { title_ja: true } } },
  });

  const chapterChoices = chapters.map((c) => ({
    id: c.id,
    label: `${c.quest.title_ja} · ${c.title_ja}`,
  }));

  function parseJsonArray<T>(val: string, fallback: T[]): T[] {
    try {
      return JSON.parse(val) as T[];
    } catch {
      return fallback;
    }
  }

  const initial = {
    id: question.id,
    chapterId: question.chapterId,
    order: question.order,
    type: question.type as "mcq" | "multi_select" | "true_false",
    stem_ja: question.stem_ja,
    options: parseJsonArray<{ key: string; text_ja: string; text_en: string }>(
      question.options,
      []
    ),
    correctKeys: parseJsonArray<string>(question.correctKeys, []),
    explain_ja: question.explain_ja,
    explain_en: question.explain_en,
    difficulty: question.difficulty as "easy" | "medium" | "hard",
    tags: parseJsonArray<string>(question.tags, []),
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="eyebrow mb-1">Questions</p>
          <h1 className="font-display text-3xl text-pf-navy">Edit question</h1>
        </div>
        <DeleteQuestionButton id={question.id} large />
      </div>
      <QuestionForm initial={initial} chapters={chapterChoices} />
    </div>
  );
}
