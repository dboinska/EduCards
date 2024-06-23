import { BlitzPage } from "@blitzjs/auth"
import { CardProps } from "../components/Card"
import Card from "../components/Card"
import { useEffect, useState } from "react"
import { Stats } from "@/components/Stats"

const mockdata: CardProps[] = [
  {
    id: 0,
    // image:
    // "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    header: "Verudela Beach",
    catalog: "Croatiaxxxxxxxxxx",
    desc: "Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.",
    isFavorite: true,
  },
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    header: "XYZ",
    catalog: "xxxxxxxxxxx",
    desc: "Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.",
    isFavorite: false,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    header: "XYZ",
    catalog: "xxxxxxxxxxx",
    desc: "Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.",
    isFavorite: false,
  },
  {
    id: 3,
    image: "https://mojarafa.pl/wp-content/uploads/2018/12/nemo_1544541957.jpg",
    header: "Clownfish",
    catalog: "xxxxxxxxxxx",
    desc: "Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.",
    isFavorite: false,
  },
  {
    id: 4,
    image: "https://kopalniawiedzy.pl/media/lib/29/zyrafa-a7b94af002adc7ba27bd1f88cfb48cb1.jpg",
    header: "Giraffe",
    catalog: "xxxxxxxxxxx",
    desc: "Tall and pretty giraffe.",
    isFavorite: false,
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    header: "XYZ",
    catalog: "xxxxxxxxxxx",
    desc: "Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.",
    isFavorite: false,
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
    <Stats correct={numberOfCorrect} wrong={numberOfWrong} />
  )
}

export default Cards
