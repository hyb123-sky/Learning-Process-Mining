import { RANKS, type Rank } from "./constants";

export function calculateRank(totalInsight: number): Rank {
  return [...RANKS].reverse().find((r) => totalInsight >= r.minInsight) ?? RANKS[0];
}

export function nextRank(totalInsight: number): Rank | null {
  return RANKS.find((r) => totalInsight < r.minInsight) ?? null;
}

export function rankProgressPct(totalInsight: number): number {
  const cur = calculateRank(totalInsight);
  const nxt = nextRank(totalInsight);
  if (!nxt) return 100;
  const span = nxt.minInsight - cur.minInsight;
  const into = totalInsight - cur.minInsight;
  return Math.max(0, Math.min(100, Math.round((into / span) * 100)));
}

export type QuestionRow = {
  id: string;
  type: string;
  correctKeys: string; // JSON
};

export function gradeAnswers(
  questions: QuestionRow[],
  answers: { questionId: string; selectedKeys: string[] }[]
) {
  const results = questions.map((q) => {
    const a = answers.find((x) => x.questionId === q.id);
    const correctKeys = JSON.parse(q.correctKeys) as string[];
    const selected = [...(a?.selectedKeys ?? [])].sort();
    const correct = [...correctKeys].sort();
    const isCorrect =
      selected.length === correct.length && selected.every((k, i) => k === correct[i]);
    return { questionId: q.id, correct: isCorrect };
  });
  const correctCount = results.filter((r) => r.correct).length;
  const score = questions.length ? Math.round((correctCount / questions.length) * 100) : 0;
  const passed = score >= 70;
  return { results, correctCount, score, passed };
}

export function insightBonus(score: number) {
  if (score === 100) return 0.5;
  if (score >= 90) return 0.25;
  return 0;
}
