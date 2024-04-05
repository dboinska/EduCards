import Layout from "@/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Quiz.module.css"
import Link from "next/link"
import { Button, Flex, rem } from "@mantine/core"
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react"
import { RadioButtons } from "@/components/RadioButtons"

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

const options = [
  {
    id: "x",
    value:
      "Praesent efficitur nunc et nulla scelerisque placerat. Sed vestibulum sit amet elit ac venenatis. Mauris erat odio, aliquam et volutpat vel, maximus a dui.",
    label:
      "Praesent efficitur nunc et nulla scelerisque placerat. Sed vestibulum sit amet elit ac venenatis. Mauris erat odio, aliquam et volutpat vel, maximus a dui.",
  },
  { id: "y", value: "y", label: "y" },
  {
    id: "z",
    value:
      "Praesent efficitur nunc et nulla scelerisque placerat. Sed vestibulum sit amet elit ac venenatis. Mauris erat odio, aliquam et volutpat vel, maximus a dui. Donec accumsan augue eu nunc aliquam aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur mauri",
    label:
      "Praesent efficitur nunc et nulla scelerisque placerat. Sed vestibulum sit amet elit ac venenatis. Mauris erat odio, aliquam et volutpat vel, maximus a dui. Donec accumsan augue eu nunc aliquam aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur mauri",
  },
  { id: "a", value: "a", label: "a" },
]

const NewQuiz: BlitzPage = () => {
  const gradient =
    "linear-gradient(45deg, var(--mantine-color-blue-filled) 0%, var(--mantine-color-lime-filled) 100%)"

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
          <Flex className={styles.header} direction="column">
            <h2>Question 1 of 10</h2>
            <span>
              By default, quizzes will be generated using all cards within the specified catalog.
            </span>
          </Flex>
          <RadioButtons options={options} />

          <Flex m="0 auto" gap="var(--mantine-spacing-sm)" p="var(--mantine-spacing-md) 0">
            <Link href={Routes.NewQuiz()}>
              <Button
                radius="md"
                styles={{
                  root: {
                    padding: rem(2),
                    border: 0,
                    backgroundImage: gradient,
                  },

                  inner: {
                    background: "var(--mantine-color-body)",
                    color: "var(--mantine-color-blue-filled)",
                    borderRadius: "calc(var(--button-radius) - 2px)",
                    paddingLeft: "var(--mantine-spacing-md)",
                    paddingRight: "var(--mantine-spacing-md)",
                  },

                  label: {
                    backgroundImage: gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  },
                }}
              >
                <IconArrowLeft />
                Previous
              </Button>
            </Link>
            <Link href={Routes.Cards()}>
              <Button
                variant="gradient"
                gradient={{ from: "lime", to: "blue" }}
                radius="md"
                size="sm"
              >
                Next
                <IconArrowRight />
              </Button>
            </Link>
          </Flex>
        </Flex>
      </main>
    </Layout>
  )
}

export default NewQuiz
