import db from "db"
import { resolver } from "@blitzjs/rpc"

export default resolver.pipe(async () => {
  const sharedProfiles = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      imageUrl: true,
    },
    where: {
      isPublic: true,
    },
  })

  return sharedProfiles
})
