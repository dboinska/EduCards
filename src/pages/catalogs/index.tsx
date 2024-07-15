import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Catalogs.module.css"
import { Box, Flex } from "@mantine/core"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"
import { useReducer, useState } from "react"
import { CatalogHeader } from "@/components/CatalogHeader"
import { Switch } from "@/components/Switch"
import { Picker } from "@/components/Picker"
import { TextInput } from "@mantine/core"
import { useDebouncedCallback } from "@mantine/hooks"

import type { PayloadMap } from "@/types/PayloadMap"
import type { PickerOption } from "@/components/Picker"

import { useQuery } from "@blitzjs/rpc"
import getCatalogs from "./queries/getCatalogs"
import Catalog from "@/components/Catalog"

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
]

const sortTypes = {
  ASC: "asc",
  DESC: "desc",
  ALFA_ASC: "alfa_asc",
  ALFA_DESC: "alfa_desc",
} as const

type SortType = (typeof sortTypes)[keyof typeof sortTypes]

type FilterType = "all" | "public" | "own" | "shared"

const actionTypes = {
  search: "SEARCH",
  sort: "SORT",
  filter: "FILTER",
} as const

type DataPayload = {
  [actionTypes.search]: {
    query: string | undefined
  }
  [actionTypes.filter]: {
    filter: FilterType
  }
  [actionTypes.sort]: {
    sort: SortType | undefined
  }
}

type DataReducerAction = PayloadMap<DataPayload>[keyof PayloadMap<DataPayload>]

export function dataReducer(state: any, action: DataReducerAction) {
  const { type, payload } = action

  switch (type) {
    case actionTypes.search: {
      return {
        ...state,
        filter: "all",
        query: payload.query,
      }
    }
    case actionTypes.filter: {
      return {
        ...state,
        filter: payload.filter,
      }
    }
    case actionTypes.sort: {
      return {
        ...state,
        sort: payload.sort,
      }
    }

    default: {
      throw new Error(`Unhandled type: ${type}`)
    }
  }
}

const initialState = {
  filter: "all",
}

interface SortOrder extends Omit<PickerOption, "value"> {
  value: SortType
}

const sortOrder: SortOrder[] = [
  {
    label: "Date ascending",
    imageAlt: "Date ascending",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
    value: sortTypes.ASC,
  },
  {
    label: "Date descending",
    imageAlt: "Date descending",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
    value: sortTypes.DESC,
  },
  {
    label: "Alphabetically",
    imageAlt: "Alphabetically",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
    value: sortTypes.ALFA_ASC,
  },
  {
    label: "Reverse alphabetically",
    imageAlt: "Reverse alphabetically",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
    value: sortTypes.ALFA_DESC,
  },
] as const

const Catalogs: BlitzPage = ({ id, image, header, desc, isFavorite, authorId }: CatalogProps) => {
  const [catalogState, dispatch] = useReducer(dataReducer, { ...initialState })
  const [searchValue, setSearchValue] = useState("")
  const [catalog] = useQuery(getCatalogs, catalogState)

  const currentUser = useCurrentUser()

  const handleSearch = useDebouncedCallback(async (query: string) => {
    dispatch({
      type: actionTypes.search,
      payload: {
        query,
      },
    })
  }, 500)

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value)
    handleSearch(event.currentTarget.value)
  }

  const handleFilter = (type: FilterType) => {
    dispatch({
      type: actionTypes.filter,
      payload: {
        filter: type,
      },
    })
  }

  const handleSortChange = ({ value }: PickerOption) => {
    dispatch({
      type: actionTypes.sort,
      payload: {
        sort: value as SortType,
      },
    })
  }

  return (
    <Layout title="Catalogs">
      <main className={styles.main}>
        <CatalogHeader authorId={authorId} header={"Catalogs"} link={Routes.NewCatalog()} />
        <div className={styles.filters}>
          <Switch
            value={catalogState.filter}
            setValue={handleFilter}
            pathname="/catalogs"
            data={[
              { label: "All", value: "all" },
              { label: "Public", value: "public" },
              { label: "Shared", value: "shared" },
              { label: "Own", value: "own" },
            ]}
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
              <Picker options={sortOrder} onChange={handleSortChange} id="sort" />
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
