import { z } from "zod"

export const todaysLearningSchema = z.object({
  totalTime: z.number(),
})

export type TodaysLearningSchema = z.infer<typeof todaysLearningSchema>
