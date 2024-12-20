import { useEffect } from "react"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { IconCheck } from "@tabler/icons-react"
import { Button, Flex, TextInput, MantineProvider, NativeSelect, createTheme } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { useForm, zodResolver } from "@mantine/form"

import Layout from "@/layouts/Root.layout"
import { ColorSelection } from "@/components/ColorSelector"
import { SliderInput } from "@/components/SliderInput"

import updateStudyPlan from "../mutations/updateStudyPlan"
import { updateStudyPlanWithoutIdSchema } from "../schemas/UpdateStudyPlanWithoutId.schema"

import styles from "@/styles/Quiz.module.css"

import type { ParsedUrlQuery } from "node:querystring"
import type { Catalog, StudyPlan } from "db"
import type { UpdateStudyPlanSchema } from "../schemas/UpdateStudyPlan.schema"
import type { UpdateStudyPlanWithoutIdSchema } from "../schemas/UpdateStudyPlanWithoutId.schema"

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

interface EditStudyPlanViewProps {
  userCatalogs: Catalog[]
  catalogs: Catalog[]
  query: ParsedUrlQuery
  studyPlan: StudyPlan
}

export const EditStudyPlanView = ({
  userCatalogs,
  catalogs,
  query,
  studyPlan,
}: EditStudyPlanViewProps) => {
  const [updateStudyPlanMutation] = useMutation(updateStudyPlan)
  const router = useRouter()

  console.log({ query })

  const formattedCatalogs = userCatalogs.map((catalog) => ({
    value: catalog.catalogId,
    label: catalog.name,
  }))

  const initialValues = {
    name: studyPlan?.name ?? "",
    daysPerWeek: studyPlan?.daysPerWeek ?? 7,
    minutesPerDay: studyPlan?.secondsPerDay ? Math.ceil(studyPlan.secondsPerDay / 60) : 30,
    wordsPerDay: studyPlan?.wordsPerDay ?? 5,
    completionDate: studyPlan?.completionDate
      ? new Date(studyPlan.completionDate)
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    color: studyPlan?.color ?? "#FFFFFF",
    catalogId: studyPlan?.catalogId ?? "",
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

  const form = useForm<UpdateStudyPlanWithoutIdSchema>({
    initialValues,
    validate: zodResolver(updateStudyPlanWithoutIdSchema),
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
