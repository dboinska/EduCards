import db from "db"
import { createDrawerCardSchema } from "../schemas/CreateDrawerCard.schema"

import type { Ctx } from "blitz"
import type { CreateDrawerCardSchema } from "../schemas/CreateDrawerCard.schema"

export default async function createDrawerCard(input: CreateDrawerCardSchema, ctx: Ctx) {
  ctx.session.$authorize()
  const data = createDrawerCardSchema.parse(input)

  try {
    const result = await db.drawerCard.create({
      data: input,
    })

    if (!result) {
      throw new Error("Failed to create drawer card.")
    }

    console.log({ result })

    return result
  } catch (error) {
    console.error("Error creating drawer card:", error)
    throw new Error("Failed to create drawer card")
  }
}
