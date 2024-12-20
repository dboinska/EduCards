import { z } from "zod"

export const getDrawerCardSchema = z.object({
  drawerId: z.string().uuid(),
})

export type GetDrawerCardSchema = z.infer<typeof getDrawerCardSchema>
