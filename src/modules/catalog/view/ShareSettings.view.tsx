import { useEffect } from "react"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { notifications } from "@mantine/notifications"
import { useForm } from "@mantine/form"
import { zodResolver } from "mantine-form-zod-resolver"
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  Group,
  MultiSelect,
  Stepper,
  Text,
} from "@mantine/core"

import { useCatalogContext } from "../contexts/CreateCatalog.context"

import Layout from "@/layouts/Root.layout"
import { MultiSelectOption } from "@/components/MultiSelectOption"

import { newCatalogShareSettingsSchema } from "../schemas/CreateCatalog.schema"
import { createCatalogSharingDefaults } from "../schemas/CreateCatalog.defaults"
import createCatalog from "../mutations/createCatalog"

import type { CreateCatalogContextProps } from "../contexts/CreateCatalog.context"
import type {
  CreateCatalogSchema,
  NewCatalogShareSettingsSchema,
} from "../schemas/CreateCatalog.schema"

import styles from "src/styles/Catalogs.module.css"
import classes from "src/styles/Notifications.module.css"

const renderMultiSelectOption = ({ option }) => (
  <MultiSelectOption image={option.image} label={option.label} email={option.email} />
)

interface UserProfile {
  label: string | null
  value: string
  image: string
}

interface ShareSettingsViewProps {
  userProfiles: UserProfile[]
}

export const ShareSettingsView = ({ userProfiles }: ShareSettingsViewProps) => {
  const [catalogMutation] = useMutation(createCatalog)

  const form = useForm({
    mode: "uncontrolled",
    validate: zodResolver(newCatalogShareSettingsSchema),
    initialValues: createCatalogSharingDefaults,
    validateInputOnChange: true,
    validateInputOnBlur: true,
  })
  const { formState, setFormState } = useCatalogContext() as CreateCatalogContextProps
  const { push } = useRouter()

  useEffect(() => {
    if (!formState) {
      const pushBack = async () => {
        await push(Routes.NewCatalog())
      }

      pushBack().catch(console.error)
    }
  }, [formState, push])

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
      await catalogMutation(currentFormState, { onSuccess: handleSuccess })
      notifications.show({
        title: "Catalog Added",
        message: `Catalog has been successfully added.`,
        position: "top-right",
        color: "green",
        classNames: classes,
        autoClose: 5000,
      })
    } catch (error: any) {
      console.error({ error })
      notifications.show({
        title: "Catalog Added",
        message: `Catalog hasn't been successfully added.`,
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
    await push(Routes.NewCatalogAddCards())
  }

  const formattedUserProfiles = userProfiles
    .filter((profile) => profile.label !== null && profile.value)
    .map((profile) => ({
      label: profile.label || "Unknown",
      value: profile.value,
      image: profile.image,
    }))

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
              data={formattedUserProfiles}
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
