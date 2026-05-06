'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const OptionSchema = z.object({
  key: z.string().min(1),
  text_ja: z.string().min(1, 'Option text required'),
  text_en: z.string().default(''),
});

const QuestionInput = z
  .object({
    id: z.string().optional(),
    chapterId: z.string().min(1, 'Chapter is required'),
    order: z.coerce.number().int().nonnegative(),
    type: z.enum(['mcq', 'multi_select', 'true_false']),
    stem_ja: z.string().min(1, 'Question stem is required'),
    options: z.array(OptionSchema).min(2, 'At least 2 options required'),
    correctKeys: z.array(z.string().min(1)).min(1, 'At least 1 correct answer required'),
    explain_ja: z.string().min(1, 'Explanation is required'),
    explain_en: z.string().default(''),
    difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
    tags: z.array(z.string()).default([]),
  })
  .superRefine((val, ctx) => {
    const optionKeys = new Set(val.options.map((o) => o.key));
    if (val.type === 'true_false') {
      if (!optionKeys.has('T') || !optionKeys.has('F')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'true_false must have T and F options',
          path: ['options'],
        });
      }
    }
    if (val.type === 'mcq' && val.correctKeys.length !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'MCQ must have exactly 1 correct answer',
        path: ['correctKeys'],
      });
    }
    for (const k of val.correctKeys) {
      if (!optionKeys.has(k)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `"${k}" is not a valid option key`,
          path: ['correctKeys'],
        });
      }
    }
  });

export type QuestionFormState = {
  ok: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

function parseJson<T>(value: FormDataEntryValue | null, fallback: T): T {
  try {
    return JSON.parse(value as string) as T;
  } catch {
    return fallback;
  }
}

export async function upsertQuestion(
  _prev: QuestionFormState,
  formData: FormData
): Promise<QuestionFormState> {
  const raw = {
    id: formData.get('id') || undefined,
    chapterId: formData.get('chapterId'),
    order: formData.get('order'),
    type: formData.get('type'),
    stem_ja: formData.get('stem_ja'),
    options: parseJson(formData.get('options'), []),
    correctKeys: parseJson(formData.get('correctKeys'), []),
    explain_ja: formData.get('explain_ja'),
    explain_en: formData.get('explain_en') || '',
    difficulty: formData.get('difficulty'),
    tags: parseJson(formData.get('tags') || '[]', []),
  };

  const parsed = QuestionInput.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      message: 'Validation failed',
    };
  }

  const { id, options, correctKeys, tags, ...rest } = parsed.data;
  const dbData = {
    ...rest,
    options: JSON.stringify(options),
    correctKeys: JSON.stringify(correctKeys),
    tags: JSON.stringify(tags),
  };

  const isCreate = !id;
  let rowId = '';

  try {
    if (id) {
      const row = await prisma.question.update({ where: { id }, data: dbData });
      rowId = row.id;
    } else {
      const row = await prisma.question.create({ data: dbData });
      rowId = row.id;
    }
  } catch (e) {
    const err = e as { code?: string; message?: string };
    return { ok: false, message: err.message ?? 'Database error' };
  }

  revalidatePath('/admin/questions');
  revalidatePath('/admin');

  if (isCreate) {
    redirect(`/admin/questions/${rowId}/edit`);
  }
  return { ok: true };
}

export async function deleteQuestion(id: string): Promise<void> {
  await prisma.question.delete({ where: { id } });
  revalidatePath('/admin/questions');
  revalidatePath('/admin');
}
