import { gSSP } from "@/blitz-server"
import { Routes } from "@blitzjs/next"

import getCatalogs from "@/modules/catalog/queries/getCatalogs"
import getStudyPlans from "@/modules/studyPlan/queries/getStudyPlans"
import getStudyPlan from "@/modules/studyPlan/queries/getStudyPlan"

import { EditStudyPlanView } from "@/modules/studyPlan/views/EditStudyPlan.view"

import type { BlitzPage } from "@blitzjs/next"
import type { InferGetServerSidePropsType } from "next"

const EditStudyPlan: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  userCatalogs,
  catalogs,
  query,
  studyPlan,
}) => (
  <EditStudyPlanView
    userCatalogs={userCatalogs}
    catalogs={catalogs}
    query={query}
    studyPlan={studyPlan}
  />
)

export const getServerSideProps = gSSP(async ({ query, ctx }) => {
  const studyPlanData = await getStudyPlan({ id: query.id as string }, ctx)

  if (!studyPlanData) {
    return {
      redirect: {
        destination: Routes.Home(),
        permanent: false,
      },
    }
  }

  const catalogs = await getCatalogs(query, ctx)
  const studyPlans = await getStudyPlans(query, ctx)
  const userId = ctx.session.userId

  const usedCatalogIds = new Set(studyPlans.map((plan) => plan.catalogId))
  const userCatalogs = catalogs.filter(
    (catalog) => catalog?.ownerId === userId && !usedCatalogIds.has(catalog.catalogId)
  )

  return {
    props: { query, studyPlan: studyPlanData?.studyPlan, catalogs, userCatalogs, userId },
  }
})

export default EditStudyPlan
