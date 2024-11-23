import type { Ctx } from "blitz"
import db from "db"

export default async function deleteStudyPlan({ id }: { id: string }, ctx: Ctx) {
  ctx.session.$authorize()

  try {
    const result = await db.studyPlan.delete({
      where: { id },
    })

    if (!result) {
      throw new Error("Plan not found.")
    }

    return result
  } catch (error) {
    console.error(error)

    throw new Error("Failed to delete study plan.")
  }
}
