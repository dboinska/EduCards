import { CardSchema, cardSchema } from "@/schemas/Card.schema"
import { Ctx } from "blitz"
import db from "db"

export default async function updateCard(input: CardSchema, ctx: Ctx) {
  ctx.session.$authorize()
  const data = cardSchema.parse(input)
  const { cardId, imageUrl, ...card } = data

  const cardData = {
    ...card,
    ownerId: ctx.session.userId,
    imageUrl: data.imageUrl,
  }

  try {
    const result = await db.card.update({
      where: { cardId },
      data: cardData,
    })

    if (!result.cardId) {
      throw new Error("Failed to update card.")
    }

    return result
  } catch (error) {
    console.error("Error updating card:", error)
    throw new Error("Failed to update card.")
  }
}
