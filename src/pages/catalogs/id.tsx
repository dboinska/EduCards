import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Catalogs.module.css"
import Link from "next/link"
import { ActionIcon, Avatar, Box, Flex, Badge } from "@mantine/core"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"
import { IconHeart, IconHeartFilled, IconSettings, IconX } from "@tabler/icons-react"
import { AutocompleteLoading } from "src/components/AutocompleteLoading"
import { CatalogHeader } from "@/components/CatalogHeader"
import { Picker } from "@/components/Picker"
import { ToggleMenu } from "@/components/ToggleMenu"
import { UseDrawer } from "@/core/providers/drawerProvider"
import { DynamicBadge } from "@/components/DynamicBadge"
import getDrawer from "./queries/getDrawer"
import { useQuery } from "@blitzjs/rpc"
import { CardDTO } from "./queries/getCatalogCards"

export interface CatalogProps {
  id: number
  image?: string
  header: string
  desc?: string
  isFavorite?: boolean
  authorId: number
}

const sharedWith = [
  {
    label: "Date ascending",
    name: "Date ascending",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
  },
  {
    label: "Date descending",
    name: "Date descending",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
  },
  {
    label: "Alphabetically",
    name: "Alphabetically",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
  },
  {
    label: "Reverse alphabetically",
    name: "Reverse alphabetically",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
  },
  {
    label: "Randomly",
    name: "Randomly",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
  },
]

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

const Catalog: BlitzPage = ({ id, image, header, desc, isFavorite, authorId }: CatalogProps) => {
  const currentUser = useCurrentUser()
  const favCard = currentUser ? (
    <ActionIcon variant="subtle" radius="md" size={22}>
      {isFavorite ? (
        <IconHeartFilled className={styles.favorite} stroke={2} />
      ) : (
        <IconHeart className={styles.favorite} stroke={2} />
      )}
    </ActionIcon>
  ) : null

  const [catalogId] = useQuery(getDrawer, {})
  console.log({ catalogId })

  const { drawerProps, setDrawerProps } = UseDrawer()

  const drawers = catalogId.drawers
  const cards = catalogId.cards

  console.log({ drawers })

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
            {currentUser?.id === authorId && <ToggleMenu item={"card"} settings={cardSettings} />}

            {favCard}
          </Flex>
        </div>
      </div>
    ))
    return items
  }

  return (
    <Layout title="Catalog">
      <main className={styles.main}>
        <CatalogHeader
          header={
            "Catalog xfdgfghfghfgjghdgdgdfgdfgdfgdfgdgfgdfgdfgdfgdfgdfgdfgdfgdgfgdfgdfdfgdfgdfgdfgdfgdgdgxfdgfghfghfgjghdgdgdfgdfgdfgdfgdgfgdfgdfgdfgdfgdfgdfgdfgdgfgdfgdfdfgdfgdfgdfgdfgdgdg"
          }
          link={Routes.NewCard()}
          authorId={1}
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
          <AutocompleteLoading />

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
              <Picker data={sharedWith} />
            </Box>
          </Flex>
        </div>
        <div className={styles.gridCatalogs}>{catalogCards(cards)}</div>
      </main>
    </Layout>
  )
}

export default Catalog
