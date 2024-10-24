import { z } from "zod"

import { cardSchema } from "./Card.schema"

export const createCatalogBaseSchema = z.object({
  name: z.string().min(2),
  description: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  amountOfDrawers: z.string().default("3"),
})

export type CreateCatalogBaseSchema = z.infer<typeof createCatalogBaseSchema>

export const newCatalogCardsSchema = z.object({
  cards: z.array(
    cardSchema.omit({ catalogId: true, cardId: true }).merge(z.object({ key: z.string() }))
  ),
})

export const editCatalogCardsSchema = z.object({
  cards: z.array(
    cardSchema.omit({ catalogId: true, cardId: true }).merge(z.object({ key: z.string() }))
  ),
})

export type NewCatalogCardsSchema = z.infer<typeof newCatalogCardsSchema>

export const newCatalogShareSettingsSchema = z.object({
  isShared: z.boolean().default(false),
  sharedWith: z.array(z.string().uuid()),
})

export type NewCatalogShareSettingsSchema = z.infer<typeof newCatalogShareSettingsSchema>

export const createCatalogSchema = createCatalogBaseSchema
  .merge(newCatalogCardsSchema)
  .merge(newCatalogShareSettingsSchema)

export type CreateCatalogSchema = z.infer<typeof createCatalogSchema>
