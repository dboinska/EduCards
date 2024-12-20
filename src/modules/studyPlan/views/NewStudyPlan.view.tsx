import { useEffect } from "react"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
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
import { DateInput } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { zodResolver } from "mantine-form-zod-resolver"
import { IconCheck } from "@tabler/icons-react"

import Layout from "@/layouts/Root.layout"
import { ColorSelection } from "@/components/ColorSelector"
import { SliderInput } from "@/components/SliderInput"
import createStudyPlan from "../mutations/createStudyPlan"
import { createStudyPlanSchema } from "../schemas/CreateStudyPlan.schema"

import type { Catalog } from "db"
import type { CreateStudyPlanSchema } from "../schemas/CreateStudyPlan.schema"

import styles from "src/styles/Quiz.module.css"

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

interface NewStudyPlanViewProps {
  userCatalogs: Catalog[]
}

export const NewStudyPlanView = ({ userCatalogs }: NewStudyPlanViewProps) => {
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
                  value={form.values.color as string}
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
