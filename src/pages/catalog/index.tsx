import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Catalogs.module.css"
import Link from "next/link"
import { ActionIcon, Avatar, Box, Flex } from "@mantine/core"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"
import { IconHeart, IconHeartFilled, IconSettings } from "@tabler/icons-react"
import { AutocompleteLoading } from "src/components/AutocompleteLoading"
import { useState } from "react"
import { CatalogHeader } from "@/components/CatalogHeader"
import { Switch } from "@/components/Switch"
import { Picker } from "@/components/Picker"

export interface CatalougeProps {
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

const Catalogs: BlitzPage = ({ id, image, header, desc, isFavorite, authorId }: CatalougeProps) => {
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

  const [catalogueType, setCatalogueType] = useState<string>("All")

  const catalogueContent = (catalogueType) => {
    switch (catalogueType) {
      case "All":
        return <div>All</div>
      case "Public":
        return (
          <>
            <Link
              className={`${styles.withOverlay} ${styles.body}`}
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)",
              }}
              href={Routes.Cards()}
            >
              <div className={styles.overlay}></div>
              <div className={styles.cardContent}>
                <div className={styles.headerContainer}>
                  <h2>NameNameNameNameNameNameNameName</h2>
                  <span>10</span>
                </div>
                <h3>Description</h3>
              </div>
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

                <div className={styles.controls}>
                  {currentUser?.id === authorId && (
                    <IconSettings size="22" style={{ color: "var(--mantine-color-gray-3)" }} />
                  )}
                  {favCard}
                </div>
              </div>
            </Link>
            <Link
              className={`${styles.withOverlay} ${styles.body}`}
              style={{
                backgroundImage:
                  "url(https://www.instalki.pl/wp-content/uploads/2021/02/atoms.jpg)",
              }}
              href={Routes.Cards()}
            >
              <div className={styles.overlay}></div>
              <div className={styles.cardContent}>
                <div className={styles.headerContainer}>
                  <h2>Lorem ipsum</h2>
                  <span>10</span>
                </div>
                <h3>
                  In eleifend velit eu neque mollis, rutrum malesuada leo luctus. Curabitur non
                  mauris facilisis, fringilla ligula ac. In eleifend velit eu neque mollis, rutrum
                  malesuada leo luctus. Curabitur non mauris facilisis, fringilla ligula ac.
                </h3>
              </div>
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

                <div className={styles.controls}>
                  <Link href={Routes.NewCatalog()}>
                    <IconSettings size="22" style={{ color: "var(--mantine-color-gray-3)" }} />
                  </Link>
                  {favCard}
                </div>
              </div>
            </Link>
            <Link
              className={`${styles.withOverlay} ${styles.body}`}
              style={{
                backgroundImage:
                  "url(https://www.podrb.pl/upload/user_content/warzy/winter-3088042-1920-1.jpg)",
              }}
              href={Routes.Cards()}
            >
              <div className={styles.overlay}></div>
              <div className={styles.cardContent}>
                <div className={styles.headerContainer}>
                  <h2>Lorem ipsum</h2>
                  <span>10</span>
                </div>
                <h3>
                  In eleifend velit eu neque mollis, rutrum malesuada leo luctus. Curabitur non
                  mauris facilisis, fringilla ligula ac.
                </h3>
              </div>
              <div className={styles.inline}>
                <Avatar
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                  alt="Jacob Warnhalter"
                  radius="xl"
                  size="sm"
                />
                <span>Author</span>
              </div>
            </Link>
            <Link
              className={`${styles.withOverlay} ${styles.body}`}
              style={{
                backgroundImage:
                  "url(https://dc.sklep.pl/wp-content/uploads/2021/07/kropki-25x25cm.jpg)",
              }}
              href={Routes.Cards()}
            >
              <div className={styles.overlay}></div>
              <div className={styles.cardContent}>
                <div className={styles.headerContainer}>
                  <h2>Lorem ipsum</h2>
                  <span>10</span>
                </div>
                <h3>In eleifend velit eu neque mollis, rutrum malesuada leo luctus.</h3>
              </div>
              <div className={styles.inline}>
                <Avatar
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                  alt="Jacob Warnhalter"
                  radius="xl"
                  size="sm"
                />
                <span>Author</span>
              </div>
            </Link>
            <Link
              className={`${styles.withOverlay} ${styles.body}`}
              style={{
                backgroundImage: "url(https://planetescape.pl//app/uploads/2020/11/Flamingi.jpg)",
              }}
              href={Routes.Cards()}
            >
              <div className={styles.overlay}></div>
              <div className={styles.cardContent}>
                <div className={styles.headerContainer}>
                  <h2>Lorem ipsum</h2>
                  <span>10</span>
                </div>
                <h3>In eleifend velit eu neque mollis, rutrum malesuada leo luctus.</h3>
              </div>
              <div className={styles.inline}>
                <Avatar
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                  alt="Jacob Warnhalter"
                  radius="xl"
                  size="sm"
                />
                <span>Author</span>
              </div>
            </Link>
            <div className={styles.body}>
              <div className={styles.cardContent}>
                <div className={styles.headerContainer}>
                  <h2>Name</h2>
                  <span>10</span>
                </div>
                <h3>Description</h3>
              </div>
              <div className={styles.inline}>
                <span className={styles.userImg}></span>
                <span>Author</span>
              </div>
            </div>{" "}
            <div className={styles.body}>
              <div className={styles.cardContent}>
                <div className={styles.headerContainer}>
                  <h2>Name</h2>
                  <span>10</span>
                </div>
                <h3>Description</h3>
              </div>
              <div className={styles.inline}>
                <span className={styles.userImg}></span>
                <span>Author</span>
              </div>
            </div>{" "}
            <div className={styles.body}>
              <div className={styles.cardContent}>
                <div className={styles.headerContainer}>
                  <h2>Name</h2>
                  <span>10</span>
                </div>
                <h3>Description</h3>
              </div>
              <div className={styles.inline}>
                <span className={styles.userImg}></span>
                <span>Author</span>
              </div>
            </div>{" "}
            <div className={styles.body}>
              <div className={styles.cardContent}>
                <div className={styles.headerContainer}>
                  <h2>Name</h2>
                  <span>10</span>
                </div>
                <h3>Description</h3>
              </div>
              <div className={styles.inline}>
                <span className={styles.userImg}></span>
                <span>Author</span>
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.cardContent}>
                <div className={styles.headerContainer}>
                  <h2>Name</h2>
                  <span>10</span>
                </div>
                <h3>Description</h3>
              </div>
              <div className={styles.inline}>
                <span className={styles.userImg}></span>
                <span>Author</span>
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.cardContent}>
                <div className={styles.headerContainer}>
                  <h2>Name</h2>
                  <span>10</span>
                </div>
                <h3>Description</h3>
              </div>
              <div className={styles.inline}>
                <span className={styles.userImg}></span>
                <span>Author</span>
              </div>
            </div>
          </>
        )
      case "Shared":
        return <div>Shared</div>
      case "Own":
        return <div>Own</div>
    }
  }
  return (
    <Layout title="Catalogs">
      <main className={styles.main}>
        <CatalogHeader header={"Catalogs"} link={Routes.NewCatalog()} />
        <div className={styles.filters}>
          <Switch
            value={catalogueType}
            setValue={setCatalogueType}
            data={["All", "Public", "Shared", "Own"]}
          />
          <AutocompleteLoading />

          <Flex align={"center"} justify={"space-between"}>
            <label style={{ fontSize: "var(--mantine-font-size-sm)", fontWeight: 500 }}>
              Sort by:{" "}
            </label>
            <Box w="270px">
              <Picker data={sharedWith} />
            </Box>
          </Flex>
        </div>
        <div className={styles.gridCatalogs}>{catalogueContent(catalogueType)}</div>
      </main>
    </Layout>
  )
}

export default Catalogs
