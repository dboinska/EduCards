import { z } from "zod"

export const quizSchema = z.object({
  id: z.string().uuid(),
})

export type QuizSchema = z.infer<typeof quizSchema>
