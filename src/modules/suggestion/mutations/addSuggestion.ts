import db from "db"
import type { Ctx } from "blitz"

export default async function addSuggestion(_, ctx: Ctx) {
  ctx.session.$authorize()

  if (!ctx.session.userId) {
    throw new Error("User not authorized.")
  }

  try {
    const result = await db.suggestion.create({
      data: {
        userId: ctx.session?.userId,
      },
    })

    if (!result) {
      throw new Error("Failed to add new suggestion.")
    }

    console.log("Suggestion added successfully:", result)
    return result
  } catch (error) {
    console.error("Error adding suggestion:", error)
    throw new Error("Failed to add suggestion.")
  }
}
