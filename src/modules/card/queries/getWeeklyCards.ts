import type { Ctx } from "blitz"
import { startOfWeek, endOfWeek } from "date-fns"
import db from "db"

export default async function getWeeklyCards(_, ctx: Ctx) {
  ctx.session.$authorize()

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 })

  const cards = await db.card.findMany({
    where: {
      ownerId: ctx.session.userId,
      createdAt: {
        gte: weekStart,
        lte: weekEnd,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      cardId: true,
      createdAt: true,
    },
  })

  return cards
}
