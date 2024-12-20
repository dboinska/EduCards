import { z } from "zod"
import { frequency } from "@/utils/frequency"
import { createDrawerCardSchema } from "./CreateDrawerCard.schema"

export const drawerSchema = z.object({
  drawerId: z.string().uuid(),
  catalogId: z.string().uuid(),
  cards: z.array(createDrawerCardSchema),
  numberOfCards: z.number(),
  levelName: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  frequency: z.enum(frequency),
})

export type DrawerSchema = z.infer<typeof drawerSchema>
