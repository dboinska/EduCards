import { resolver } from "@blitzjs/rpc"
import db from "db"
import type { Ctx } from "blitz"

export default resolver.pipe(async ({ userId }: { userId: string }, ctx: Ctx) => {
  if (!userId) {
    throw new Error("User ID is required")
  }

  return await db.$transaction(async (prisma) => {
    await prisma.apiKey.deleteMany({ where: { userId } })
    await prisma.token.deleteMany({ where: { userId } })
    await prisma.session.deleteMany({ where: { userId } })
    await prisma.quiz.deleteMany({ where: { userId } })
    await prisma.suggestion.deleteMany({ where: { userId } })
    await prisma.favorite.deleteMany({ where: { userId } })
    await prisma.sharedCatalog.deleteMany({ where: { userId } })
    await prisma.studyPlan.deleteMany({ where: { ownerId: userId } })
    await prisma.learnSession.deleteMany({ where: { userId } })

    const userCatalogs = await prisma.catalog.findMany({
      where: { ownerId: userId },
      select: { catalogId: true },
    })
    const catalogIds = userCatalogs.map((c) => c.catalogId)

    await prisma.card.deleteMany({ where: { ownerId: userId } })

    if (catalogIds.length > 0) {
      await prisma.drawerCard.deleteMany({
        where: {
          drawer: {
            catalogId: { in: catalogIds },
          },
        },
      })

      await prisma.drawer.deleteMany({
        where: { catalogId: { in: catalogIds } },
      })
    }
    await prisma.catalog.deleteMany({ where: { ownerId: userId } })
    await prisma.user.delete({ where: { id: userId } })

    await ctx.session.$revoke()
    return { message: "Account successfully deleted" }
  })
})
