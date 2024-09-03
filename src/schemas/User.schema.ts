import { z } from "zod"

export const userSchema = z.object({
  name: z.string().optional(),
  email: z.string(),
  imageUrl: z.string(),
  id: z.string().uuid(),
})

export type UserSchema = z.infer<typeof userSchema>
