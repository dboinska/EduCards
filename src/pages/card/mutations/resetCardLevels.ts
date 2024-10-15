import db from "db"
import { Ctx } from "blitz"
import { z } from "zod"
import { frequency } from "@/utils/frequency"

const unlearnedCardsSchema = z.object({
  unlearnedCardIds: z.array(z.string().uuid()),
  catalogId: z.string().uuid(),
})

type UnlearnedCardsSchema = z.infer<typeof unlearnedCardsSchema>

export default async function updateUnlearnedCards(input: UnlearnedCardsSchema, ctx: Ctx) {
  ctx.session.$authorize()

  const { unlearnedCardIds, catalogId } = unlearnedCardsSchema.parse(input)

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
  ])

  return updatedCards
}
