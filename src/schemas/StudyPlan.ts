import { z } from "zod"

export const studyPlanSchema = z.object({
  id: z.string().uuid(),
})

export type StudyPlanSchema = z.infer<typeof studyPlanSchema>
