import { BlitzPage, Routes } from "@blitzjs/next"
import { useEffect, useState } from "react"
import { Stepper, Button, Group, TextInput, Box, Flex } from "@mantine/core"
import { useForm } from "@mantine/form"
import Layout from "@/core/layouts/Layout"
import styles from "src/styles/Catalogs.module.css"

import DragAndDrop from "@components/DragAndDrop"
import { CheckboxCard } from "@/components/CheckboxCard"
import { Picker } from "@/components/Picker"
import Link from "next/link"
import { CardCreator } from "@/components/CardCreator"
import useFormValidity from "@/hooks/useFormValidity"

type Card = {
  term: string
  termDesc: string
  definition: string
  defDesc: string
}

interface FormValues {
  catalogueName: string
  description: string
  imageUrl: string
  cards: Card[]
}

const sharedWith = [
  {
    label: "CDS",
    name: "X",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
  },
  {
    label: "XSD",
    name: "Z",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
  },
]

const NewCatalog: BlitzPage = () => {
  const [active, setActive] = useState(0)

  useEffect(() => {
    console.log({ active })
  }, [active])

  const form = useForm<FormValues>({
    initialValues: {
      catalogueName: "",
      description: "",
      imageUrl: "",
      cards: [
        {
          term: "Giraffe",
          termDesc: "giraffe",
          definition: "Żyrafa",
          defDesc: "żyrafa",
        },
        {
          term: "x",
          termDesc: "x",
          definition: "y",
          defDesc: "żyrafa",
        },
      ],
    },

    validate: (values) => {
      const errors: { [key: string]: any } = {}

      if (active === 0) {
        if (!values.catalogueName.trim()) {
          errors.catalogueName = "Catalog name is required"
        }
      }

      if (active === 1) {
        const cardsErrors = values.cards.reduce((acc, card, index) => {
          const cardErrors: Partial<Card> = {}

          if (!card.term || card.term.trim().length < 2) {
            cardErrors.term = "Term must include at least 2 characters"
          }
          if (!card.definition || card.definition.trim().length < 2) {
            cardErrors.definition = "Definition must include at least 2 characters"
          }

          if (Object.keys(cardErrors).length) {
            acc[index] = cardErrors
          }

          return acc
        }, {})

        if (Object.keys(cardsErrors).length) {
          errors.cards = cardsErrors
        }
      }

      return errors
    },

    validateInputOnChange: true,
  })

  const isFormValid = useFormValidity(form)

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        console.log({ form })
        console.log("form errors")
        return current
      }
      return current < 3 ? current + 1 : current
    })

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))

  return (
    <Layout title="Public catalogs">
      <main className={styles.main}>
        <div className={styles.stepperForm}>
          <Stepper active={active} size="md" orientation="horizontal">
            <Stepper.Step label="First step" description="Main settings">
              <TextInput
                label="Catalog name"
                withAsterisk
                placeholder="Catalog name"
                error={form.errors.catalogueName}
                {...form.getInputProps("catalogueName")}
              />
              <TextInput
                mt="sm"
                label="Description"
                placeholder="Description"
                {...form.getInputProps("description")}
              />
              <DragAndDrop />
            </Stepper.Step>

            <Stepper.Step label="Second step" description="Adding cards to catalog">
              <Box>
                <CardCreator form={form} />
                {/* <Code block>{JSON.stringify(form.values, null, 2)}</Code> */}
              </Box>
            </Stepper.Step>

            <Stepper.Step label="Final step" description="Catalog sharing">
              <Flex gap={"var(--mantine-spacing-md)"} direction={"column"}>
                <CheckboxCard
                  header="Share as public catalog."
                  desc="Your catalog will also be visible to non-logged-in users."
                />
                <Picker data={sharedWith} />
              </Flex>
            </Stepper.Step>
            <Stepper.Completed>
              Catalog created successfully!
              {/* <Code block mt="xl">
                {JSON.stringify(form.values, null, 2)}
              </Code> */}
            </Stepper.Completed>
          </Stepper>

          <Group justify="flex-end" mt="xl">
            {active !== 0 && (
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
            )}
            {active !== 3 && (
              <Button disabled={!isFormValid} onClick={nextStep}>
                Next step
              </Button>
            )}
            {active == 3 && (
              <Link href={Routes.Catalogs()}>
                <Button onClick={prevStep}>Go to catalogs</Button>
              </Link>
            )}
          </Group>
        </div>
      </main>
    </Layout>
  )
}

export default NewCatalog
