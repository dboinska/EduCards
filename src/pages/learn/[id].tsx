import { gSSP } from "@/blitz-server"

import { LearnView } from "@/modules/learn/views/Learn.view"

import getCatalog from "@/modules/catalog/queries/getCatalog"
import getDrawer from "@/modules/drawer/queries/getDrawer"
import getDrawerCards from "@/modules/drawer/queries/getDrawerCards"

import type { InferGetServerSidePropsType } from "next"

const LearnPage = ({
  drawerCards,
  catalog,
  drawer,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <LearnView drawerCards={drawerCards} catalog={catalog} drawer={drawer} />
)

export const getServerSideProps = gSSP(async ({ query, ctx }) => {
  const drawer = await getDrawer({ id: query.id as string }, ctx)
  const drawerCards = await getDrawerCards({ drawerId: query?.id as string }, ctx)
  const catalog = await getCatalog({ id: drawerCards[0]?.card.catalogId as string }, ctx)

  return {
    props: { drawerCards, catalog, drawer },
  }
})

export default LearnPage
