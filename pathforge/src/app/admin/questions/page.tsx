import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminQuestionsList() {
  const questions = await prisma.question.findMany({
    orderBy: [{ chapterId: "asc" }, { order: "asc" }],
    include: { chapter: true },
  });
  return (
    <div>
      <p className="eyebrow mb-1">Questions</p>
      <h1 className="font-display text-3xl text-pf-navy">Trial 問題一覧</h1>
      <div className="mt-6 space-y-2">
        {questions.map((q) => (
          <div key={q.id} className="rounded-md border border-border p-3">
            <div className="font-mono text-[11px] uppercase tracking-widest text-pf-gold-muted">
              {q.chapter.title_ja} · Q{q.order + 1} · {q.type} · {q.difficulty}
            </div>
            <div className="mt-1 font-display text-pf-navy">{q.stem_ja}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
