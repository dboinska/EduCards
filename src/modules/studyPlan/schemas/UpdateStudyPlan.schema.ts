import { z } from "zod"

export const updateStudyPlanSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  daysPerWeek: z.number().min(1).max(7, "Days per week must be between 1 and 7"),
  minutesPerDay: z.number().min(5).max(30, "Daily time must be between 5 and 30"),
  wordsPerDay: z.number().min(1).max(20),
  completionDate: z.date(),
  catalogId: z.string().uuid(),
  color: z.string().default("black"),
})

export type UpdateStudyPlanSchema = z.infer<typeof updateStudyPlanSchema>
