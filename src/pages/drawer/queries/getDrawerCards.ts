import type { Ctx } from "blitz"
import db from "db"

import { z } from "zod"

const getDrawerCardInput = z.object({
  drawerId: z.string().uuid(),
})

type GetDrawerCardInput = z.infer<typeof getDrawerCardInput>

export default async function getCatalog(input: GetDrawerCardInput, ctx: Ctx) {
  const data = getDrawerCardInput.parse(input)

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
