import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Catalogs.module.css"
import Link from "next/link"
import { Avatar, Flex, Box, Badge } from "@mantine/core"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"
import { AutocompleteLoading } from "src/components/AutocompleteLoading"
import { CatalogHeader } from "@/components/CatalogHeader"
import { Picker } from "@/components/Picker"
import { UseCompartion } from "@/core/providers/compartionProvider"

export interface CompartionProps {
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

const Compartion: BlitzPage = ({ id, header, desc }: CompartionProps) => {
  const currentUser = useCurrentUser()
  const { compartionProps } = UseCompartion()

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
        <CatalogHeader header={"Catalog xfdgfg"} link={Routes.NewCard()} authorId={1} settings />
        <Box m="var(--mantine-spacing-md) 0">
          <h2 style={{ color: compartionProps.color, margin: "0" }}>
            Cards at {compartionProps.header}:
          </h2>
          <Flex
            align="center"
            justify="space-between"
            style={{ color: "var(--mantine-color-gray-5)", fontWeight: 500 }}
          >
            Learn {compartionProps.label.toLowerCase()}
            <Flex gap="var(--mantine-spacing-sm)">
              <Badge color="var(--mantine-color-gray-6)">x learned</Badge>
              <Badge color="var(--mantine-color-gray-6)" variant="outline">
                y left
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
        <div className={styles.gridCatalogs}>{catalogContent()}</div>
      </main>
    </Layout>
  )
}

export default Compartion
