import { frequency } from "@/utils/frequency"
import { z } from "zod"
import { cardSchema, drawerCardSchema } from "./Card.schema"

export const drawerSchema = z.object({
  drawerId: z.string().uuid(),
  catalogId: z.string().uuid(),
  cards: z.array(drawerCardSchema),
  numberOfCards: z.number(),
  levelName: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  frequency: z.enum(frequency),
})

export type DrawerSchema = z.infer<typeof drawerSchema>
