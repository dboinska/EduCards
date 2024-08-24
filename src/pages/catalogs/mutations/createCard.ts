import type { Ctx } from "blitz"
import db from "db"
import { CreateCardSchema, createCardSchema } from "@/schemas/CreateCard.schema"

export default async function createCard(input: CreateCardSchema, ctx: Ctx) {
  ctx.session.$authorize()

  try {
    const data = createCardSchema.parse(input)
    const { cards } = data

    console.log("Parsed data:", data)

    const cardList = cards.map(({ key, ...card }) => ({
      ...card,
      catalogId: card.catalogId,
      ownerId: ctx.session.userId as string,
    }))

    console.log("Card list to be inserted:", cardList)

    const savedCards = await db.card.createMany({
      data: cardList,
    })

    console.log("Saved cards:", savedCards)

    return savedCards
  } catch (error) {
    console.error("Error creating card:", error)
    throw new Error("An error occurred while creating the cards.")
  }
}
