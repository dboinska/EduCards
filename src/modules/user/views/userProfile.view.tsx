import { Flex, Box } from "@mantine/core"

import Layout from "@/layouts/Root.layout"
import { UserCard } from "@/components/UserCard"
import { CatalogTile } from "@/components/CatalogTile"
import { DynamicBadge } from "@/components/DynamicBadge"

import styles from "src/styles/Catalogs.module.css"

import type { User, Catalog, Card } from "db"
import type { ParsedUrlQuery } from "node:querystring"

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

interface UserProfile extends User {
  Catalog: Catalog[]
  Card: Card[]
}

interface UserProfileViewProps {
  user: UserProfile
  query: ParsedUrlQuery
  totalCatalogs: number
  totalCards: number
  totalFavorites: number
}

export const UserProfileView = ({
  user,
  query,
  totalCards,
  totalCatalogs,
  totalFavorites,
}: UserProfileViewProps) => {
  console.log({ catalogs: user?.Catalog, totalCards, totalCatalogs })
  console.log({ user })

  return (
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
                  ? user.Catalog.map(({ imageUrl, name, description, catalogId }) => (
                      <CatalogTile
                        key={catalogId}
                        imageURL={imageUrl}
                        title={name}
                        description={description}
                        linkId={catalogId}
                      />
                    ))
                  : "No catalogs added this month"}
              </div>
            </div>
          </Flex>
          <Flex className="border" direction="column">
            <div style={{ margin: "var(--mantine-spacing-md)" }}>
              <h2>Latest added cards</h2>
              <div className={styles.justifyLeft}>
                {user?.Card?.length > 0
                  ? user.Card.map(({ imageUrl, term, description, cardId }) => (
                      <CatalogTile
                        key={cardId}
                        imageURL={imageUrl}
                        title={term}
                        description={description}
                        linkId={cardId}
                      />
                    ))
                  : "No cards added this month"}
              </div>
            </div>
          </Flex>
        </Flex>
      </main>
    </Layout>
  )
}
