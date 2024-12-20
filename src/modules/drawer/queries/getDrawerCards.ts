import db from "db"
import { getDrawerCardSchema } from "../schemas/GetDrawerCard.schema"

import type { Ctx } from "blitz"
import type { GetDrawerCardSchema } from "../schemas/GetDrawerCard.schema"

export default async function getCatalog(input: GetDrawerCardSchema, ctx: Ctx) {
  const data = getDrawerCardSchema.parse(input)

  const drawerCardList = await db.drawerCard.findMany({
    where: {
      drawerId: data.drawerId,
    },
    include: {
      card: true,
    },
  })

  if (!drawerCardList) {
    return []
  }

  // const { id, email, imageUrl, name } = catalog?.owner
  console.log({ drawerCardList })

  // return { ...catalog, owner: { id, email, imageUrl, name } }
  return drawerCardList
}
