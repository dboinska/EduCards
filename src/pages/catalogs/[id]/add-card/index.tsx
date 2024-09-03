import { Routes, type BlitzPage } from "@blitzjs/next"
import { useRouter } from "next/router"
import { Button, Center, Flex, Group, Input, Textarea } from "@mantine/core"
import { randomId } from "@mantine/hooks"

import Layout from "@/core/layouts/Layout"
import styles from "src/styles/Catalogs.module.css"

import { useForm } from "@mantine/form"
import { zodResolver } from "mantine-form-zod-resolver"

import { IconCirclePlus, IconGripVertical, IconX } from "@tabler/icons-react"
import { ImageUpload } from "@/components/ImageUpload"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { createCardSchema, CreateCardSchema } from "@/schemas/CreateCard.schema"
import { createCardDefaults } from "@/schemas/CreateCard.defaults"
import { storedCardDefaults } from "@/schemas/Card.defaults"
import { gSSP } from "@/blitz-server"
import { CatalogSchema } from "@/schemas/Catalog.schema"
import { InferGetServerSidePropsType } from "next"
import getCatalog from "../../queries/getCatalog"
import { useMutation } from "@blitzjs/rpc"
import { notifications } from "@mantine/notifications"

import classes from "src/styles/Notifications.module.css"
import createCards from "@/pages/card/mutations/createCards"

const AddCard: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  catalog,
}) => {
  const [cardMutation] = useMutation(createCards)

  const form = useForm<CreateCardSchema>({
    validate: zodResolver(createCardSchema),
    initialValues: createCardDefaults(catalog?.catalogId as string),
    validateInputOnChange: true,
    validateInputOnBlur: true,
  })

  const { push } = useRouter()

  const handleSubmit = async (values: CreateCardSchema) => {
    if (!catalog?.catalogId) {
      console.error("Catalog ID is missing")
      return
    }

    try {
      await cardMutation(values, {
        onSuccess: async () => {
          await push(Routes.CatalogId({ id: catalog?.catalogId as string }))
        },
      })
      notifications.show({
        title: "Cards Added",
        message: `Cards have been successfully added.`,
        position: "top-right",
        color: "green",
        classNames: classes,
        autoClose: 5000,
      })
    } catch (error: any) {
      console.error("Error creating card:", error)
      notifications.show({
        title: "Failed to Add Cards",
        message: `Cards haven't been successfully added.`,
        position: "top-right",
        color: "red",
        classNames: classes,
        autoClose: 5000,
      })
    }
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

      form.setFieldValue(`cards.${index}.imageURL`, result.fileURL)
      console.log("File uploaded successfully", result)
    } catch (error) {
      console.error("Error uploading cover", error)
    }
  }

  const handleOnRemove = async (index: number) => {
    form.setFieldValue(`cards.${index}.imageURL`, "")
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
    console.log({ index })
    form.removeListItem("cards", index.index)
  }

  return (
    <Layout title="Add cards to catalog">
      <main className={styles.main}>
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
          <Group justify="center" mt="xl">
            <Button
              variant="filled"
              color="var(--mantine-color-blue-6)"
              radius="md"
              disabled={!form.isValid()}
              onClick={() =>
                form.insertListItem("cards", {
                  ...storedCardDefaults,
                  catalogId: catalog?.catalogId,
                  key: randomId(),
                })
              }
            >
              <IconCirclePlus /> Add card
            </Button>
            <Button
              type="submit"
              variant="filled"
              color="var(--mantine-color-lime-6)"
              disabled={!form.isValid()}
            >
              Next step
            </Button>
          </Group>
        </form>
      </main>
    </Layout>
  )
}

export const getServerSideProps = gSSP(async ({ params, ctx }) => {
  const id = (params as CatalogSchema).id
  const catalog = await getCatalog({ id }, ctx)
  return { props: { catalog } }
})

export default AddCard
