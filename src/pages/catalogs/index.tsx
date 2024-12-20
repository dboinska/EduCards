import { gSSP } from "src/blitz-server"

import getCatalogs from "@/modules/catalog/queries/getCatalogs"

import { CatalogListView } from "@/modules/catalog/view/CatalogList.view"

import type { ParsedUrlQuery } from "node:querystring"
import type { BlitzPage } from "@blitzjs/next"
import type { InferGetServerSidePropsType, GetServerSideProps } from "next"
import type { Catalog, User } from "db"

interface CatalogWithOwner extends Catalog {
  owner: User
}

const Catalogs: BlitzPage = ({
  query,
  catalogs,
  userId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <CatalogListView query={query} catalogs={catalogs} userId={userId} />
)

export const getServerSideProps = gSSP(async ({ query, ctx }) => {
  const catalogs = (await getCatalogs(query, ctx)) as CatalogWithOwner[]

  return {
    props: { query, catalogs, userId: ctx.session.userId },
  }
}) satisfies GetServerSideProps<{
  query: ParsedUrlQuery
  catalogs: CatalogWithOwner[]
  userId: string | null
}>

export default Catalogs
