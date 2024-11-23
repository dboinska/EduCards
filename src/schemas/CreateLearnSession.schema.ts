import { z } from "zod"

export const createLearnSessionSchema = z.object({
  userId: z.string().uuid(),
  catalogId: z.string().uuid(),
  drawerId: z.string().uuid(),
})

export type CreateLearnSessionSchema = z.infer<typeof createLearnSessionSchema>
