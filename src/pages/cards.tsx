import { BlitzPage } from "@blitzjs/auth"
import { CardProps } from "../components/Card"
import Card from "../components/Card"
import { useEffect, useState } from "react"

const mockdata: CardProps[] = [
  {
    id: 0,
    image:
      "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    header: "Verudela Beach",
    catalouge: "Croatiaxxxxxxxxxx",
    desc: "Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.",
    isFavourite: true,
  },
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    header: "XYZ",
    catalouge: "xxxxxxxxxxx",
    desc: "Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.",
    isFavourite: true,
  },
]

const Cards: BlitzPage = () => {
  const [numberOfCorrect, setNumberOfCorrect] = useState<number>(0)
  const [numberOfWrong, setNumberOfWrong] = useState<number>(0)

  const [currentCard, setCurrentCard] = useState<CardProps | undefined>(mockdata[0])
  const [visibleStats, setVisibleStats] = useState<boolean>(false)

  const nextCard = () => {
    const cardIndex = mockdata.findIndex((item) => item.id === (currentCard?.id || 0))

    if (cardIndex < mockdata.length - 1) {
      return mockdata[cardIndex + 1]
    }

    setVisibleStats(true)
    return undefined
  }

  useEffect(() => {
    console.log({ numberOfCorrect, numberOfWrong, currentCard })
  }, [numberOfCorrect, numberOfWrong, currentCard])

  const handleMove = (isCorrect: boolean) => {
    setCurrentCard(nextCard())

    if (isCorrect) {
      setNumberOfCorrect((current) => current + 1)
    } else {
      setNumberOfWrong((current) => current + 1)
    }
  }

  return currentCard && !visibleStats ? (
    <Card
      {...currentCard}
      onMoveLeft={() => handleMove(true)}
      onMoveRight={() => handleMove(false)}
    />
  ) : (
    <div>stats</div>
  )
}

export default Cards
