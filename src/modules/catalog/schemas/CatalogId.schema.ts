import { z } from "zod"

export const catalogIdSchema = z.object({
  id: z.string().uuid(),
})

export type CatalogIdSchema = z.infer<typeof catalogIdSchema>
