import Card from "@/components/Card"
import { gSSP } from "@/blitz-server"
import getCard from "../queries/getCard"

const CardPage = ({ card }) => {
  console.log({ card })
  return <Card {...card} catalogName={card.catalog.name} sliding={false} />
}

export const getServerSideProps = gSSP(async ({ query, ctx }) => {
  const cardId = query?.id as string

  if (!cardId) {
    return {
      notFound: true,
    }
  }

  const card = await getCard({ cardId }, ctx)

  return { props: { card } }
})

export default CardPage
