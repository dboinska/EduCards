import { createCatalogSchema, CreateCatalogSchema } from "@/schemas/CreateCatalog.schema"
import { Ctx } from "blitz"
import db from "db"
import { z } from "zod"

const updateCatalogSchema = createCatalogSchema.merge(z.object({ catalogId: z.string().uuid() }))

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

    const cardList = cards.map(({ key, ...card }) => ({
      ...card,
      catalogId: result.catalogId,
      ownerId: ctx.session.userId as string,
    }))

    const existingCards = cardList.filter((card) => card.cardId)
    const newCards = cardList.filter((card) => !card.cardId)

    const [updatedCards, savedCards] = await db.$transaction([
      db.card.updateMany({
        data: existingCards,
      }),
      db.card.createMany({
        data: existingCards,
      }),
    ])

    console.log({ savedCards })

    return result
  } catch (error) {
    console.error(error)
  }
}
