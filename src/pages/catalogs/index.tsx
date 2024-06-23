import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Catalogs.module.css"
import Link from "next/link"
import { ActionIcon, Avatar, Box, Flex, Badge } from "@mantine/core"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"
import { IconHeart, IconHeartFilled, IconSettings } from "@tabler/icons-react"
import { AutocompleteLoading } from "src/components/AutocompleteLoading"
import { ReactNode, useState } from "react"
import { CatalogHeader } from "@/components/CatalogHeader"
import { Switch } from "@/components/Switch"
import { Picker } from "@/components/Picker"
import { ToggleMenu } from "@/components/ToggleMenu"

import { useQuery } from "@blitzjs/rpc"
import getCatalogs from "./queries/getCatalogs"

export interface CatalogProps {
  id: number
  image?: string
  header: string
  desc?: string
  isFavorite?: boolean
  authorId: number
  numberOfCards?: number
}

const sharedWith = [
  {
    label: "Date ascending",
    name: "Date ascending",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
    value: "dateAsc",
  },
  {
    label: "Date descending",
    name: "Date descending",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
    value: "dateDesc",
  },
  {
    label: "Alphabetically",
    name: "Alphabetically",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
    value: "alph",
  },
  {
    label: "Reverse alphabetically",
    name: "Reverse alphabetically",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
    value: "reverseAlph",
  },
  {
    label: "Randomly",
    name: "Randomly",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
    value: "random",
  },
]

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

