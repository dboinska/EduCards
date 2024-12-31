import type { Ctx } from "blitz"
import { startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns"
import db from "db"
import { WeeklyLearningResult } from "../schemas/WeeklyLearning.schema"

export default async function getWeeksLearning(_, ctx: Ctx): Promise<WeeklyLearningResult> {
  ctx.session.$authorize()

  if (!ctx.session.userId) {
    throw new Error("User not authenticated")
  }

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 })

  console.log({ weekStart, weekEnd })
  const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd })

  const weeklyTimes = await Promise.all(
    daysInWeek.map(async (date) => {
      const dayStart = new Date(date.setHours(0, 0, 0, 0))
      const dayEnd = new Date(date.setHours(23, 59, 59, 999))

      const sessions = await db.learnSession.findMany({
        where: {
          userId: ctx.session.userId as string,
          sessionStart: {
            gte: dayStart,
            lte: dayEnd,
          },
        },
        select: {
          sessionStart: true,
          sessionEnd: true,
        },
      })

      const totalMinutes = sessions.reduce((total, session) => {
        if (session.sessionEnd) {
          const duration = Math.floor(
            (session.sessionEnd.getTime() - session.sessionStart.getTime()) / (1000 * 60)
          )
          return total + duration
        }
        return total
      }, 0)

      return totalMinutes
    })
  )

  return {
    weeklyTimes,
  }
}
