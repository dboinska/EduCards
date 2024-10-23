import { z } from "zod"

export const cardSchema = z.object({
  cardId: z.string().uuid(),
  term: z.string().min(1),
  description: z.string().optional(),
  termTranslated: z.string().min(1),
  descriptionTranslated: z.string().optional(),
  imageUrl: z.string().nullable().optional(),
  catalogId: z.string().uuid(),
})

export type CardSchema = z.infer<typeof cardSchema>
