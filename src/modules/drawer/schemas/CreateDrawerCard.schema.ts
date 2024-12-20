import { z } from "zod"

export const createDrawerCardSchema = z.object({
  drawerId: z.string().uuid(),
  cardId: z.string().uuid(),
})

export type CreateDrawerCardSchema = z.infer<typeof createDrawerCardSchema>
