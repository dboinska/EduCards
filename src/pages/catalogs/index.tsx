import Layout from "src/core/layouts/Layout"
import { type BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Catalogs.module.css"
import { Box, Flex } from "@mantine/core"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"
import { useReducer, useState } from "react"
import { CatalogHeader } from "@/components/CatalogHeader"
import { Switch } from "@/components/Switch"
import { Picker } from "@/components/Picker"
import { TextInput } from "@mantine/core"
import { useDebouncedCallback } from "@mantine/hooks"
import { useRouter } from "next/router"

import type { PickerOption } from "@/components/Picker"

import { useQuery } from "@blitzjs/rpc"
import getCatalogs from "./queries/getCatalogs"
import Catalog from "@/components/Catalog"
import { type SortType } from "@/types/SortType"
import { actionTypes, dataReducer, initialState } from "@/reducers/dataReducer"
import type { FilterType } from "@/types/FilterType"
import { sortBy } from "@/utils/sortBy"

export interface CatalogProps {
  id: number
  image?: string
  header: string
  desc?: string
  isFavorite?: boolean
  authorId: string
  numberOfCards?: number
}

const catalogSettings = [
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
] as const

const visibilityFilter = (currentUser: any) =>
  currentUser
    ? [
        { label: "All", value: "all" },
        { label: "Public", value: "public" },
        { label: "Shared", value: "shared" },
        { label: "Own", value: "own" },
      ]
    : [{ label: "Public", value: "public" }]

const Catalogs: BlitzPage = () => {
  const [catalogState, dispatch] = useReducer(dataReducer, { ...initialState })
  const [searchValue, setSearchValue] = useState("")
  const [catalog] = useQuery(getCatalogs, catalogState)
  const router = useRouter()
  const currentUser = useCurrentUser()

  const handleSearch = useDebouncedCallback(async (query: string) => {
    dispatch({
      type: actionTypes.search,
      payload: {
        query,
      },
    })

    const routerQuery = {
      ...(query.length > 0 && {
        query: { query },
      }),
    }

    await router.push(routerQuery)
  }, 500)

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value)
    handleSearch(event.currentTarget.value)
  }

  const handleFilter = async (type: FilterType) => {
    dispatch({
      type: actionTypes.filter,
      payload: {
        filter: type,
      },
    })

    await router.push({ query: { ...router.query, type } })
  }

  const handleSortChange = async ({ value }: PickerOption) => {
    dispatch({
      type: actionTypes.sort,
      payload: {
        sort: value as SortType,
      },
    })

    await router.push({ query: { ...router.query, sort: value } })
  }

  return (
    <Layout title="Catalogs">
      <main className={styles.main}>
        <CatalogHeader authorId="" header="Catalogs" link={Routes.NewCatalog()} />
        <div className={styles.filters}>
          <Switch
            value={catalogState.filter}
            onChange={handleFilter}
            data={visibilityFilter(currentUser)}
            containerClass={styles.filter}
          />
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

          <Flex align="center" justify="space-between">
            <label
              style={{ fontSize: "var(--mantine-font-size-sm)", fontWeight: 500 }}
              htmlFor="sort"
            >
              Sort by:
            </label>
            <Box w="240px">
              <Picker options={sortBy} onChange={handleSortChange} id="sort" />
            </Box>
          </Flex>
        </div>

        <div className={styles.gridCatalogs}>
          {catalog.map((c) => (
            <Catalog
              key={c.catalogId}
              imageURL={c.imageUrl}
              numberOfCards={c.numberOfCards}
              description={c.description}
              owner={c.owner}
              isOwn={currentUser?.id === c.ownerId}
              catalogSettings={catalogSettings}
            >
              {c.name}
            </Catalog>
          ))}
        </div>
      </main>
    </Layout>
  )
}

export default Catalogs
