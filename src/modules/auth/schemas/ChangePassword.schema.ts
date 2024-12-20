import { z } from "zod"
import { passwordFieldSchema } from "./CommonAuth.schema"

export const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: passwordFieldSchema,
})

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>
