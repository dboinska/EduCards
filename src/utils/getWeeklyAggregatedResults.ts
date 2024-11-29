import { AggregatedResult } from "@/types/AggregatedResult"

export const getWeeklyAggregatedResult = (
  weeklySessions: any[]
): Record<string, AggregatedResult> => {
  return weeklySessions.reduce((acc, session) => {
    const date = new Date(session.sessionStart).toISOString().split("T")[0]
    if (!session.sessionEnd || !date) return false
    const sessionDurationMins =
      (new Date(session.sessionEnd).getTime() - new Date(session.sessionStart).getTime()) /
      1000 /
      60

    if (!acc[date]) {
      acc[date] = {
        totalLearnedCards: 0,
        totalDurationMins: 0,
      }
    }

    acc[date].totalLearnedCards += session.learnedCards
    acc[date].totalDurationMins += sessionDurationMins
    acc[date].totalDurationMins = Number(acc[date].totalDurationMins.toFixed(2))

    return acc
  }, {})
}
