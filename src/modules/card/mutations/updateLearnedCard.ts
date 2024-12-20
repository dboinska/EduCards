import db from "db"
import { frequency, frequencySchema } from "@/utils/frequency"

import { learnedCardsSchema } from "../schemas/LearnedCards.schema"

import type { Ctx } from "blitz"
import type { LearnedCardsSchema } from "../schemas/LearnedCards.schema"

const getNextFrequency = (
  currentFrequency: LearnedCardsSchema["frequency"],
  levelName: LearnedCardsSchema["levelName"]
) => {
  const frequenciesForLevel = frequencySchema[levelName]

  const frequencyIndex = frequenciesForLevel.indexOf(currentFrequency)

  const nextFrequency =
    frequencyIndex >= 0 && frequencyIndex < frequenciesForLevel.length - 1
      ? frequencyIndex + 1
      : frequencyIndex

  return frequenciesForLevel[nextFrequency || 0]
}

export default async function updateLearnedCards(input: LearnedCardsSchema, ctx: Ctx) {
  if (!ctx.session) {
    throw new Error("Session not initialized")
  }
  ctx.session.$authorize()

  // if (!ctx?.session?.userId) {
  //   return
  // }

  const {
    rememberedCardIds,
    frequency: drawerFrequency,
    levelName,
    catalogId,
  } = learnedCardsSchema.parse(input)

  const nextFq = getNextFrequency(drawerFrequency, levelName)

  if (nextFq === drawerFrequency) {
    return
  }

  const nextDrawer = await db.drawer.findFirst({
    where: {
      catalogId,
      frequency: nextFq,
    },
  })

  if (!nextDrawer) {
    console.error(`Cannot find drawer with catalogId: ${catalogId} and frequency: ${frequency}`)
    return
  }

  const currentDrawer = await db.drawer.findFirst({
    where: {
      catalogId,
      frequency: drawerFrequency,
    },
  })

  if (!currentDrawer) {
    console.error(
      `Cannot find drawer with catalogId: ${catalogId} and frequency: ${drawerFrequency}`
    )
    return
  }

  const [updatedCards] = await db.$transaction([
    ...rememberedCardIds.map((drawerCardId) =>
      db.drawerCard.update({
        where: {
          id: drawerCardId,
        },
        data: {
          drawerId: nextDrawer.drawerId,
        },
      })
    ),
    db.drawer.update({
      where: { drawerId: nextDrawer.drawerId },

      data: {
        numberOfCards: {
          increment: rememberedCardIds.length,
        },
      },
    }),
    db.drawer.update({
      where: { drawerId: currentDrawer.drawerId },

      data: {
        numberOfCards: {
          decrement: rememberedCardIds.length,
        },
      },
    }),
  ])

  console.log({ nextDrawer })

  return updatedCards
}
