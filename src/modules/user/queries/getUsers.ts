import db from "db"
import { resolver } from "@blitzjs/rpc"

export default resolver.pipe(async () => {
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      imageUrl: true,
      createdAt: true,
      isActive: true,
    },
  })

  return users
})
