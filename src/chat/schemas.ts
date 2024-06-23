import { z } from "zod"

export const ChatMessage = z.object({
  prompt: z.string().min(0),
})
