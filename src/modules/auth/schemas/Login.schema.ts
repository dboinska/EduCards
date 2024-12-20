import { z } from "zod"
import { emailFieldSchema } from "./CommonAuth.schema"

export const loginSchema = z.object({
  email: emailFieldSchema,
  password: z.string(),
})

export type LoginSchema = z.infer<typeof loginSchema>
