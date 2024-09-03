import { Ctx } from "blitz"
import db from "db"

export default async function deleteCard(cardId: string, ctx: Ctx) {
  if (!ctx.session.userId) {
    throw new Error("User not logged in")
  }

  try {
    const card = await db.card.findUnique({ where: { cardId: cardId } })

    if (!card || card.ownerId !== ctx.session.userId) {
      throw new Error("User not authorized to delete this card")
    }

    const [deletedCard] = await db.$transaction([
      db.card.delete({
        where: { cardId: cardId },
      }),
      db.catalog.update({
        where: { catalogId: card.catalogId },
        data: {
          numberOfCards: { decrement: 1 },
        },
      }),
    ])

    return deletedCard
  } catch (error) {
    console.error("Error deleting card:", error)
    throw new Error("Failed to delete card")
  }
}
