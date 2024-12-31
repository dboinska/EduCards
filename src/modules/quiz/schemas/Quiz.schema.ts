import { z } from "zod"

export const quizSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid(),
  catalogId: z.string(),
})

export type QuizSchema = z.infer<typeof quizSchema>
