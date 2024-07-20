import { CommonInput } from "@/schemas/CommonInput"
import type { Ctx } from "blitz"
import * as z from "zod"
import db from "db"

export default async function getCatalogs(input: z.infer<typeof CommonInput>, ctx: Ctx) {
  // Valiate catalog input params
  const data = CommonInput.parse(input)

  const mapSortToField = {
    asc: "createdAt",
    desc: "createdAt",
    alfa_asc: "name",
    alfa_desc: "name",
  } as const

  const { sort } = data
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
      ...(ctx.session.userId ? data.filter && catalogType[data.filter] : catalogType.public),
      ...(data.query && { name: { contains: data.query } }),
    },
    ...(sort && { orderBy: { [orderField]: order } }),
  })

  const results = catalogs.map((catalog) => {
    const { id, email, imageUrl, name } = catalog.owner
    return { ...catalog, owner: { id, email, imageUrl, name } }
  })

  return results
}
