import { gSSP } from "@/blitz-server"
import { Routes } from "@blitzjs/next"

import { CreateCatalogLayout } from "@/layouts/CreateCatalogLayout"
import getCatalog from "@/modules/catalog/queries/getCatalog"
import { EditCardsView } from "@/modules/catalog/view/EditCards.view"

import type { InferGetServerSidePropsType } from "next"
import type { BlitzPage } from "@blitzjs/next"
import type { CatalogSchema } from "@/modules/catalog/schemas/Catalog.schema"

const CatalogEditCards: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => (
  <EditCardsView />
)

CatalogEditCards.getLayout = function getLayout(page) {
  return <CreateCatalogLayout>{page}</CreateCatalogLayout>
}

export const getServerSideProps = gSSP(async ({ params, ctx }) => {
  const id = (params as CatalogSchema).id
  const catalog = await getCatalog({ id }, ctx)

  if (catalog?.ownerId !== ctx.session.userId) {
    return {
      redirect: {
        destination: Routes.Home(),
        permanent: false,
      },
    }
  }

  return { props: { catalog: { ...catalog } } }
})

export default CatalogEditCards
