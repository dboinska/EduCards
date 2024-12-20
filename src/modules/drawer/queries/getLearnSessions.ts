import db from "db"
import { createLearnSessionSchema } from "../schemas/CreateLearnSession.schema"

import type { CreateLearnSessionSchema } from "../schemas/CreateLearnSession.schema"
import type { Ctx } from "blitz"

export default async function getLearnSessions(input: CreateLearnSessionSchema, ctx: Ctx) {
  ctx.session.$authorize()
  if (!ctx.session || !ctx.session.userId) {
    throw new Error("User not found.")
  }

  const data = createLearnSessionSchema.parse(input)

  const learnSessions = await db.learnSession.findMany({
    where: {
      userId: ctx.session.userId,
      catalogId: data.catalogId,
    },
  })

  console.log({ learnSessions })

  return learnSessions
}
