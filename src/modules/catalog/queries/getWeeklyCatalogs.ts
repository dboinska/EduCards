import type { Ctx } from "blitz"
import { startOfWeek, endOfWeek } from "date-fns"
import db from "db"

export default async function getWeeklyCatalogs(_, ctx: Ctx) {
  ctx.session.$authorize()

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 })

  const catalogs = await db.catalog.findMany({
    where: {
      learnSession: {
        some: {
          userId: ctx.session.userId as string,
          sessionStart: {
            gte: weekStart,
            lte: weekEnd,
          },
          active: false,
        },
      },
    },
    select: {
      catalogId: true,
      name: true,
      learnSession: {
        where: {
          userId: ctx.session.userId as string,
          sessionStart: {
            gte: weekStart,
            lte: weekEnd,
          },
          active: false,
        },
        select: {
          sessionEnd: true,
          sessionStart: true,
        },
      },
    },
  })

  const result = catalogs.map((catalog) => {
    const duration = catalog.learnSession.reduce((total, session) => {
      const sessionDuration = session.sessionEnd
        ? Math.floor((session.sessionEnd.getTime() - session.sessionStart.getTime()) / (1000 * 60))
        : 0
      return total + sessionDuration
    }, 0)

    return {
      catalogId: catalog.catalogId,
      catalogName: catalog.name,
      duration,
      percent: 0,
    }
  })

  const totalDuration = result.reduce((sum, catalog) => sum + catalog.duration, 0)

  return result.map((catalog) => ({
    ...catalog,
    percent: totalDuration > 0 ? Math.round((catalog.duration / totalDuration) * 100) : 1,
  }))
}
