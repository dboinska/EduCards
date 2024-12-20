import { BlitzPage } from "@blitzjs/next"
import { gSSP } from "@/blitz-server"

import getDrawer from "@/modules/drawer/queries/getDrawer"
import getDrawerCards from "@/modules/drawer/queries/getDrawerCards"
import getUser from "@/modules/user/queries/getUser"
import { DrawerView } from "@/modules/drawer/views/Drawer.view"

import type { InferGetServerSidePropsType } from "next"

const Drawer: BlitzPage = ({
  query,
  drawer,
  drawerCards,
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <DrawerView query={query} drawer={drawer} drawerCards={drawerCards} user={user} />
)

export const getServerSideProps = gSSP(async ({ query, ctx }) => {
  if (!ctx.session.userId) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }
  const user = await getUser(ctx)
  const drawer = await getDrawer({ id: query.id as string }, ctx)
  console.log({ drawer, query })
  const drawerCards = await getDrawerCards({ drawerId: query?.id as string }, ctx)

  return {
    props: { query, drawer, drawerCards, user },
  }
})

export default Drawer
