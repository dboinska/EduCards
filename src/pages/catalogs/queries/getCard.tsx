import type { Ctx } from "blitz"
import db from "db"
import { cardSchema, type CardSchema } from "@/schemas/Card.schema"

export default async function getCard(input: CardSchema, ctx: Ctx) {
  const data = cardSchema.parse(input)

  const card = await db.card.findUnique({
    include: {
      owner: true,
    },
    where: {
      cardId: data.catalogId,
    },
  })

  if (!card) {
    return null
  }

  const { id, email, imageUrl, name } = card?.owner

  console.log({ card })

  return { ...card, owner: { id, email, imageUrl, name } }
}
