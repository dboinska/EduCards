import db from "db"
import { updateLearnSessionSchema } from "../schemas/UpdateLearnSession.schema"

import type { Ctx } from "blitz"
import type { UpdateLearnSessionSchema } from "../schemas/UpdateLearnSession.schema"

export default async function updateActiveLearnSession(input: UpdateLearnSessionSchema, ctx: Ctx) {
  const data = updateLearnSessionSchema.parse(input)
  console.log({ input })

  const userId = ctx.session.userId
  if (!userId) {
    throw new Error("User not authenticated")
  }

  const activeLearnSessions = await db.learnSession.findMany({
    include: {
      catalog: true,
      drawer: true,
    },
    where: {
      drawerId: data.drawerId,
      userId: userId,
      active: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const activeLearnSession = activeLearnSessions[0]

  if (!activeLearnSession) {
    throw new Error("Learn session not found")
  }

  const updatedLearnSession = await db.learnSession.update({
    where: { id: activeLearnSession.id },
    data: {
      active: false,
      learnedCards: data.learnedCards,
      sessionEnd: new Date(),
    },
  })

  console.log({ updatedLearnSession })

  return updatedLearnSession
}
