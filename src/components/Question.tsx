import { Button, Container, Flex, rem, useMantineTheme, Text } from "@mantine/core"
import { RadioButtons } from "./RadioButtons"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { IconRefresh, IconArrowRight, IconCircleCheck, IconCircleX } from "@tabler/icons-react"

import styles from "src/styles/Quiz.module.css"
import classes from "src/styles/Notifications.module.css"
import { useState } from "react"
import { notifications } from "@mantine/notifications"

interface AnswerOption {
  id: string
  isValid: boolean
  label: string
}

interface QuestionProps {
  id: string
  question: string
  answers: AnswerOption[]
  correctAnswer: string
  onAnswerSelected: (questionId: string, selectedAnswer: string) => void
  displayAll: boolean
  userAnswer: string | null
}

const gradient =
  "linear-gradient(45deg, var(--mantine-color-blue-filled) 0%, var(--mantine-color-lime-filled) 100%)"

export const Question = ({
  id,
  question,
  answers,
  correctAnswer,
  onAnswerSelected,
  displayAll,
  userAnswer,
}: QuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(userAnswer)

  const theme = useMantineTheme()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAnswer) {
      notifications.show({
        title: "No answer selected.",
        message: `Please select an answer.`,
        position: "top-right",
        color: "red",
        classNames: classes,
        autoClose: 5000,
      })
      return
    }

    onAnswerSelected(id, selectedAnswer)
    setSelectedAnswer(null)
  }

  return (
    <Container size="lg" m="0" p="0">
      <Flex
        mih="80px"
        m="0 auto"
        direction="column"
        p={theme.spacing.sm}
        my={theme.spacing.sm}
        className={styles.border}
        justify="space-between"
      >
        <h2 className={styles.header}>{question}</h2>
        {displayAll ? (
          <div>
            {userAnswer !== correctAnswer ? (
              <Flex gap={theme.spacing.lg}>
                <Flex c={theme.colors.red[6]} gap={theme.spacing.sm} align="center">
                  <IconCircleX />
                  {userAnswer || "No answer selected"}
                </Flex>
                <Flex c={theme.colors.green[6]} gap={theme.spacing.sm} align="center">
                  <IconCircleCheck />
                  {correctAnswer}
                </Flex>
              </Flex>
            ) : (
              <Flex c={theme.colors.green[6]} gap={theme.spacing.sm} align="center">
                <IconCircleCheck />
                {correctAnswer}
              </Flex>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <RadioButtons
              options={answers}
              value={selectedAnswer}
              onChange={(newValue) => {
                setSelectedAnswer(newValue)
              }}
            />

            <Flex
              m="0 auto"
              gap="var(--mantine-spacing-sm)"
              p="var(--mantine-spacing-xl) 0"
              justify="center"
            >
              <Button
                component={Link}
                radius="md"
                styles={{
                  root: {
                    padding: rem(2),
                    border: 0,
                    backgroundImage: gradient,
                  },
                  inner: {
                    background: "var(--mantine-color-body)",
                    color: "var(--mantine-color-blue-filled)",
                    borderRadius: "calc(var(--button-radius) - 2px)",
                    paddingLeft: "var(--mantine-spacing-md)",
                    paddingRight: "var(--mantine-spacing-md)",
                  },
                  label: {
                    backgroundImage: gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  },
                }}
                href={Routes.Quiz()}
              >
                <IconRefresh />
                Restart
              </Button>
              <Button
                variant="gradient"
                type="submit"
                gradient={{ from: "lime", to: "blue" }}
                radius="md"
                size="sm"
              >
                Next
                <IconArrowRight />
              </Button>
            </Flex>
          </form>
        )}
      </Flex>
    </Container>
  )
}
