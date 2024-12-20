import db from "db"

import { studyPlanIdSchema } from "../schemas/StudyPlanId.schema"

import type { Ctx } from "blitz"
import type { StudyPlanIdSchema } from "../schemas/StudyPlanId.schema"

export default async function deleteStudyPlan(input: StudyPlanIdSchema, ctx: Ctx) {
  ctx.session.$authorize()

  const data = studyPlanIdSchema.parse(input)

  try {
    const result = await db.studyPlan.delete({
      where: { id: data.id },
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
