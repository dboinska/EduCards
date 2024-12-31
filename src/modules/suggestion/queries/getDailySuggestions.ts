import db from "db"

type SuggestionProps = {
  userId: string
}

export default async function getDailySuggestions({ userId }: SuggestionProps) {
  if (!userId) {
    throw new Error("User ID is required")
  }
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  try {
    const allSuggestions = await db.suggestion.findMany({
      where: {
        userId: userId,
        createdAt: {
          gte: today,
        },
      },
      select: {
        id: true,
        userId: true,
      },
    })

    return allSuggestions
  } catch (error) {
    console.error("Error fetching completed quizzes:", error)
    throw error
  }
}
