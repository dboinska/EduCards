import { BlitzPage, Routes } from "@blitzjs/next"
import { UserCard } from "@/components/UserCard"
import styles from "src/styles/Catalogs.module.css"
import Layout from "@/core/layouts/Layout"
import Link from "next/link"
import { Flex, Box } from "@mantine/core"
import { DynamicBadge } from "@/components/DynamicBadge"

import getUser from "@/users/queries/getUser"
import { InferGetServerSidePropsType } from "next"
import { gSSP } from "@/blitz-server"
import db from "db"

const studyPlansData = [
  {
    color: "var(--mantine-color-yellow-6)",
    header: "English",
    label: "Grammar",
    percent: 30,
  },
  {
    color: "var(--mantine-color-lime-6)",
    header: "Polish",
    label: "Vocabulary",
    percent: 23,
  },
  {
    color: "var(--mantine-color-green-6)",
    header: "French",
    label: "Tenses",
    percent: 12,
  },
  {
    color: "var(--mantine-color-teal-6)",
    header: "Deutch",
    label: "Every week",
    percent: 11,
  },
]

const UserPage: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  user,
  query,
  totalCards,
  totalCatalogs,
  totalFavorites,
}) => {
  console.log({ catalogs: user?.Catalog, totalCards, totalCatalogs })
  console.log({ user })
  const catalogContent = (items) => {
    return (
      <>
        {items.map((item) => {
          const hasImage = item.imageUrl
          const backgroundImage = hasImage ? `url(${item.imageUrl})` : "none"
          const textColor = hasImage ? "white" : "black"
          const linkId = item.catalogId || item.cardId
          const title = item.name || item.term
          const description = item.description || "No description available."

          return (
            <div
              key={linkId}
              className={`${styles.body} ${hasImage ? styles.withOverlay : ""}`}
              style={{ backgroundImage, height: "140px", color: textColor }}
            >
              {hasImage && <div className={styles.overlay}></div>}
              <Link className={styles.cardContent} href={Routes.CatalogId({ id: linkId })}>
                <div className={styles.headerContainer}>
                  <h2>{title}</h2>
                </div>
                {description && <h3>{description}</h3>}
              </Link>
            </div>
          )
        })}
      </>
    )
  }
  return (
    <>
      <Layout title="User profile">
        <main className={styles.main}>
          <Flex gap="var(--mantine-spacing-md)" direction="column">
            <UserCard
              user={user}
              query={query}
              totalCards={totalCards}
              totalCatalogs={totalCatalogs}
              totalFavorites={totalFavorites}
            />
            <Box className="border" w="100%" p="var(--mantine-spacing-md)">
              <h3>Active study plans</h3>

              <div className={`${styles.justifyLeft} ${styles.maxWidth600}`}>
                <DynamicBadge data={studyPlansData} />
              </div>
            </Box>
            <Flex className="border" direction="column">
              <div style={{ margin: "var(--mantine-spacing-md)" }}>
                <h2>Latest added catalogs</h2>
                <div className={styles.justifyLeft}>
                  {user?.Catalog?.length > 0
                    ? catalogContent(user.Catalog)
                    : "No catalogs added this month"}
                </div>
              </div>
            </Flex>
            <Flex className="border" direction="column">
              <div style={{ margin: "var(--mantine-spacing-md)" }}>
                <h2>Latest added cards</h2>
                <div className={styles.justifyLeft}>
                  {user?.Card?.length > 0 ? catalogContent(user.Card) : "No cards added this month"}
                </div>
              </div>
            </Flex>
          </Flex>
        </main>
      </Layout>
    </>
  )
}

export const getServerSideProps = gSSP(async ({ query, ctx }) => {
  if (!ctx.session.userId) {
    return
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
