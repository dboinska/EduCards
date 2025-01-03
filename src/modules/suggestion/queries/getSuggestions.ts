import type { Ctx } from "blitz"
import OpenAI from "openai"
import db from "db"
import { SuggestionSchema, suggestionSchema } from "../schemas/Suggestion.schema"
import { decrypt } from "@/utils/crypto"

export default async function getSuggestion(input: SuggestionSchema, ctx: Ctx) {
  if (!ctx?.session?.userId) {
    return
  }

  const encryptedApiKey = await db.apiKey.findFirst({
    where: { userId: ctx.session.userId as string },
    select: {
      iv: true,
      key: true,
    },
  })

  if (!encryptedApiKey) {
    return {
      error: "API key not found. Please add your OpenAI API key in settings.",
      suggestions: [],
    }
  }

  try {
    const apiKey = decrypt({
      iv: encryptedApiKey.iv,
      encryptedData: encryptedApiKey.key,
    })

    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
    })

    const data = suggestionSchema.parse(input)
    const cards = await db.card.findMany({
      where: {
        catalogId: { in: data.catalogIds },
      },
    })

    const existingCards = cards.map((card) => card.term)
    if (existingCards.length <= 0) {
      return { suggestions: [] }
    }

    const prompt = `Based on the existing flashcards: ${existingCards.join(", ")}, generate ${
      existingCards.length > 9 ? existingCards.length : 9
    } new words from the same category. For each word, provide:
    - "term": the word,
    - "translation": the translation of the word in Polish or English, depends on cards' language,
    - "category": the category of the word,
    - "level": difficulty level ("easy", "medium", or "hard"),
    - "id": unique id in uuid format.
    Respond **only** with a valid JSON array of objects, following this exact format:
    [
      {
        "term": "word",
        "termTranslated": "translation",
        "category": "category",
        "level": "easy" | "medium" | "hard",
        "id": "uuid",
      },
      // next objects
    ]
    Do not include any explanations, comments, or text outside the JSON array.`

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant providing vocabulary suggestions for a language learning app. Always respond **only** with a valid JSON array in the specified format, without any additional text, explanations, or comments.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0,
    })

    const content = response.choices[0]?.message?.content?.trim()
    if (!content) {
      console.error("No content received from OpenAI")
      return { error: "No content received from OpenAI", suggestions: [] }
    }

    const suggestions = JSON.parse(content)
    if (!Array.isArray(suggestions)) {
      throw new Error("Parsed response is not an array")
    }

    return { suggestions }
  } catch (error: any) {
    console.error("Error in getSuggestion:", error)

    if (error.message.includes("API key")) {
      return {
        error: "Invalid API key. Please check your OpenAI API key in settings.",
        suggestions: [],
      }
    }

    if (error.status === 429) {
      return {
        error: "Rate limit exceeded. Please try again later.",
        suggestions: [],
      }
    }

    return {
      error: "Error generating suggestions. Please try again.",
      suggestions: [],
    }
  }
}
