import db from "db"
import { createStudyPlanSchema } from "../schemas/CreateStudyPlan.schema"

import type { Ctx } from "blitz"
import type { CreateStudyPlanSchema } from "../schemas/CreateStudyPlan.schema"

export default async function createStudyPlan(input: CreateStudyPlanSchema, ctx: Ctx) {
  ctx.session.$authorize()
  const data = createStudyPlanSchema.parse(input)

  const studyPlanData = {
    name: data.name,
    daysPerWeek: data.daysPerWeek,
    secondsPerDay: Number(data.minutesPerDay * 60),
    wordsPerDay: data.wordsPerDay,
    completionDate: new Date(data.completionDate),
    catalogId: data.catalogId as string,
    color: data.color,
    ownerId: ctx.session.userId,
  }

  try {
    const result = await db.studyPlan.create({
      data: studyPlanData,
    })

    if (!result.catalogId) {
      throw new Error("Catalog not found.")
    }

    if (!result.ownerId) {
      throw new Error("User undefined.")
    }

    return result
  } catch (error) {
    console.error(error)

    throw new Error("Failed to create study plan.")
  }
}
