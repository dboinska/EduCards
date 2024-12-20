import db from "db"
import { Ctx } from "blitz"

import { frequency } from "@/utils/frequency"

import { unlearnedCardsSchema } from "../schemas/UnlearnedCards.schema"
import type { UnlearnedCardsSchema } from "../schemas/UnlearnedCards.schema"

export default async function updateUnlearnedCards(input: UnlearnedCardsSchema, ctx: Ctx) {
  ctx.session.$authorize()

  const { unlearnedCardIds, drawerId, catalogId } = unlearnedCardsSchema.parse(input)

  const firstDrawer = await db.drawer.findFirst({
    where: {
      catalogId,
      frequency: frequency[0],
    },
  })

  if (!firstDrawer) {
    console.error(`Cannot find drawer with catalogId: ${catalogId} and frequency: ${frequency[0]}`)
    return
  }

  const updatedCards = await db.$transaction([
    ...unlearnedCardIds.map((drawerCardId) =>
      db.drawerCard.update({
        where: {
          id: drawerCardId,
        },
        data: {
          drawerId: firstDrawer.drawerId,
        },
      })
    ),
    db.drawer.update({
      where: { drawerId: firstDrawer.drawerId },

      data: {
        numberOfCards: {
          increment: unlearnedCardIds.length,
        },
      },
    }),
    db.drawer.update({
      where: { drawerId },

      data: {
        numberOfCards: {
          decrement: unlearnedCardIds.length,
        },
      },
    }),
  ])

  return updatedCards
}
