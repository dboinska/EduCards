import { z } from "zod"

export const unshareCatalogSchema = z.object({
  id: z.string().uuid(),
})

export type UnshareCatalogSchema = z.infer<typeof unshareCatalogSchema>
