import { Routes, type BlitzPage } from "@blitzjs/next"
import Layout from "@/core/layouts/Layout"
import styles from "src/styles/Catalogs.module.css"
import { Box, Button, Checkbox, Flex, Group, MultiSelect, Stepper, Text } from "@mantine/core"
import { useForm } from "@mantine/form"
import {
  CreateCatalogSchema,
  newCatalogShareSettingsSchema,
  NewCatalogShareSettingsSchema,
} from "@/schemas/CreateCatalog.schema"
import { CreateCatalogContextProps, useCatalogContext } from "@/contexts/CreateCatalog.context"
import { CreateCatalogLayout } from "@/layouts/CreateCatalogLayout"
import { zodResolver } from "mantine-form-zod-resolver"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { createCatalogSharingDefaults } from "@/schemas/CreateCatalog.defaults"

import { useMutation } from "@blitzjs/rpc"
import createCatalog from "../../mutations/createCatalog"
import { gSSP } from "@/blitz-server"
import { CatalogSchema } from "@/schemas/Catalog.schema"
import getCatalog from "../../queries/getCatalog"
import { InferGetServerSidePropsType } from "next"
import updateCatalog from "../../mutations/updateCatalog"

const sharedWith = [
  {
    label: "CDS",
    value: "c508fe56-c466-4ee1-ab24-e0c52aa9a3d6",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
  },
  {
    label: "XSD",
    value: "cf12f0ba-b092-4304-9862-7a7343a93c4f",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
  },
]

const CatalogEditShareSettingsPage: BlitzPage = () => {
  const [updateCatalogMutation] = useMutation(updateCatalog)
  const [checked, setChecked] = useState(false)

  const form = useForm({
    mode: "uncontrolled",
    validate: zodResolver(newCatalogShareSettingsSchema),
    initialValues: createCatalogSharingDefaults,
    validateInputOnChange: true,
    validateInputOnBlur: true,
  })
  const { formState, setFormState } = useCatalogContext() as CreateCatalogContextProps
  const { push, query } = useRouter()

  useEffect(() => {
    if (!query.id) {
      const redirectHome = async () => {
        await push(Routes.Home())
      }
      redirectHome().catch(console.error)
    }
    if (!formState) {
      const pushBack = async () => {
        await push(Routes.EditCatalog({ id: query?.catalogId as string }))
      }

      pushBack().catch(console.error)
    }
  }, [formState, push, query])

  const handleSuccess = async () => {
    await push(Routes.Catalogs())
  }

  const handleSubmit = async (values: NewCatalogShareSettingsSchema) => {
    console.log({ values })
    const currentFormState = {
      ...formState,
      ...values,
    } as CreateCatalogSchema

    try {
      await updateCatalogMutation(
        { catalogId: query?.catalogId as string, ...currentFormState },
        {
          onSuccess: handleSuccess,
        }
      )
    } catch (error: any) {
      console.error({ error })
    } finally {
      setFormState(currentFormState)
    }
  }

  const handleBack = async () => {
    await push(Routes.CatalogEditCards({ id: query?.catalogId as string }))
  }

  return (
    <Layout title="Share settings">
      <main className={styles.main}>
        <Box className={styles.container}>
          <Stepper active={3}>
            <Stepper.Step label="First step" description="Main settings" />
            <Stepper.Step label="Second step" description="Adding cards to catalog" />
            <Stepper.Step label="Final step" description="Catalog sharing" />
          </Stepper>
        </Box>
        <form name="newCatalog" onSubmit={form.onSubmit(handleSubmit)}>
          <Flex gap={"var(--mantine-spacing-md)"} direction={"column"} className={styles.container}>
            <Checkbox.Card
              className={styles.root}
              radius="md"
              checked={checked}
              onClick={() => setChecked((c) => !c)}
              {...form.getInputProps("isShared")}
            >
              <Group wrap="nowrap" align="flex-start">
                <Checkbox.Indicator />
                <div>
                  <Text className={styles.label}>Share as public catalog.</Text>
                  <Text className={styles.description}>
                    Your catalog will also be visible to non-logged-in users.
                  </Text>
                </div>
              </Group>
            </Checkbox.Card>
            <MultiSelect
              label="Select users to share the catalog"
              placeholder="Pick users"
              data={sharedWith}
              checkIconPosition="right"
              {...form.getInputProps("sharedWith")}
            />
            <Group justify="flex-end" mt="xl">
              <Button variant="default" onClick={handleBack}>
                Back
              </Button>
              <Button type="submit" disabled={!form.isValid()}>
                Create catalog
              </Button>
            </Group>
          </Flex>
        </form>
      </main>
    </Layout>
  )
}

CatalogEditShareSettingsPage.getLayout = function getLayout(page) {
  return <CreateCatalogLayout>{page}</CreateCatalogLayout>
}

export default CatalogEditShareSettingsPage
