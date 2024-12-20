import { gSSP } from "@/blitz-server"

import { QuizView } from "@/modules/quiz/views/Quiz.view"
import getCatalog from "@/modules/catalog/queries/getCatalog"

import type { BlitzPage } from "@blitzjs/next"
import type { InferGetServerSidePropsType } from "next"
import type { CatalogIdSchema } from "@/modules/catalog/schemas/CatalogId.schema"

const QuizPage: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  catalog,
  numberOfQuestions,
}) => <QuizView catalog={catalog} numberOfQuestions={numberOfQuestions} />

export const getServerSideProps = gSSP(async ({ params, query, ctx }) => {
  const id = (params as CatalogIdSchema).id
  const catalog = await getCatalog({ id }, ctx)
  const numberOfQuestions = parseInt(query.numberOfQuestions as string, 10)
  return { props: { catalog, query, numberOfQuestions } }
})

export default QuizPage
