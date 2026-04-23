import { z } from "zod";

export const SubmitTrialInput = z.object({
  chapterId: z.string().min(1),
  answers: z.array(
    z.object({
      questionId: z.string().min(1),
      selectedKeys: z.array(z.string()),
    })
  ),
});
export type SubmitTrialInput = z.infer<typeof SubmitTrialInput>;
