import type { Ctx } from "blitz"
import db from "db"
import { catalogSchema, type CatalogSchema } from "@/schemas/Catalog.schema"

export default async function getDrawer(input: CatalogSchema, ctx: Ctx) {
  const data = catalogSchema.parse(input)
  console.log({ input })

  const catalog = await db.drawer.findUnique({
    include: {
      catalog: true,
    },
    where: {
      drawerId: data.id,
    },
  })

  if (!catalog) {
    return null
  }

  console.log({ catalog })

  return catalog
}
