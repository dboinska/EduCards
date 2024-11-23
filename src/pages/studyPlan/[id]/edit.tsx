import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import styles from "src/styles/Quiz.module.css"

import { SliderInput } from "@/components/SliderInput"
import { Button, Flex, TextInput, MantineProvider, NativeSelect, createTheme } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { ColorSelection } from "@/components/ColorSelector"
import { DateInput } from "@mantine/dates"
import { useMutation } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import { useForm, zodResolver } from "@mantine/form"
import { gSSP } from "@/blitz-server"
import { InferGetServerSidePropsType } from "next"
import { useEffect } from "react"
import getCatalogs from "@/pages/catalogs/queries/getCatalogs"
import getStudyPlans from "../queries/getStudyPlans"
import updateStudyPlan from "../mutations/updateStudyPlan"
import { UpdateStudyPlanSchema, updateStudyPlanSchema } from "@/schemas/UpdateStudyPlan.schema"
import getStudyPlan from "../queries/getStudyPlan"
import { z } from "zod"

const theme = createTheme({
  components: {
    Input: {
      defaultProps: {
        variant: "filled",
      },
    },
    InputWrapper: {
      defaultProps: {
        inputWrapperOrder: ["label", "input", "description", "error"],
      },
    },
  },
})

const updateStudyPlanSchemaWithoutId = updateStudyPlanSchema.omit({ id: true })
type UpdateStudyPlanSchemaWithoutId = z.infer<typeof updateStudyPlanSchemaWithoutId>

console.log({ updateStudyPlanSchemaWithoutId })

const EditStudyPlan: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  userCatalogs,
  catalogs,
  query,
  studyPlan,
  userId,
}) => {
  const [updateStudyPlanMutation] = useMutation(updateStudyPlan)
  const router = useRouter()

  console.log({ query })

  const formattedCatalogs = userCatalogs.map((catalog) => ({
    value: catalog.catalogId,
    label: catalog.name,
  }))

  const { studyPlan: sp } = studyPlan || {}

  const initialValues = {
    name: sp?.name,
    daysPerWeek: sp?.daysPerWeek,
    minutesPerDay: sp?.secondsPerDay ? Math.ceil(sp.secondsPerDay / 60) : 30,
    wordsPerDay: sp?.wordsPerDay,
    completionDate: sp?.completionDate
      ? new Date(sp.completionDate)
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    color: sp?.color,
    catalogId: sp?.catalogId,
  }

  const catalogId = initialValues.catalogId

  const currentCatalog = {
    value: catalogId,
    label: catalogs?.find((catalog) => catalog.catalogId === catalogId)?.name || "",
  }

  console.log({ currentCatalog })

  const catalogsWithPrevious = formattedCatalogs.some((c) => c.value === catalogId)
    ? formattedCatalogs
    : [...formattedCatalogs, currentCatalog]

  const form = useForm<UpdateStudyPlanSchemaWithoutId>({
    initialValues,
    validate: zodResolver(updateStudyPlanSchemaWithoutId),
    validateInputOnChange: true,
    validateInputOnBlur: true,
  })

  useEffect(() => {
    console.log("Current form values:", form.values)
    console.log("Current form errors:", form.errors)
    console.log({ isValid: form.isValid() })
  }, [form])

  const handleSubmit = async (values: Omit<UpdateStudyPlanSchema, "id">) => {
    try {
      await updateStudyPlanMutation({
        ...values,
        // completionDate: values.completionDate.toString(),
        id: query.id as string,
      })
      await router.push(Routes.StudyPlans())
    } catch (error: any) {
      console.error("Error creating study plan:", error)
    }
  }

  return (
    <Layout title="Edit Study Plan">
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Edit Study Plan</h1>
        </div>
        <Flex w="100%" justify="center">
          <Flex direction="column" w="90%">
            <MantineProvider theme={theme}>
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                  label="Study plan name"
                  m="sm"
                  placeholder="Study plan name"
                  {...form.getInputProps("name")}
                />
                <NativeSelect
                  label="Select catalog"
                  m="sm"
                  data={catalogsWithPrevious}
                  placeholder="Select catalog"
                  {...form.getInputProps("catalogId")}
                />
                <ColorSelection
                  value={form.values.color}
                  onChange={(color) => form.setFieldValue("color", color)}
                />
                <SliderInput
                  label="Number of study days per week"
                  step={1}
                  min={1}
                  max={7}
                  {...form.getInputProps("daysPerWeek")}
                />
                <SliderInput
                  label="Number of study minutes per day"
                  step={1}
                  min={5}
                  max={30}
                  {...form.getInputProps("minutesPerDay")}
                />
                <SliderInput
                  label="Number of words remembered per day"
                  step={1}
                  min={1}
                  max={20}
                  {...form.getInputProps("wordsPerDay")}
                />
                <DateInput
                  m="sm"
                  clearable
                  label="Planned date of completion"
                  placeholder="Planned date of completion"
                  value={new Date(form.values.completionDate)}
                  {...form.getInputProps("completionDate")}
                />
                <Flex justify="right" m="var(--mantine-spacing-md) 0">
                  <Button
                    type="submit"
                    variant="filled"
                    color="lime"
                    radius="md"
                    disabled={!form.isValid()}
                  >
                    <IconCheck /> Save
                  </Button>
                </Flex>
              </form>
            </MantineProvider>
          </Flex>
        </Flex>
      </main>
    </Layout>
  )
}

export const getServerSideProps = gSSP(async ({ query, ctx }) => {
  const studyPlan = await getStudyPlan(query, ctx)
  const catalogs = await getCatalogs(query, ctx)
  const studyPlans = await getStudyPlans(query, ctx)
  const userId = ctx.session.userId

  const usedCatalogIds = new Set(studyPlans.map((plan) => plan.catalogId))
  const userCatalogs = catalogs.filter(
    (catalog) => catalog?.ownerId === userId && !usedCatalogIds.has(catalog.catalogId)
  )

  return {
    props: { query, studyPlan, catalogs, userCatalogs, userId },
  }
})

export default EditStudyPlan
