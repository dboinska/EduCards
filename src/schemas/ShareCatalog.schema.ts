import { z } from "zod"

export const shareCatalogSchema = z.object({
  userId: z.string().uuid(),
  catalogId: z.string().uuid(),
})

export type ShareCatalogSchema = z.infer<typeof shareCatalogSchema>
