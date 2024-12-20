import db from "db"
import { catalogSchema } from "../schemas/Catalog.schema"

import type { CatalogSchema } from "../schemas/Catalog.schema"
import type { Ctx } from "blitz"

export default async function getCatalogViewers(input: CatalogSchema, ctx: Ctx) {
  const data = catalogSchema.parse(input)
  const users = await db.sharedCatalog.findMany({
    where: {
      catalogId: data.id,
    },
    select: {
      userId: true,
    },
  })

  return users.map((user) => user.userId)
}
