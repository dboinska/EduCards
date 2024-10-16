import { Routes, type BlitzPage } from "@blitzjs/next"
import { useRouter } from "next/router"
import { Box, Button, Input, NativeSelect, Stepper, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { zodResolver } from "mantine-form-zod-resolver"

import Layout from "@/core/layouts/Layout"
import styles from "src/styles/Catalogs.module.css"
import { ImageUpload } from "@/components/ImageUpload"

import { CreateCatalogLayout } from "@/layouts/CreateCatalogLayout"
import { useCatalogContext } from "@/contexts/CreateCatalog.context"

import {
  type CreateCatalogBaseSchema,
  createCatalogBaseSchema,
} from "@/schemas/CreateCatalog.schema"
import { createCatalogBaseDefaults } from "@/schemas/CreateCatalog.defaults"

import type { CreateCatalogContextProps } from "@/contexts/CreateCatalog.context"
import { InferGetServerSidePropsType } from "next"
import { gSSP } from "@/blitz-server"
import { CatalogSchema } from "@/schemas/Catalog.schema"
import getCatalog from "../../queries/getCatalog"
import { randomId } from "@mantine/hooks"

const EditCatalog: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  catalog,
}) => {
  console.log({ catalog })
  const { formState, setFormState } = useCatalogContext() as CreateCatalogContextProps
  const { push } = useRouter()

  const form = useForm({
    mode: "uncontrolled",
    validate: zodResolver(createCatalogBaseSchema),
    initialValues: { createCatalogBaseDefaults, ...catalog, ...formState },
    validateInputOnChange: true,
    validateInputOnBlur: true,
  })

  const handleSubmit = async (values: CreateCatalogBaseSchema) => {
    console.log({ values })
    if (!catalog.catalogId) {
      const redirectHome = async () => {
        await push(Routes.Home())
      }
      redirectHome().catch(console.error)
    }

    setFormState((state) => ({ ...state, ...values }))
    await push(Routes.CatalogEditCards({ id: catalog?.catalogId as string }))
  }

  const handleOnDrop = async (files) => {
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

      form.setFieldValue("imageUrl", result.fileURL)
      console.log("File uploaded successfully", result)
    } catch (error) {
      console.error("Error uploading cover", error)
    }
  }

  const handleOnReject = (files) => {
    console.log(files[0].errors[0].message)
    form.setFieldError("imageUrl", files[0].errors[0].message)
  }

  const handleOnRemove = async () => {
    form.setFieldValue("imageUrl", "")
  }

  return (
    <Layout title="Create new catalog">
      <main className={styles.main}>
        <Box className={styles.container}>
          <Stepper active={0}>
            <Stepper.Step label="First step" description="Main settings" />
            <Stepper.Step label="Second step" description="Adding cards to catalog" />
            <Stepper.Step label="Final step" description="Catalog sharing" />
          </Stepper>
        </Box>

        <form name="newCatalog" onSubmit={form.onSubmit(handleSubmit)} className={styles.container}>
          <TextInput
            label="Catalog name"
            withAsterisk
            placeholder="Catalog name"
            error={form.errors.catalogueName}
            {...form.getInputProps("name", { isRequired: true })}
          />
          <TextInput
            mt="sm"
            label="Description"
            placeholder="Description"
            {...form.getInputProps("description")}
          />
          <ImageUpload
            label="Catalog cover:"
            existingImageUrl={form.values.imageUrl}
            onDrop={handleOnDrop}
            onReject={handleOnReject}
            onRemove={handleOnRemove}
          />
          {form?.errors?.imageUrl && <Input.Error>{form.errors.imageUrl}</Input.Error>}
          <NativeSelect
            label="Number of drawers"
            component="select"
            data={["3", "5", "7"]}
            mt="md"
            {...form.getInputProps("amountOfDrawers")}
          />
          <Box pt="md" ta="right">
            <Button type="submit" disabled={!form.isValid()}>
              Next step
            </Button>
          </Box>
        </form>
      </main>
    </Layout>
  )
}

EditCatalog.getLayout = function getLayout(page) {
  return <CreateCatalogLayout>{page}</CreateCatalogLayout>
}

export const getServerSideProps = gSSP(async ({ params, ctx }) => {
  const id = (params as CatalogSchema).id
  const catalog = await getCatalog({ id }, ctx)
  const cards = catalog?.cards.map((card) => {
    const definedCard = {
      description: card.description || "",
      descriptionTranslated: card.descriptionTranslated || "",
      imageUrl: card.imageUrl || "",
      term: card.term || "",
      termTranslated: card.termTranslated || "",
      key: randomId(),

      ...(card.cardId && { cardId: card.cardId }),
    }

    return definedCard
  })

  return { props: { catalog: { ...catalog, cards: cards || [] } } }
})

export default EditCatalog

/*
  @TODO: Ograniczenia uploadu tylko do plików max 5 MB i plików graicznych
  @TODO: Dostęp do widoku tylko dla zalogowanych userów
  @TODO: Upload covera bezpośrednio do katalogu usera

  ## Szufladki
  Number of drawers - podczas zapisu do bazy danych pole będzie wskazywać ile rekordów w tabeli drawers powinno zostać utworzonych dla poszczególnego katalogu. Pole wirtualne, obowiązkowe, default 3.
 */
