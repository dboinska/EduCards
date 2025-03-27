import { gSSP } from "@/blitz-server"
import { Routes } from "@blitzjs/next"
import db from "db"

import { UserProfileView } from "@/modules/user/views/userProfile.view"
import getUser from "@/modules/user/queries/getUser"

import type { InferGetServerSidePropsType } from "next"
import type { BlitzPage } from "@blitzjs/next"
import getActiveStudyPlans from "@/modules/user/queries/getActiveStudyPlans"

const UserPage: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  user,
  query,
  totalCards,
  totalCatalogs,
  totalFavorites,
  studyPlans,
}) => (
  <UserProfileView
    user={user}
    query={query}
    totalCards={totalCards}
    totalCatalogs={totalCatalogs}
    totalFavorites={totalFavorites}
    studyPlans={studyPlans}
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
  const studyPlans = await getActiveStudyPlans(query, ctx)

  return { props: { user, query, totalCatalogs, totalCards, totalFavorites, studyPlans } }
})

export default UserPage
