import Layout from "@/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import { gSSP } from "@/blitz-server"
import { InferGetServerSidePropsType } from "next"
import { QuizSchema } from "@/schemas/Quiz.schema"
import { Question } from "@/components/Question"
import styles from "src/styles/Quiz.module.css"
import { useEffect, useState } from "react"
import { useRandomAnswers } from "@/hooks/useRadomAnswers"
import { Stats } from "@/components/Stats"
import getCatalog from "@/pages/catalogs/queries/getCatalog"
import { Title } from "@mantine/core"

type Answers = {
  id: string
  label: string
  isValid: boolean
}

interface UserAnswer {
  question: string
  userAnswer: string
  correctAnswer: string
  answers: Answers[]
}

const QuizPage: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  query,
  catalog,
  numberOfQuestions,
}) => {
  const cards = catalog?.cards || []
  const limitedCards = cards.slice(0, numberOfQuestions)

  const [questionIndex, setQuestionIndex] = useState(0)
  const [visibleStats, setVisibleStats] = useState<boolean>(false)
  const [numberOfCorrect, setNumberOfCorrect] = useState<number>(0)
  const [numberOfWrong, setNumberOfWrong] = useState<number>(0)
  // Przenieś typ
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])

  const [showAnswers, setShowAnswers] = useState<boolean>(false)

  useEffect(() => {
    if (questionIndex > limitedCards.length - 1) {
      setVisibleStats(true)
    }
  }, [questionIndex, limitedCards])

  console.log({ questionIndex, lc: limitedCards.length })

  if (!cards || !cards[questionIndex]) {
    throw new Error("Correct card is undefined")
  }

  const { randomAnswers } = useRandomAnswers({
    cards,
    correctCard: cards[questionIndex]!,
  })

  const handleAnswerSelected = (id: string, selectedAnswer: string) => {
    const correctAnswer = cards[questionIndex]?.cardId
    const isCorrect = selectedAnswer === correctAnswer

    if (isCorrect) {
      setNumberOfCorrect((current) => current + 1)
    } else {
      setNumberOfWrong((current) => current + 1)
    }

    setUserAnswers((prevUserAnswers) => [
      ...prevUserAnswers,
      {
        question: cards[questionIndex]?.term!,
        correctAnswer: correctAnswer!,
        userAnswer: selectedAnswer,
        answers: randomAnswers,
      },
    ])

    if (questionIndex < cards.length - 1) {
      setQuestionIndex((prevIndex) => prevIndex + 1)
    } else {
      setVisibleStats(true)
    }
  }

  if (visibleStats && !showAnswers) {
    return (
      <Stats
        correct={numberOfCorrect}
        wrong={numberOfWrong}
        newAttemptId={"newSessionId"}
        currentItemId={catalog?.catalogId as string}
        backButtonLabel="Show answers"
        onClick={() => {
          setShowAnswers(true)
        }}
      />
    )
  }

  return (
    <Layout title="Quiz">
      <main className={styles.main}>
        <div className={styles.header}>
          <Title order={1}>
            {!showAnswers ? `Catalog: ${catalog?.name}` : `Answers to: ${catalog?.name}`}
          </Title>
        </div>
        {showAnswers
          ? limitedCards.map((card, index) => {
              const userAnswer =
                userAnswers.find((answer) => answer.question === card.term)?.userAnswer || null
              const userAnswerTranslated =
                userAnswers
                  .find((answer) => answer.question === card.term)
                  ?.answers.find((answer) => answer.id === userAnswer)?.label || null

              return (
                <Question
                  key={card.cardId}
                  id={card.cardId}
                  question={card.term}
                  answers={randomAnswers}
                  correctAnswer={card.termTranslated}
                  onAnswerSelected={handleAnswerSelected}
                  displayAll={true}
                  userAnswer={userAnswerTranslated}
                />
              )
            })
          : // Display one question
            questionIndex <= limitedCards.length - 1 && (
              <Question
                id={limitedCards[questionIndex]?.cardId as string}
                question={limitedCards[questionIndex]?.term as string}
                answers={randomAnswers}
                correctAnswer={limitedCards[questionIndex]?.termTranslated as string}
                onAnswerSelected={handleAnswerSelected}
                displayAll={false}
                userAnswer={userAnswers[questionIndex]?.userAnswer || null}
              />
            )}
      </main>
    </Layout>
  )
}

export const getServerSideProps = gSSP(async ({ params, query, ctx }) => {
  const id = (params as QuizSchema).id
  const catalog = await getCatalog({ id }, ctx)
  const numberOfQuestions = parseInt(query.numberOfQuestions as string, 10)
  return { props: { catalog, query, numberOfQuestions } }
})

export default QuizPage
