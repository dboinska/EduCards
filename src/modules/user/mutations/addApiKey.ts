import { resolver } from "@blitzjs/rpc"
import { encrypt } from "@/utils/crypto"
import db from "db"
import type { Ctx } from "blitz"

interface EncryptedData {
  iv: string
  encryptedData: string
}

interface AddApiKeyResult {
  id: string
  userId: string
  iv: string
  key: string
  createdAt: Date
}

export default resolver.pipe(
  resolver.authorize(),
  async (userApiKey: string, ctx: Ctx): Promise<AddApiKeyResult> => {
    if (!userApiKey || !ctx.session.userId) {
      throw new Error("API key and user authorization are required.")
    }

    try {
      const encryptedData: EncryptedData = encrypt(userApiKey)
      const userId = ctx.session.userId as string

      const existingKey = await db.apiKey.findFirst({
        where: { userId },
      })

      if (existingKey) {
        const updatedKey = await db.apiKey.update({
          where: { id: existingKey.id },
          data: {
            iv: encryptedData.iv,
            key: encryptedData.encryptedData,
          },
        })
        return updatedKey
      }

      const newKey = await db.apiKey.create({
        data: {
          userId,
          iv: encryptedData.iv,
          key: encryptedData.encryptedData,
        },
      })

      return newKey
    } catch (error) {
      console.error("Error adding API key:", error)
      if (error instanceof Error) {
        throw new Error(`Failed to save API key: ${error.message}`)
      }
      throw new Error("Failed to save API key. Please try again.")
    }
  }
)
