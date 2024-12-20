import { useReducer } from "react"
import router from "next/router"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { Avatar, Flex, Box, Badge } from "@mantine/core"

import Layout from "@/layouts/Root.layout"
import { AutocompleteLoading } from "@/components/AutocompleteLoading"
import { CatalogHeader } from "@/components/CatalogHeader"
import { Picker } from "@/components/Picker"
import { DrawerTile } from "@/components/DrawerTile"

import { actionTypes, dataReducer, initialState } from "@/reducers/dataReducer"
import getDrawerColor from "@/utils/getDrawerColor"
import translateFrequency from "@/utils/translateFrequency"
import findFrequency from "@/utils/findFrequency"
import { frequencyDictionary, FrequencySchema } from "@/utils/frequency"
import { sortBy } from "@/utils/sortBy"

import styles from "src/styles/Catalogs.module.css"

import type { ParsedUrlQuery } from "querystring"
import type { Drawer as DrawerType, DrawerCard, User, Card } from "db"
import type { PickerOption } from "@/types/PickerOption"
import type { SortType } from "@/types/SortType"

interface DrawerCardWithCard extends DrawerCard {
  card: Card
}

export interface DrawerViewProps {
  query: ParsedUrlQuery
  drawer: DrawerType
  drawerCards: DrawerCardWithCard[]
  user: User
}

export const DrawerView = ({ query, drawer, drawerCards, user }: DrawerViewProps) => {
  const [dispatch] = useReducer(dataReducer, {
    ...initialState,
    ...query,
  })
  const handleSortChange = async ({ value }: PickerOption) => {
    dispatch({
      type: actionTypes.sort,
      payload: {
        sort: value as SortType,
      },
    })
    await router.push({ query: { ...router.query, sort: value } })
  }

  console.log({ drawer })
  console.log({ drawerCards })

  const cardsLevel = () => {
    if (drawer?.frequency && drawer?.levelName) {
      const level = drawer.levelName as keyof FrequencySchema
      const index = findFrequency(drawer.frequency, level)
      return index
    }
    return 0
  }

  console.log(Object.values(frequencyDictionary))
  const cards = drawerCards

  return (
    <Layout title="Catalog">
      <main className={styles.main}>
        <CatalogHeader
          header={"Catalog xfdgfg"}
          settings
          learningMode
          drawerId={drawer?.drawerId as string}
          catalogId={drawer?.catalogId as string}
        />
        <Box m="var(--mantine-spacing-md) 0">
          <h2 style={{ color: getDrawerColor(drawer?.frequency!), margin: "0" }}>
            Drawer no. {cardsLevel() + 1}
          </h2>
          <Flex
            align="center"
            justify="space-between"
            style={{ color: "var(--mantine-color-gray-7)", fontWeight: 500 }}
          >
            Repeating {translateFrequency(drawer?.frequency!)?.toLowerCase()}
            <Flex gap="var(--mantine-spacing-sm)">
              {/* <Badge color="var(--mantine-color-gray-6)">
                {drawerCards.length}
                learned
              </Badge> */}
              <Badge color="var(--mantine-color-gray-6)" variant="outline">
                {drawerCards.length} left
              </Badge>
            </Flex>
          </Flex>
        </Box>
        <Flex gap=" var(--mantine-spacing-sm)" mb="var(--mantine-spacing-md)"></Flex>
        <div className={styles.filters}>
          <AutocompleteLoading />

          <Flex align={"center"} justify={"space-between"}>
            <label style={{ fontSize: "var(--mantine-font-size-xs)", fontWeight: 500 }}>
              Sort by:
            </label>
            <Box w="240px">
              <Picker options={sortBy} hideImages onChange={handleSortChange} id="sort" />
            </Box>
          </Flex>
        </div>
        <div className={styles.gridCatalogs}>
          {drawerCards.map(({ id, card }) => (
            <DrawerTile
              key={id}
              imageURL={card.imageUrl}
              id={card.cardId}
              term={card.term}
              description={card.description}
              userName={user.name}
            />
          ))}
        </div>
      </main>
    </Layout>
  )
}
