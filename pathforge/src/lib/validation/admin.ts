import { z } from "zod";

export const ChapterUpsertInput = z.object({
  id: z.string().optional(),
  slug: z.string().min(1),
  title_ja: z.string().min(1),
  title_en: z.string(),
  questId: z.string().min(1),
  order: z.number().int(),
  contentMdx: z.string(),
  estimatedMinutes: z.number().int().positive(),
  insightReward: z.number().int().nonnegative(),
});
export type ChapterUpsertInput = z.infer<typeof ChapterUpsertInput>;

export const QuestionUpsertInput = z.object({
  id: z.string().optional(),
  chapterId: z.string().min(1),
  order: z.number().int(),
  type: z.enum(["mcq", "multi_select", "true_false"]),
  stem_ja: z.string().min(1),
  options: z.string(),      // JSON string
  correctKeys: z.string(),  // JSON string
  explain_ja: z.string(),
  explain_en: z.string().default(""),
  difficulty: z.enum(["easy", "medium", "hard"]).default("medium"),
  tags: z.string().default("[]"),
});
export type QuestionUpsertInput = z.infer<typeof QuestionUpsertInput>;

export const QuestUpsertInput = z.object({
  id: z.string().optional(),
  slug: z.string().min(1),
  title_ja: z.string().min(1),
  title_en: z.string(),
  description_ja: z.string(),
  description_en: z.string(),
  trailId: z.string().min(1),
  order: z.number().int(),
  estimatedMinutes: z.number().int().positive(),
  crestName: z.string(),
  crestIcon: z.string(),
});
export type QuestUpsertInput = z.infer<typeof QuestUpsertInput>;
