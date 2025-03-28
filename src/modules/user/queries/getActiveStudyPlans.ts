import type { Ctx } from "blitz"
import db from "db"

export default async function getActiveStudyPlans(_, ctx: Ctx): Promise<any> {
  ctx.session.$authorize()

  if (!ctx.session.userId) {
    throw new Error("User not authenticated")
  }

  const today = new Date()

  const studyPlans = await db.studyPlan.findMany({
    where: {
      ownerId: ctx.session.userId,
      active: true,
    },
  })

  return studyPlans
}
