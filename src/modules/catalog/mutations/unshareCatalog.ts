import db from "db"
import { unshareCatalogSchema } from "../schemas/UnshareCatalog.schema"

import type { Ctx } from "blitz"
import type { UnshareCatalogSchema } from "../schemas/UnshareCatalog.schema"

export default async function shareCatalog(input: UnshareCatalogSchema, ctx: Ctx) {
  ctx.session.$authorize()
  const data = unshareCatalogSchema.parse(input)
  const result = db.sharedCatalog.delete({
    where: {
      id: data.id,
    },
  })
  return result
}
