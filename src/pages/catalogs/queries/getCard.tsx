import type { Ctx } from "blitz"
import db from "db"
import { z } from "zod"

const getCardInput = z.object({
  cardId: z.string().uuid(),
})

type GetCardInput = z.infer<typeof getCardInput>

export default async function getCard(input: GetCardInput, ctx: Ctx) {
  const data = getCardInput.parse(input)

  const card = await db.card.findUnique({
    include: {
      owner: true,
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
