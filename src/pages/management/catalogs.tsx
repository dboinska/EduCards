import { usePathname } from "next/navigation"

import {
  IconUsers,
  IconBooks,
  IconShieldLock,
  IconCirclePlus,
  IconPencil,
  IconTrash,
  IconGripVertical,
  IconX,
} from "@tabler/icons-react"

import { SideNavLink } from "@/components/management/SideNavLink"
import { ManagementPanelLayout } from "@/layouts/ManagementPanel.layout"

import {
  SimpleGrid,
  Stack,
  Group,
  Text,
  Flex,
  Title,
  Box,
  Button,
  ActionIcon,
  Drawer,
  useDrawersStack,
  Stepper,
  TextInput,
  NativeSelect,
  Input,
  Center,
  Textarea,
  Checkbox,
} from "@mantine/core"

import { useForm } from "@mantine/form"
import { zodResolver } from "mantine-form-zod-resolver"

import { createCatalogBaseSchema } from "@/modules/catalog/schemas/CreateCatalog.schema"
import { createCatalogBaseDefaults } from "@/modules/catalog/schemas/CreateCatalog.defaults"

import { newCatalogCardsSchema } from "@/modules/catalog/schemas/CreateCatalog.schema"
import { createCatalogCardsDefaults } from "@/modules/catalog/schemas/CreateCatalog.defaults"

import { newCatalogShareSettingsSchema } from "@/modules/catalog/schemas/CreateCatalog.schema"
import { createCatalogSharingDefaults } from "@/modules/catalog/schemas/CreateCatalog.defaults"

import deleteCatalog from "@/modules/catalog/mutations/deleteCatalog"

import type {
  CreateCatalogBaseSchema,
  CreateCatalogSchema,
  NewCatalogShareSettingsSchema,
} from "@/modules/catalog/schemas/CreateCatalog.schema"
import type { NewCatalogCardsSchema } from "@/modules/catalog/schemas/CreateCatalog.schema"

import classes from "@/styles/CatalogsManagementPage.module.css"
import { gSSP } from "@/blitz-server"
import { AuthenticationError } from "blitz"
import getCatalogs from "@/modules/catalog/queries/getCatalogs"
import { InferGetServerSidePropsType } from "next"

import { useReducer, useState } from "react"
import { ImageUpload } from "@/components/ImageUpload"
import { storedCardDefaults } from "@/modules/card/schemas/Card.defaults"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { randomId } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { useMutation } from "@blitzjs/rpc"
import createCatalog from "@/modules/catalog/mutations/createCatalog"
import type { CatalogWithOwner } from "@/modules/management/types/CatalogWithOwner"
import { ManagementPanelHeader } from "@/components/management/ManagementPanelHeader"
import { ActionableStat } from "@/components/management/ActionableStat"

import { FILTERS, catalogReducer } from "@/modules/management/reducers/catalog.reducer"
import type { State, Filter } from "@/modules/management/reducers/catalog.reducer"
import { CatalogDataRow } from "@/components/management/CatalogDataRow"
import { DataTable } from "@/components/management/DataTable"
import { EmptyDataRow } from "@/components/management/EmptyDataRow"
import { ADMIN_NAV_PATHS, MODERATOR_NAV_PATHS } from "@/modules/management/constants"

const ICON_MAP = {
  books: IconBooks,
  users: IconUsers,
  "shield-lock": IconShieldLock,
} as const

