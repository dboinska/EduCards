import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Ctx } from "blitz"

export default resolver.pipe(async (_, ctx: Ctx) => {
  ctx.session.$authorize()

  const userId = ctx.session.userId

  if (!userId) {
    throw new Error("User ID is required")
  }

  await db.session.deleteMany({ where: { userId } })
  await db.token.deleteMany({ where: { userId } })

  await db.user.delete({
    where: { id: userId },
  })

  await ctx.session.$revoke()

  return { message: "Account successfully deleted" }
})
