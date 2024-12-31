import db from "db"

interface LastSession {
  lastSessionId: string
  userId: string
  duration: number
  learnedCards: number
  totalCatalogs: number
  quizzesTaken: number
}

export default async function getLastSessionStatistics(userId: string): Promise<LastSession> {
  const lastLoginSession = await db.session.findFirst({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      createdAt: true,
      expiresAt: true,
    },
  })

  const learningSessions = await db.learnSession.findMany({
    where: {
      userId,
      active: false,
      sessionStart: {
        gte: lastLoginSession?.createdAt,
        lte: lastLoginSession?.expiresAt || new Date(),
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

  if (!learningSessions.length) {
    return {
      lastSessionId: "",
      userId,
      duration: 0,
      learnedCards: 0,
      totalCatalogs: 0,
      quizzesTaken: 0,
    }
  }

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
    lastSessionId: lastLoginSession?.id || "",
    userId,
    duration: totalStats.duration,
    learnedCards: totalStats.learnedCards,
    totalCatalogs: totalStats.catalogs,
    quizzesTaken: 0,
  }
}
