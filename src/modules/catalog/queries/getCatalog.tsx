import db from "db"
import { frequencySchema } from "@/utils/frequency"
import { catalogSchema } from "../schemas/Catalog.schema"

import type { Ctx } from "blitz"
import type { CatalogSchema } from "../schemas/Catalog.schema"

export default async function getCatalog(input: CatalogSchema, ctx: Ctx) {
  const data = catalogSchema.parse(input)
  console.log({ input })

  const catalog = await db.catalog.findUnique({
    include: {
      owner: true,
      cards: true,
      drawers: true,
      sharedCatalog: true,
    },
    where: {
      catalogId: data.id,
    },
  })

  if (!catalog) {
    return null
  }

  const { id, email, imageUrl, name } = catalog?.owner
  console.log({ catalog })

  const level = catalog.drawers[0]?.levelName
  if (level) {
    const drawers = frequencySchema[level]
      .map((fq) => {
        const findDrawer = catalog.drawers.find((drawer) => drawer.frequency === fq)

        return findDrawer ? { ...findDrawer } : undefined
      })
      .filter(Boolean)

    return { ...catalog, owner: { id, email, imageUrl, name }, drawers }
  }

  return { ...catalog, owner: { id, email, imageUrl, name } }
}
