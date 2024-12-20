import { gSSP } from "src/blitz-server"

import { getDailyAggregatedResult } from "@/utils/getDailyAggregatedResults"
import { getWeeklyAggregatedResult } from "@/utils/getWeeklyAggregatedResults"
import { getCompletionPercentage } from "@/utils/getCompletionPercentage"
import { getDateHelpers } from "@/utils/getDateHelpers"
import { filterSessionByDate } from "@/utils/filterSessionsByDate"
import { filterSessionsByRange } from "@/utils/filterSessionsByRange"

import getCatalog from "@/modules/catalog/queries/getCatalog"
import getLearnSessions from "@/modules/drawer/queries/getLearnSessions"
import getStudyPlans from "@/modules/studyPlan/queries/getStudyPlans"

import { CatalogView } from "@/modules/catalog/view/Catalog.view"

import type { InferGetServerSidePropsType } from "next"
import type { BlitzPage } from "@blitzjs/next"
import type { Catalog, Drawer, Card, User } from "db"
import type { CatalogSchema } from "@/modules/catalog/schemas/Catalog.schema"

interface EnhacedCatalog extends Catalog {
  drawers: Drawer[]
  cards: Card[]
  owner: User | null
}

const CatalogId: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  query,
  catalog,
  dailyAggregatedResult,
  studyPlanForCatalog,
  completionPercentage,
}) => (
  <CatalogView
    query={query}
    catalog={catalog}
    dailyAggregatedResult={dailyAggregatedResult}
    studyPlanForCatalog={studyPlanForCatalog}
    completionPercentage={completionPercentage}
  />
)

export const getServerSideProps = gSSP(async ({ params, query, ctx }) => {
  const id = (params as CatalogSchema).id
  const catalog = await getCatalog({ id }, ctx)
  const allStudyPlans = await getStudyPlans({ id }, ctx)
  const studyPlanForCatalog = allStudyPlans.filter((sp) => sp.catalogId === id)
  const learnSessions = await getLearnSessions(
    {
      userId: ctx?.session?.userId as string,
      catalogId: id,
    },
    ctx
  )

  const { formattedDate, lastMonday, nextSunday } = getDateHelpers()

  console.log({ formattedDate, lastMonday, nextSunday })

  const todaySessions = filterSessionByDate(learnSessions, formattedDate)
  const weeklySessions = filterSessionsByRange(learnSessions, lastMonday, nextSunday)

  const dailyAggregatedResult = getDailyAggregatedResult(todaySessions || [])
  const weeklyAggregatedResult = getWeeklyAggregatedResult(weeklySessions || [])
  console.log({ weeklySessions, weeklyAggregatedResult })

  const completionPercentage = getCompletionPercentage(catalog)

  return {
    props: {
      catalog: catalog as unknown as EnhacedCatalog,
      query,
      dailyAggregatedResult,
      studyPlanForCatalog,
      completionPercentage,
      weeklyAggregatedResult,
    },
  }
})

export default CatalogId
