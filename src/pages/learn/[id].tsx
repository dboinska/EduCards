import Card, { CardProps } from "@/components/Card"
import { gSSP } from "@/blitz-server"
import getDrawerCards from "../drawer/queries/getDrawerCards"
import getDrawer from "../drawer/queries/getDrawer"
import { BlitzPage } from "@blitzjs/auth"
import { InferGetServerSidePropsType } from "next"
import getCatalog from "../catalogs/queries/getCatalog"
import { useEffect, useState } from "react"
import { Stats } from "@/components/Stats"

const LearnPage: BlitzPage = ({
  query,
  drawerCards,
  catalog,
  drawer,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [numberOfCorrect, setNumberOfCorrect] = useState<number>(0)
  const [numberOfWrong, setNumberOfWrong] = useState<number>(0)

  console.log({ drawerID: drawer?.drawerId })

  const content = drawerCards.map(({ card }) => ({
    ...card,
    sliding: true,
    imageURL: card.imageURL || "",
    description: card.description || "",
    descriptionTranslated: card.descriptionTranslated || "",
  }))

  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)
  const [visibleStats, setVisibleStats] = useState<boolean>(false)

  const currentCard = content[currentCardIndex]

  const nextCard = () => {
    if (currentCardIndex < content.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    } else {
      setVisibleStats(true)
    }
  }

  useEffect(() => {
    console.log({ numberOfCorrect, numberOfWrong, currentCard })
  }, [numberOfCorrect, numberOfWrong, currentCard])

  const handleMove = (isCorrect: boolean) => {
    nextCard()

    if (isCorrect) {
      setNumberOfCorrect((current) => current + 1)
    } else {
      setNumberOfWrong((current) => current + 1)
    }
  }

  if (visibleStats) {
    return (
      <Stats
        correct={numberOfCorrect}
        wrong={numberOfWrong}
        newAttemptId={"newSessionId"}
        currentCatalogId={catalog?.catalogId}
      />
    )
  }

  return (
    <>
      {currentCard && (
        <Card
          key={currentCard.cardId}
          cardId={currentCard.cardId}
          term={currentCard.term}
          termTranslated={currentCard.termTranslated}
          imageURL={currentCard.imageURL ?? ""}
          catalogName={catalog?.name ?? "Unknown Catalog"}
          sliding={true}
          position={`${currentCardIndex + 1} / ${drawerCards.length}`}
          onMoveLeft={() => handleMove(true)}
          onMoveRight={() => handleMove(false)}
        />
      )}
    </>
  )
}

export const getServerSideProps = gSSP(async ({ query, ctx }) => {
  const drawer = await getDrawer(query, ctx)
  console.log({ drawer, query })
  const drawerCards = await getDrawerCards({ drawerId: query?.id as string }, ctx)

  const catalog = await getCatalog({ id: drawerCards[0]?.card.catalogId as string }, ctx)
  return {
    props: { drawerCards, query, catalog, drawer },
  }
})

export default LearnPage
