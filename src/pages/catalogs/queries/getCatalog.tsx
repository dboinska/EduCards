import { CommonInput } from "@/schemas/CommonInput"
import type { Ctx } from "blitz"
import { z } from "zod"
import db from "db"
import { catalogSchema, type CatalogSchema } from "@/schemas/Catalog.schema"

export default async function getCatalog(input: CatalogSchema, ctx: Ctx) {
  const data = catalogSchema.parse(input)

  const catalog = await db.catalog.findUnique({
    include: {
      owner: true,
    },
    where: {
      catalogId: data.id,
    },
  })

  if (!catalog) {
    return null
  }

  const { id, email, imageUrl, name } = catalog?.owner

  return { ...catalog, owner: { id, email, imageUrl, name } }
}
