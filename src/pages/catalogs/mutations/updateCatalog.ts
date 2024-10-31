import createDrawer from "@/pages/drawer/mutations/createDrawer"
import createDrawerCard from "@/pages/drawer/mutations/createDrawerCard"
import { cardSchema } from "@/schemas/Card.schema"
import { createCatalogSchema } from "@/schemas/CreateCatalog.schema"
import { CreateDrawerSchema } from "@/schemas/CreateDrawer.schema"
import shareCatalog from "./shareCatalog"
import unshareCatalog from "./unshareCatalog"

import { DRAWER_LEVEL, DRAWER_LEVEL_NAME } from "@/utils/drawer"
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

  try {
    const existingCatalog = await db.catalog.findUnique({
      where: { catalogId: catalog.catalogId },
      include: { drawers: true, sharedCatalog: true },
    })

    if (!existingCatalog) {
      console.error("Catalog not found")
      return
    }

    const amountOfDrawersChanged = existingCatalog?.amountOfDrawers !== amountOfDrawers

    const catalogData = {
      ...catalog,
      numberOfCards: cards.length || 0,
      amountOfDrawers,
      type: catalog.isShared ? "public" : "private",
      isShared: catalog.isShared,
      ownerId: ctx.session.userId,
    }

    const result = await db.catalog.update({
      where: { catalogId: catalog.catalogId },
      data: catalogData,
    })

    if (!result.catalogId) {
      throw new Error("Failed to create catalog.")
    }

    const cardList = cards.map(({ cardId, ...card }) => ({
      ...card,
      ...(cardId ? { cardId } : {}),
      catalogId: result.catalogId,
      ownerId: ctx.session.userId as string,
    }))

    const existingCards = cardList.filter((card) => card.cardId)
    const newCards = cardList.filter((card) => !card.cardId)
    const updatedCards = await Promise.all(
      existingCards.map((ec) =>
        db.card.update({
          where: {
            cardId: ec.cardId,
          },
          data: {
            ...ec,
          },
        })
      )
    )

    const createdCards = await Promise.all(
      newCards.map(async (nc) => {
        console.log({ nc })
        try {
          const { cardId, ...dataWithoutCardId } = nc
          console.log("Creating card with data:", nc)
          const createdCard = await db.card.create({
            data: dataWithoutCardId,
          })
          return createdCard
        } catch (error) {
          console.error("Error creating card:", error)
          throw error
        }
      })
    )

    const allCards = [...updatedCards, ...createdCards]
    console.log({ updatedCards, createdCards })

    if (amountOfDrawersChanged) {
      await db.drawer.deleteMany({
        where: { catalogId: catalog.catalogId },
      })

      const drawer: CreateDrawerSchema = {
        catalogId: result.catalogId,
        frequency: DRAWER_LEVEL[amountOfDrawers],
        levelName: DRAWER_LEVEL_NAME[amountOfDrawers],
        numberOfCards: allCards.length,
      }

      const drawerResult = await createDrawer(drawer, ctx)
      console.log({ drawerResult })

      const firstLevelDrawer = drawerResult.find((drawer) => drawer.frequency === "DAILY")

      if (!firstLevelDrawer?.drawerId) {
        throw new Error("Error creatings drawers")
      }

      const drawerRelation = allCards.map(({ cardId }) => ({
        drawerId: firstLevelDrawer.drawerId,
        cardId,
      }))

      await Promise.all(
        drawerRelation.map(async (relation) => {
          return await createDrawerCard(relation, ctx)
        })
      )
    }

    const unsharedCatalogIds = existingCatalog.sharedCatalog
      .filter((sc) => !sharedWith.includes(sc.userId))
      ?.map((sc) => sc.id)

    const sharedCatalogIds = sharedWith.filter(
      (userId) => !existingCatalog.sharedCatalog.find((sc) => sc.userId === userId)
    )

    await Promise.all([
      ...sharedCatalogIds.map(
        async (userId) => await shareCatalog({ userId, catalogId: catalog.catalogId }, ctx)
      ),
      ...unsharedCatalogIds.map(async (id) => await unshareCatalog({ id }, ctx)),
    ])

    return { ...result, ...allCards }
  } catch (error) {
    console.error(error)
  }
}
function getSharedUsers(catalogId: string) {
  throw new Error("Function not implemented.")
}
