import { Routes, type BlitzPage } from "@blitzjs/next"
import router, { useRouter } from "next/router"
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
import { useEffect } from "react"

const NewCatalog: BlitzPage = () => {
  const { formState, setFormState } = useCatalogContext() as CreateCatalogContextProps
  const { push } = useRouter()

  useEffect(() => {
    if (router.isReady && router.query.name) {
      form.setFieldValue("name", router.query.name as string)
    }
  }, [router.isReady, router.query.name])

  const form = useForm({
    mode: "uncontrolled",
    validate: zodResolver(createCatalogBaseSchema),
    initialValues: { createCatalogBaseDefaults, ...formState },
    validateInputOnChange: true,
    validateInputOnBlur: true,
  })

  const handleSubmit = async (values: CreateCatalogBaseSchema) => {
    console.log({ values })
    console.log({ query: router.query })

    setFormState((state) => ({ ...state, ...values }))
    await push({
      ...Routes.NewCatalogAddCards(),
      query: {
        ...router.query,
      },
    })
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
            error={form.errors.catalogName}
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

NewCatalog.getLayout = function getLayout(page) {
  return <CreateCatalogLayout>{page}</CreateCatalogLayout>
}

export default NewCatalog
