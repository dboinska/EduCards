import { resolver } from "@blitzjs/rpc"
import { ChatMessage } from "../schemas"
import axios from "axios"
import "dotenv/config"

export default resolver.pipe(resolver.zod(ChatMessage), async ({ prompt }) => {
  console.log({ prompt })
  try {
    const systemMessage = {
      role: "system",
      content: `You are a highly knowledgeable tutor and language expert. You can only discuss topics strictly related to learning, education, language acquisition, grammar, vocabulary, and language practice. If the user asks for anything outside these topics, politely refuse and steer the conversation back to language learning. Do not entertain questions about cooking, recipes, hobbies, or other unrelated topics.`,
    }

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [systemMessage, { role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    )

    const botReply = response.data.choices[0].message.content
    return { reply: botReply }
  } catch (error) {
    console.error("Error communicating with OpenAI API:", error)
    throw new Error("Failed to get a response from the chat bot.")
  }
})
