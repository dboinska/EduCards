import type { Ctx } from "blitz"
import { unshareCatalogSchema, UnshareCatalogSchema } from "@/schemas/UnshareCatalog.schema"
import db from "db"

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
