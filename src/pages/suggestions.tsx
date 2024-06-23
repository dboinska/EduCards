import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Catalogs.module.css"
import Link from "next/link"
import { ActionIcon, Avatar, Box, Flex, Badge, Button, Modal } from "@mantine/core"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"
import { IconHeart, IconHeartFilled, IconCirclePlus } from "@tabler/icons-react"
import { AutocompleteLoading } from "src/components/AutocompleteLoading"
import { CatalogHeader } from "@/components/CatalogHeader"
import { Picker } from "@/components/Picker"
import { ToggleMenu } from "@/components/ToggleMenu"
import { useDisclosure } from "@mantine/hooks"

export interface SuggestionsProps {
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

const Suggestions: BlitzPage = ({
  id,
  image,
  header,
  desc,
  isFavorite,
  authorId,
}: SuggestionsProps) => {
  const [opened, { open, close }] = useDisclosure(false)
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
          <Link className={styles.cardContent} href={Routes.Cards()}>
            <div className={styles.headerContainer}>
              <h2>
                Term:{" "}
                <span style={{ color: "var(--mantine-color-teal-6)" }}>
                  NameNameNameNameNameNameNameName
                </span>
              </h2>

              <Badge size="sm" variant="outline" color="var(--mantine-color-gray-7)">
                easy
              </Badge>
            </div>
            <Flex direction="column">
              <h3 style={{ fontSize: "16px" }}>
                Definition:
                <span style={{ color: "var(--mantine-color-teal-6)" }}> xyzsadas </span>
              </h3>
              <h3>
                Category:
                <span style={{ color: "var(--mantine-color-teal-6)" }}>Physics </span>
              </h3>
            </Flex>
          </Link>
          <div className={styles.inline}>
            <div className={styles.author}>
              <Avatar
                src="https://static.vecteezy.com/system/resources/previews/021/059/827/non_2x/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg"
                alt="Jacob Warnhalter"
                radius="xl"
                size="sm"
              />
              <span>ChatGPT</span>
            </div>
            <Flex className={styles.controls}>
              {currentUser?.id === authorId && <ToggleMenu item={"catalog"} settings={settings} />}

              <Modal
                opened={opened}
                onClose={close}
                title="Add suggestion to catalog"
                centered
                radius="md"
              >
                {
                  <>
                    <h4>Select catalog</h4>
                    <Flex align={"center"} justify={"space-between"}>
                      <label
                        style={{
                          fontSize: "var(--mantine-font-size-md)",
                          width: "300px",
                          fontWeight: 400,
                        }}
                      >
                        Select catalog:
                      </label>
                      <Box maw="270px" miw="180px">
                        <Picker data={sharedWith} />
                      </Box>
                    </Flex>
                    <h4>or create new catalog</h4>
                    <Link href={Routes.NewCatalog()}>
                      <Button
                        w="100%"
                        variant="outline"
                        color="var(--mantine-color-blue-6)"
                        radius="md"
                      >
                        Create catalog
                      </Button>
                    </Link>
                    <Flex w="100%" justify="right" mt="var(--mantine-spacing-md)">
                      <Button radius="md">Save</Button>
                    </Flex>
                  </>
                }
              </Modal>

              <Button
                variant="outline"
                radius="md"
                color="var(--mantine-color-green-6)"
                px="8px"
                h="28px"
                onClick={open}
              >
                <IconCirclePlus width="16px" />
                Add to catalog
              </Button>
              {favCard}
            </Flex>
          </div>
        </div>
      </>
    )
  }
  return (
    <Layout title="Suggestions">
      <main className={styles.main}>
        <CatalogHeader authorId={authorId} header={"Suggestions"} link={Routes.NewStudyPlan()} />
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

export default Suggestions
