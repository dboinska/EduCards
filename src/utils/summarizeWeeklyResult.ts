import { AggregatedResult } from "@/types/AggregatedResult"

export const summarizeWeeklyResult = (
  weeklyAggregatedResult: Record<string, AggregatedResult>
): AggregatedResult => {
  return Object.values(weeklyAggregatedResult).reduce<AggregatedResult>(
    (acc, { totalLearnedCards = 0, totalDurationMins = 0 }) => {
      acc.totalLearnedCards! += totalLearnedCards
      acc.totalDurationMins! += totalDurationMins
      return acc
    },
    { totalLearnedCards: 0, totalDurationMins: 0 }
  )
}
