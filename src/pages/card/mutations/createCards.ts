import type { Ctx } from "blitz"
import db from "db"
import { CreateCardSchema, createCardSchema } from "@/schemas/CreateCard.schema"

export default async function createCard(input: CreateCardSchema, ctx: Ctx) {
  ctx.session.$authorize()

  try {
    const data = createCardSchema.parse(input)
    const { cards } = data

    const cardList = cards.map(({ key, ...card }) => ({
      ...card,
      catalogId: card.catalogId,
      ownerId: ctx.session.userId as string,
    }))

    const [savedCards] = await db.$transaction([
      db.card.createMany({
        data: cardList,
      }),
      db.catalog.update({
        where: { catalogId: cardList[0]?.catalogId },
        data: {
          numberOfCards: { increment: cardList.length },
        },
      }),
    ])

    return savedCards
  } catch (error) {
    console.error("Error creating card:", error)
    throw new Error("An error occurred while creating the cards.")
  }
}
