"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth/role";
import { SubmitTrialInput } from "@/lib/validation/trial";
import { gradeAnswers, insightBonus } from "@/lib/gamification";
import { revalidatePath } from "next/cache";

export async function submitTrial(input: unknown) {
  const parsed = SubmitTrialInput.parse(input);
  const userId = await getCurrentUserId();

  const chapter = await prisma.chapter.findUnique({
    where: { id: parsed.chapterId },
    include: { quest: true, questions: { orderBy: { order: "asc" } } },
  });
  if (!chapter) throw new Error("chapter not found");
  const { questions } = chapter;

  const { results, correctCount, score, passed } = gradeAnswers(
    questions.map((q) => ({ id: q.id, type: q.type, correctKeys: q.correctKeys })),
    parsed.answers
  );

  const existing = await prisma.chapterProgress.findUnique({
    where: { userId_chapterId: { userId, chapterId: parsed.chapterId } },
  });

  const nextBest = Math.max(existing?.bestScore ?? 0, score);
  const firstCompletion = !existing?.completedAt && passed;

  await prisma.chapterProgress.upsert({
    where: { userId_chapterId: { userId, chapterId: parsed.chapterId } },
    create: {
      userId,
      chapterId: parsed.chapterId,
      status: passed ? "completed" : "in_progress",
      bestScore: score,
      attempts: 1,
      completedAt: passed ? new Date() : null,
    },
    update: {
      status: passed ? "completed" : existing?.status === "completed" ? "completed" : "in_progress",
      bestScore: nextBest,
      attempts: { increment: 1 },
      completedAt: passed ? (existing?.completedAt ?? new Date()) : existing?.completedAt ?? null,
    },
  });

  // Unlock next chapter when passed
  if (passed) {
    const next = await prisma.chapter.findFirst({
      where: { questId: chapter.questId, order: chapter.order + 1 },
    });
    if (next) {
      const nextProg = await prisma.chapterProgress.findUnique({
        where: { userId_chapterId: { userId, chapterId: next.id } },
      });
      if (!nextProg) {
        await prisma.chapterProgress.create({
          data: { userId, chapterId: next.id, status: "available" },
        });
      } else if (nextProg.status === "locked") {
        await prisma.chapterProgress.update({
          where: { id: nextProg.id },
          data: { status: "available" },
        });
      }
    }
  }

  // Award insight on first successful completion
  let insightAwarded = 0;
  if (firstCompletion) {
    const bonus = insightBonus(score);
    insightAwarded = Math.round(chapter.insightReward * (1 + bonus));
    const today = new Date().toISOString().slice(0, 10);
    await prisma.userStats.upsert({
      where: { userId },
      create: {
        userId,
        totalInsight: insightAwarded,
        lastStudyDate: today,
        currentStreak: 1,
        longestStreak: 1,
      },
      update: {
        totalInsight: { increment: insightAwarded },
        lastStudyDate: today,
      },
    });
  }

  revalidatePath("/");
  revalidatePath(`/quest/${chapter.quest.slug}`);
  revalidatePath(`/quest/${chapter.quest.slug}/${chapter.slug}`);
  revalidatePath(`/quest/${chapter.quest.slug}/${chapter.slug}/trial`);
  revalidatePath("/profile");

  const detailed = questions.map((q) => {
    const r = results.find((x) => x.questionId === q.id);
    const given = parsed.answers.find((a) => a.questionId === q.id)?.selectedKeys ?? [];
    return {
      questionId: q.id,
      correct: r?.correct ?? false,
      correctKeys: JSON.parse(q.correctKeys) as string[],
      given,
      explain_ja: q.explain_ja,
      stem_ja: q.stem_ja,
    };
  });

  return {
    score,
    correctCount,
    total: questions.length,
    passed,
    firstCompletion,
    insightAwarded,
    results: detailed,
  };
}
