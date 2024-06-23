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
import { UseCompartion } from "@/core/providers/compartionProvider"
import { DynamicBadge } from "@/components/DynamicBadge"

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

  const compartionsData = [
    {
      color: "var(--mantine-color-yellow-6)",
      label: "Daily",
      cards: 3,
    },
    {
      color: "var(--mantine-color-lime-6)",
      label: "Every 2 days",
      cards: 23,
    },
    {
      color: "var(--mantine-color-green-6)",
      label: "Every 4 days",
      cards: 12,
    },
    {
      color: "var(--mantine-color-teal-6)",
      label: "Weekly",
      cards: 11,
    },
    {
      color: "var(--mantine-color-blue-6)",
      label: "Every 2 weeks",
      cards: 1,
    },
    {
      color: "var(--mantine-color-violet-6)",
      label: "Monthly",
      cards: 3,
    },
    {
      color: "var(--mantine-color-pink-6)",
      label: "Every 2 months",
      cards: 0,
    },
  ]

  const { compartionProps, setCompartionProps } = UseCompartion()

  const catalogContent = () => {
    return (
      <>
        <div
          className={`${styles.withOverlay} ${styles.body}`}
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)",
          }}
        >
          <div className={styles.overlay}></div>
          <Link href={Routes.Cards()} className={styles.cardContent}>
            <div className={styles.headerContainer}>
              <h2>NameNameNameNameNameNameNameName</h2>
              <IconX />
            </div>
            <h3>Description</h3>
          </Link>
          <div className={styles.inline}>
            <div className={styles.author}>
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                alt="Jacob Warnhalter"
                radius="xl"
                size="sm"
              />
              <span>Author</span>
            </div>
            <Flex className={styles.controls}>
              {currentUser?.id === authorId && <ToggleMenu item={"card"} settings={cardSettings} />}

              {favCard}
            </Flex>
          </div>
        </div>
        <div
          className={`${styles.withOverlay} ${styles.body}`}
          style={{
            backgroundImage: "url(https://www.instalki.pl/wp-content/uploads/2021/02/atoms.jpg)",
          }}
        >
          <div className={styles.overlay}></div>
          <Link href={Routes.Cards()} className={styles.cardContent}>
            <div className={styles.headerContainer}>
              <h2>Lorem ipsum</h2>
              <span>
                <IconX />
              </span>
            </div>
            <h3>
              In eleifend velit eu neque mollis, rutrum malesuada leo luctus. Curabitur non mauris
              facilisis, fringilla ligula ac. In eleifend velit eu neque mollis, rutrum malesuada
              leo luctus. Curabitur non mauris facilisis, fringilla ligula ac.
            </h3>
          </Link>
          <div className={styles.inline}>
            <div className={styles.author}>
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                alt="Jacob Warnhalter"
                radius="xl"
                size="sm"
              />
              <span>Author</span>
            </div>
            <div className={styles.controls}>
              {currentUser?.id === authorId && (
                <IconSettings size="22" style={{ color: "var(--mantine-color-gray-3)" }} />
              )}
              {favCard}
            </div>
          </div>
        </div>
        <div
          className={`${styles.withOverlay} ${styles.body}`}
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)",
          }}
        >
          <div className={styles.overlay}></div>
          <Link href={Routes.Cards()} className={styles.cardContent}>
            <div className={styles.headerContainer}>
              <h2>NameNameNameNameNameNameNameName</h2>
              <span>
                <IconX />
              </span>
            </div>
            <h3>Description</h3>
          </Link>
          <div className={styles.inline}>
            <div className={styles.author}>
              {" "}
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                alt="Jacob Warnhalter"
                radius="xl"
                size="sm"
              />
              <span>Author</span>
            </div>
            <div className={styles.controls}></div>
          </div>
        </div>{" "}
        <div
          className={`${styles.withOverlay} ${styles.body}`}
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)",
          }}
        >
          <div className={styles.overlay}></div>
          <Link href={Routes.Cards()} className={styles.cardContent}>
            <div className={styles.headerContainer}>
              <h2>NameNameNameNameNameNameNameName</h2>
              <span>
                <IconX />
              </span>
            </div>
            <h3>Description</h3>
          </Link>
          <div className={styles.inline}>
            <div className={styles.author}>
              {" "}
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                alt="Jacob Warnhalter"
                radius="xl"
                size="sm"
              />
              <span>Author</span>
            </div>
            <div className={styles.controls}></div>
          </div>
        </div>
        <div
          className={`${styles.withOverlay} ${styles.body}`}
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)",
          }}
        >
          <div className={styles.overlay}></div>
          <Link href={Routes.Cards()} className={styles.cardContent}>
            <div className={styles.headerContainer}>
              <h2>NameNameNameNameNameNameNameName</h2>
              <span>
                <IconX />
              </span>
            </div>
            <h3>Description</h3>
          </Link>
          <div className={styles.inline}>
            <div className={styles.author}>
              {" "}
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                alt="Jacob Warnhalter"
                radius="xl"
                size="sm"
              />
              <span>Author</span>
            </div>
            <div className={styles.controls}></div>
          </div>
        </div>
      </>
    )
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
          <h2>Compartions:</h2>
          <div className={styles.justifyLeft}>
            <DynamicBadge
              data={compartionsData}
              compartionProps={compartionProps}
              setCompartionProps={setCompartionProps}
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
        <div className={styles.gridCatalogs}>{catalogContent()}</div>
      </main>
    </Layout>
  )
}

export default Catalog
