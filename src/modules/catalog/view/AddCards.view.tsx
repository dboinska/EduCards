import { useEffect } from "react"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { randomId } from "@mantine/hooks"
import { useForm } from "@mantine/form"
import { zodResolver } from "mantine-form-zod-resolver"
import { Box, Button, Center, Flex, Group, Input, Stepper, Textarea } from "@mantine/core"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { IconCirclePlus, IconGripVertical, IconX } from "@tabler/icons-react"

import { useCatalogContext } from "../contexts/CreateCatalog.context"

import Layout from "@/layouts/Root.layout"
import { ImageUpload } from "@/components/ImageUpload"

import { storedCardDefaults } from "@/modules/card/schemas/Card.defaults"
import { newCatalogCardsSchema } from "../schemas/CreateCatalog.schema"
import { createCatalogCardsDefaults } from "../schemas/CreateCatalog.defaults"

import type { CreateCatalogContextProps } from "../contexts/CreateCatalog.context"
import type { NewCatalogCardsSchema } from "../schemas/CreateCatalog.schema"

import styles from "src/styles/Catalogs.module.css"

export const AddCardsView = () => {
  const { formState, setFormState } = useCatalogContext() as CreateCatalogContextProps
  const { push } = useRouter()
  const router = useRouter()

  useEffect(() => {
    if (!formState) {
      const pushBack = async () => {
        await push(Routes.NewCatalog())
      }

      pushBack().catch(console.error)
    }
  }, [formState, push])

  useEffect(() => {
    if (router.isReady) {
      form.setFieldValue("cards.0.term", router.query.term)
      form.setFieldValue("cards.0.termTranslated", router.query.termTranslated)
    }
  }, [router.isReady])

  const form = useForm<NewCatalogCardsSchema>({
    validate: zodResolver(newCatalogCardsSchema),
    initialValues: { ...createCatalogCardsDefaults, ...formState },
    validateInputOnChange: true,
    validateInputOnBlur: true,
  })

  const handleSubmit = async (values: NewCatalogCardsSchema) => {
    console.log({ values })

    setFormState((state) => ({ ...state, ...values }))
    await push(Routes.NewCatalogShareSettingsPage())
  }

  const handleBack = async () => {
    await push(Routes.NewCatalog())
  }

  const handleOnDrop = async (files: any, index: number) => {
    const formData = new FormData()
    formData.append("file", files[0])

    try {
      const response = await fetch("/api/catalog/upload-cover", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload cover")
      }

      const result = await response.json()

      form.setFieldValue(`cards.${index}.imageUrl`, result.fileURL)
    } catch (error) {
      console.error("Error uploading cover", error)
    }
  }

  const handleOnRemove = async (index: number) => {
    form.setFieldValue(`cards.${index}.imageUrl`, "")
  }

  const cards = form.getValues().cards.map((item, index) => (
    <Draggable key={item.key} index={index} draggableId={index.toString()}>
      {(provided) => (
        <Group
          ref={provided.innerRef}
          mt="xs"
          {...provided.draggableProps}
          className={styles.mantineDropzoneInner}
          component="fieldset"
          key={item.key}
        >
          <Flex justify={"space-between"} className={styles.fullWidth}>
            <Center {...provided.dragHandleProps}>
              <IconGripVertical size="1rem" />
              Press and slide to change the order
            </Center>
            {cards.length > 1 && <IconX onClick={() => removeCard({ index })} />}
          </Flex>
          <legend>Card #{index + 1} </legend>
          <Flex direction="column" className={styles.fullWidth}>
            <Flex wrap="wrap" gap="8px" justify="space-between" className={styles.fullWidth}>
              <Textarea
                size="sm"
                radius="md"
                label="Term"
                placeholder="Term"
                withAsterisk
                {...form.getInputProps(`cards.${index}.term`)}
                className={styles.textarea}
                error={form.errors?.[`cards.${index}.term`]}
              />
              <Textarea
                size="sm"
                radius="md"
                label="Description"
                placeholder="Description text"
                {...form.getInputProps(`cards.${index}.description`)}
                className={styles.textarea}
              />
            </Flex>
          </Flex>
          <ImageUpload
            label="Card cover:"
            onDrop={(files) => handleOnDrop(files, index)}
            onRemove={() => handleOnRemove(index)}
          />
          {form?.errors?.imageUrl && <Input.Error>{form.errors.imageUrl}</Input.Error>}
          <Flex wrap={"wrap"} gap={"8px"} className={styles.fullWidth}>
            <Textarea
              size="sm"
              radius="md"
              label="Definition"
              withAsterisk
              placeholder="Definition"
              {...form.getInputProps(`cards.${index}.termTranslated`)}
              className={styles.textarea}
              error={form.errors?.[`cards.${index}.termTranslated`]}
            />
            <Textarea
              size="sm"
              radius="md"
              label="Description"
              placeholder="Description"
              {...form.getInputProps(`cards.${index}.descriptionTranslated`)}
              className={styles.textarea}
            />
          </Flex>
        </Group>
      )}
    </Draggable>
  ))

  const removeCard = (index) => {
    form.removeListItem("cards", index.index)
  }

  return (
    <Layout title="Add cards to catalog">
      <main className={styles.main}>
        <Box className={styles.container}>
          <Stepper active={1}>
            <Stepper.Step label="First step" description="Main settings" />
            <Stepper.Step label="Second step" description="Adding cards to catalog" />
            <Stepper.Step label="Final step" description="Catalog sharing" />
          </Stepper>
        </Box>

        <form name="addCards" onSubmit={form.onSubmit(handleSubmit)} className={styles.container}>
          <DragDropContext
            onDragEnd={({ destination, source }) =>
              destination?.index !== undefined &&
              form.reorderListItem("cards", { from: source.index, to: destination.index })
            }
          >
            <Droppable droppableId="dnd-list" direction="vertical">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {cards}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Group justify="center" mt="md">
            <Button
              variant="filled"
              color="var(--mantine-color-blue-6)"
              radius="md"
              disabled={!form.isValid()}
              onClick={() =>
                form.insertListItem("cards", { ...storedCardDefaults, key: randomId() })
              }
            >
              <IconCirclePlus /> Add card
            </Button>
          </Group>
          <Group justify="flex-end" mt="xl">
            <Button variant="default" onClick={handleBack}>
              Back
            </Button>
            <Button type="submit" disabled={!form.isValid()}>
              Next step
            </Button>
          </Group>
        </form>
      </main>
    </Layout>
  )
}
