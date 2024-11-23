import type { Ctx } from "blitz"

import db from "db"

export default async function getStudyPlans(_, ctx: Ctx) {
  ctx.session.$authorize()
  if (!ctx.session || !ctx.session.userId) {
    throw new Error("User not found.")
  }

  const studyPlans = await db.studyPlan.findMany({
    where: {
      ownerId: ctx.session.userId,
    },
    include: {
      catalog: {
        include: {
          drawers: true,
        },
      },
    },
  })

  return studyPlans
}
