import { z } from "zod"

export const weeklySession = z.object({
  userId: z.string(),
  duration: z.number(),
  learnedCards: z.number(),
  totalCatalogs: z.number(),
})

export type WeeklySessionSchema = z.infer<typeof weeklySession>
