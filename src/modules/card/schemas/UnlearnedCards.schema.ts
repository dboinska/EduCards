import { z } from "zod"

export const unlearnedCardsSchema = z.object({
  unlearnedCardIds: z.array(z.string().uuid()),
  drawerId: z.string().uuid(),
  catalogId: z.string().uuid(),
})

export type UnlearnedCardsSchema = z.infer<typeof unlearnedCardsSchema>
