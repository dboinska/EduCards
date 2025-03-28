import { useEffect, useReducer, useState } from "react"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { Box, Flex, TextInput } from "@mantine/core"
import { useDebouncedCallback } from "@mantine/hooks"

import Layout from "@/layouts/Root.layout"
import { CatalogHeader } from "@/components/CatalogHeader"
import { Picker } from "@/components/Picker"
import { Switch } from "@/components/Switch"
import { Catalog } from "@/components/Catalog"
import { actionTypes, dataReducer, initialState } from "@/reducers/dataReducer"
import { sortBy } from "@/utils/sortBy"

import deleteCatalog from "../mutations/deleteCatalog"

import styles from "src/styles/Catalogs.module.css"

import type { PickerOption } from "@/types/PickerOption"
import type { SortType } from "@/types/SortType"
import type { FilterType } from "@/types/FilterType"
import type { Catalog as CatalogType, User } from "db"
import type { ParsedUrlQuery } from "node:querystring"

const visibilityFilter = (isUser: boolean) =>
  isUser
    ? [
        { label: "All", value: "all" },
        { label: "Public", value: "public" },
        { label: "Shared", value: "shared" },
        { label: "Own", value: "own" },
      ]
    : [{ label: "Public", value: "public" }]

interface CatalogWithOwner extends CatalogType {
  owner: User
}

interface CatalogListViewProps {
  query: ParsedUrlQuery
  catalogs: CatalogWithOwner[]
  userId?: string | null
}

export const CatalogListView = ({ query, catalogs, userId }: CatalogListViewProps) => {
  const router = useRouter()
  const [catalogState, dispatch] = useReducer(dataReducer, {
    ...initialState,
    ...query,
  })
  const [searchValue, setSearchValue] = useState(() => query.query || "")
  const [deleteCatalogMutation] = useMutation(deleteCatalog)

  async function handleDeleteCatalog(catalogId: string) {
    try {
      console.log("Attempting to delete catalog with ID:", catalogId)

      await deleteCatalogMutation(catalogId, { onSuccess: () => console.log("success") })
    } catch (error) {
      console.error("Failed to delete catalog:", error)
    }
  }

  async function handleEditCatalog(catalogId: string) {
    try {
      console.log("Attempting to delete catalog with ID:", catalogId)

      await router.push(Routes.EditCatalog({ id: catalogId }))
    } catch (error) {
      console.error("Failed to delete catalog:", error)
    }
  }

  const catalogSettings = query
    ? [
        {
          label: "Add study plan",
          path: Routes.NewStudyPlan(),
          id: "newStudyPlan",
        },
        {
          label: "Edit",
          id: "edit",
          action: (id) => handleEditCatalog(id),
        },
        {
          label: "Delete",
          path: Routes.Catalogs(),
          id: "delete",
          action: (id) => handleDeleteCatalog(id),
        },
      ]
    : []

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

    await router.push({ query: { ...router.query, filter: type } })
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

  useEffect(() => {
    if (query.revalidatePath) {
      const replaceRoute = async () => {
        const { revalidatePath, ...updatedQuery } = router.query
        await router.push({ query: { ...updatedQuery } })
      }
      replaceRoute().catch(console.error)
    }
  }, [])

  return (
    <Layout title="Catalogs">
      <main className={styles.main}>
        <CatalogHeader header="Catalogs" link={Routes.NewCatalog()} />
        <div className={styles.filters}>
          <Switch
            value={catalogState.filter}
            onChange={handleFilter}
            data={visibilityFilter(Boolean(userId))}
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
          {catalogs.map((c) => (
            <Catalog
              key={c.catalogId}
              imageUrl={c.imageUrl}
              numberOfCards={c.numberOfCards}
              description={c.description}
              owner={c.owner}
              isOwn={userId === c.ownerId}
              catalogSettings={catalogSettings}
              catalogId={c.catalogId}
            >
              {c.name}
            </Catalog>
          ))}
        </div>
      </main>
    </Layout>
  )
}
