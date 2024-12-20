import db from "db"
import { updateStudyPlanSchema } from "../schemas/UpdateStudyPlan.schema"

import type { Ctx } from "blitz"
import type { UpdateStudyPlanSchema } from "../schemas/UpdateStudyPlan.schema"

export default async function updateStudyPlan(input: UpdateStudyPlanSchema, ctx: Ctx) {
  ctx.session.$authorize()
  const data = updateStudyPlanSchema.parse(input)

  const studyPlanData = {
    name: data.name,
    daysPerWeek: data.daysPerWeek,
    secondsPerDay: Number(data.minutesPerDay * 60),
    wordsPerDay: data.wordsPerDay,
    completionDate: data.completionDate,
    catalogId: data.catalogId,
    color: data.color,
    id: data.id,
  }

  try {
    const result = await db.studyPlan.update({
      where: { id: data.id },
      data: studyPlanData,
    })

    if (!result) {
      throw new Error("Result not found")
    }

    console.log("Study plan updated")

    return result
  } catch (error) {
    console.error(error)

    throw new Error("Failed to update study plan")
  }
}
