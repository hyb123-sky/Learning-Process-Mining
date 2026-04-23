"use server";

import { prisma } from "@/lib/prisma";
import { CURRENT_USER_ID } from "@/lib/constants";
import { revalidatePath } from "next/cache";

export async function ensureUserStats() {
  const s = await prisma.userStats.findUnique({ where: { userId: CURRENT_USER_ID } });
  if (s) return s;
  return prisma.userStats.create({ data: { userId: CURRENT_USER_ID } });
}

export async function markChapterAvailable(chapterId: string) {
  await prisma.chapterProgress.upsert({
    where: { userId_chapterId: { userId: CURRENT_USER_ID, chapterId } },
    create: { userId: CURRENT_USER_ID, chapterId, status: "available" },
    update: { status: "available" },
  });
  revalidatePath("/");
}
