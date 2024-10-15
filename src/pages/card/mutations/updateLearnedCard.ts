import type { Ctx } from "blitz"
import db from "db"
import { frequency, frequencySchema } from "@/utils/frequency"
import { z } from "zod"

const learnedCardsSchema = z.object({
  rememberedCardIds: z.array(z.string().uuid()),
  catalogId: z.string().uuid(),
  levelName: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  frequency: z.enum(frequency),
})

type LearnedCardsSchema = z.infer<typeof learnedCardsSchema>

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
  ctx.session.$authorize()

  const {
    rememberedCardIds,
    frequency: drawerFrequency,
    levelName,
    catalogId,
  } = learnedCardsSchema.parse(input)

  const nextFq = getNextFrequency(drawerFrequency, levelName)

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
  ])

  console.log({ nextDrawer })

  return updatedCards
}
