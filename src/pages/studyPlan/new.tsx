import { gSSP } from "@/blitz-server"

import { NewStudyPlanView } from "@/modules/studyPlan/views/NewStudyPlan.view"
import getCatalogs from "@/modules/catalog/queries/getCatalogs"
import getStudyPlans from "@/modules/studyPlan/queries/getStudyPlans"

import type { BlitzPage } from "@blitzjs/next"
import type { InferGetServerSidePropsType } from "next"

const NewStudyPlan: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  userCatalogs,
}) => <NewStudyPlanView userCatalogs={userCatalogs} />

export const getServerSideProps = gSSP(async ({ query, ctx }) => {
  const catalogs = await getCatalogs(query, ctx)
  const studyPlans = await getStudyPlans(query, ctx)

  const userId = ctx.session.userId

  const usedCatalogIds = new Set(studyPlans.map((plan) => plan.catalogId))

  const userCatalogs = catalogs.filter(
    (catalog) => catalog?.ownerId === userId && !usedCatalogIds.has(catalog.catalogId)
  )
  return {
    props: { query, userCatalogs, userId },
  }
})

export default NewStudyPlan
