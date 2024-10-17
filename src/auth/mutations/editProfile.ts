import { resolver } from "@blitzjs/rpc"
import db from "db"
import { EditProfileSchema } from "../schemas"
import { SecurePassword } from "@blitzjs/auth/secure-password"
import { AuthenticationError } from "blitz"

export default resolver.pipe(
  resolver.zod(EditProfileSchema),
  resolver.authorize(),
  async ({ username, email, isPublic, imageUrl, cover, newPassword, currentPassword }, ctx) => {
    const userId = ctx.session.userId

    if (!userId) {
      throw new Error("You must be logged in to edit your profile.")
    }

    const user = await db.user.findUnique({ where: { id: userId } })
    if (!user) {
      throw new Error("User not found.")
    }

    if (currentPassword && newPassword) {
      const result = await SecurePassword.verify(user.hashedPassword, currentPassword)

      if (result === SecurePassword.INVALID) {
        throw new AuthenticationError("Current password is incorrect.")
      }

      if (result === SecurePassword.VALID_NEEDS_REHASH) {
        const hashedNewPassword = await SecurePassword.hash(newPassword.trim())
        await db.user.update({
          where: { id: userId },
          data: { hashedPassword: hashedNewPassword },
        })
      } else {
        const hashedNewPassword = await SecurePassword.hash(newPassword.trim())
        await db.user.update({
          where: { id: userId },
          data: { hashedPassword: hashedNewPassword },
        })
      }
    }
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        name: username,
        email,
        isPublic,
        imageUrl,
        cover,
      },
    })

    return updatedUser
  }
)
