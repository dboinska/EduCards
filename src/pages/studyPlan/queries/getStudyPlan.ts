import type { Ctx } from "blitz"
import db from "db"
import { studyPlanSchema } from "@/schemas/StudyPlan"
import { CommonInput } from "@/schemas/CommonInput"
import { z } from "zod"

export default async function getStudyPlan(input: z.infer<typeof CommonInput>, ctx: Ctx) {
  const data = studyPlanSchema.parse(input)
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
