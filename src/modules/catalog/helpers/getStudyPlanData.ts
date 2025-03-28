import getStudyPlans from "@/modules/studyPlan/queries/getStudyPlans"
import getLearnSessions from "@/modules/drawer/queries/getLearnSessions"
import { getDateHelpers } from "@/utils/getDateHelpers"
import { filterSessionByDate } from "@/utils/filterSessionsByDate"
import { filterSessionsByRange } from "@/utils/filterSessionsByRange"
import getCatalog from "@/modules/catalog/queries/getCatalog"
import { getDailyAggregatedResult } from "@/utils/getDailyAggregatedResults"
import { getWeeklyAggregatedResult } from "@/utils/getWeeklyAggregatedResults"
import { getCompletionPercentage } from "@/utils/getCompletionPercentage"

import type { Ctx } from "blitz"

const defaultData = {
  dailyAggregatedResult: undefined,
  studyPlanForCatalog: undefined,
  completionPercentage: undefined,
  weeklyAggregatedResult: undefined,
}

export async function getStudyPlanData(id: string, ctx: Ctx) {
  if (!ctx?.session?.userId) {
    return defaultData
  }

  const allStudyPlans = await getStudyPlans({ id }, ctx)
  const studyPlanForCatalog = allStudyPlans.filter((sp) => sp.catalogId === id)
  const learnSessions = await getLearnSessions(
    {
      userId: ctx.session.userId as string,
      catalogId: id,
    },
    ctx
  )

  const { formattedDate, lastMonday, nextSunday } = getDateHelpers()

  const todaySessions = filterSessionByDate(learnSessions, formattedDate)
  const weeklySessions = filterSessionsByRange(learnSessions, lastMonday, nextSunday)

  const dailyAggregatedResult = getDailyAggregatedResult(todaySessions || [])
  const weeklyAggregatedResult = getWeeklyAggregatedResult(weeklySessions || [])

  const completionPercentage = getCompletionPercentage(await getCatalog({ id }, ctx))

  return {
    dailyAggregatedResult,
    studyPlanForCatalog,
    completionPercentage,
    weeklyAggregatedResult,
  }
}
