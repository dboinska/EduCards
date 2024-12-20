import { z } from "zod"

export const commonInputSchema = z.object({
  filter: z.string().optional(),
  query: z.string().optional(),
  sort: z.string().optional(),
})

export type CommonInputSchema = z.infer<typeof commonInputSchema>
