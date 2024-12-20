import db from "db"

import { getCardInput } from "../schemas/GetCardInput.schema"

import type { Ctx } from "blitz"
import type { GetCardInput } from "../schemas/GetCardInput.schema"

export default async function getCard(input: GetCardInput, ctx: Ctx) {
  const data = getCardInput.parse(input)

  const card = await db.card.findUnique({
    include: {
      owner: true,
      catalog: true,
    },
    where: {
      cardId: data.cardId,
    },
  })

  if (!card) {
    return null
  }

  const { id, email, imageUrl, name } = card?.owner

  console.log({ card })

  return { ...card, owner: { id, email, imageUrl, name } }
}
