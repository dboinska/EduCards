import { gSSP } from "@/blitz-server"

import getCatalogs from "@/modules/catalog/queries/getCatalogs"

import { QuizConfiguratorView } from "@/modules/quiz/views/QuizConfigurator.view"

import type { BlitzPage } from "@blitzjs/next"
import type { InferGetServerSidePropsType } from "next"

const Quiz: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  simplifiedCatalogs,
}) => <QuizConfiguratorView simplifiedCatalogs={simplifiedCatalogs} />

export const getServerSideProps = gSSP(async ({ query, ctx }) => {
  const catalogs = await getCatalogs(query, ctx)

  const simplifiedCatalogs = catalogs
    .filter((catalog) => catalog?.numberOfCards >= 4)
    .map((catalog) => ({
      value: catalog.catalogId,
      label: catalog.name,
      numberOfCards: catalog.numberOfCards,
    }))

  return {
    props: { simplifiedCatalogs, userId: ctx.session.userId },
  }
})

export default Quiz
