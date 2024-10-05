import db from "db"
import { resolver } from "@blitzjs/rpc"

export default resolver.pipe(async ({ id }: { id: string }) => {
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      imageUrl: true,
    },
  })

  if (!user) {
    throw new Error(`User with ID ${id} not found`)
  }

  return user
})
