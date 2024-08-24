import { BlitzPage, Routes } from "@blitzjs/next"
import { gSSP } from "src/blitz-server"
import getCatalog from "../queries/getCatalog"
import { CatalogSchema } from "@/schemas/Catalog.schema"
import type { InferGetServerSidePropsType } from "next"
import Layout from "@/core/layouts/Layout"
import { CatalogHeader } from "@/components/CatalogHeader"
import { Box, Flex, TextInput } from "@mantine/core"
import { DynamicBadge } from "@/components/DynamicBadge"
import { Picker, PickerOption } from "@/components/Picker"
import { sortBy } from "@/utils/sortBy"
import styles from "src/styles/Catalogs.module.css"
import getDrawer from "../queries/getDrawer"
import { useQuery } from "@blitzjs/rpc"
import { UseDrawer } from "@/core/providers/drawerProvider"
import { useSession } from "@blitzjs/auth"
import { useState, useReducer, useEffect } from "react"
import { useDebouncedCallback } from "@mantine/hooks"
import { actionTypes, dataReducer, initialState } from "@/reducers/dataReducer"
import { useRouter } from "next/router"
import { SortType } from "@/types/SortType"
import { CatalogCard } from "@/components/CatalogCard"
import getUsers from "../../../users/queries/getUsers"
import { UserSchema } from "@/schemas/User.schema"

const CatalogId: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  query,
  catalog,
}) => {
  const router = useRouter()
  const [catalogId] = useQuery(getDrawer, {})
  const { drawerProps, setDrawerProps } = UseDrawer()
  const [catalogState, dispatch] = useReducer(dataReducer, {
    ...initialState,
    ...query,
  })
  const [searchValue, setSearchValue] = useState(() => query.query || "")

  const drawers = catalogId.drawers
  const session = useSession({ suspense: false })

  const ownerId = session?.userId || null

  const isFavorite = false

  const cardSettings = [
    {
      label: "Edit",
      path: Routes.NewCatalog(),
      id: "edit",
    },
    {
      label: "Delete",
      path: Routes.Catalogs(),
      id: "delete",
    },
  ]

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
        <Box w="100%">
          <h2>Drawers:</h2>
          <div className={styles.justifyLeft}>
            <DynamicBadge
              data={drawers}
              drawerProps={drawerProps}
              setDrawerProps={setDrawerProps}
            />
          </div>
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
              <Picker options={sortBy} onChange={handleSortChange} id="sort" />
            </Box>
          </Flex>
        </div>
        <div className={styles.gridCatalogs}>
          {catalog?.cards.map((c) => {
            return (
              <CatalogCard
                key={c.cardId}
                ownerId={c.ownerId}
                imageUrl={c.imageURL}
                term={c.term}
                description={c.description}
                settings={cardSettings}
                isOwner={c.ownerId === ownerId}
                owner={catalog.owner}
              />
            )
          })}
        </div>
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
