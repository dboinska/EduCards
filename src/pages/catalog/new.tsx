import { BlitzPage, Routes } from "@blitzjs/next"
import { useEffect, useState } from "react"
import { Stepper, Button, Group, TextInput, Code, Center, Box, Flex, Textarea } from "@mantine/core"
import { useForm } from "@mantine/form"
import Layout from "@/core/layouts/Layout"
import styles from "src/styles/Catalogs.module.css"
import { IconGripVertical, IconX } from "@tabler/icons-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

import DragAndDrop from "@components/DragAndDrop"
import { CheckboxCard } from "@/components/CheckboxCard"
import { Picker } from "@/components/Picker"
import Link from "next/link"

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

  const removeCard = ({ index }) => {
    form.removeListItem("cards", index)
    console.log({ form })
  }

  const fields = form.values.cards.map((_, index) => (
    <Draggable key={index} index={index} draggableId={index.toString()}>
      {(provided) => (
        <Group
          ref={provided.innerRef}
          mt="xs"
          {...provided.draggableProps}
          className={styles.mantineDropzoneInner}
          component="fieldset"
        >
          <Flex justify={"space-between"} className={styles.fullWidth}>
            <Center {...provided.dragHandleProps}>
              <IconGripVertical size="1rem" />
              Move to change order
            </Center>
            <IconX onClick={() => removeCard({ index })} />
          </Flex>
          <legend>Card #{index + 1} </legend>
          <Flex direction={"column"} className={styles.fullWidth}>
            <Flex wrap={"wrap"} gap={"8px"} justify={"space-between"} className={styles.fullWidth}>
              <Textarea
                size="sm"
                radius="md"
                label="Term"
                placeholder="Term"
                withAsterisk
                {...form.getInputProps(`cards.${index}.term`)}
                className={styles.textarea}
                error={form.errors.cards?.[index]?.term}
                // styles={{min-height:50%}}
              />
              <Textarea
                size="sm"
                radius="md"
                label="Description"
                placeholder="Description text"
                {...form.getInputProps(`cards.${index}.termDesc`)}
                className={styles.textarea}
                error={form.errors.cards?.[index]?.termDesc}
              />
            </Flex>
          </Flex>
          <DragAndDrop />
          <Flex wrap={"wrap"} gap={"8px"} className={styles.fullWidth}>
            <Textarea
              size="sm"
              radius="md"
              label="Definition"
              withAsterisk
              placeholder="Definition"
              {...form.getInputProps(`cards.${index}.definition`)}
              className={styles.textarea}
              error={form.errors.cards?.[index]?.definition}
            />{" "}
            <Textarea
              size="sm"
              radius="md"
              label="Description"
              placeholder="Description"
              {...form.getInputProps(`cards.${index}.defDesc`)}
              className={styles.textarea}
              error={form.errors.cards?.[index]?.defDesc}
            />{" "}
          </Flex>
        </Group>
      )}
    </Draggable>
  ))

  return (
    <Layout title="Public catalogs">
      <main className={styles.main}>
        <div className={styles.stepperForm}>
          <Stepper active={active} size="md" orientation="horizontal">
            <Stepper.Step label="First step" description="Catalog name">
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

            <Stepper.Step label="Second step" description="Adding cards">
              <Box>
                <DragDropContext
                  onDragEnd={({ destination, source }) =>
                    destination?.index !== undefined &&
                    form.reorderListItem("cards", { from: source.index, to: destination.index })
                  }
                >
                  <Droppable droppableId="dnd-list" direction="vertical">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {fields}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                <Group justify="center" mt="md">
                  <Button
                    onClick={() =>
                      form.insertListItem("cards", {
                        term: "",
                        termDesc: "",
                        definition: "",
                        defDesc: "",
                      })
                    }
                  >
                    Add card
                  </Button>
                </Group>
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
            {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
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
