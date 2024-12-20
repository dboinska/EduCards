import { Ctx } from "blitz"
import { z } from "zod"

const LastWeekStatisticsSchema = z.object({
  weekId: z.string().optional(),
  userId: z.string().optional(),
  sessionsDuration: z.number().optional(),
  catalogsPracticed: z.number().optional(),
  studyDays: z.array(z.number()).optional(),
  cards_learned: z.array(z.number()).optional(),
  cards_added: z.array(z.number()).optional(),
})

const LastSessionStatisticsSchema = z.object({
  lastSessionId: z.string().optional(),
  userId: z.string().optional(),
  lastSessionDuration: z.number().optional(),
  lastSessionCards: z.number().optional(),
  lastSessionCatalogs: z.number().optional(),
  lastSessionQuizzes: z.number().optional(),
})

const GetStatisticsSchema = z.object({
  userId: z.string().optional(),
  statsId: z.string().optional(),
  weeklyStatsId: z.array(LastWeekStatisticsSchema).optional(),
  lastSessionId: z.array(LastSessionStatisticsSchema).optional(),
  activeStudyPlans: z.array(z.string()).optional(),
})

export interface LastWeekStatisticsDTO {
  weekId: string
  userId: string
  sessionsDuration: number
  catalogsPracticed: number
  studyDays: Date[]
  cards_learned: number[]
  cards_added: number[]
}

export interface LastSessionStatisticsDTO {
  lastSessionId: string
  userId: string
  lastSessionDuration: number
  lastSessionCards: number
  lastSessionCatalogs: number
  lastSessionQuizzes: number
}

export interface WeeklyStatisticsDTO {
  weekId: string
  userId: string
  totalStudyTime: number
  numberOfSessions: number
  averageSessionLength: number
}

function fetchLastSessionStatistics(): Promise<LastSessionStatisticsDTO> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        lastSessionId: "sess123",
        userId: "user123",
        lastSessionDuration: 120,
        lastSessionCards: 15,
        lastSessionCatalogs: 3,
        lastSessionQuizzes: 2,
      })
    }, 50)
  })
}

function fakeEndpoint(): Promise<LastWeekStatisticsDTO> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        weekId: "2024W24",
        userId: "user123",
        sessionsDuration: 500,
        catalogsPracticed: 5,
        studyDays: [new Date("2024-06-01"), new Date("2024-06-03"), new Date("2024-06-05")],
        cards_learned: [20, 30],
        cards_added: [10, 15],
      })
    }, 50)
  })
}

// Fixed function definition using GetStatisticsSchema
export default async function getStatistics(input: z.infer<typeof GetStatisticsSchema>, ctx: Ctx) {
  // Validate the input
  const data = GetStatisticsSchema.parse(input)

  // Require user to be logged in
  ctx.session.$authorize()

  const stats = await fakeEndpoint()

  // Can do any processing, fetching from other APIs, etc
  return stats
}
