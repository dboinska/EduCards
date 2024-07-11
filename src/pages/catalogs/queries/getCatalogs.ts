import { CommonInput } from "@/schemas/CommonInput"
import { Ctx } from "blitz"
import * as z from "zod"
import db from "db"

const GetCatalogs = z
  .object({
    catalog_catalog_id: z.string().optional(),
    author_catalog_id: z.string().optional(),
  })
  .merge(CommonInput)

export default async function getCatalogs(input: z.infer<typeof GetCatalogs>, ctx: Ctx) {
  // Valcatalog_idate the input
  //const data = GetCatalogs.parse(input)

  // Require user to be logged in
  ctx.session.$authorize()

  const catalogType = {
    own: { ownerId: ctx.session.userId },
    public: { type: "public" },
    shared: { isShared: true },
  }

  const catalogs = await db.catalog.findMany({
    include: {
      owner: true,
    },
    where: {
      ...(input.filter && input.filter in catalogType && catalogType[input.filter]),
      ...(input.query && { name: { contains: input.query } }),
    },
  })

  const results = catalogs.map((catalog) => {
    const { id, email, imageUrl, name } = catalog.owner
    return { ...catalog, owner: { id, email, imageUrl, name } }
  })

  // Can do any processing, fetching from other APIs, etc

  console.log("==========================================================")
  console.log({ input })
  console.log("==========================================================")

  return results
}
