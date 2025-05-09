import { NotFoundError, AuthenticationError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { SecurePassword } from "@blitzjs/auth/secure-password"
import db from "db"
import { authenticateUser } from "./login"
import { changePasswordSchema } from "../schemas/ChangePassword.schema"

import { passwordChangedMailer } from "mailers/passwordChanged.mailer"

export default resolver.pipe(
  resolver.zod(changePasswordSchema),
  resolver.authorize(),
  async ({ currentPassword, newPassword }, ctx) => {
    const user = await db.user.findFirst({ where: { id: ctx.session.userId } })
    if (!user) throw new NotFoundError()

    try {
      await authenticateUser(user.email, currentPassword)
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw new Error("Invalid Password")
      }
      throw error
    }

    const hashedPassword = await SecurePassword.hash(newPassword.trim())
    await db.user.update({
      where: { id: user.id },
      data: { hashedPassword },
    })

    await passwordChangedMailer({
      to: user.email,
      username: user.name!,
      updatedDate: new Date(),
    }).send()

    return true
  }
)
