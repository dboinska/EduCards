import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Catalogs.module.css"
import Link from "next/link"
import { ActionIcon, Avatar, Box, Flex, Badge, Button, Modal } from "@mantine/core"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"
import { IconHeart, IconHeartFilled, IconCirclePlus } from "@tabler/icons-react"
import { CatalogHeader } from "@/components/CatalogHeader"
import { useDisclosure } from "@mantine/hooks"
import { useEffect, useState } from "react"
import { gSSP } from "@/blitz-server"
import type { InferGetServerSidePropsType } from "next"
import { Picker, PickerOption } from "@/components/Picker"
import { Loader } from "@mantine/core"
import db from "db"
import createCards from "./card/mutations/createCards"
import { useMutation } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import { notifications } from "@mantine/notifications"

import classes from "src/styles/Notifications.module.css"

type Suggestion = {
  term: string
  termTranslated: string
  category: string
  level?: "easy" | "medium" | "hard"
  id: string
}

const initialSuggestion = {
  term: "",
  termTranslated: "",
  category: "",
  id: "",
}

const isFavorite = true

const Suggestions: BlitzPage = ({
  userCatalogs,
  latestCatalogIds,
  userId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [opened, { open, close }] = useDisclosure(false)
  const currentUser = useCurrentUser()
  const { push } = useRouter()
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [selectedOption, setSelectedOption] = useState<PickerOption>(() => ({
    label: userCatalogs[0]?.label || "",
    value: userCatalogs[0]?.value || "",
  }))
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion>(initialSuggestion)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const [cardMutation] = useMutation(createCards)

  const favCard = currentUser ? (
    <ActionIcon variant="subtle" radius="md" size={22}>
      {isFavorite ? (
        <IconHeartFilled className={styles.favorite} stroke={2} />
      ) : (
        <IconHeart className={styles.favorite} stroke={2} />
      )}
    </ActionIcon>
  ) : null

  // zamień na react-query
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/api/suggestions/fetchSuggestions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUser?.id,
            latestCatalogIds,
          }),
        })

        if (!response.ok) {
          setHasError(true)
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log({ data: data.suggestions })
        setSuggestions(data.suggestions)
      } catch (error) {
        console.error("Failed to load suggestions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    void fetchData()
  }, [currentUser])

  const addToExistingCatalog = async (
    catalogId: string,
    { category, ...suggestion }: Suggestion
  ) => {
    console.log("Adding suggestion:", { catalogId, suggestion, userId })
    try {
      const data = {
        cards: [{ ...suggestion, catalogId, key: new Date().getTime().toString() }],
      }

      await cardMutation(data, {
        onSuccess: () => {
          notifications.show({
            title: "Suggestion added",
            message: `The suggestion "${suggestion.term}" has been successfully added.`,
            position: "top-right",
            color: "green",
            classNames: classes,
            autoClose: 5000,
          })
        },
      })
    } catch (error) {
      console.error("Error adding suggestion to catalog:", error)
      throw new Error("Failed to add suggestion to catalog")
    }
  }

  const toggleModal = (suggestion: Suggestion) => {
    setSelectedSuggestion({
      term: suggestion.term,
      termTranslated: suggestion.termTranslated,
      category: suggestion.category,
      id: suggestion.id,
    })
    open()
  }

  const createCatalog = async () => {
    await push(
      Routes.NewCatalog({
        name: selectedSuggestion.category,
        term: selectedSuggestion.term,
        termTranslated: selectedSuggestion.termTranslated,
      })
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log("submit")
    try {
      await addToExistingCatalog(selectedOption.value, selectedSuggestion)
      close()
      setSelectedSuggestion(initialSuggestion)
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <Layout title="Suggestions">
      <main className={styles.main}>
        <CatalogHeader authorId="" header={"Suggestions"} />

        <div className={styles.gridCatalogs}>
          {isLoading && (
            <Flex justify="center" align="center" direction="column" mih="400px">
              <Loader size="md" color="teal" />
              <p>Loading suggestions based on your recently added catalogs.</p>
            </Flex>
          )}

          {!isLoading &&
            suggestions.length > 0 &&
            suggestions.map((suggestion) => (
              <div key={suggestion.id} className={styles.body}>
                <Link className={styles.cardContent} href={Routes.Cards()}>
                  <div className={styles.headerContainer}>
                    <h2>
                      Term:{" "}
                      <span style={{ color: "var(--mantine-color-teal-6)" }}>
                        {suggestion.term}
                      </span>
                    </h2>

                    <Badge size="sm" variant="outline" color="var(--mantine-color-gray-7)">
                      {suggestion.level}
                    </Badge>
                  </div>
                  <Flex direction="column">
                    <h3 style={{ fontSize: "16px" }}>
                      Translation:{" "}
                      <span style={{ color: "var(--mantine-color-teal-6)" }}>
                        {suggestion.termTranslated}
                      </span>
                    </h3>
                  </Flex>
                </Link>
                <Flex className={styles.inline} my="8px">
                  <Flex align="center" gap="4px">
                    <Avatar
                      src="https://static.vecteezy.com/system/resources/previews/021/059/827/non_2x/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg"
                      alt="ChatGPT"
                      radius="xl"
                      size="sm"
                    />
                    <span>ChatGPT</span>
                  </Flex>
                  <Badge variant="light" color="var(--mantine-color-teal-6)">
                    {suggestion.category}
                  </Badge>
                  <Flex className={styles.controls}>
                    <Button
                      variant="subtle"
                      radius="md"
                      color="var(--mantine-color-green-6)"
                      p="2px"
                      h="auto"
                      w="auto"
                      onClick={() => toggleModal(suggestion)}
                    >
                      <IconCirclePlus height="20px" width="20px" />
                    </Button>
                    {favCard}
                  </Flex>
                </Flex>
              </div>
            ))}

          {!isLoading && suggestions.length <= 0 && (
            <p>There are no suggestions, create a new directory to display them</p>
          )}

          {hasError &&
            notifications.show({
              title: "An error occurred while retrieving suggestions",
              message: `Try again`,
              color: "red",
              position: "top-right",
              classNames: classes,
              autoClose: false,
            })}
        </div>

        <Modal
          opened={opened}
          onClose={close}
          title="Add suggestion to catalog"
          centered
          radius="md"
        >
          {
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontSize: "var(--mantine-font-size-sm" }}>Select catalog</h2>
              <Flex align={"center"} w="100%" gap="16px" flex="1 0 auto">
                <label
                  style={{
                    fontSize: "var(--mantine-font-size-md)",
                    fontWeight: 400,
                    flex: "0 0 100px",
                  }}
                >
                  Select catalog:
                </label>
                <Box flex="1 1 auto" w="100%">
                  <Picker
                    options={userCatalogs}
                    onChange={(selectedOption) => {
                      setSelectedOption(selectedOption)
                    }}
                    id="select"
                    hideImages
                    search
                  />
                </Box>
              </Flex>
              <h2 style={{ fontSize: "var(--mantine-font-size-md" }}>or create new catalog</h2>
              <Button
                w="100%"
                variant="outline"
                color="var(--mantine-color-blue-6)"
                radius="md"
                onClick={createCatalog}
              >
                Create new catalog
              </Button>

              <Flex w="100%" justify="right" mt="var(--mantine-spacing-md)">
                <Button type="submit" radius="md">
                  Save
                </Button>
              </Flex>
            </form>
          }
        </Modal>
      </main>
    </Layout>
  )
}

export const getServerSideProps = gSSP(async ({ query, ctx }) => {
  const now = new Date().getTime()
  const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000
  const oneWeekAgo = new Date(now - ONE_WEEK_MS)

  const userId = ctx.session.userId as string

  const catalogs = await db.catalog.findMany({
    ...query,
    where: { ownerId: userId },
  })
  catalogs.forEach((catalog) => {
    console.log("Catalog ID:", catalog.catalogId, "Created At:", catalog.createdAt)
  })

  console.log("Current time (now):", now)
  console.log("Cutoff time (oneDayAgo):", oneWeekAgo)

  const latestCatalogIds = catalogs
    .filter((catalog) => {
      const catalogDate = new Date(catalog.createdAt)
      return catalogDate >= oneWeekAgo
    })
    .map((catalog) => catalog.catalogId)

  const userCatalogs = catalogs.map((catalog) => ({
    label: catalog.name,
    value: catalog.catalogId,
  }))

  return {
    props: { query, userCatalogs, latestCatalogIds, userId: ctx.session.userId },
  }
})

export default Suggestions
