import Layout from "src/core/layouts/Layout"
import { type BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Catalogs.module.css"
import { Box, Flex } from "@mantine/core"
import { useReducer, useState } from "react"
import { CatalogHeader } from "@/components/CatalogHeader"
import { Switch } from "@/components/Switch"
import { Picker } from "@/components/Picker"
import { TextInput } from "@mantine/core"
import { useDebouncedCallback } from "@mantine/hooks"
import { useRouter } from "next/router"
import { CommonInput } from "@/schemas/CommonInput"
import { z } from "zod"

import type { PickerOption } from "@/components/Picker"
import type { InferGetServerSidePropsType, GetServerSideProps } from "next"

import getCatalogs from "./queries/getCatalogs"
import Catalog from "@/components/Catalog"
import { type SortType } from "@/types/SortType"
import { actionTypes, dataReducer, initialState } from "@/reducers/dataReducer"
import type { FilterType } from "@/types/FilterType"
import { sortBy } from "@/utils/sortBy"

import { gSSP } from "src/blitz-server"
import { useMutation } from "@blitzjs/rpc"
import deleteCatalog from "./mutations/deleteCatalog"

const visibilityFilter = (isUser: boolean) =>
  isUser
    ? [
        { label: "All", value: "all" },
        { label: "Public", value: "public" },
        { label: "Shared", value: "shared" },
        { label: "Own", value: "own" },
      ]
    : [{ label: "Public", value: "public" }]

const Catalogs: BlitzPage = ({
  query,
  catalogs,
  userId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [catalogState, dispatch] = useReducer(dataReducer, {
    ...initialState,
    ...query,
  })
  const [searchValue, setSearchValue] = useState(() => query.query || "")
  const router = useRouter()
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
          // path: Routes.EditCatalog({ id: "sdd" }),
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
              imageURL={c.imageUrl}
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

export const getServerSideProps = gSSP(async ({ query, ctx }) => {
  const catalogs = await getCatalogs(query, ctx)

  return {
    props: { query, catalogs, userId: ctx.session.userId },
  }
}) satisfies GetServerSideProps<{ query: z.infer<typeof CommonInput> }>

export default Catalogs
