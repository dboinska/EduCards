import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Catalogs.module.css"
import Link from "next/link"
import { ActionIcon, Avatar, Box, Flex, Badge } from "@mantine/core"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"
import { IconHeart, IconHeartFilled } from "@tabler/icons-react"
import { AutocompleteLoading } from "src/components/AutocompleteLoading"
import { CatalogHeader } from "@/components/CatalogHeader"
import { Picker } from "@/components/Picker"
import { ToggleMenu } from "@/components/ToggleMenu"

export interface StudyPlansProps {
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

const settings = [
  {
    label: "Edit",
    path: Routes.NewStudyPlan(),
    id: "edit",
  },
  {
    label: "Delete",
    path: Routes.Catalogs(),
    id: "delete",
  },
]

const StudyPlans: BlitzPage = ({
  id,
  image,
  header,
  desc,
  isFavorite,
  authorId,
}: StudyPlansProps) => {
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

  const content = () => {
    return (
      <>
        <div className={` ${styles.body}`}>
          <Link className={styles.cardContent} href={Routes.StudyPlan()}>
            <div className={styles.headerContainer}>
              <h2 style={{ color: "var(--mantine-color-violet-6)" }}>
                NameNameNameNameNameNameNameName
              </h2>

              <Badge size="sm" variant="outline" color="var(--mantine-color-gray-7)">
                10 cards
              </Badge>
            </div>
            <Flex justify="space-between" align="center">
              <h3>
                <span style={{ color: "var(--mantine-color-violet-6)" }}>80% </span>completed
              </h3>
              <h3 style={{ fontSize: "var(--mantine-font-size-xs)", margin: 0 }}>
                Started: 03.03.24
              </h3>
            </Flex>
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
                <ToggleMenu item={"study plan"} settings={settings} />
              )}

              {favCard}
            </Flex>
          </div>
        </div>
        <div className={` ${styles.body}`}>
          <Link className={styles.cardContent} href={Routes.Catalog()}>
            <div className={styles.headerContainer}>
              <h2 style={{ color: "var(--mantine-color-pink-6)" }}>
                NameNameNameNameNameNameNameName
              </h2>

              <Badge size="sm" variant="outline" color="var(--mantine-color-gray-7)">
                10 cards
              </Badge>
            </div>
            <Flex justify="space-between" align="center">
              <h3>
                <span style={{ color: "var(--mantine-color-pink-6)" }}>80% </span>completed
              </h3>
              <h3 style={{ fontSize: "var(--mantine-font-size-xs)", margin: 0 }}>
                Started: 03.03.24
              </h3>
            </Flex>
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

              {favCard}
            </Flex>
          </div>
        </div>
        <div className={` ${styles.body}`}>
          <Link className={styles.cardContent} href={Routes.Catalog()}>
            <div className={styles.headerContainer}>
              <h2 style={{ color: "var(--mantine-color-teal-6)" }}>
                NameNameNameNameNameNameNameName
              </h2>

              <Badge size="sm" variant="outline" color="var(--mantine-color-gray-7)">
                10 cards
              </Badge>
            </div>
            <Flex justify="space-between" align="center">
              <h3>
                <span style={{ color: "var(--mantine-color-teal-6)" }}>80% </span>completed
              </h3>
              <h3 style={{ fontSize: "var(--mantine-font-size-xs)", margin: 0 }}>
                Started: 03.03.24
              </h3>
            </Flex>
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
              {currentUser?.id === authorId && <ToggleMenu item={"catalog"} settings={settings} />}

              {favCard}
            </Flex>
          </div>
        </div>
      </>
    )
  }
  return (
    <Layout title="Study Plans">
      <main className={styles.main}>
        <CatalogHeader authorId={authorId} header={"Study Plans"} link={Routes.NewStudyPlan()} />
        <div className={styles.filters}>
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
        <div className={styles.gridCatalogs}>{content()}</div>
      </main>
    </Layout>
  )
}

export default StudyPlans