const CatalogsManagementPage = ({
  catalogs,
  catalogsSummary,
  nav,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [formState, setFormState] = useState<Partial<CreateCatalogSchema> | null>()
  const [currentStep, setCurrentStep] = useState(0)

  const pathname = usePathname()
  const lastSegment = `/${pathname.split("/").pop()}`
  const initialState: State = {
    catalogs: catalogs,
    filteredCatalogs: catalogs,
    activeFilter: FILTERS.ALL,
  }

  const [state, dispatch] = useReducer(catalogReducer, initialState)

  const stack = useDrawersStack(["main-settings", "add-cards", "catalog-sharing"])

  const [deleteCatalogMutation] = useMutation(deleteCatalog)

  const handleDeleteCatalogSuccess = () => {
    notifications.show({
      title: "Catalog Removed Successfully",
      message: `Catalog has been successfully removed.`,
      position: "top-right",
      color: "green",
      autoClose: 5000,
    })
  }

  const handleDeleteCatalog = async (catalogId: string) => {
    try {
      console.log("Attempting to delete catalog with ID:", catalogId)

      await deleteCatalogMutation(catalogId, { onSuccess: handleDeleteCatalogSuccess })
    } catch (error) {
      console.error("Failed to delete catalog:", error)
    }
  }

  const handleFilterChange = (filter: Filter) => {
    dispatch({ type: "SET_FILTER", payload: filter })
  }
  // FIRST STEP **************************************************************************************
  const form = useForm({
    mode: "uncontrolled",
    validate: zodResolver(createCatalogBaseSchema),
    initialValues: { ...createCatalogBaseDefaults, ...formState },
    validateInputOnChange: true,
    validateInputOnBlur: true,
  })

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

  const handleSubmit = async (values: CreateCatalogBaseSchema) => {
    console.log({ values })
    setFormState((state) => ({ ...state, ...values }))
    setCurrentStep(1)

    stack.open("add-cards")
  }

  // SECOND STEP *************************************************************************************
  const addCards__form = useForm<NewCatalogCardsSchema>({
    validate: zodResolver(newCatalogCardsSchema),
    initialValues: { ...createCatalogCardsDefaults, ...formState },
    validateInputOnChange: true,
    validateInputOnBlur: true,
  })

  const addCards__handleSubmit = async (values: NewCatalogCardsSchema) => {
    setFormState((state) => ({ ...state, ...values }))
    setCurrentStep(2)
    stack.open("catalog-sharing")
  }

  const addCards__handleOnDrop = async (files: any, index: number) => {
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

      addCards__form.setFieldValue(`cards.${index}.imageUrl`, result.fileURL)
    } catch (error) {
      console.error("Error uploading cover", error)
    }
  }

  const addCards__handleOnRemove = async (index: number) => {
    addCards__form.setFieldValue(`cards.${index}.imageUrl`, "")
  }

  const removeCard = (index) => {
    addCards__form.removeListItem("cards", index.index)
  }

  const cards = addCards__form.getValues().cards.map((item, index) => (
    <Draggable key={item.key} index={index} draggableId={index.toString()}>
      {(provided) => (
        <Group
          ref={provided.innerRef}
          mt="xs"
          {...provided.draggableProps}
          className={classes.mantineDropzoneInner}
          component="fieldset"
          key={item.key}
        >
          <Flex justify={"space-between"} className={classes.fullWidth}>
            <Center {...provided.dragHandleProps}>
              <IconGripVertical size="1rem" />
              Press and slide to change the order
            </Center>
            {cards.length > 1 && <IconX onClick={() => removeCard({ index })} />}
          </Flex>
          <legend>Card #{index + 1} </legend>
          <Flex direction="column" className={classes.fullWidth}>
            <Flex wrap="wrap" gap="8px" justify="space-between" className={classes.fullWidth}>
              <Textarea
                size="sm"
                radius="md"
                label="Term"
                placeholder="Term"
                withAsterisk
                {...addCards__form.getInputProps(`cards.${index}.term`)}
                className={classes.textarea}
                error={addCards__form.errors?.[`cards.${index}.term`]}
              />
              <Textarea
                size="sm"
                radius="md"
                label="Description"
                placeholder="Description text"
                {...addCards__form.getInputProps(`cards.${index}.description`)}
                className={classes.textarea}
              />
            </Flex>
          </Flex>
          <ImageUpload
            label="Card cover:"
            onDrop={(files) => addCards__handleOnDrop(files, index)}
            onRemove={() => addCards__handleOnRemove(index)}
          />
          {addCards__form?.errors?.imageUrl && (
            <Input.Error>{addCards__form.errors.imageUrl}</Input.Error>
          )}
          <Flex wrap={"wrap"} gap={"8px"} className={classes.fullWidth}>
            <Textarea
              size="sm"
              radius="md"
              label="Definition"
              withAsterisk
              placeholder="Definition"
              {...addCards__form.getInputProps(`cards.${index}.termTranslated`)}
              className={classes.textarea}
              error={addCards__form.errors?.[`cards.${index}.termTranslated`]}
            />
            <Textarea
              size="sm"
              radius="md"
              label="Description"
              placeholder="Description"
              {...addCards__form.getInputProps(`cards.${index}.descriptionTranslated`)}
              className={classes.textarea}
            />
          </Flex>
        </Group>
      )}
    </Draggable>
  ))

  // THIRD STEP **************************************************************************************
  const [catalogMutation] = useMutation(createCatalog)

  const catalogShare__form = useForm({
    mode: "uncontrolled",
    validate: zodResolver(newCatalogShareSettingsSchema),
    initialValues: createCatalogSharingDefaults,
    validateInputOnChange: true,
    validateInputOnBlur: true,
  })

  const catalogShare__handleSubmit = async (values: NewCatalogShareSettingsSchema) => {
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

  const handleSuccess = () => {
    stack.closeAll()
  }

  // END STEPS *************************************************************************************

  const handleCancelNewCatalog = () => {
    stack.closeAll()
    setCurrentStep(0)
    setFormState(null)
    form.reset()
    addCards__form.reset()
    catalogShare__form.reset()
  }

  const handleStepBack = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1)
    }

    const steps = {
      0: "main-settings",
      1: "add-cards",
      2: "catalog-sharing",
    }

    stack.close(steps[currentStep])
    stack.open(steps[currentStep - 1])
  }

  return (
    <>
      <ManagementPanelLayout
        header="Educards"
        navbar={nav.map((item) => (
          <SideNavLink
            key={item.label}
            link={item.link}
            icon={ICON_MAP[item.icon]}
            isActive={lastSegment === item.link}
          >
            {item.label}
          </SideNavLink>
        ))}
      >
        <Stack p="sm" gap="xl">
          <Stack gap="lg">
            <ManagementPanelHeader
              actions={
                <Button onClick={() => stack.open("main-settings")}>
                  <IconCirclePlus />
                  <Box pl={"0.5rem"} component="span">
                    Add New Catalog
                  </Box>
                </Button>
              }
            >
              Catalogs overview
            </ManagementPanelHeader>

            <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
              {catalogsSummary.map(({ title, value, key }) => (
                <ActionableStat
                  value={value}
                  title={title}
                  onClick={() => {
                    handleFilterChange(key)
                  }}
                  key={key}
                  isActive={state.activeFilter === key}
                />
              ))}
            </SimpleGrid>
          </Stack>

          <Stack gap="sm">
            <Title order={2}>All Catalogs</Title>

            <DataTable columns={["Catalog name", "Type", "Cards", "Owner", "Created", "Actions"]}>
              {state.filteredCatalogs.map((catalog) => (
                <CatalogDataRow
                  key={catalog.catalogId}
                  imageUrl={catalog?.imageUrl || ""}
                  name={catalog.name}
                  type={catalog.type as "public" | "private"}
                  numberOfCards={catalog.numberOfCards}
                  owner={catalog.owner?.name || "-"}
                  createdAt={catalog.createdAt}
                  actions={
                    <Group gap={0} justify="flex-end">
                      <ActionIcon variant="subtle" color="gray" onClick={() => {}}>
                        <IconPencil size={16} stroke={1.5} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={async () => {
                          await handleDeleteCatalog(catalog.catalogId)
                        }}
                      >
                        <IconTrash size={16} stroke={1.5} />
                      </ActionIcon>
                    </Group>
                  }
                />
              ))}

              {state.filteredCatalogs.length <= 0 && <EmptyDataRow />}
            </DataTable>
          </Stack>
        </Stack>
      </ManagementPanelLayout>

      <Drawer.Stack>
        {/* MAIN */}
        <Drawer
          {...stack.register("main-settings")}
          position="right"
          size="xl"
          closeOnEscape={false}
          closeOnClickOutside={false}
          withCloseButton={false}
          classNames={{
            body: classes.drawerBody,
          }}
        >
          <form
            name="newCatalog"
            onSubmit={form.onSubmit(handleSubmit)}
            className={classes.formContainer}
          >
            <Box>
              <Stepper active={currentStep}>
                <Stepper.Step label="First step" description="Main settings" />
                <Stepper.Step label="Second step" description="Adding cards to catalog" />
                <Stepper.Step label="Final step" description="Catalog sharing" />
              </Stepper>
            </Box>
            <Stack gap="2rem" flex="1">
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
            </Stack>

            <Group justify="space-between" gap="lg">
              <Button variant="outline" color="red" onClick={handleCancelNewCatalog}>
                Cancel
              </Button>

              <Group gap="lg">
                {currentStep > 0 && (
                  <Button type="button" variant="default">
                    Previous step
                  </Button>
                )}
                <Button type="submit" disabled={!form.isValid()}>
                  Next step
                </Button>
              </Group>
            </Group>
          </form>
        </Drawer>

        {/* ADD CARDS */}
        <Drawer
          {...stack.register("add-cards")}
          position="right"
          size="xl"
          closeOnEscape={false}
          closeOnClickOutside={false}
          withCloseButton={false}
        >
          <form
            name="addCards"
            onSubmit={addCards__form.onSubmit(addCards__handleSubmit)}
            className={classes.formContainer}
          >
            <Box>
              <Stepper active={currentStep}>
                <Stepper.Step label="First step" description="Main settings" />
                <Stepper.Step label="Second step" description="Adding cards to catalog" />
                <Stepper.Step label="Final step" description="Catalog sharing" />
              </Stepper>
            </Box>
            <Stack gap="2rem" flex="1">
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
                  disabled={!addCards__form.isValid()}
                  onClick={() =>
                    addCards__form.insertListItem("cards", {
                      ...storedCardDefaults,
                      key: randomId(),
                    })
                  }
                >
                  <IconCirclePlus /> Add card
                </Button>
              </Group>
            </Stack>

            <Group justify="space-between" gap="lg">
              <Button variant="outline" color="red" onClick={handleCancelNewCatalog}>
                Cancel
              </Button>

              <Group gap="lg">
                {currentStep > 0 && (
                  <Button type="button" variant="default" onClick={handleStepBack}>
                    Previous step
                  </Button>
                )}
                <Button type="submit" disabled={!addCards__form.isValid()}>
                  Next step
                </Button>
              </Group>
            </Group>
          </form>
        </Drawer>

        {/* CATALOG SHARING */}
        <Drawer
          {...stack.register("catalog-sharing")}
          position="right"
          size="xl"
          closeOnEscape={false}
          closeOnClickOutside={false}
          withCloseButton={false}
        >
          <form
            name="newCatalog"
            onSubmit={catalogShare__form.onSubmit(catalogShare__handleSubmit)}
            className={classes.formContainer}
          >
            <Box>
              <Stepper active={currentStep}>
                <Stepper.Step label="First step" description="Main settings" />
                <Stepper.Step label="Second step" description="Adding cards to catalog" />
                <Stepper.Step label="Final step" description="Catalog sharing" />
              </Stepper>
            </Box>
            <Stack gap="2rem" flex="1">
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
                  className={classes.root}
                  radius="sm"
                  ml="sm"
                  {...catalogShare__form.getInputProps("isShared", { type: "checkbox" })}
                />
                <Flex direction="column" py="md">
                  <Text>Share as public catalog.</Text>
                  <Text size="sm" c="dimmed">
                    Your catalog will also be visible to non-logged-in users.
                  </Text>
                </Flex>
              </Flex>
            </Stack>

            <Group justify="space-between" gap="lg">
              <Button variant="outline" color="red" onClick={handleCancelNewCatalog}>
                Cancel
              </Button>

              <Group gap="lg">
                {currentStep > 0 && (
                  <Button type="button" variant="default">
                    Previous step
                  </Button>
                )}
                <Button type="submit" disabled={!form.isValid()}>
                  Create catalog
                </Button>
              </Group>
            </Group>
          </form>
        </Drawer>
      </Drawer.Stack>
    </>
  )
}

