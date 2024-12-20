import { Ctx } from "blitz"
import db from "db"

export default async function deleteCard(cardId: string, ctx: Ctx) {
  if (!ctx.session.userId) {
    throw new Error("User not logged in")
  }

  try {
    const card = await db.card.findUnique({ where: { cardId: cardId } })

    console.log({ card })

    if (!card || card.ownerId !== ctx.session.userId) {
      throw new Error("User not authorized to delete this card")
    }

    const drawerCard = await db.drawerCard.findFirst({
      where: {
        cardId,
      },
    })

    console.log({ drawerCard })

    if (drawerCard) {
      await db.drawer.update({
        where: { drawerId: drawerCard.drawerId },
        data: {
          numberOfCards: { decrement: 1 },
        },
      })
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

    // if (card.drawerId) {
    //   await db.drawer.update({
    //     where: { drawerId: card.drawerId },
    //     data: {
    //       numberOfCards: { decrement: 1 },
    //     },
    //   })
    // }

    // zamiast card.drawerId
    // wyszukaj w drawerCard rekord z cardId
    // wyciągnij z tego rekordu drawerId
    // zrób updare drawer o decrement pola

    return deletedCard
  } catch (error) {
    console.error("Error deleting card:", error)
    throw new Error("Failed to delete card")
  }
}
