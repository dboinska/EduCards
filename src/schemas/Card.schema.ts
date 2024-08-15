import { z } from "zod"

export const cardSchema = z.object({
  term: z.string().min(1),
  description: z.string(),
  termTranslated: z.string().min(1),
  descriptionTranslated: z.string(),
  imageURL: z.string().optional(),
  catalogId: z.string().uuid(),
})

export type CardSchema = z.infer<typeof cardSchema>
