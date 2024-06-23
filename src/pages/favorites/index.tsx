import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Catalogs.module.css"
import Link from "next/link"
import { CatalogHeader } from "@/components/CatalogHeader"
import { Switch } from "@/components/Switch"
import { AutocompleteLoading } from "@/components/AutocompleteLoading"
import { useState } from "react"
import getFavorites, { CardsDTO, CatalogsDTO, StudyPlansDTO } from "./queries/getFavorites"
import { useQuery } from "@blitzjs/rpc"
import { Avatar, Badge, Flex } from "@mantine/core"

const Favorites: BlitzPage = () => {
  const [favoritesType, setFavoritesType] = useState<string>("all")
  const [favorites] = useQuery(getFavorites, {})

  console.log({ favorites })

  const cards: CardsDTO[] = favorites.cards
  const catalogs: CatalogsDTO[] = favorites.catalogs
  const studyPlans: StudyPlansDTO[] = favorites.studyPlans

  const cardsContent = (cards: CardsDTO[]) => {
    return (
      <>
        {cards.map((card) => (
          <Link key={card.card_id} className={styles.body} href={Routes.Cards()}>
            <div className={styles.headerContainer}>
              <h2>{card.term}</h2>
            </div>
            <h3>{card.description}</h3>
            <div className={styles.inline}>
              <span className={styles.userImg}></span>
              <span>{card.author_id}</span>
            </div>
          </Link>
        ))}
      </>
    )
  }

  const catalogsContent = (catalogs: CatalogsDTO[]) => {
    return (
      <>
        {catalogs.map((catalog) => (
          <>
            <div
              className={`${styles.withOverlay} ${styles.body}`}
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)",
              }}
            >
              <div className={styles.overlay}></div>
              <Link className={styles.cardContent} href={Routes.Catalog()}>
                <div className={styles.headerContainer}>
                  <h2>NameNameNameNameNameNameNameName</h2>
                  <Badge size="sm" variant="outline" color="var(--mantine-color-gray-3)">
                    10 cards
                  </Badge>
                </div>
                <h3>Description</h3>
              </Link>
              <div className={styles.inline}>
                <div className={styles.author}>
                  <Avatar
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                    alt="Jacob Warnhalter"
                    radius="xl"
                    size="sm"
                  />
                  <span>Author</span>
                </div>
                <Flex className={styles.controls}>
                  {/* {currentUser?.id === authorId && (
                    <ToggleMenu item={"catalog"} settings={catalogSettings} />
                  )}

                  {favCard(true)} */}
                </Flex>
              </div>
            </div>
          </>
        ))}
      </>
    )
  }

  console.log("Cards: ", cards, "Catalogs: ", catalogs, "Study plans: ", studyPlans)

  const studyPlansContent = (studyPlans: StudyPlansDTO[]) => {
    return (
      <div className={` ${styles.body}`}>
        <Link className={styles.cardContent} href={Routes.StudyPlan()}>
          <div className={styles.headerContainer}>
            <h2 style={{ color: "var(--mantine-color-violet-6)" }}>
              NameNameNameNameNameNameNameName
            </h2>

            <Badge size="sm" variant="outline" color="var(--mantine-color-gray-7)">
              10 cards
            </Badge>
          </div>
          <Flex justify="space-between" align="center">
            <h3>
              <span style={{ color: "var(--mantine-color-violet-6)" }}>80% </span>completed
            </h3>
            <h3 style={{ fontSize: "var(--mantine-font-size-xs)", margin: 0 }}>
              Started: 03.03.24
            </h3>
          </Flex>
        </Link>
        <div className={styles.inline}>
          <div className={styles.author}>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
              alt="Jacob Warnhalter"
              radius="xl"
              size="sm"
            />
            <span>Author</span>
          </div>
          <Flex className={styles.controls}>
            {/* {currentUser?.id === authorId && <ToggleMenu item={"study plan"} settings={settings} />}

            {favCard} */}
          </Flex>
        </div>
      </div>
    )
  }

  const favoritesContent = (favoritesType) => {
    switch (favoritesType) {
      case "all":
        return (
          <>
            {cardsContent(cards)}
            {catalogsContent(catalogs)}
            {studyPlansContent(studyPlans)}
          </>
        )
      case "catalogs":
        return <>{catalogsContent(catalogs)}</>
      case "cards":
        return <>{cardsContent(cards)}</>
      case "studyPlans":
        return <>{studyPlansContent(studyPlans)}</>
    }
  }

  return (
    <Layout title="Favorites">
      <main className={styles.main}>
        <CatalogHeader header={"Favorites"} link={Routes.NewCatalog()} />
        <div className={styles.filters}>
          <Switch
            value={favoritesType}
            setValue={setFavoritesType}
            pathname="/favorites"
            data={[
              { label: "All", value: "all" },
              { label: "Cards", value: "cards" },
              { label: "Catalogs", value: "catalogs" },
              { label: "Study plans", value: "studyPlans" },
            ]}
          />
          <AutocompleteLoading pathname="/favorites" />
        </div>
        <div className={styles.gridCatalogs}>{favoritesContent(favoritesType)}</div>
      </main>
    </Layout>
  )
}

export default Favorites
