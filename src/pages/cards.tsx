import { BlitzPage } from "@blitzjs/auth"
import { CardProps } from "../components/Card"
import Card from "../components/Card"

const mockdata: CardProps = {
  image:
    "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
  header: "Verudela Beach",
  catalouge: "Croatiaxxxxxxxxxx",
  desc: "Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.",
  isFavourite: true,
}

const Cards: BlitzPage = () => {
  return <Card {...mockdata} />
}

export default Cards
