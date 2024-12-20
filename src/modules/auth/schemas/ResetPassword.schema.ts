import { z } from "zod"
import { passwordFieldSchema } from "./CommonAuth.schema"

export const resetPasswordSchema = z
  .object({
    password: passwordFieldSchema,
    passwordConfirmation: passwordFieldSchema,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  })

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
