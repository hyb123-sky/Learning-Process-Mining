import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TrialEngine } from "@/components/trial/TrialEngine";

export const dynamic = "force-dynamic";

export default async function TrialPage({
  params,
}: {
  params: { slug: string; chapter: string };
}) {
  const chapter = await prisma.chapter.findUnique({
    where: { slug: params.chapter },
    include: { questions: { orderBy: { order: "asc" } }, quest: true },
  });
  if (!chapter) return notFound();

  const questions = chapter.questions.map((q) => ({
    id: q.id,
    order: q.order,
    type: q.type as "mcq" | "multi_select" | "true_false",
    stem_ja: q.stem_ja,
    options: JSON.parse(q.options) as { key: string; text_ja: string }[],
    difficulty: q.difficulty as "easy" | "medium" | "hard",
  }));

  return (
    <TrialEngine
      chapterId={chapter.id}
      chapterTitle={chapter.title_ja}
      questSlug={chapter.quest.slug}
      questions={questions}
    />
  );
}
