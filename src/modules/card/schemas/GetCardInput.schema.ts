import { z } from "zod"

export const getCardInput = z.object({
  cardId: z.string().uuid(),
})

export type GetCardInput = z.infer<typeof getCardInput>
