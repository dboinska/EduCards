import { z } from "zod"

export const catalogSchema = z.object({
  id: z.string().uuid(),
})

export type CatalogSchema = z.infer<typeof catalogSchema>
