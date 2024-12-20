import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import { notifications } from "@mantine/notifications"
import { useForm } from "@mantine/form"
import { zodResolver } from "mantine-form-zod-resolver"
import { Button, Flex, Group, Textarea } from "@mantine/core"

import Layout from "@/layouts/Root.layout"
import { ImageUpload } from "@/components/ImageUpload"

import { cardSchema, CardSchema } from "../schemas/Card.schema"
import { cardDefaults } from "../schemas/Card.defaults"
import updateCard from "../mutations/updateCard"

import styles from "@/styles/Catalogs.module.css"
import classes from "@/styles/Notifications.module.css"

export const EditCardView = ({ query, card }) => {
  const [cardMutation] = useMutation(updateCard)

  console.log({ card, cardDefaults })

  const form = useForm<CardSchema>({
    validate: zodResolver(cardSchema),
    initialValues: {
      ...cardDefaults,
      ...card,
    },
    validateInputOnChange: true,
    validateInputOnBlur: true,
  })

  const { push } = useRouter()

  const handleSubmit = async (values: CardSchema) => {
    if (!query?.catalogId) {
      console.error("Catalog ID is missing")
      return
    }

    if (!query?.id) {
      console.error("Card ID is missing")
      return
    }

    try {
      await cardMutation(
        { ...values, catalogId: query.catalogId as string, cardId: query.id as string },
        {
          onSuccess: async () => {
            notifications.show({
              title: "Card Edited",
              message: "Card has been successfully edited.",
              position: "top-right",
              color: "green",
              classNames: classes,
              autoClose: 5000,
            })
            await push(Routes.CatalogId({ id: query?.catalogId as string }))
          },
          onError: async () => {
            notifications.show({
              title: "Failed to Edit Card",
              message: "Card hasn't been successfully edited.",
              position: "top-right",
              color: "red",
              classNames: classes,
              autoClose: 5000,
            })
          },
        }
      )
    } catch (error: any) {
      console.error("Error editing card:", error)
      notifications.show({
        title: "Failed to Edit Card",
        message: "Card hasn't been successfully edited.",
        position: "top-right",
        color: "red",
        classNames: classes,
        autoClose: 5000,
      })
    }
  }

  const handleOnDrop = async (files: any) => {
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
      console.log("Uploaded file URL:", result.fileURL)

      form.setFieldValue("imageUrl", result.fileURL)
    } catch (error) {
      console.error("Error uploading cover", error)
    }
  }

  const handleOnRemove = async () => {
    form.setFieldValue("imageUrl", "")
  }
  console.log({ form })

  return (
    <Layout title="Edit card">
      <main className={styles.main}>
        <form name="editCard" onSubmit={form.onSubmit(handleSubmit)} className={styles.container}>
          <Group mt="xs" className={styles.mantineDropzoneInner} component="fieldset">
            <legend>Edit Card</legend>
            <Flex direction="column" className={styles.fullWidth}>
              <Flex wrap="wrap" gap="8px" justify="space-between" className={styles.fullWidth}>
                <Textarea
                  size="sm"
                  radius="md"
                  label="Term"
                  placeholder="Term"
                  withAsterisk
                  {...form.getInputProps("term")}
                  className={styles.textarea}
                  error={form.errors?.term}
                />
                <Textarea
                  size="sm"
                  radius="md"
                  label="Description"
                  placeholder="Description text"
                  {...form.getInputProps("description")}
                  className={styles.textarea}
                  error={form.errors?.description}
                />
              </Flex>
            </Flex>
            <ImageUpload
              label="Card cover:"
              existingImageUrl={form.values.imageUrl}
              onDrop={(files) => handleOnDrop(files)}
              onRemove={handleOnRemove}
              {...form.getInputProps("imageUrl")}
            />
            <Flex wrap={"wrap"} gap={"8px"} className={styles.fullWidth}>
              <Textarea
                size="sm"
                radius="md"
                label="Definition"
                withAsterisk
                placeholder="Definition"
                {...form.getInputProps("termTranslated")}
                className={styles.textarea}
                error={form.errors?.termTranslated}
              />
              <Textarea
                size="sm"
                radius="md"
                label="Translated Description"
                placeholder="Description"
                {...form.getInputProps("descriptionTranslated")}
                className={styles.textarea}
                error={form.errors?.descriptionTranslated}
              />
            </Flex>
          </Group>
          <Group justify="right" mt="xl">
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
