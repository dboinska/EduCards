import { useEffect, useState } from "react"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"

import { Stats } from "@/components/Stats"
import Card from "@/components/Card"

import updateLearnedCard from "@/modules/card/mutations/updateLearnedCard"
import resetCardLevels from "@/modules/card/mutations/resetCardLevels"
import updateActiveLearnSession from "@/modules/drawer/mutations/updateActiveLearnSession"

import type { Drawer, DrawerCard, Catalog, Card as CardType } from "db"

interface DrawerWithCards extends DrawerCard {
  card: CardType
}

type LearnPageProps = {
  drawerCards: DrawerWithCards[]
  catalog: Catalog | null
  drawer: Drawer | null
}

export const LearnView = ({ drawerCards, catalog, drawer }: LearnPageProps) => {
  const [learnedCards, setLearnedCards] = useState<string[]>([])
  const [unlearnedCards, setUnlearnedCards] = useState<string[]>([])
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)
  const [visibleStats, setVisibleStats] = useState<boolean>(false)

  const [updateDrawerLevels] = useMutation(updateLearnedCard)
  const [resetDrawerLevels] = useMutation(resetCardLevels)
  const [updateLearnSessionMutation] = useMutation(updateActiveLearnSession)

  useEffect(() => {
    setLearnedCards([])
    setUnlearnedCards([])
  }, [])

  const content = drawerCards.map(({ card }) => ({
    ...card,
    sliding: true,
    imageUrl: card.imageUrl || "",
    description: card.description || "",
    descriptionTranslated: card.descriptionTranslated || "",
  }))

  const currentCard = content[currentCardIndex]

  useEffect(() => {
    if (!visibleStats || learnedCards.length + unlearnedCards.length < content.length - 1) {
      return
    }

    if (learnedCards.length > 0) {
      const saveLearned = async () => {
        await updateDrawerLevels(
          {
            rememberedCardIds: learnedCards,
            catalogId: catalog!.catalogId,
            levelName: drawer!.levelName,
            frequency: drawer!.frequency,
          },
          {
            onSuccess: () => {
              console.log("learnedCards updated")
            },
          }
        )
      }

      void saveLearned()
    }

    if (unlearnedCards.length > 0 && drawer?.frequency !== "DAILY") {
      const saveUnlearned = async () => {
        await resetDrawerLevels(
          {
            unlearnedCardIds: unlearnedCards,
            catalogId: catalog!.catalogId,
            drawerId: drawer!.drawerId,
          },
          {
            onSuccess: () => {
              console.log("unlearnedCards updated")
            },
          }
        )
      }
      void saveUnlearned()
    }
  }, [
    visibleStats,
    learnedCards,
    unlearnedCards,
    content.length,
    catalog,
    drawer,
    resetDrawerLevels,
    updateDrawerLevels,
  ])

  const nextCard = () => {
    if (currentCardIndex < content.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)

      return
    }

    setVisibleStats(true)
  }

  const handleMove = (isCorrect: boolean) => {
    const drawerCard = drawerCards.find((dc) => dc.cardId === currentCard!.cardId)

    if (!isCorrect) {
      setUnlearnedCards((unlearnedCards) => [...unlearnedCards, drawerCard!.id])
    } else {
      setLearnedCards((learnedCards) => [...learnedCards, drawerCard!.id])
    }

    nextCard()
  }

  useEffect(() => {
    if (visibleStats) {
      const saveSession = async () => {
        try {
          const updatedSession = await updateLearnSessionMutation({
            drawerId: drawer?.drawerId as string,
            learnedCards: learnedCards.length,
          })

          console.log("Learn session updated:", updatedSession)
        } catch (error) {
          console.error("Failed to update learn session:", error)
        }
      }

      void saveSession()
    }
  }, [visibleStats, learnedCards])

  if (visibleStats) {
    return (
      <Stats
        correct={learnedCards.length}
        wrong={unlearnedCards.length}
        newAttemptId={"newSessionId"}
        currentItemId={catalog?.catalogId as string}
        backButtonLabel="Back to catalog"
        backButtonHref={Routes.CatalogId({ id: catalog?.catalogId as string })}
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
          imageUrl={currentCard.imageUrl ?? ""}
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
