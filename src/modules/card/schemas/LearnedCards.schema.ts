import { z } from "zod"
import { frequency } from "@/utils/frequency"

export const learnedCardsSchema = z.object({
  rememberedCardIds: z.array(z.string().uuid()),
  catalogId: z.string().uuid(),
  levelName: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  frequency: z.enum(frequency),
})

export type LearnedCardsSchema = z.infer<typeof learnedCardsSchema>
