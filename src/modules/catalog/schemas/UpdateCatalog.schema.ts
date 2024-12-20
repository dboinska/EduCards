import { z } from "zod"

import { cardSchema } from "@/modules/card/schemas/Card.schema"
import { createCatalogSchema } from "./CreateCatalog.schema"

export const updateCatalogSchema = createCatalogSchema.merge(
  z.object({
    catalogId: z.string().uuid(),
    cards: z.array(
      cardSchema.omit({ cardId: true, ownerId: true, catalogId: true }).merge(
        z.object({
          cardId: z.string().optional(),
        })
      )
    ),
  })
)

export type UpdateCatalogSchema = z.infer<typeof updateCatalogSchema>
