'use server';

import { prisma } from '@/lib/prisma';
import { requireAuthorOrAdmin } from '@/lib/auth/role';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const QuestInput = z.object({
  id: z.string().optional(),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Lowercase letters, numbers, and hyphens only'),
  title_ja: z.string().min(1),
  title_en: z.string().min(1),
  description_ja: z.string().min(1),
  description_en: z.string().min(1),
  trailId: z.string().min(1),
  order: z.coerce.number().int().nonnegative(),
  estimatedMinutes: z.coerce.number().int().positive(),
  crestName: z.string().min(1),
  crestIcon: z.string().min(1),
});

export type QuestFormState = {
  ok: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export async function upsertQuest(_prev: QuestFormState, formData: FormData): Promise<QuestFormState> {
  await requireAuthorOrAdmin();

  const raw = Object.fromEntries(formData.entries());
  const parsed = QuestInput.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      message: 'Validation failed',
    };
  }

  const { id, ...data } = parsed.data;

  try {
    if (id) {
      await prisma.quest.update({ where: { id }, data });
    } else {
      await prisma.quest.create({ data });
    }
  } catch (e) {
    const err = e as { code?: string; message?: string };
    if (err.code === 'P2002') {
      return { ok: false, message: 'Slug already exists', errors: { slug: ['Already in use'] } };
    }
    return { ok: false, message: err.message ?? 'Database error' };
  }

  revalidatePath('/admin/quests');
  revalidatePath('/admin');
  revalidatePath('/catalog');
  redirect('/admin/quests');
}

export async function deleteQuest(id: string): Promise<void> {
  await requireAuthorOrAdmin();
  await prisma.quest.delete({ where: { id } });
  revalidatePath('/admin/quests');
  revalidatePath('/admin');
  revalidatePath('/catalog');
}
