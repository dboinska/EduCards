import { z } from "zod"

import { updateStudyPlanSchema } from "../schemas/UpdateStudyPlan.schema"

export const updateStudyPlanWithoutIdSchema = updateStudyPlanSchema.omit({ id: true })

export type UpdateStudyPlanWithoutIdSchema = z.infer<typeof updateStudyPlanWithoutIdSchema>
