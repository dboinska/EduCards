import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Quiz.module.css"
import Link from "next/link"
import { Picker, PickerOption } from "@/components/Picker"
import { Box, Button, Flex, Input } from "@mantine/core"
import { IconCards } from "@tabler/icons-react"
import { useEffect, useReducer, useState } from "react"
import { dataReducer, initialState } from "@/reducers/dataReducer"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { gSSP } from "@/blitz-server"
import { CommonInput } from "@/schemas/CommonInput"
import getCatalogs from "../catalogs/queries/getCatalogs"
import { z } from "zod"
import router, { useRouter } from "next/router"

interface SelectedCatalog {
  value: string
  label: string
  numberOfCards: number
}

const Quiz: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  query,
  simplifiedCatalogs,
}) => {
  const [_, dispatch] = useReducer(dataReducer, {
    ...initialState,
    ...query,
  })

  const [selectedCatalog, setSelectedCatalog] = useState<SelectedCatalog>({
    label: simplifiedCatalogs[0]?.label!,
    value: simplifiedCatalogs[0]?.value!,
    numberOfCards: simplifiedCatalogs[0]?.numberOfCards!,
  })
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(1)
  const [maxCards, setMaxCards] = useState<number>(Number(selectedCatalog?.numberOfCards) || 10)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (selectedCatalog && selectedCatalog.numberOfCards > 0) {
      setMaxCards(selectedCatalog.numberOfCards)
      setNumberOfQuestions(selectedCatalog.numberOfCards)
    }
  }, [selectedCatalog])

  const handleChange = (event) => {
    const value = Number(event.currentTarget.value)
    const numericValue = Number(value)
    if (!isNaN(numericValue)) {
      setNumberOfQuestions(value)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (numberOfQuestions < 1 || numberOfQuestions > maxCards) {
      setError(`Number of questions must be between 1 and ${maxCards}`)
      return
    }

    await router.push(Routes.QuizPage({ id: selectedCatalog.value as string, numberOfQuestions }))
  }

  return (
    <Layout title="New quiz">
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Quiz</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <Flex
            mih="260px"
            m="0 auto"
            direction={"column"}
            p="var(--mantine-spacing-md)"
            className={styles.border}
            justify={"space-between"}
          >
            <Box className={styles.header}>
              <h2>Select a catalog and enter the number of cards to generate a quiz.</h2>
              <span>
                By default, quizzes will be generated using all cards within the specified catalog.
              </span>
            </Box>
            <Flex
              gap={"var(--mantine-spacing-sm)"}
              w="100%"
              justify={"center"}
              direction="column"
              align="center"
              m="var(--mantine-spacing-xl) 0"
            >
              <Flex align="center" direction="column" gap="var(--mantine-spacing-xs)">
                <Flex
                  align="center"
                  gap="var(--mantine-spacing-xs)"
                  w="100%"
                  justify="space-between"
                >
                  <label
                    style={{
                      fontSize: "var(--mantine-font-size-sm)",
                      fontWeight: 500,
                      width: "100%",
                    }}
                  >
                    Select catalog:
                  </label>
                  <Picker
                    options={simplifiedCatalogs}
                    onChange={(selectedOption) => {
                      setSelectedCatalog(selectedOption)
                    }}
                    id="sort"
                    hideImages
                    search
                  />
                </Flex>

                <Input.Wrapper
                  w="100%"
                  error={
                    numberOfQuestions < 1 || numberOfQuestions > maxCards
                      ? `Value must be between 1 and ${maxCards}`
                      : null
                  }
                >
                  <Flex
                    align="center"
                    gap="var(--mantine-spacing-xs)"
                    w="100%"
                    justify="space-between"
                  >
                    <label
                      style={{
                        fontSize: "var(--mantine-font-size-sm)",
                        fontWeight: 500,
                        width: "100%",
                      }}
                    >
                      Enter number of questions:
                    </label>
                    <Input
                      w="60px"
                      value={numberOfQuestions}
                      min={1}
                      max={maxCards || 10}
                      onChange={handleChange}
                      placeholder={maxCards.toString()}
                    />
                  </Flex>
                </Input.Wrapper>
              </Flex>
            </Flex>

            <Box m="0 auto">
              <Button
                type="submit"
                variant="gradient"
                gradient={{ from: "lime", to: "blue" }}
                radius="md"
                size="md"
                w="160px"
                m="var(--mantine-spacing-md) 0"
                // component={Link}
                // href={Routes.QuizPage({ id: selectedCatalog?.value as string })}
              >
                <IconCards />
                Start quiz
              </Button>
            </Box>
          </Flex>
        </form>
      </main>
    </Layout>
  )
}

export const getServerSideProps = gSSP(async ({ query, ctx }) => {
  const catalogs = await getCatalogs(query, ctx)

  const simplifiedCatalogs = catalogs
    .filter((catalog) => catalog?.numberOfCards >= 4)
    .map((catalog) => ({
      value: catalog.catalogId,
      label: catalog.name,
      numberOfCards: catalog.numberOfCards,
    }))

  return {
    props: { query, simplifiedCatalogs, userId: ctx.session.userId },
  }
}) satisfies GetServerSideProps<{ query: z.infer<typeof CommonInput> }>

export default Quiz
