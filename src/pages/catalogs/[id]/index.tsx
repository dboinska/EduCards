import { BlitzPage, Routes } from "@blitzjs/next"
import { gSSP } from "src/blitz-server"
import getCatalog from "../queries/getCatalog"
import { CatalogSchema } from "@/schemas/Catalog.schema"
import type { InferGetServerSidePropsType } from "next"
import Layout from "@/core/layouts/Layout"
import { CatalogHeader } from "@/components/CatalogHeader"
import { Box, Flex, TextInput } from "@mantine/core"
import { DrawerCard } from "@/components/DrawerCard"
import { Picker, PickerOption } from "@/components/Picker"
import { sortBy } from "@/utils/sortBy"
import styles from "src/styles/Catalogs.module.css"
import getDrawer from "../../drawer/queries/getDrawer"
import { useQuery } from "@blitzjs/rpc"
import { UseDrawer } from "@/core/providers/drawerProvider"
import { useSession } from "@blitzjs/auth"
import { useState, useReducer, useEffect } from "react"
import { useDebouncedCallback } from "@mantine/hooks"
import { actionTypes, dataReducer, initialState } from "@/reducers/dataReducer"
import { useRouter } from "next/router"
import { SortType } from "@/types/SortType"
import { CatalogCard } from "@/components/CatalogCard"
import { frequencyColorMap, frequencyDictionary } from "@/utils/frequency"

const CatalogId: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  query,
  catalog,
}) => {
  const router = useRouter()
  const [catalogId] = useQuery(getDrawer, { id: catalog?.catalogId as string })
  const { drawerProps, setDrawerProps } = UseDrawer()
  const [_, dispatch] = useReducer(dataReducer, {
    ...initialState,
    ...query,
  })
  const [searchValue, setSearchValue] = useState(() => query.query || "")
  const [cards, setCards] = useState(() => catalog?.cards || [])
  const [catalogDrawers, setCatalogDrawers] = useState(catalog?.drawers || [])

  const drawers = catalog?.drawers

  const [cardCounts, setCardCounts] = useState(drawers?.map((drawer) => drawer?.numberOfCards))

  console.log({ amount: catalog?.amountOfDrawers })

  const handleCardDelete = (cardId: string) => {
    setCards((prevCards) => prevCards.filter((card) => card.cardId !== cardId))
  }

  console.log({ drawers })
  console.log({ cards })
  const session = useSession({ suspense: false })

  const ownerId = session?.userId || null

  const handleSortChange = async ({ value }: PickerOption) => {
    dispatch({
      type: actionTypes.sort,
      payload: {
        sort: value as SortType,
      },
    })

    await router.push({ query: { ...router.query, sort: value } })
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value)
    handleSearch(event.currentTarget.value)
  }

  const handleSearch = useDebouncedCallback(async (query: string) => {
    dispatch({
      type: actionTypes.search,
      payload: { query },
    })

    const routerQuery = {
      ...(query.length > 0 && { query, id: router.query.id }),
    }

    await router.push(routerQuery)
  }, 500)

  useEffect(() => {
    const fetchUpdatedCatalog = async () => {
      const updatedCatalog = await fetch(`/api/catalog/${catalog?.catalogId}`).then((res) =>
        res.json()
      )
      setCatalogDrawers(updatedCatalog.drawers)
      setCardCounts(updatedCatalog.drawers.map((drawer) => drawer.numberOfCards))
    }

    if (cardCounts?.some((count, index) => count !== drawers?.[index]?.numberOfCards)) {
      fetchUpdatedCatalog().catch(console.error)
    }
  }, [catalog?.catalogId, cardCounts, drawers])

  useEffect(() => {
    console.log({ cardCounts, catalogCards: catalog?.numberOfCards })
  }, [cardCounts, catalog?.numberOfCards])

  const catalogItems = cards.map((c) => (
    <CatalogCard
      key={c.cardId}
      imageUrl={c.imageUrl}
      term={c.term}
      description={c.description}
      owner={catalog?.owner}
      cardId={c.cardId}
      catalogId={c.catalogId}
      onDelete={handleCardDelete}
    />
  ))

  return (
    <Layout title={`Catalog ${catalog?.name}`}>
      <main className={styles.main}>
        <CatalogHeader
          header={`Catalog ${catalog?.name}`}
          link={Routes.AddCard({ id: catalog?.catalogId as string })}
          ownerId={catalog?.ownerId}
          settings
          catalogId={catalog?.catalogId}
        />
        <Box>
          <h2>Drawers:</h2>
          <Flex m="0 auto" gap="8px" miw="100%" className={styles.drawersContainer}>
            {catalog?.drawers.map((drawer, index) => (
              <DrawerCard
                key={drawer?.drawerId as string}
                id={drawer?.drawerId as string}
                header={`${index + 1} level`}
                frequency={frequencyDictionary[drawer?.frequency!]}
                color={frequencyColorMap[drawer?.frequency!]}
                numberOfCards={drawers?.[index]?.numberOfCards}
              />
            ))}
          </Flex>
        </Box>
        <h2>All cards:</h2>
        <div className={styles.filters}>
          <Flex align="center" justify="space-between">
            <label
              style={{ fontSize: "var(--mantine-font-size-sm)", fontWeight: 500 }}
              htmlFor="search"
            >
              Search:
            </label>
            <Box w="240px">
              <TextInput value={searchValue} onChange={handleTextChange} id="search" />
            </Box>
          </Flex>
          <Flex align={"center"} justify={"space-between"}>
            <label
              style={{
                fontSize: "var(--mantine-font-size-sm)",
                fontWeight: 500,
              }}
            >
              Sort by:
            </label>
            <Box w="270px">
              <Picker options={sortBy} hideImages onChange={handleSortChange} id="sort" />
            </Box>
          </Flex>
        </div>
        <div className={styles.gridCatalogs}>{catalogItems}</div>
      </main>
    </Layout>
  )
}

export const getServerSideProps = gSSP(async ({ params, query, ctx }) => {
  const id = (params as CatalogSchema).id
  const catalog = await getCatalog({ id }, ctx)
  return { props: { catalog, query } }
})

export default CatalogId
