import { z } from "zod"

export const suggestionSchema = z.object({
  catalogIds: z.array(z.string().uuid()),
})

export type SuggestionSchema = z.infer<typeof suggestionSchema>
