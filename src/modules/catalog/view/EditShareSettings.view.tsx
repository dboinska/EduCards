import { useEffect } from "react"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { useForm } from "@mantine/form"
import { zodResolver } from "mantine-form-zod-resolver"
import { notifications } from "@mantine/notifications"
import { Box, Button, Checkbox, Flex, Group, MultiSelect, Stepper, Text } from "@mantine/core"

import { useCatalogContext } from "../contexts/CreateCatalog.context"

import Layout from "@/layouts/Root.layout"
import { MultiSelectOption } from "@/components/MultiSelectOption"

import updateCatalog from "../mutations/updateCatalog"
import { newCatalogShareSettingsSchema } from "../schemas/CreateCatalog.schema"
import { createCatalogSharingDefaults } from "../schemas/CreateCatalog.defaults"

import styles from "@/styles/Catalogs.module.css"
import classes from "src/styles/Notifications.module.css"

import type { Catalog } from "db"
import type { CreateCatalogContextProps } from "../contexts/CreateCatalog.context"
import type {
  CreateCatalogSchema,
  NewCatalogShareSettingsSchema,
} from "../schemas/CreateCatalog.schema"

const renderMultiSelectOption = ({ option }) => (
  <MultiSelectOption image={option.image} label={option.label} email={option.email} />
)

interface UserProfile {
  label: string
  value: string
  image: string
}

interface EditShareSettingsViewProps {
  userProfiles: UserProfile[]
  catalog: Catalog
  sharedProfiles: UserProfile[]
}

export const EditShareSettingsView = ({
  catalog,
  sharedProfiles,
  userProfiles,
}: EditShareSettingsViewProps) => {
  const [updateCatalogMutation] = useMutation(updateCatalog)
  const { formState, setFormState } = useCatalogContext() as CreateCatalogContextProps
  const { push, query } = useRouter()

  console.log({ userProfiles })
  console.log({ sharedProfiles })

  const form = useForm({
    mode: "uncontrolled",
    validate: zodResolver(newCatalogShareSettingsSchema),
    initialValues: { ...createCatalogSharingDefaults, ...formState },
    validateInputOnChange: true,
    validateInputOnBlur: true,
  })

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
    await push(Routes.CatalogId({ id: catalog?.catalogId }))
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
      console.log({ form })
      notifications.show({
        title: "Catalog Edited",
        message: `Catalog has been successfully edited.`,
        position: "top-right",
        color: "green",
        classNames: classes,
        autoClose: 5000,
      })
    } catch (error: any) {
      console.error({ error })
      notifications.show({
        title: "Failed to Edit Catalog",
        message: `Catalog hasn't been successfully edited.`,
        position: "top-right",
        color: "red",
        classNames: classes,
        autoClose: 5000,
      })
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
            <Flex
              gap="lg"
              // p="md"
              my="lg"
              align="center"
              style={{
                border: "1px solid var(--mantine-color-gray-4)",
                borderRadius: "var(--mantine-radius-md)",
              }}
            >
              <Checkbox
                className={styles.root}
                radius="sm"
                ml="sm"
                {...form.getInputProps("isShared", { type: "checkbox" })}
              ></Checkbox>
              <Flex direction="column" py="md">
                <Text className={styles.label}>Share as public catalog.</Text>
                <Text className={styles.description} size="sm" color="dimmed">
                  Your catalog will also be visible to non-logged-in users.
                </Text>
              </Flex>
            </Flex>

            <MultiSelect
              label="Select users to share the catalog"
              placeholder="Pick users"
              data={userProfiles}
              nothingFoundMessage="No shared profiles found"
              renderOption={renderMultiSelectOption}
              maxDropdownHeight={300}
              checkIconPosition="right"
              clearable
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
