import { Routes, type BlitzPage } from "@blitzjs/next"
import Layout from "@/core/layouts/Layout"
import styles from "src/styles/Catalogs.module.css"
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
import { useForm } from "@mantine/form"
import {
  CreateCatalogSchema,
  newCatalogShareSettingsSchema,
  NewCatalogShareSettingsSchema,
} from "@/schemas/CreateCatalog.schema"
import { CreateCatalogContextProps, useCatalogContext } from "@/contexts/CreateCatalog.context"
import { zodResolver } from "mantine-form-zod-resolver"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { createCatalogSharingDefaults } from "@/schemas/CreateCatalog.defaults"

import { useMutation } from "@blitzjs/rpc"
import createCatalog from "../mutations/createCatalog"
import { notifications } from "@mantine/notifications"
import classes from "src/styles/Notifications.module.css"
import getUsers from "@/users/queries/getUsers"
import getSharedProfiles from "@/users/queries/getSharedProfiles"
import { InferGetServerSidePropsType } from "next"
import { gSSP } from "@/blitz-server"
import { CreateCatalogLayout } from "@/layouts/CreateCatalogLayout"

const renderMultiSelectOption = ({ option }) => (
  <Flex gap="md">
    <Avatar src={option.image} size={24} radius="xl" />
    <div>
      <Text size="sm">{option.label}</Text>
      <Text size="xs" color="dimmed">
        {option.email}
      </Text>
    </div>
  </Flex>
)

const NewCatalogShareSettingsPage: BlitzPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ userProfiles }) => {
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

export const getServerSideProps = gSSP(async ({ params, ctx }) => {
  const users = await getUsers({}, ctx)
  const publicProfiles = await getSharedProfiles({}, ctx)

  const userProfiles = publicProfiles.map(({ name, id, imageUrl }) => ({
    label: name,
    value: id,
    image:
      imageUrl ||
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
  }))
  const sharedProfiles = await getSharedProfiles({}, ctx)

  console.log({ sharedProfiles })

  return { props: { sharedProfiles, userProfiles } }
})

NewCatalogShareSettingsPage.getLayout = function getLayout(page) {
  return <CreateCatalogLayout>{page}</CreateCatalogLayout>
}

export default NewCatalogShareSettingsPage
