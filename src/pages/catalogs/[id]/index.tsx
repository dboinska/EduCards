import { gSSP } from "src/blitz-server"
import getCatalog from "@/modules/catalog/queries/getCatalog"
import { CatalogView } from "@/modules/catalog/view/Catalog.view"

import type { InferGetServerSidePropsType } from "next"
import type { BlitzPage } from "@blitzjs/next"
import type { Catalog, Drawer, Card, User } from "db"
import type { CatalogSchema } from "@/modules/catalog/schemas/Catalog.schema"
import { getStudyPlanData } from "@/modules/catalog/helpers/getStudyPlanData"

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

  const studyPlansData = await getStudyPlanData(id, ctx)

  return {
    props: {
      catalog: catalog as unknown as EnhacedCatalog,
      query,
      ...studyPlansData,
    },
  }
})

export default CatalogId
