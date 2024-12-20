import { z } from "zod"

export const getDrawerSchema = z.object({
  id: z.string().uuid(),
})

export type GetDrawerSchema = z.infer<typeof getDrawerSchema>
