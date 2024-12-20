import { z } from "zod"
import { emailFieldSchema } from "./CommonAuth.schema"

export const forgotPasswordSchema = z.object({
  email: emailFieldSchema,
})

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
