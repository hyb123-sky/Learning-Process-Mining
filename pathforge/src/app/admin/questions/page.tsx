import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DeleteQuestionButton } from "@/components/admin/DeleteQuestionButton";

export const dynamic = "force-dynamic";

const TYPE_LABELS: Record<string, string> = {
  mcq: "MCQ",
  multi_select: "Multi",
  true_false: "T/F",
};

const DIFF_CLASSES: Record<string, string> = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
};

function FilterPill({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-1 rounded-full text-xs font-semibold border transition-colors",
        active
          ? "bg-pf-navy text-white border-pf-navy"
          : "bg-white text-pf-text-secondary border-border hover:border-pf-navy"
      )}
    >
      {label}
    </Link>
  );
}

export default async function AdminQuestionsList({
  searchParams,
}: {
  searchParams: { chapterId?: string };
}) {
  const chapters = await prisma.chapter.findMany({
    orderBy: [{ questId: "asc" }, { order: "asc" }],
    include: { quest: { select: { title_ja: true } } },
  });

  const chapterId = searchParams.chapterId;
  const questions = await prisma.question.findMany({
    where: chapterId ? { chapterId } : undefined,
    orderBy: [{ chapterId: "asc" }, { order: "asc" }],
    include: { chapter: { select: { title_ja: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <p className="eyebrow">Questions</p>
        <Link
          href="/admin/questions/new"
          className={cn(buttonVariants(), "inline-flex items-center gap-2")}
        >
          <Plus className="h-4 w-4" />
          New question
        </Link>
      </div>
      <h1 className="font-display text-3xl text-pf-navy">問題の管理</h1>

      {/* Chapter filter pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        <FilterPill label="All chapters" href="/admin/questions" active={!chapterId} />
        {chapters.map((c) => (
          <FilterPill
            key={c.id}
            label={`${c.quest.title_ja} · ${c.title_ja}`}
            href={`/admin/questions?chapterId=${c.id}`}
            active={chapterId === c.id}
          />
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-md border border-border">
        <table className="w-full text-sm">
          <thead className="bg-pf-ivory-warm">
            <tr className="text-left text-[11px] uppercase tracking-widest text-pf-gold-muted">
              <th className="px-3 py-2">Chapter</th>
              <th className="px-3 py-2">Order</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Difficulty</th>
              <th className="px-3 py-2">Stem</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id} className="border-t border-border">
                <td className="px-3 py-2 text-pf-text-secondary">{q.chapter.title_ja}</td>
                <td className="px-3 py-2 font-mono">{String(q.order + 1).padStart(2, "0")}</td>
                <td className="px-3 py-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-pf-navy/10 text-pf-navy">
                    {TYPE_LABELS[q.type] ?? q.type}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded text-[11px] font-semibold",
                      DIFF_CLASSES[q.difficulty] ?? ""
                    )}
                  >
                    {q.difficulty}
                  </span>
                </td>
                <td className="px-3 py-2 max-w-sm truncate font-display text-pf-navy">
                  {q.stem_ja}
                </td>
                <td className="px-3 py-2 text-right">
                  <div className="inline-flex items-center gap-2">
                    <Link
                      className="text-[11px] font-semibold uppercase tracking-widest text-pf-gold-muted hover:text-pf-navy"
                      href={`/admin/questions/${q.id}/edit`}
                    >
                      Edit →
                    </Link>
                    <DeleteQuestionButton id={q.id} />
                  </div>
                </td>
              </tr>
            ))}
            {questions.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-3 py-8 text-center text-pf-text-secondary text-sm"
                >
                  No questions yet.{" "}
                  <Link href="/admin/questions/new" className="underline">
                    Add one.
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
