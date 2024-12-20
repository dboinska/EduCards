import { gSSP } from "@/blitz-server"
import { Routes } from "@blitzjs/next"
import db from "db"

import { UserProfileView } from "@/modules/user/views/userProfile.view"
import getUser from "@/modules/user/queries/getUser"

import type { InferGetServerSidePropsType } from "next"
import type { BlitzPage } from "@blitzjs/next"

const UserPage: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  user,
  query,
  totalCards,
  totalCatalogs,
  totalFavorites,
}) => (
  <UserProfileView
    user={user}
    query={query}
    totalCards={totalCards}
    totalCatalogs={totalCatalogs}
    totalFavorites={totalFavorites}
  />
)

export const getServerSideProps = gSSP(async ({ query, ctx }) => {
  if (!ctx.session.userId) {
    return {
      redirect: {
        destination: Routes.Home(),
        permanent: false,
      },
    }
  }
  const user = await getUser(ctx)

  const totalCatalogs = await db.catalog.count({
    where: { ownerId: ctx.session.userId },
  })

  const totalCards = await db.card.count({
    where: { ownerId: ctx.session.userId },
  })

  // const totalFavorites = await db.favorite.count({
  //   where: {ownerId: ctx.session.userId}
  // })

  const totalFavorites = 0

  console.log({ totalCatalogs, totalCards })
  return { props: { user, query, totalCatalogs, totalCards, totalFavorites } }
})

export default UserPage
