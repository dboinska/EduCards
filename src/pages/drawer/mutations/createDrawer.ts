import type { Ctx } from "blitz"
import { CreateDrawerSchema, createDrawerSchema } from "@/schemas/CreateDrawer.schema"
import db from "db"

export default async function createDrawer(input: CreateDrawerSchema, ctx: Ctx) {
  ctx.session.$authorize()
  const data = createDrawerSchema.parse(input)

  try {
    const drawerList = data.frequency.map((freq, index) => ({
      ...data,
      frequency: freq,
      ...(index > 0 ? { numberOfCards: 0 } : {}),
    }))

    const result = await db.drawer.createManyAndReturn({
      data: drawerList,
    })

    if (!result) {
      throw new Error("Failed to create drawer.")
    }

    console.log({ result })

    return result
  } catch (error) {
    console.error("Error creating drawer:", error)
    throw new Error("Failed to create drawer")
  }
}
