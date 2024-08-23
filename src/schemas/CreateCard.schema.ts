import { z } from "zod"
import { cardSchema } from "./Card.schema"

export const createCardSchema = z.object({
  cards: z.array(cardSchema.merge(z.object({ key: z.string() }))),
})

export type CreateCardSchema = z.infer<typeof createCardSchema>
