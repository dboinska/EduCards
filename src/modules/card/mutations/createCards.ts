import db from "db"
import createDrawerCard from "@/modules/drawer/mutations/createDrawerCard"
import { createCardSchema } from "../schemas/CreateCard.schema"

import type { Ctx } from "blitz"
import type { CreateCardSchema } from "../schemas/CreateCard.schema"

export default async function createCard(input: CreateCardSchema, ctx: Ctx) {
  try {
    const data = createCardSchema.parse(input)
    if (!ctx.session) {
      throw new Error("Session not initialized")
    }
    ctx.session.$authorize()

    const { cards } = data

    const cardList = cards.map(({ key, ...card }) => ({
      ...card,
      catalogId: card.catalogId,
      ownerId: ctx.session.userId as string,
    }))

    await db.card.createMany({
      data: cardList,
    })

    const savedCards = await db.card.findMany({
      where: {
        catalogId: cardList[0]?.catalogId,
        ownerId: ctx.session.userId as string,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: cardList.length,
    })

    await db.catalog.update({
      where: { catalogId: cardList[0]?.catalogId },
      data: {
        numberOfCards: { increment: cardList.length },
      },
    })

    const firstLevelDrawer = await db.drawer.findFirst({
      where: {
        catalogId: cardList[0]?.catalogId,
        frequency: "DAILY",
      },
    })

    if (!firstLevelDrawer?.drawerId) {
      throw new Error("Couldn't find drawer with frequency 'DAILY'.")
    }

    await db.drawer.update({
      where: {
        drawerId: firstLevelDrawer.drawerId,
      },
      data: {
        numberOfCards: {
          increment: cardList.length,
        },
      },
    })

    const drawerRelation = savedCards.map(({ cardId }) => ({
      drawerId: firstLevelDrawer.drawerId,
      cardId,
    }))

    await Promise.all(
      drawerRelation.map(async (relation) => {
        return await createDrawerCard(relation, ctx)
      })
    )

    return savedCards
  } catch (error) {
    console.error("Error creating card:", error)
    throw new Error("An error occurred while creating the cards.")
  }
}
