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
} from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import Link from "next/link"
import { ColorSelection } from "@/components/ColorSelector"
import { useState } from "react"
import { DateInput } from "@mantine/dates"

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

const NewStudyPlan: BlitzPage = () => {
  const [color, setColor] = useState("#00abfb")

  return (
    <Layout title="New study plan">
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>New Study Plan</h1>
        </div>
        <Flex w="100%" justify="center">
          <Flex direction="column" w="90%">
            <MantineProvider theme={theme}>
              <TextInput label="Study plan name" m="sm" placeholder="Study plan name" />
              <NativeSelect
                label="Select catalog"
                m="sm"
                data={["Catalog X", "Catalog Y", "Catalog Z"]}
              />
              <ColorSelection />
              <SliderInput
                label="Number of study days per week"
                placeholder=""
                step={1}
                min={0}
                max={7}
                size={2}
              />
              <SliderInput
                label="Number of study minutes per day"
                placeholder=""
                step={1}
                min={0}
                max={60}
                size={2}
              />
              <SliderInput
                label="Number of words remembered per day"
                placeholder=""
                step={1}
                min={0}
                max={20}
                size={2}
              />
              <DateInput
                m="sm"
                clearable
                defaultValue={new Date()}
                label="Planned date of completion"
                placeholder="Planned date of completion"
              />

              <Flex justify="right" m="var(--mantine-spacing-md) 0">
                <Link href={Routes.StudyPlans()}>
                  <Button
                    variant="filled"
                    color="var(--mantine-color-lime-6)"
                    radius="md"
                    onClick={() => {}}
                    //   disabled={!isFormValid}
                  >
                    <IconCheck /> Save
                  </Button>
                </Link>
              </Flex>
            </MantineProvider>
          </Flex>
        </Flex>
      </main>
    </Layout>
  )
}

export default NewStudyPlan
