import { z } from "zod"

const WeeklyLearningSchema = z.object({
  weeklyTimes: z.array(z.number()),
})

export type WeeklyLearningResult = z.infer<typeof WeeklyLearningSchema>
