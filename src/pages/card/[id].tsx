import Card, { type CardProps } from "@/components/Card"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const mockdata: CardProps[] = [
  {
    id: 0,
    image:
      "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    header: "Verudela Beach",
    catalouge: "Croatiaxxxxxxxxxx",
    desc: "Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.",
    isFavorite: true,
  },
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    header: "XYZ",
    catalouge: "xxxxxxxxxxx",
    desc: "Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.",
    isFavorite: true,
  },
]

const CardPage = () => {
  const router = useRouter()

  const [numberOfCorrect, setNumberOfCorrect] = useState<number>(0)
  const [numberOfWrong, setNumberOfWrong] = useState<number>(0)

  const [currentCard, setCurrentCard] = useState<CardProps | undefined>(
    mockdata[Number(router.query.id) || 0]
  )
  const [visibleStats, setVisibleStats] = useState<boolean>(false)

  useEffect(() => {
    if (router.query.id) {
      setCurrentCard(mockdata[Number(router.query.id)])
    }
  }, [router.query])

  const nextCard = async () => {
    const cardIndex = mockdata.findIndex((item) => item.id === (currentCard?.id || 0))

    if (cardIndex < mockdata.length - 1) {
      await router.push(`/card/${cardIndex + 1}`)
      return
    }

    await router.push(`/card/stats`)
  }

  useEffect(() => {
    console.log({ numberOfCorrect, numberOfWrong, currentCard })
  }, [numberOfCorrect, numberOfWrong, currentCard])

  const handleMove = async (isCorrect: boolean) => {
    await nextCard()

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

export default CardPage
