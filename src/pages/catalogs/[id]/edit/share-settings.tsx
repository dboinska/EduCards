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
import { CreateCatalogLayout } from "@/layouts/CreateCatalogLayout"
import { zodResolver } from "mantine-form-zod-resolver"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { createCatalogSharingDefaults } from "@/schemas/CreateCatalog.defaults"

import { useMutation } from "@blitzjs/rpc"
import updateCatalog from "../../mutations/updateCatalog"
import { notifications } from "@mantine/notifications"

import classes from "src/styles/Notifications.module.css"
import { gSSP } from "@/blitz-server"
import { CatalogSchema } from "@/schemas/Catalog.schema"
import getCatalog from "../../queries/getCatalog"
import { InferGetServerSidePropsType } from "next"
import getSharedProfiles from "@/users/queries/getSharedProfiles"
import getCatalogViewers from "../../queries/getCatalogViewers"
import getUsers from "@/users/queries/getUsers"

const renderMultiSelectOption = ({ option, ...others }) => (
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

const CatalogEditShareSettingsPage: BlitzPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ catalog, sharedProfiles, userProfiles }) => {
  const [updateCatalogMutation] = useMutation(updateCatalog)

  const [value, setValue] = useState(false)

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

CatalogEditShareSettingsPage.getLayout = function getLayout(page) {
  return <CreateCatalogLayout>{page}</CreateCatalogLayout>
}

export const getServerSideProps = gSSP(async ({ params, ctx }) => {
  const id = (params as CatalogSchema).id
  const catalog = await getCatalog({ id }, ctx)
  const users = await getUsers({}, ctx)
  const publicProfiles = await getSharedProfiles({}, ctx)
  const viewers = await getCatalogViewers({ id }, ctx)

  for (const viewerId of viewers) {
    const viewer = publicProfiles.find((profile) => profile.id === viewerId)

    if (!viewer) {
      const privateProfile = users.find((user) => user.id === viewerId)

      if (privateProfile) {
        publicProfiles.push(privateProfile)
      }
    }
  }

  const userProfiles = publicProfiles.map(({ name, id, imageUrl }) => ({
    label: name,
    value: id,
    image:
      imageUrl ||
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
  }))

  if (catalog?.ownerId !== ctx.session.userId) {
    return {
      redirect: {
        destination: Routes.Home(),
        permanent: false,
      },
    }
  }

  const sharedProfiles = await getSharedProfiles({}, ctx)

  console.log({ sharedProfiles })

  return { props: { catalog: { ...catalog }, sharedProfiles, userProfiles } }
})

export default CatalogEditShareSettingsPage
