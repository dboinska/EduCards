import { resolver } from "@blitzjs/rpc"
import { SecurePassword } from "@blitzjs/auth/secure-password"
import db from "db"

import { signupSchema } from "../schemas/SignUp.schema"

import type { Role } from "types"

export default resolver.pipe(
  resolver.zod(signupSchema),
  async ({ username, avatar, email, password }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    const user = await db.user.create({
      data: {
        name: username,
        imageUrl: avatar,
        email: email.toLowerCase().trim(),
        hashedPassword,
        role: "USER",
      },
      select: { id: true, name: true, email: true, role: true },
    })

    await ctx.session.$create({ userId: user.id, role: user.role as Role })
    console.log({ user })
    return user
  }
)
