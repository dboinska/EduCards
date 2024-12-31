import db from "db"

type CompletedQuizzesProps = {
  userId: string
}

export default async function getDailyCompletedQuizzes({ userId }: CompletedQuizzesProps) {
  if (!userId) {
    throw new Error("User ID is required")
  }
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  try {
    const allQuizzes = await db.quiz.findMany({
      where: {
        userId: userId,
        createdAt: {
          gte: today,
        },
      },
      select: {
        id: true,
        userId: true,
        catalogId: true,
      },
    })

    return allQuizzes
  } catch (error) {
    console.error("Error fetching completed quizzes:", error)
    throw error
  }
}
