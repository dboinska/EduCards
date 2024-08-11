import { z } from "zod"

export const catalogCoverSchema = z.object({
  file:
    typeof window !== "undefined"
      ? z.instanceof(FileList).refine((files) => files.length === 1, "Please upload a file")
      : z.any(),
})

export type CatalogCoverSchema = z.infer<typeof catalogCoverSchema>
