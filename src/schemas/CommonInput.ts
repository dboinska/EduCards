import * as z from "zod"

export const CommonInput = z.object({
  filter: z.string().optional(),
  query: z.string().optional(),
  sort: z.string().optional(),
})
