import type { CardSchema } from "@/modules/card/schemas/Card.schema"
import { useState, useEffect } from "react"

function getRandomUniqueNumbers(numberOfCards: number, count: number = 3): number[] {
  const randomNumbers = new Set<number>()

  while (randomNumbers.size < count) {
    const randomNumber = Math.floor(Math.random() * numberOfCards)
    randomNumbers.add(randomNumber)
  }

  return Array.from(randomNumbers)
}

function shuffleArray<T>(array: T[]): T[] {
  const newList = [...array]
  for (let i = newList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newList[i], newList[j]] = [newList[j]!, newList[i]!]
  }
  return newList
}

interface UseRandomAnswers {
  cards: CardSchema[]
  correctCard: CardSchema
}

interface RandomAnswer {
  id: string
  isValid: boolean
  label: string
}

export const useRandomAnswers = ({ cards, correctCard }: UseRandomAnswers) => {
  const [randomAnswers, setRandomAnswers] = useState<RandomAnswer[]>([])

  useEffect(() => {
    if (cards.length > 0) {
      const uniqueWrongCards = cards
        .filter(
          (card) =>
            card.cardId != correctCard.cardId && card.termTranslated !== correctCard.termTranslated
        )
        .reduce((acc, card) => {
          if (!acc.some((c) => c.termTranslated === card.termTranslated)) {
            acc.push(card)
          }
          return acc
        }, [] as CardSchema[])

      const availableWrongAnswers = uniqueWrongCards.length

      const wrongAmount = Math.min(3, availableWrongAnswers)

      const randomWrongCards = shuffleArray(uniqueWrongCards).slice(0, wrongAmount)

      const wrongAnswers = randomWrongCards.map((card) => ({
        id: card.cardId,
        isValid: false,
        label: card.termTranslated,
      }))

      const correctAnswer = {
        id: correctCard.cardId,
        isValid: true,
        label: correctCard.termTranslated,
      }

      const allAnswers = shuffleArray([...wrongAnswers, correctAnswer])

      const finalAnswers = allAnswers.slice(0, 4)

      setRandomAnswers(finalAnswers)
    }
  }, [cards, correctCard])

  return { randomAnswers }
}
