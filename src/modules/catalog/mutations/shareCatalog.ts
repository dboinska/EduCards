import db from "db"
import { shareCatalogSchema } from "../schemas/ShareCatalog.schema"

import type { Ctx } from "blitz"
import type { ShareCatalogSchema } from "../schemas/ShareCatalog.schema"

export default async function shareCatalog(input: ShareCatalogSchema, ctx: Ctx) {
  ctx.session.$authorize()

  const data = shareCatalogSchema.parse(input)

  console.log({ userID: data.userId })

  const userAccess = await db.sharedCatalog.findFirst({
    where: {
      catalogId: data.catalogId,
      userId: data.userId,
    },
  })

  if (userAccess) {
    console.log("Catalog is already shared with this user.")
    return { message: "Catalog is already shared with this user." }
  }

  const newSharedCatalog = await db.sharedCatalog.create({
    data: {
      catalogId: data.catalogId,
      userId: data.userId,
    },
  })

  console.log({ input, newSharedCatalog })
  return newSharedCatalog
}
