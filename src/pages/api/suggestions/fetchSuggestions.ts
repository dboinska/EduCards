import axios from "axios"
import db from "db"

export default async function fetchSuggestions(req, res) {
  const { userId, latestCatalogIds } = req.body

  if (!userId) {
    console.log("User authorization error")
    return res.status(401).json({ error: "User not authorized" })
  }

  try {
    const cards = await db.card.findMany({
      where: {
        catalogId: { in: latestCatalogIds },
      },
    })

    const existingCards = cards.map((card) => card.term)

    if (existingCards.length === 0) {
      return res.status(200).json({ suggestions: [] })
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

    const systemMessage = {
      role: "system",
      content:
        "You are an assistant providing vocabulary suggestions for a language learning app.  Always respond **only** with a valid JSON array in the specified format, without any additional text, explanations, or comments.",
    }
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [systemMessage, { role: "user", content: prompt }],
        temperature: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    )
    const content = response.data.choices[0].message.content.trim()
    const suggestions = JSON.parse(content)

    console.log("Parsed suggestions:", suggestions)
    res.status(200).json({ suggestions })
  } catch (error) {
    if (error.response) {
      console.error("Error generating suggestions:", error.response.status, error.response.data)
      res.status(error.response.status).json({ error: error.response.data })
    } else {
      console.error("Error generating suggestions:", error.message)
      res.status(500).json({ error: error.message })
    }
  }
}
