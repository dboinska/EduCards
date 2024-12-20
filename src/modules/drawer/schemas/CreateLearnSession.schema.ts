import { z } from "zod"

export const createLearnSessionSchema = z.object({
  userId: z.string().uuid(),
  catalogId: z.string().uuid(),
  drawerId: z.string().uuid().optional(),
  sessionStart: z.date().optional(),
})

export type CreateLearnSessionSchema = z.infer<typeof createLearnSessionSchema>
