import { CommonInput } from "@/schemas/CommonInput"
import { Ctx } from "blitz"
import * as z from "zod"
import db from "db"

export default async function getCatalogs(input: z.infer<typeof CommonInput>, ctx: Ctx) {
  // Valcatalog_idate the input
  //const data = CommonInput.parse(input)

  // Require user to be logged in
  ctx.session.$authorize()

  const mapSortToField = {
    asc: "createdAt",
    desc: "createdAt",
    alfa_asc: "name",
    alfa_desc: "name",
  } as const

  const { sort } = input
  const orderField = sort ? mapSortToField[sort] : mapSortToField.asc
  const order = sort?.startsWith("alfa") ? sort.split("_")[1] : sort

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
    ...(sort && { orderBy: { [orderField]: order } }),
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
