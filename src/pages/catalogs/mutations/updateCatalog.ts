import { cardSchema } from "@/schemas/Card.schema"
import { createCatalogSchema, CreateCatalogSchema } from "@/schemas/CreateCatalog.schema"
import { Ctx } from "blitz"
import db from "db"
import { z } from "zod"

const updateCatalogSchema = createCatalogSchema.merge(
  z.object({
    catalogId: z.string().uuid(),
    cards: z.array(
      cardSchema.omit({ cardId: true, ownerId: true, catalogId: true }).merge(
        z.object({
          cardId: z.string().optional(),
        })
      )
    ),
  })
)

type UpdateCatalogSchema = z.infer<typeof updateCatalogSchema>

export default async function updateCatalog(input: UpdateCatalogSchema, ctx: Ctx) {
  ctx.session.$authorize()
  const data = updateCatalogSchema.parse(input)
  const { cards, amountOfDrawers, sharedWith, ...catalog } = data

  const catalogData = {
    ...catalog,
    numberOfCards: cards.length || 0,
    type: catalog.isShared ? "public" : "private",
    ownerId: ctx.session.userId,
  }

  try {
    const result = await db.catalog.update({
      where: { catalogId: catalog.catalogId },
      data: catalogData,
    })

    if (!result.catalogId) {
      throw new Error("Failed to create catalog.")
    }

    const cardList = cards.map(({ ...card }) => ({
      ...card,
      catalogId: result.catalogId,
      ownerId: ctx.session.userId as string,
    }))

    const existingCards = cardList.filter((card) => card.cardId)
    const newCards = cardList.filter((card) => !card.cardId)

    const [updatedCards, createdCards] = await db.$transaction([
      ...existingCards.map((ec) =>
        db.card.update({
          where: {
            cardId: ec.cardId,
          },
          data: {
            ...ec,
          },
        })
      ),

      db.card.createMany({
        data: newCards,
      }),
    ])

    console.log({ updatedCards, createdCards })

    return result
  } catch (error) {
    console.error(error)
  }
}
