import db from "db"
import { createLearnSessionSchema } from "../schemas/CreateLearnSession.schema"

import type { Ctx } from "blitz"
import type { CreateLearnSessionSchema } from "../schemas/CreateLearnSession.schema"

export default async function createLearnSession(input: CreateLearnSessionSchema, ctx: Ctx) {
  ctx.session.$authorize()
  const data = createLearnSessionSchema.parse(input)

  try {
    const result = await db.learnSession.create({
      data,
    })

    if (!result) {
      throw new Error("Failed to create learn session.")
    }

    console.log({ result })

    return result
  } catch (error) {
    console.error("Error creating learn session:", error)
    throw new Error("Failed to create learn session")
  }
}
