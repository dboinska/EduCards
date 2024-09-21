import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Catalogs.module.css"
import Link from "next/link"
import { Avatar, Flex, Box, Badge } from "@mantine/core"
import { AutocompleteLoading } from "src/components/AutocompleteLoading"
import { CatalogHeader } from "@/components/CatalogHeader"
import { Picker, PickerOption } from "@/components/Picker"
import { UseDrawer } from "@/core/providers/drawerProvider"
import { gSSP } from "@/blitz-server"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { CommonInput } from "@/schemas/CommonInput"
import { z } from "zod"
import {
  Frequency,
  frequencyColorMap,
  frequencyDictionary,
  FrequencySchema,
  frequencySchema,
} from "@/utils/frequency"
import getDrawer from "../queries/getDrawer"
import getDrawerCards from "../queries/getDrawerCards"
import { sortBy } from "@/utils/sortBy"
import getUser from "@/users/queries/getUser"
import { useReducer } from "react"
import { actionTypes, dataReducer, initialState } from "@/reducers/dataReducer"
import { SortType } from "@/types/SortType"
import router from "next/router"
export interface DrawerProps {
  id: number
  header: string
  desc?: string
  cards: number
}

const Drawer: BlitzPage = ({
  query,
  drawer,
  drawerCards,
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [dispatch] = useReducer(dataReducer, {
    ...initialState,
    ...query,
  })
  const { drawerProps } = UseDrawer()

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

  function findFrequency(frequency: Frequency, level: keyof FrequencySchema): number {
    const index = frequencySchema[level].indexOf(frequency)

    return index !== -1 ? index : 0
  }

  const cardsLevel = () => {
    if (drawer?.frequency && drawer?.levelName) {
      const level = drawer.levelName as keyof FrequencySchema
      const index = findFrequency(drawer.frequency, level)
      return index
    }
    return 0
  }

  function translateFrequency(frequency: keyof typeof frequencyDictionary | undefined): string {
    if (!frequency) {
      console.log("Invalid frequency")
      return "Daily"
    }

    const result = frequencyDictionary[frequency]
    console.log(result)
    return result
  }

  function getDrawerColor(frequency: keyof typeof frequencyColorMap | undefined): string {
    if (!frequency) {
      console.log("Invalid frequency")
      return "black"
    }
    const result = frequencyColorMap[frequency]
    console.log(result)
    return result
  }

  console.log(Object.values(frequencyDictionary))
  const cards = drawerCards

  const content = (card) => {
    return (
      <>
        {card.map(({ id, card }) => (
          <div
            key={id}
            className={`${card.imageURL && styles.withOverlay} ${styles.body}`}
            style={{
              backgroundImage: `url(${card.imageURL})`,
            }}
          >
            <div className={card.imageURL && styles.overlay}></div>
            <Link href={Routes.CardPage({ id: card.cardId })} className={styles.cardContent}>
              <div className={styles.headerContainer}>
                <h2>{card.term}</h2>
              </div>
              <h3>{card.description}</h3>
            </Link>
            <div className={styles.inline}>
              <Flex align="center" gap="var(--mantine-spacing-sm)">
                <Avatar
                  src={user.imageUrl}
                  color={card.imageURL ? "white" : "blue"}
                  alt="Persona image"
                  radius="xl"
                  size="sm"
                />
                <Badge
                  size="sm"
                  variant="light"
                  color={card.imageURL ? "white" : "var(--mantine-color-blue-5)"}
                >
                  {user.name || "Owner"}
                </Badge>
              </Flex>
            </div>
          </div>
        ))}
      </>
    )
  }

  console.log({ query, drawer })

  return (
    <Layout title="Catalog">
      <main className={styles.main}>
        <CatalogHeader
          header={"Catalog xfdgfg"}
          settings
          learningMode
          drawerId={drawer?.drawerId}
        />
        <Box m="var(--mantine-spacing-md) 0">
          <h2 style={{ color: getDrawerColor(drawer?.frequency!), margin: "0" }}>
            Cards from level: {cardsLevel() + 1}
          </h2>
          <Flex
            align="center"
            justify="space-between"
            style={{ color: "var(--mantine-color-gray-7)", fontWeight: 500 }}
          >
            Repeating {translateFrequency(drawer?.frequency!)?.toLowerCase()}
            <Flex gap="var(--mantine-spacing-sm)">
              <Badge color="var(--mantine-color-gray-6)">{drawer?.cards.length} learned</Badge>
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
              <Picker options={sortBy} onChange={handleSortChange} id="sort" />
            </Box>
          </Flex>
        </div>
        <div className={styles.gridCatalogs}>{content(cards)}</div>
      </main>
    </Layout>
  )
}

export const getServerSideProps = gSSP(async ({ query, ctx }) => {
  const drawer = await getDrawer(query, ctx)
  console.log({ drawer, query })
  const drawerCards = await getDrawerCards({ drawerId: query?.id as string }, ctx)

  const user = await getUser({ id: drawerCards[0]?.card.ownerId as string }, ctx)

  return {
    props: { query, drawer, drawerCards, user },
  }
}) satisfies GetServerSideProps<{ query: z.infer<typeof CommonInput> }>

export default Drawer
