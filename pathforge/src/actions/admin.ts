"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  ChapterUpsertInput,
  QuestionUpsertInput,
  QuestUpsertInput,
} from "@/lib/validation/admin";

export async function upsertQuest(input: unknown) {
  const data = QuestUpsertInput.parse(input);
  const row = data.id
    ? await prisma.quest.update({ where: { id: data.id }, data })
    : await prisma.quest.create({ data });
  revalidatePath("/admin/quests");
  revalidatePath(`/quest/${row.slug}`);
  return row;
}

export async function upsertChapter(input: unknown) {
  const data = ChapterUpsertInput.parse(input);
  const row = data.id
    ? await prisma.chapter.update({ where: { id: data.id }, data })
    : await prisma.chapter.create({ data });
  revalidatePath("/admin/chapters");
  const q = await prisma.quest.findUnique({ where: { id: row.questId } });
  if (q) {
    revalidatePath(`/quest/${q.slug}`);
    revalidatePath(`/quest/${q.slug}/${row.slug}`);
  }
  return row;
}

export async function upsertQuestion(input: unknown) {
  const data = QuestionUpsertInput.parse(input);
  const row = data.id
    ? await prisma.question.update({ where: { id: data.id }, data })
    : await prisma.question.create({ data });
  revalidatePath("/admin/questions");
  return row;
}

export async function deleteChapter(id: string) {
  await prisma.chapter.delete({ where: { id } });
  revalidatePath("/admin/chapters");
  revalidatePath("/admin");
}

export async function deleteQuestion(id: string) {
  await prisma.question.delete({ where: { id } });
  revalidatePath("/admin/questions");
  revalidatePath("/admin");
}
