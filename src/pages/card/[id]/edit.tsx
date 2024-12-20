import { Routes } from "@blitzjs/next"
import { gSSP } from "@/blitz-server"

import getCard from "@/modules/card/queries/getCard"
import { EditCardView } from "@/modules/card/views/EditCard.view"

import type { InferGetServerSidePropsType } from "next"
import type { BlitzPage } from "@blitzjs/next"

const EditCard: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  query,
  card,
}) => <EditCardView query={query} card={card} />

export const getServerSideProps = gSSP(async ({ query, ctx }) => {
  const card = await getCard(
    {
      cardId: query?.id as string,
    },
    ctx
  )

  if (card?.owner.id !== ctx.session.userId) {
    return {
      redirect: {
        destination: Routes.Home(),
        permanent: false,
      },
    }
  }
  const parsedCard = {
    catalogId: query.catalogId as string,
    cardId: (query?.id as string) || "",
    term: card?.term || "",
    description: card?.description || "",
    termTranslated: card?.termTranslated || "",
    descriptionTranslated: card?.descriptionTranslated || "",
    imageUrl: card?.imageUrl || "",
  }

  return { props: { query, card: parsedCard } }
})

export default EditCard
