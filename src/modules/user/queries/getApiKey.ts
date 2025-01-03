import { resolver } from "@blitzjs/rpc"
import db from "db"

interface ApiKeyData {
  iv: string
  key: string
}

export default resolver.pipe(resolver.authorize(), async (_, ctx) => {
  const apiKey = await db.apiKey.findFirst({
    where: { userId: ctx.session.userId as string },
    select: { iv: true, key: true },
  })

  if (!apiKey) {
    throw new Error("API key not found")
  }

  return {
    iv: apiKey.iv,
    key: apiKey.key,
  } as ApiKeyData
})
