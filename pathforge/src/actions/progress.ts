"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth/role";
import { revalidatePath } from "next/cache";

export async function ensureUserStats() {
  const userId = await getCurrentUserId();
  const s = await prisma.userStats.findUnique({ where: { userId } });
  if (s) return s;
  return prisma.userStats.create({ data: { userId } });
}

export async function markChapterAvailable(chapterId: string) {
  const userId = await getCurrentUserId();
  await prisma.chapterProgress.upsert({
    where: { userId_chapterId: { userId, chapterId } },
    create: { userId, chapterId, status: "available" },
    update: { status: "available" },
  });
  revalidatePath("/");
}
