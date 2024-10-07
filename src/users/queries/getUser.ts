import type { Ctx } from "blitz"
import db from "db"
import { resolver } from "@blitzjs/rpc"

export default resolver.pipe(async (ctx: Ctx) => {
  const id = ctx.session.userId
  if (!id) {
    throw new Error("User ID is required")
  }

  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59)

  const user = await db.user.findUnique({
    where: {
      id: id,
    },
    include: {
      Catalog: {
        where: {
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      },
      Card: {
        where: {
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      },
    },
  })

  if (!user) {
    throw new Error(`User with ID ${id} not found`)
  }

  console.log({ user })

  return user
})
