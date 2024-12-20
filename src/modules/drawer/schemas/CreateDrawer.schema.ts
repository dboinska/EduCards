import { z } from "zod"
import { drawerSchema } from "./Drawer.schema"
import { frequency } from "@/utils/frequency"

export const createDrawerBaseShema = z.object({
  numberOfCards: z.number(),
  levelName: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  frequency: z.enum(frequency),
})

export type CreateDrawerBaseSchema = z.infer<typeof createDrawerBaseShema>

export const createDrawerSchema = drawerSchema
  .omit({ drawerId: true, cards: true, frequency: true })
  .merge(
    z.object({
      frequency: z.array(z.enum(frequency)),
    })
  )

export type CreateDrawerSchema = z.infer<typeof createDrawerSchema>
