import db from "db"

type SuggestionProps = {
  userId: string
}

export default async function getWeeklySuggestions({ userId }: SuggestionProps) {
  if (!userId) {
    throw new Error("User ID is required")
  }

  const today = new Date()

  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay() + 1)
  startOfWeek.setHours(0, 0, 0, 0)

  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  endOfWeek.setHours(23, 59, 59, 999)

  try {
    const allSuggestions = await db.suggestion.findMany({
      where: {
        userId: userId,
        createdAt: {
          gte: startOfWeek,
          lte: endOfWeek,
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
