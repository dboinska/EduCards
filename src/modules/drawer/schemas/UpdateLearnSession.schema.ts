import { z } from "zod"

export const updateLearnSessionSchema = z.object({
  drawerId: z.string().uuid(),
  learnedCards: z.number(),
})

export type UpdateLearnSessionSchema = z.infer<typeof updateLearnSessionSchema>
