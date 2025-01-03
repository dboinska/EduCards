import { resolver } from "@blitzjs/rpc"
import OpenAI from "openai"
import { chatMessageSchema } from "../schemas/ChatMessage.schema"
import type { Ctx } from "blitz"
import type { ChatMessageSchema } from "../schemas/ChatMessage.schema"
import getApiKey from "@/modules/user/queries/getApiKey"
import { decrypt } from "@/utils/crypto"
import { notifications } from "@mantine/notifications"

import classes from "src/styles/Notifications.module.css"

interface ApiKeyData {
  iv: string
  key: string
}

export default resolver.pipe(
  resolver.zod(chatMessageSchema),
  resolver.authorize(),
  async (input: ChatMessageSchema, ctx: Ctx) => {
    const { prompt } = chatMessageSchema.parse(input)

    try {
      const encryptApiKey = (await getApiKey(null, ctx)) as ApiKeyData

      if (!encryptApiKey) {
        notifications.show({
          title: "Error",
          message: "API key not found in database.",
          position: "top-right",
          color: "red",
          classNames: classes,
          autoClose: 5000,
        })
        console.log("API key not found in database.")
      }

      const decrpytedApiKey = decrypt({
        iv: encryptApiKey.iv,
        encryptedData: encryptApiKey.key,
      })

      const openai = new OpenAI({
        apiKey: decrpytedApiKey,
        dangerouslyAllowBrowser: true,
      })

      const systemMessage = {
        role: "system" as const,
        content: `You are a highly knowledgeable tutor and language expert. You can only discuss topics strictly related to learning, education, language acquisition, grammar, vocabulary, and language practice. If the user asks for anything outside these topics, politely refuse and steer the conversation back to language learning. Do not entertain questions about cooking, recipes, hobbies, or other unrelated topics.`,
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [systemMessage, { role: "user", content: prompt }],
        max_tokens: 1000,
      })

      const botReply = response?.choices[0]?.message?.content

      if (!botReply) {
        throw new Error("No response generated")
      }

      return { reply: botReply }
    } catch (error: any) {
      console.error("Error communicating with OpenAI API:", error)
      notifications.show({
        title: "Failed",
        message: "Error communicating with OpenAI API",
        position: "top-right",
        color: "red",
        classNames: classes,
        autoClose: 5000,
      })

      if (error.status === 401) {
        notifications.show({
          title: "Error",
          message: "Invalid API key. Please check your API key in settings.",
          position: "top-right",
          color: "red",
          classNames: classes,
          autoClose: 5000,
        })
        console.log("Invalid API key.")
      }

      if (error.status === 429) {
        notifications.show({
          title: "Error",
          message: "Rate limit exceeded. Please try again later.",
          position: "top-right",
          color: "red",
          classNames: classes,
          autoClose: 5000,
        })
        console.log("Rate limit exceeded.")
      }

      throw new Error("Failed to get a response from the chat bot.")
    }
  }
)
