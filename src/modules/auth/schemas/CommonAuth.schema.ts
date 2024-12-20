import { z } from "zod"

const usernameFieldSchema = z
  .string()
  .min(1, { message: "User name is required" })
  .max(20, { message: "Name must be 20 characters or less" })

type UsernameFieldSchema = z.infer<typeof usernameFieldSchema>

const avatarFieldSchema = z.string()

type AvatarFieldSchema = z.infer<typeof avatarFieldSchema>

const emailFieldSchema = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

type EmailFieldSchema = z.infer<typeof emailFieldSchema>

const passwordFieldSchema = z
  .string()
  .min(8, { message: "Password must have 8-12 characters" })
  .max(12, { message: "Password must have 8-12 characters" })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/, {
    message:
      "Password must include at least one lowercase letter, one uppercase letter, and one special character",
  })
  .transform((str) => str.trim())

type PasswordFieldSchema = z.infer<typeof passwordFieldSchema>

export { usernameFieldSchema, avatarFieldSchema, emailFieldSchema, passwordFieldSchema }
export type { UsernameFieldSchema, AvatarFieldSchema, EmailFieldSchema, PasswordFieldSchema }
