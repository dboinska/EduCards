import type { Ctx } from "blitz"
import { CreateCatalogSchema, createCatalogSchema } from "@/schemas/CreateCatalog.schema"

import db from "db"

export default async function createCatalog(input: CreateCatalogSchema, ctx: Ctx) {
  ctx.session.$authorize()
  const data = createCatalogSchema.parse(input)
  const { cards, amountOfDrawers, sharedWith, ...catalog } = data

  const catalogData = {
    ...catalog,
    numberOfCards: cards.length || 0,
    type: catalog.isShared ? "public" : "private",
    ownerId: ctx.session.userId,
  }

  const result = await db.catalog.create({
    data: catalogData,
  })

  if (!result.catalogId) {
    throw new Error("Failed to create catalog.")
  }

  return result
}
