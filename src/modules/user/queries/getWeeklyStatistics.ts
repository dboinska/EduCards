import db from "db"
import { startOfWeek, endOfWeek } from "date-fns"
import { WeeklySessionSchema } from "../schemas/WeeklySession.schema"

export default async function getWeeklyStatistics(userId: string): Promise<WeeklySessionSchema> {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 })

  const learningSessions = await db.learnSession.findMany({
    where: {
      userId,
      active: false,
      sessionStart: {
        gte: weekStart,
        lte: weekEnd,
      },
    },
    include: {
      drawer: {
        include: {
          drawerCards: true,
        },
      },
    },
  })

  const uniqueCatalogs = new Set(learningSessions.map((session) => session.catalogId))

  const totalStats = learningSessions.reduce(
    (acc, session) => {
      const sessionDuration = session.sessionEnd
        ? Math.floor((session.sessionEnd.getTime() - session.sessionStart.getTime()) / (1000 * 60))
        : 0
      return {
        duration: acc.duration + sessionDuration,
        learnedCards: acc.learnedCards + (session.learnedCards || 0),
        catalogs: uniqueCatalogs.size,
      }
    },
    { duration: 0, learnedCards: 0, catalogs: 0 }
  )

  return {
    userId,
    duration: totalStats.duration,
    learnedCards: totalStats.learnedCards,
    totalCatalogs: totalStats.catalogs,
  }
}
