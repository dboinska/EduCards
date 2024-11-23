import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Quiz.module.css"

import { SliderInput } from "@/components/SliderInput"
import {
  Button,
  Flex,
  Input,
  MantineProvider,
  NativeSelect,
  TextInput,
  createTheme,
  Text,
} from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { ColorSelection } from "@/components/ColorSelector"
import { DateInput } from "@mantine/dates"
import { useMutation } from "@blitzjs/rpc"
import createStudyPlan from "./mutations/createStudyPlan"
import { useRouter } from "next/router"
import { useForm } from "@mantine/form"
import { zodResolver } from "mantine-form-zod-resolver"
import { createStudyPlanSchema, CreateStudyPlanSchema } from "@/schemas/CreateStudyPlan.schema"
import { gSSP } from "@/blitz-server"
import getCatalogs from "../catalogs/queries/getCatalogs"
import { InferGetServerSidePropsType } from "next"
import { useEffect } from "react"
import getStudyPlans from "./queries/getStudyPlans"

const theme = createTheme({
  components: {
    Input: Input.extend({
      defaultProps: {
        variant: "filled",
      },
    }),

    InputWrapper: Input.Wrapper.extend({
      defaultProps: {
        inputWrapperOrder: ["label", "input", "description", "error"],
      },
    }),
  },
})

const NewStudyPlan: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  userCatalogs,
  userId,
}) => {
  const [createStudyPlanMutation] = useMutation(createStudyPlan)
  console.log({ userCatalogs })

  const formattedCatalogs = userCatalogs.map((catalog) => ({
    value: catalog.catalogId,
    label: catalog.name,
  }))

  const initialValues = {
    name: "Study Plan",
    daysPerWeek: 4,
    minutesPerDay: 15,
    wordsPerDay: 4,
    completionDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    color: "black",
    catalogId: formattedCatalogs.length > 0 ? formattedCatalogs[0]?.value : "",
  }

  const router = useRouter()

  const form = useForm({
    validate: zodResolver(createStudyPlanSchema),
    initialValues,
    validateInputOnChange: true,
  })
  useEffect(() => {
    console.log({ values: form.values })
    console.log("Current form errors:", form.errors)
  }, [form])

  const handleSubmit = async (values: CreateStudyPlanSchema) => {
    console.log({ submited: values })
    try {
      await createStudyPlanMutation(values)
      await router.push(Routes.StudyPlans())
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <Layout title="New study plan">
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>New Study Plan</h1>
        </div>
        <Flex w="100%" justify="center">
          <Flex direction="column" w="90%">
            <MantineProvider theme={theme}>
              <form name="newStudyPlan" onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                  label="Study plan name"
                  m="sm"
                  placeholder="Study plan name"
                  {...form.getInputProps("name")}
                />
                {formattedCatalogs.length > 0 ? (
                  <NativeSelect
                    label="Select catalog"
                    m="sm"
                    data={formattedCatalogs}
                    {...form.getInputProps("catalogId")}
                  />
                ) : (
                  <Text m="sm">No catalogs available.</Text>
                )}
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
                  defaultValue={new Date()}
                  label="Planned date of completion"
                  placeholder="Planned date of completion"
                  {...form.getInputProps("completionDate")}
                />

                <Flex justify="right" m="var(--mantine-spacing-md) 0">
                  <Button
                    type="submit"
                    variant="filled"
                    color="var(--mantine-color-lime-6)"
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
  const catalogs = await getCatalogs(query, ctx)
  const studyPlans = await getStudyPlans(query, ctx)

  const userId = ctx.session.userId

  const usedCatalogIds = new Set(studyPlans.map((plan) => plan.catalogId))

  const userCatalogs = catalogs.filter(
    (catalog) => catalog?.ownerId === userId && !usedCatalogIds.has(catalog.catalogId)
  )
  return {
    props: { query, userCatalogs, userId },
  }
})

export default NewStudyPlan
