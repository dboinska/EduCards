import { catalogSchema, CatalogSchema } from "@/schemas/Catalog.schema"
import { Ctx } from "blitz"
import db from "db"

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
