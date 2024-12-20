import db from "db"

import { DRAWER_LEVEL, DRAWER_LEVEL_NAME } from "@/utils/drawer"
import { createCatalogSchema } from "../schemas/CreateCatalog.schema"

import createDrawer from "@/modules/drawer/mutations/createDrawer"
import createDrawerCard from "@/modules/drawer/mutations/createDrawerCard"

import type { Ctx } from "blitz"
import type { CreateDrawerSchema } from "@/modules/drawer/schemas/CreateDrawer.schema"
import type { CreateCatalogSchema } from "../schemas/CreateCatalog.schema"

export default async function createCatalog(input: CreateCatalogSchema, ctx: Ctx) {
  if (!ctx.session) {
    throw new Error("Session not initialized")
  }
  ctx.session.$authorize()
  const data = createCatalogSchema.parse(input)
  const { cards, amountOfDrawers, sharedWith, ...catalog } = data

  const catalogData = {
    ...catalog,
    numberOfCards: cards.length || 0,
    type: catalog.isShared ? "public" : "private",
    ownerId: ctx.session.userId,
  }

  try {
    const result = await db.catalog.create({
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

    const savedCards = await db.card.createManyAndReturn({
      data: cardList,
    })

    const drawer: CreateDrawerSchema = {
      catalogId: result.catalogId,
      // ownerId: ctx.session.userId as string,
      frequency: DRAWER_LEVEL[amountOfDrawers],
      levelName: DRAWER_LEVEL_NAME[amountOfDrawers],
      numberOfCards: cardList.length,
    }

    const drawerResult = await createDrawer(drawer, ctx)
    console.log({ drawerResult })

    const firstLevelDrawer = drawerResult.find((drawer) => drawer.frequency === "DAILY")

    if (!firstLevelDrawer?.drawerId) {
      throw new Error("Error creatings drawers")
    }

    const drawerRelation = savedCards.map(({ cardId }) => ({
      drawerId: firstLevelDrawer.drawerId,
      cardId,
    }))

    await Promise.all(
      drawerRelation.map(async (relation) => {
        return await createDrawerCard(relation, ctx)
      })
    )

    console.log({ savedCards, drawerRelation })

    return result
  } catch (error) {
    console.error(error)
  }
}
