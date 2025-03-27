import type { Ctx } from "blitz"
import { startOfWeek, endOfWeek, startOfDay, endOfDay, eachDayOfInterval } from "date-fns"
import db from "db"

export default async function getWeeklyLearnedCards(_, ctx: Ctx) {
  ctx.session.$authorize()

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 })
  const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd })

  const dailyLearned = await Promise.all(
    daysInWeek.map(async (date) => {
      const dayStart = startOfDay(date)
      const dayEnd = endOfDay(date)

      const sessions = await db.learnSession.findMany({
        where: {
          userId: ctx.session.userId as string,
          sessionStart: {
            gte: dayStart,
            lte: dayEnd,
          },
          active: false,
        },
        select: {
          learnedCards: true,
        },
      })

      const totalForDay = sessions.reduce((sum, session) => sum + (session.learnedCards || 0), 0)

      return {
        date,
        learnedCards: totalForDay,
      }
    })
  )

  return dailyLearned
}
