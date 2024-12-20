import { z } from "zod"

export const chatMessageSchema = z.object({
  prompt: z.string().min(0),
})

export type ChatMessageSchema = z.infer<typeof chatMessageSchema>
