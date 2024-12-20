import { gSSP } from "@/blitz-server"

import { StudyPlansListView } from "@/modules/studyPlan/views/StudyPlansList.view"
import getStudyPlans from "@/modules/studyPlan/queries/getStudyPlans"

import type { InferGetServerSidePropsType } from "next"
import type { BlitzPage } from "@blitzjs/next"

const StudyPlans: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  query,
  studyPlansWithCompletion,
}) => <StudyPlansListView studyPlansWithCompletion={studyPlansWithCompletion} query={query} />

export const getServerSideProps = gSSP(async ({ query, ctx }) => {
  const studyPlans = await getStudyPlans(query, ctx)
  console.log({ studyPlans })

  const studyPlansWithCompletion = await Promise.all(
    studyPlans.map(async (plan) => {
      const totalCards = plan.catalog.numberOfCards
      const numberOfDrawers = plan.catalog.amountOfDrawers

      const catalogDrawers = plan.catalog.drawers

      console.log({ drawers: plan.catalog.drawers })

      const lastDrawer = Array.isArray(catalogDrawers)
        ? catalogDrawers[catalogDrawers.length - 1]?.numberOfCards
        : 0

      console.log({ lastDrawer })

      const completionPercentage =
        totalCards && lastDrawer ? Number((lastDrawer / totalCards) * 100).toFixed(0) : 0
      console.log({
        catalogDrawers,
        catalog: plan.catalog,
        totalCards,
        lastDrawer,
        numberOfDrawers,
        completionPercentage,
      })

      return { ...plan, completionPercentage }
    })
  )

  return {
    props: { query, studyPlansWithCompletion },
  }
})

export default StudyPlans
