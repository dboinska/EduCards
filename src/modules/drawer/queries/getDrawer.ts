import db from "db"
import { getDrawerSchema } from "../schemas/GetDrawer.schema"

import type { Ctx } from "blitz"
import type { GetDrawerSchema } from "../schemas/GetDrawer.schema"

export default async function getDrawer(input: GetDrawerSchema, ctx: Ctx) {
  const data = getDrawerSchema.parse(input)

  const drawer = await db.drawer.findUnique({
    include: {
      catalog: true,
    },
    where: {
      drawerId: data.id,
    },
  })

  if (!drawer) {
    return null
  }

  console.log({ drawer })

  return drawer
}
