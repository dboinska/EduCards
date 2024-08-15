import { BlitzPage, Routes } from "@blitzjs/next"
import { gSSP } from "src/blitz-server"
import getCatalog from "./queries/getCatalog"
import { CatalogSchema } from "@/schemas/Catalog.schema"
import type { InferGetServerSidePropsType } from "next"
import Layout from "@/core/layouts/Layout"
import { CatalogHeader } from "@/components/CatalogHeader"
import { ActionIcon, Avatar, Box, Flex, TextInput } from "@mantine/core"
import { DynamicBadge } from "@/components/DynamicBadge"
import { IconHeart, IconHeartFilled, IconSettings, IconX } from "@tabler/icons-react"
import { Picker, PickerOption } from "@/components/Picker"
import { sortBy } from "@/utils/sortBy"
import styles from "src/styles/Catalogs.module.css"
import getDrawer, { CardDTO } from "./queries/getDrawer"
import { useQuery } from "@blitzjs/rpc"
import { UseDrawer } from "@/core/providers/drawerProvider"
import Link from "next/link"
import { useSession } from "@blitzjs/auth"
import { ToggleMenu } from "@/components/ToggleMenu"
import { useState, useReducer } from "react"
import { useDebouncedCallback } from "@mantine/hooks"
import { actionTypes, dataReducer, initialState } from "@/reducers/dataReducer"
import { useRouter } from "next/router"
import { SortType } from "@/types/SortType"

const CatalogId: BlitzPage = ({
  query,
  catalog,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const [catalogId] = useQuery(getDrawer, {})
  const { drawerProps, setDrawerProps } = UseDrawer()
  const [catalogState, dispatch] = useReducer(dataReducer, {
    ...initialState,
    ...query,
  })
  const [searchValue, setSearchValue] = useState(() => query.query || "")

  const drawers = catalogId.drawers
  const session = useSession()
  const ownerId = session.userId
  console.log({ ownerId })

  const isFavorite = false

  const favCard = session.userId ? (
    <ActionIcon variant="subtle" radius="md" size={22}>
      {isFavorite ? (
        <IconHeartFilled className={styles.favorite} stroke={2} />
      ) : (
        <IconHeart className={styles.favorite} stroke={2} />
      )}
    </ActionIcon>
  ) : null

  const cards = catalogId.cards

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

  const catalogCards = (cards: CardDTO[]) => {
    const items = cards.map((card, index) => (
      <div
        key={index}
        className={`${styles.body} ${card.image_url && styles.withOverlay} `}
        style={{
          backgroundImage: `url(${card.image_url})`,
        }}
      >
        <div className={card.image_url && styles.overlay}></div>
        <Link href={Routes.Cards()} className={styles.cardContent}>
          <div className={styles.headerContainer}>
            <h2>{card.term}</h2>
            <IconX />
          </div>
          <h3>{card.description}</h3>
        </Link>
        <div className={styles.inline}>
          <div className={styles.author}>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
              alt="Jacob Warnhalter"
              radius="xl"
              size="sm"
            />
            <span>{card.author_id}</span>
          </div>
          <Flex className={styles.controls}>
            {session.userId === catalog?.ownerId && (
              <ToggleMenu item={"card"} settings={cardSettings} />
            )}

            {favCard}
          </Flex>
        </div>
      </div>
    ))
    return items
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
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value)
    handleSearch(event.currentTarget.value)
  }

  const handleSearch = useDebouncedCallback(async (query: string) => {
    dispatch({
      type: actionTypes.search,
      payload: {
        query,
      },
    })

    const routerQuery = {
      ...(query.length > 0 && {
        query: { query, id: router.query.id },
      }),
    }

    await router.push(routerQuery)
  }, 500)

  return (
    <Layout title={`Catalog ${catalog?.name}`}>
      <main className={styles.main}>
        <CatalogHeader
          header={`Catalog ${catalog?.name}`}
          link={Routes.NewCard()}
          ownerId={catalog?.ownerId}
          settings
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
        <div className={styles.gridCatalogs}>{catalogCards(cards)}</div>
      </main>
      {/* {console.log(JSON.stringify(catalog, null, 2))} */}
    </Layout>
  )
}

export const getServerSideProps = gSSP(async ({ params, query, ctx }) => {
  const id = (params as CatalogSchema).id
  const catalog = await getCatalog({ id }, ctx)

  console.log({ query })

  return { props: { catalog, query } }
})

// const CatalogId: BlitzPage = ({
//   catalog,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
//   return <div>{JSON.stringify(catalog, null, 2)}</div>
// }

export default CatalogId

// sort analogicznie do catalogs/index.tsx
// szufladki na sztywno
