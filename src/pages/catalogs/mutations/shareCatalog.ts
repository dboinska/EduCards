import type { Ctx } from "blitz"
import { shareCatalogSchema, ShareCatalogSchema } from "@/schemas/ShareCatalog.schema"
import db from "db"

export default async function shareCatalog(input: ShareCatalogSchema, ctx: Ctx) {
  ctx.session.$authorize()

  console.log({ userID: input.userId })

  const userAccess = await db.sharedCatalog.findFirst({
    where: {
      catalogId: input.catalogId,
      userId: input.userId,
    },
  })

  if (userAccess) {
    console.log("Catalog is already shared with this user.")
    return { message: "Catalog is already shared with this user." }
  }

  const newSharedCatalog = await db.sharedCatalog.create({
    data: {
      catalogId: input.catalogId,
      userId: input.userId,
    },
  })

  console.log({ input, newSharedCatalog })
  return newSharedCatalog
}
