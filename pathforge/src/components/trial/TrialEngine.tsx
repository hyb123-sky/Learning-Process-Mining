"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { submitTrial } from "@/actions/trial";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Check, X, ArrowLeft } from "lucide-react";
import { CrestBadge } from "@/components/shared/CrestBadge";

type QType = "mcq" | "multi_select" | "true_false";
export type Question = {
  id: string;
  order: number;
  type: QType;
  stem_ja: string;
  options: { key: string; text_ja: string }[];
  difficulty: "easy" | "medium" | "hard";
};

export type ResultItem = {
  questionId: string;
  correct: boolean;
  correctKeys: string[];
  given: string[];
  explain_ja: string;
  stem_ja: string;
};

export function TrialEngine({
  chapterId,
  chapterTitle,
  questSlug,
  chapterSlug,
  questions,
}: {
  chapterId: string;
  chapterTitle: string;
  questSlug: string;
  chapterSlug: string;
  questions: Question[];
}) {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [locked, setLocked] = useState<Record<string, boolean>>({});
  const [results, setResults] = useState<null | {
    score: number;
    correctCount: number;
    total: number;
    passed: boolean;
    firstCompletion: boolean;
    insightAwarded: number;
    items: ResultItem[];
  }>(null);
  const [pending, startTransition] = useTransition();
  const [showCrest, setShowCrest] = useState(false);

  const q = questions[idx];
  const ans = answers[q?.id] ?? [];
  const isLocked = locked[q?.id];

  const canSubmitQ = ans.length > 0;

  const toggle = (key: string) => {
    if (isLocked) return;
    setAnswers((prev) => {
      const current = prev[q.id] ?? [];
      if (q.type === "multi_select") {
        return {
          ...prev,
          [q.id]: current.includes(key) ? current.filter((k) => k !== key) : [...current, key],
        };
      }
      return { ...prev, [q.id]: [key] };
    });
  };

  const lockQ = () => setLocked((p) => ({ ...p, [q.id]: true }));
  const next = () => {
    if (idx === questions.length - 1) {
      startTransition(async () => {
        const payload = {
          chapterId,
          answers: questions.map((qq) => ({
            questionId: qq.id,
            selectedKeys: answers[qq.id] ?? [],
          })),
        };
        const out = await submitTrial(payload);
        setResults({
          score: out.score,
          correctCount: out.correctCount,
          total: out.total,
          passed: out.passed,
          firstCompletion: out.firstCompletion,
          insightAwarded: out.insightAwarded,
          items: out.results,
        });
        if (out.firstCompletion && out.passed) {
          setShowCrest(true);
          setTimeout(() => setShowCrest(false), 2800);
        }
      });
    } else {
      setIdx(idx + 1);
    }
  };

  if (results) {
    const { score, correctCount, total, passed, insightAwarded, items } = results;
    const verdict =
      score === 100 ? "満点" : score >= 90 ? "高得点合格" : passed ? "合格" : "不合格";
    const verdictColor =
      score >= 90 ? "text-pf-success" : passed ? "text-pf-navy" : "text-pf-error";
    return (
      <div className="container max-w-3xl py-10 pb-20">
        {showCrest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-pf-navy/70 backdrop-blur-sm">
            <div className="text-center">
              <div className="animate-crest-reveal animate-gold-pulse inline-block rounded-full bg-pf-ivory p-6">
                <CrestBadge variant="shield" size={140} stroke={1.3} />
              </div>
              <div className="mt-6 font-display text-3xl text-pf-ivory">Shield of Insight</div>
              <p className="mt-2 font-display italic text-pf-ivory-warm">A crest is forged.</p>
            </div>
          </div>
        )}

        <p className="eyebrow">{chapterTitle} — Trial 結果</p>
        <div className="mt-2 flex items-baseline gap-3">
          <span className="font-display text-[5.5rem] font-medium leading-none text-pf-navy tabular-nums">
            {correctCount}
          </span>
          <span className="font-mono text-sm text-pf-text-muted">/ {total}</span>
          <span className="ml-auto rounded-full border border-pf-navy/60 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-pf-navy">
            {score}%
          </span>
        </div>
        <div className={`mt-1 font-display text-xl italic ${verdictColor}`}>{verdict}</div>
        {insightAwarded > 0 && (
          <p className="mt-2 inline-block pf-badge-gold">+{insightAwarded} Insight 獲得</p>
        )}

        <div className="my-6 h-px bg-border" />

        <p className="eyebrow mb-2">Review</p>
        <div className="space-y-3">
          {items.map((r, i) => (
            <div
              key={r.questionId}
              className={`rounded-md border p-4 ${
                r.correct ? "border-pf-success/40 bg-pf-success/5" : "border-pf-error/40 bg-pf-error/5"
              }`}
            >
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest">
                {r.correct ? (
                  <span className="flex items-center gap-1 text-pf-success">
                    <Check className="h-3.5 w-3.5" /> Q{i + 1} 正解
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-pf-error">
                    <X className="h-3.5 w-3.5" /> Q{i + 1} 不正解
                  </span>
                )}
              </div>
              <div className="mt-1 font-display text-base text-pf-navy">{r.stem_ja}</div>
              <div className="mt-1.5 text-xs text-pf-text-secondary">
                あなたの回答: <code className="font-mono">{r.given.join(", ") || "未回答"}</code>
                {" · "}正解: <code className="font-mono">{r.correctKeys.join(", ")}</code>
              </div>
              {!r.correct && (
                <div className="mt-2 border-l-2 border-pf-navy/60 pl-3 text-sm leading-relaxed text-pf-text-primary">
                  {r.explain_ja}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setIdx(0);
              setAnswers({});
              setLocked({});
              setResults(null);
              router.refresh();
            }}
          >
            <ArrowLeft className="h-4 w-4" /> もう一度
          </Button>
          <Button variant="gold" onClick={() => router.push(`/quest/${questSlug}`)}>
            Quest に戻る <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  const isCorrectKey = (_key: string) => false; // placeholder (client doesn't know correct before submit)

  const progressPct = ((idx + (isLocked ? 1 : 0)) / questions.length) * 100;
  const diffLabel = { easy: "易", medium: "中", hard: "難" }[q.difficulty];

  return (
    <div className="container max-w-3xl py-10 pb-28">
      <p className="eyebrow mb-1">{chapterTitle} — Trial</p>
      <div className="flex items-center gap-3">
        <Progress value={progressPct} className="flex-1" />
        <span className="font-mono text-[11px] tabular-nums text-pf-text-muted">
          {idx + 1} / {questions.length}
        </span>
      </div>

      <div className="mt-6 font-mono text-[11px] uppercase tracking-widest text-pf-gold-muted">
        {q.type === "multi_select"
          ? "複数選択 — 該当すべて"
          : q.type === "true_false"
          ? "正誤判定"
          : "単一選択"}{" "}
        · 難度 {diffLabel}
      </div>
      <h2 className="mt-2 font-display text-[1.6rem] font-medium leading-snug text-pf-navy">
        {q.stem_ja}
      </h2>

      <div className="mt-6 space-y-2">
        {q.options.map((opt) => {
          const selected = ans.includes(opt.key);
          // After lock, show correctness — but client doesn't know the correct keys yet.
          // We show neutral state; full review appears in results screen.
          const base =
            "flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left transition " +
            (selected
              ? "border-pf-navy bg-pf-navy/5"
              : "border-border bg-card hover:bg-pf-ivory-warm");
          const boxCls =
            "flex h-5 w-5 flex-shrink-0 items-center justify-center border " +
            (q.type === "multi_select" ? "rounded-sm" : "rounded-full") +
            " " +
            (selected ? "border-pf-navy bg-pf-navy" : "border-pf-navy/60");
          return (
            <button
              key={opt.key}
              disabled={isLocked}
              onClick={() => toggle(opt.key)}
              className={base + (isLocked ? " cursor-default opacity-75" : "")}
            >
              <span className={boxCls}>
                {selected && <Check className="h-3 w-3 text-pf-ivory" />}
              </span>
              <span className="font-mono text-xs font-bold text-pf-gold-muted">{opt.key}.</span>
              <span className="flex-1 text-sm leading-relaxed text-pf-text-primary">
                {opt.text_ja}
              </span>
            </button>
          );
        })}
      </div>

      {isLocked && (
        <div className="mt-6 rounded-md border border-pf-navy/20 bg-pf-ivory-warm p-4 text-sm leading-relaxed text-pf-text-primary">
          <div className="eyebrow mb-1">回答済み</div>
          正誤判定と解説は最後にまとめて表示されます。「次へ」で進んでください。
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-pf-ivory/90 backdrop-blur">
        <div className="container flex max-w-3xl items-center justify-between py-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-pf-text-muted">
            Q{idx + 1} / {questions.length}
          </span>
          {!isLocked ? (
            <Button variant="default" disabled={!canSubmitQ} onClick={lockQ}>
              答えを確定
            </Button>
          ) : (
            <Button variant="gold" disabled={pending} onClick={next}>
              {pending ? "採点中…" : idx === questions.length - 1 ? "結果を見る" : "次へ"}{" "}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
