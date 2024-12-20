import { z } from "zod"

export const studyPlanIdSchema = z.object({
  id: z.string().uuid(),
})

export type StudyPlanIdSchema = z.infer<typeof studyPlanIdSchema>
