import { z } from "zod"

export const createStudyPlanSchema = z.object({
  name: z.string().min(2),
  daysPerWeek: z.number().min(1).max(7),
  minutesPerDay: z.number().min(5).max(30),
  wordsPerDay: z.number().min(1).max(20),
  completionDate: z.date(),
  catalogId: z.string().uuid().optional(),
  color: z.string().default("black"),
})

export type CreateStudyPlanSchema = z.infer<typeof createStudyPlanSchema>
