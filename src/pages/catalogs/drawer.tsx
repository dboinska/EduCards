import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Catalogs.module.css"
import Link from "next/link"
import { Avatar, Flex, Box, Badge } from "@mantine/core"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"
import { AutocompleteLoading } from "src/components/AutocompleteLoading"
import { CatalogHeader } from "@/components/CatalogHeader"
import { Picker } from "@/components/Picker"
import { UseDrawer } from "@/core/providers/drawerProvider"
import { useQuery } from "@blitzjs/rpc"
import getDrawer, { CardDTO, DrawerDTO } from "./queries/getDrawer"

export interface DrawerProps {
  id: number
  header: string
  desc?: string
  //   authorId: number
  cards: number
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

const Drawer: BlitzPage = ({ id, header, desc }: DrawerProps) => {
  const currentUser = useCurrentUser()
  const { drawerProps } = UseDrawer()

  const [drawer] = useQuery(getDrawer, {})
  console.log({ drawer })

  const drawers: DrawerDTO[] = drawer.drawers
  const cards: CardDTO[] = drawer.cards

  const content = (card: CardDTO[]) => {
    return (
      <>
        {card.map((card) => (
          <div
            key={card.card_id}
            className={`${card.image_url && styles.withOverlay} ${styles.body}`}
            style={{
              backgroundImage: `url(${card.image_url})`,
            }}
          >
            <div className={card.image_url && styles.overlay}></div>
            <Link href={Routes.Cards()} className={styles.cardContent}>
              <div className={styles.headerContainer}>
                <h2>{card.term}</h2>
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
                <span>Author: {card.author_id}</span>
              </div>
            </div>
          </div>
        ))}
      </>
    )
  }

  return (
    <Layout title="Catalog">
      <main className={styles.main}>
        <CatalogHeader header={"Catalog xfdgfg"} link={Routes.NewCard()} authorId={1} settings />
        <Box m="var(--mantine-spacing-md) 0">
          <h2 style={{ color: drawerProps.color, margin: "0" }}>Cards at {drawerProps.header}:</h2>
          <Flex
            align="center"
            justify="space-between"
            style={{ color: "var(--mantine-color-gray-5)", fontWeight: 500 }}
          >
            Learn {drawerProps.label.toLowerCase()}
            <Flex gap="var(--mantine-spacing-sm)">
              <Badge color="var(--mantine-color-gray-6)">{drawerProps.learned} learned</Badge>
              <Badge color="var(--mantine-color-gray-6)" variant="outline">
                {drawerProps.left} left
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
            <Box w="270px">
              <Picker data={sharedWith} />
            </Box>
          </Flex>
        </div>
        <div className={styles.gridCatalogs}>{content(cards)}</div>
      </main>
    </Layout>
  )
}

export default Drawer
