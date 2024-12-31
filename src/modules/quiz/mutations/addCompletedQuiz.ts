import db from "db"

import type { Ctx } from "blitz"
import { quizSchema, QuizSchema } from "../schemas/Quiz.schema"

export default async function addCompletedQuiz(input: QuizSchema, ctx: Ctx) {
  ctx.session.$authorize()
  const data = quizSchema.parse(input)

  try {
    const result = await db.quiz.create({
      data,
    })

    if (!result) {
      throw new Error("Failed to complete quiz.")
    }

    console.log({ result })

    return result
  } catch (error) {
    console.error("Error updating quiz:", error)
    throw new Error("Failed to complete quiz")
  }
}
