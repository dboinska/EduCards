import type { Ctx } from "blitz"
import { TodaysLearningSchema } from "../schemas/TodaysLearning.schema"
import { endOfDay, startOfDay } from "date-fns"
import db from "db"

export default async function getDailyLearning(_, ctx: Ctx): Promise<TodaysLearningSchema> {
  ctx.session.$authorize()

  if (!ctx.session.userId) {
    throw new Error("User not authenticated")
  }

  const today = new Date()
  const dayStart = startOfDay(today)
  const dayEnd = endOfDay(today)

  const sessions = await db.learnSession.findMany({
    where: {
      userId: ctx.session.userId,
      sessionStart: {
        gte: dayStart,
        lte: dayEnd,
      },
    },
    select: {
      sessionStart: true,
      sessionEnd: true,
      active: false,
    },
  })
  const totalStudyTimeMins = sessions.reduce((total, session) => {
    if (session.sessionEnd) {
      const duration = Math.floor(
        (session.sessionEnd.getTime() - session.sessionStart.getTime()) / (1000 * 60)
      )
      return total + duration
    }
    return total
  }, 0)
  return {
    totalTime: totalStudyTimeMins,
  }
}