export const getServerSideProps = gSSP(async ({ ctx }) => {
  const userRole = ctx.session.$publicData.role

  if (!userRole || !["ADMIN", "MODERATOR"].includes(userRole)) {
    throw new AuthenticationError("Access denied. Insufficient permissions.")
  }
  const now = new Date()
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  const catalogs = (await getCatalogs({}, ctx)) as CatalogWithOwner[]

  const publicCatalogs = catalogs.filter((catalog) => catalog.type.toLowerCase() === "public")
  const privateCatalogs = catalogs.filter((catalog) => catalog.type.toLowerCase() === "private")
  const newCatalogs = catalogs.filter((catalog) => catalog.createdAt >= twentyFourHoursAgo)

  const catalogsSummary = [
    { title: "All Catalogs", value: catalogs.length, key: FILTERS.ALL },
    { title: "Public", value: publicCatalogs.length, key: FILTERS.PUBLIC },
    { title: "Private", value: privateCatalogs.length, key: FILTERS.PRIVATE },
    { title: "New", value: newCatalogs.length, key: FILTERS.NEW },
  ] as const

  const nav = userRole === "ADMIN" ? ADMIN_NAV_PATHS : MODERATOR_NAV_PATHS

  return {
    props: { catalogs, catalogsSummary, nav },
  }
})

export default CatalogsManagementPage
