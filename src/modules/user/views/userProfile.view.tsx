import { Flex, Box } from "@mantine/core"

import Layout from "@/layouts/Root.layout"
import { UserCard } from "@/components/UserCard"
import { CatalogTile } from "@/components/CatalogTile"
import { DynamicBadge } from "@/components/DynamicBadge"

import styles from "src/styles/Catalogs.module.css"

import type { User, Catalog, Card } from "db"
import type { ParsedUrlQuery } from "node:querystring"

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
  studyPlans: any
}

export const UserProfileView = ({
  user,
  query,
  totalCards,
  totalCatalogs,
  totalFavorites,
  studyPlans,
}: UserProfileViewProps) => {
  console.log({ catalogs: user?.Catalog, totalCards, totalCatalogs })
  console.log({ user })
  console.log({ x: studyPlans })
  const userStudyPlans = studyPlans || []
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
              {studyPlans?.length > 0 ? (
                <div className={`${styles.justifyLeft}`}>
                  {userStudyPlans.map((plan) => (
                    <DynamicBadge
                      key={plan.id}
                      data={[
                        {
                          color: plan.color,
                          header: plan.name,
                          frequency: `${plan.daysPerWeek} days/week`,
                          percent: Math.round((plan.wordsPerDay / plan.secondsPerDay) * 100),
                        },
                      ]}
                      catalogId={plan.catalogId || ""}
                    />
                  ))}
                </div>
              ) : (
                "No active study plans"
              )}
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
