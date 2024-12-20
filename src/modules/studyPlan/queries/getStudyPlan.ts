import db from "db"

import { studyPlanIdSchema } from "../schemas/StudyPlanId.schema"

import type { Ctx } from "blitz"
import type { StudyPlanIdSchema } from "../schemas/StudyPlanId.schema"

export default async function getStudyPlan(input: StudyPlanIdSchema, ctx: Ctx) {
  const data = studyPlanIdSchema.parse(input)
  console.log({ input })

  const studyPlan = await db.studyPlan.findUnique({
    where: {
      id: data.id,
    },
  })

  if (!studyPlan) {
    return null
  }

  console.log({ studyPlan })

  return { studyPlan }
}
