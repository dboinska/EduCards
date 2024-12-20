import { gSSP } from "@/blitz-server"

import getCatalog from "@/modules/catalog/queries/getCatalog"
import { AddCardToIdView } from "@/modules/catalog/view/AddCardsToId.view"

import type { InferGetServerSidePropsType } from "next"
import type { BlitzPage } from "@blitzjs/next"
import type { Catalog } from "db"
import type { CatalogSchema } from "@/modules/catalog/schemas/Catalog.schema"

const AddCard: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  catalog,
}) => <AddCardToIdView catalog={catalog} />

export const getServerSideProps = gSSP(async ({ params, ctx }) => {
  const id = (params as CatalogSchema).id
  const catalog = (await getCatalog({ id }, ctx)) as Catalog
  return { props: { catalog } }
})

export default AddCard
