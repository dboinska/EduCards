import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Quiz.module.css"
import Link from "next/link"
import { Picker } from "@/components/Picker"
import { Box, Button, Flex, Input } from "@mantine/core"
import { IconCards } from "@tabler/icons-react"

const catalogs = [
  {
    label: "Catalog X",
    name: "Catalog X",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
  },
  {
    label: "Catalog Y",
    name: "Catalog Y",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
  },
  {
    label: "Catalog Z",
    name: "Catalog Z",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
  },
]

const Quiz: BlitzPage = () => {
  return (
    <Layout title="Public catalogs">
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Quiz</h1>
        </div>
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
            <Flex align="center">
              <label
                style={{ fontSize: "var(--mantine-font-size-sm)", fontWeight: 500, width: "100%" }}
              >
                Select catalog:
              </label>
              <Picker data={catalogs} />
            </Flex>
            <Input w="230px" placeholder="Number of questions:" />
          </Flex>

          <Box m="0 auto">
            <Link href={Routes.NewQuiz()}>
              <Button
                variant="gradient"
                gradient={{ from: "lime", to: "blue" }}
                radius="md"
                size="md"
                w="160px"
                m="var(--mantine-spacing-md) 0"
              >
                <IconCards />
                Start quiz
              </Button>
            </Link>
          </Box>
        </Flex>
      </main>
    </Layout>
  )
}

export default Quiz
