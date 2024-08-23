import type { Ctx } from "blitz"
import db from "db"
import { catalogSchema, type CatalogSchema } from "@/schemas/Catalog.schema"

export default async function getCatalog(input: CatalogSchema, ctx: Ctx) {
  const data = catalogSchema.parse(input)
  console.log({ input })

  const catalog = await db.catalog.findUnique({
    include: {
      owner: true,
      cards: true,
    },
    where: {
      catalogId: data.id,
      // cards: {
      //   is: {
      //     name: "bob",
      //   },
      // },
    },
  })

  if (!catalog) {
    return null
  }

  const { id, email, imageUrl, name } = catalog?.owner
  console.log({ catalog })

  return { ...catalog, owner: { id, email, imageUrl, name } }
}