const Catalogs: BlitzPage = ({ id, image, header, desc, isFavorite, authorId }: CatalogProps) => {
  const [catalog] = useQuery(getCatalogs, {})

  console.log({ catalog })

  const currentUser = useCurrentUser()
  function favCard(isFavorite: boolean): ReactNode {
    return currentUser ? (
      <ActionIcon variant="subtle" radius="md" size={22}>
        {isFavorite ? (
          <IconHeartFilled className={styles.favorite} stroke={2} />
        ) : (
          <IconHeart className={styles.favorite} stroke={2} />
        )}
      </ActionIcon>
    ) : null
  }

  const [catalogType, setCatalogType] = useState<string>("all")

  const itemContent = (catalogItem) => (
    <div
      key={catalogItem.id}
      className={`${styles.withOverlay} ${styles.body}`}
      style={{
        backgroundImage: `url(${catalogItem.url})`,
      }}
    >
      <div className={styles.overlay}></div>
      <Link className={styles.cardContent} href={Routes.Catalog()}>
        <div className={styles.headerContainer}>
          <h2>{catalogItem.name}</h2>

          <Badge size="sm" variant="outline" color="var(--mantine-color-gray-3)">
            {catalogItem.numberOfCards} cards
          </Badge>
        </div>
        <h3>{catalogItem.description}</h3>
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
          {currentUser?.id === authorId && (
            <ToggleMenu item={"catalog"} settings={catalogSettings} />
          )}

          {favCard(catalogItem.isFavorite)}
        </Flex>
      </div>
    </div>
  )

  const publicCatalogs = catalog.map(
    (catalogItem) => catalogItem.type === "public" && itemContent(catalogItem)
  )

  const sharedCatalogs = catalog.map(
    (catalogItem) => catalogItem.type === "shared" && itemContent(catalogItem)
  )

  const ownCatalogs = catalog.map(
    (catalogItem) => catalogItem.type === "own" && itemContent(catalogItem)
  )

  console.log({ catalogType })

  const catalogContent = (catalogType) => {
    switch (catalogType) {
      case "all":
        return (
          <>
            {" "}
            {publicCatalogs}
            {sharedCatalogs}
            <div
              className={`${styles.withOverlay} ${styles.body}`}
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)",
              }}
            >
              <div className={styles.overlay}></div>
              <Link className={styles.cardContent} href={Routes.Catalog()}>
                <div className={styles.headerContainer}>
                  <h2>NameNameNameNameNameNameNameName</h2>
                  <Badge size="sm" variant="outline" color="var(--mantine-color-gray-3)">
                    10 cards
                  </Badge>
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
                  {currentUser?.id === authorId && (
                    <ToggleMenu item={"catalog"} settings={catalogSettings} />
                  )}

                  {favCard(true)}
                </Flex>
              </div>
            </div>
            <div
              className={`${styles.withOverlay} ${styles.body}`}
              style={{
                backgroundImage:
                  "url(https://www.instalki.pl/wp-content/uploads/2021/02/atoms.jpg)",
              }}
            >
              <div className={styles.overlay}></div>
              <Link className={styles.cardContent} href={Routes.Catalog()}>
                <div className={styles.headerContainer}>
                  <h2>Lorem ipsum</h2>
                  <span>10</span>
                </div>
                <h3>
                  In eleifend velit eu neque mollis, rutrum malesuada leo luctus. Curabitur non
                  mauris facilisis, fringilla ligula ac. In eleifend velit eu neque mollis, rutrum
                  malesuada leo luctus. Curabitur non mauris facilisis, fringilla ligula ac.
                </h3>
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

                <div className={styles.controls}>
                  <Link href={Routes.NewCatalog()}>
                    <IconSettings size="22" style={{ color: "var(--mantine-color-gray-3)" }} />
                  </Link>
                  {favCard(false)}
                </div>
              </div>
            </div>
            <div
              className={`${styles.withOverlay} ${styles.body}`}
              style={{
                backgroundImage:
                  "url(https://www.podrb.pl/upload/user_content/warzy/winter-3088042-1920-1.jpg)",
              }}
            >
              <div className={styles.overlay}></div>
              <Link className={styles.cardContent} href={Routes.Catalog()}>
                {" "}
                <div className={styles.headerContainer}>
                  <h2>Lorem ipsum</h2>
                  <span>10</span>
                </div>
                <h3>
                  In eleifend velit eu neque mollis, rutrum malesuada leo luctus. Curabitur non
                  mauris facilisis, fringilla ligula ac.
                </h3>
              </Link>
              <div className={styles.inline}>
                <Avatar
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                  alt="Jacob Warnhalter"
                  radius="xl"
                  size="sm"
                />
                <span>Author</span>
              </div>
            </div>
            <div
              className={`${styles.withOverlay} ${styles.body}`}
              style={{
                backgroundImage:
                  "url(https://dc.sklep.pl/wp-content/uploads/2021/07/kropki-25x25cm.jpg)",
              }}
            >
              <div className={styles.overlay}></div>
              <Link className={styles.cardContent} href={Routes.Catalog()}>
                <div className={styles.headerContainer}>
                  <h2>Lorem ipsum</h2>
                  <span>10</span>
                </div>
                <h3>In eleifend velit eu neque mollis, rutrum malesuada leo luctus.</h3>
              </Link>
              <div className={styles.inline}>
                <Avatar
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                  alt="Jacob Warnhalter"
                  radius="xl"
                  size="sm"
                />
                <span>Author</span>
              </div>
            </div>
            <div
              className={`${styles.withOverlay} ${styles.body}`}
              style={{
                backgroundImage: "url(https://planetescape.pl//app/uploads/2020/11/Flamingi.jpg)",
              }}
            >
              <div className={styles.overlay}></div>
              <Link className={styles.cardContent} href={Routes.Catalog()}>
                <div className={styles.headerContainer}>
                  <h2>Lorem ipsum</h2>
                  <span>10</span>
                </div>
                <h3>In eleifend velit eu neque mollis, rutrum malesuada leo luctus.</h3>
              </Link>
              <div className={styles.inline}>
                <Avatar
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                  alt="Jacob Warnhalter"
                  radius="xl"
                  size="sm"
                />
                <span>Author</span>
              </div>
            </div>
            <div className={styles.body}>
              <Link className={styles.cardContent} href={Routes.Catalog()}>
                <div className={styles.headerContainer}>
                  <h2>Name</h2>
                  <span>10</span>
                </div>
                <h3>Description</h3>
              </Link>
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
      case "public":
        return <>{publicCatalogs}</>
      case "shared":
        return <div>{sharedCatalogs}</div>
      case "own":
        return <div>{ownCatalogs}</div>
    }
  }
  return (
    <Layout title="Catalogs">
      <main className={styles.main}>
        <CatalogHeader authorId={authorId} header={"Catalogs"} link={Routes.NewCatalog()} />
        <div className={styles.filters}>
          <Switch
            value={catalogType}
            setValue={setCatalogType}
            pathname="/catalogs"
            data={[
              { label: "All", value: "all" },
              { label: "Public", value: "public" },
              { label: "Shared", value: "shared" },
              { label: "Own", value: "own" },
            ]}
          />
          <AutocompleteLoading pathname="/catalog" />

          <Flex align={"center"} justify={"space-between"}>
            <label style={{ fontSize: "var(--mantine-font-size-sm)", fontWeight: 500 }}>
              Sort by:{" "}
            </label>
            <Box w="270px">
              <Picker data={sharedWith} pathname="/" />
            </Box>
          </Flex>
        </div>
        <div className={styles.gridCatalogs}>{catalogContent(catalogType)}</div>
      </main>
    </Layout>
  )
}

export default Catalogs
