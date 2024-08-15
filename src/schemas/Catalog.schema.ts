import { z } from "zod"
import { CommonInput } from "./CommonInput"

export const catalogSchema = z.object({
  id: z.string().uuid(),
})

export type CatalogSchema = z.infer<typeof catalogSchema>
