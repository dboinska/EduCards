export const frequency = [
  "DAILY",
  "EVERY2DAYS",
  "EVERY4DAYS",
  "WEEKLY",
  "EVERY2WEEKS",
  "MONTHLY",
  "EVERY2MONTHS",
] as const

export const frequencyColorMap = {
  DAILY: "var(--mantine-color-yellow-6)",
  EVERY2DAYS: "var(--mantine-color-lime-6)",
  EVERY4DAYS: "var(--mantine-color-green-6)",
  WEEKLY: "var(--mantine-color-teal-6)",
  EVERY2WEEKS: "var(--mantine-color-blue-6)",
  MONTHLY: "var(--mantine-color-violet-6)",
  EVERY2MONTHS: "var(--mantine-color-pink-6)",
} as const

export const frequencyDictionary = {
  DAILY: "Daily",
  EVERY2DAYS: "Every 2 days",
  EVERY4DAYS: "Every 4 days",
  WEEKLY: "Weekly",
  EVERY2WEEKS: "Every 2 weeks",
  MONTHLY: "Monthly",
  EVERY2MONTHS: "Every 2 months",
} as const

export type FrequencyDictionary = (typeof frequencyDictionary)[keyof typeof frequencyDictionary]

export type Frequency = (typeof frequency)[number]

export interface FrequencySchema {
  BEGINNER: Frequency[]
  INTERMEDIATE: Frequency[]
  ADVANCED: Frequency[]
}

export const frequencySchema: FrequencySchema = {
  BEGINNER: ["DAILY", "WEEKLY", "MONTHLY"],
  INTERMEDIATE: ["DAILY", "EVERY4DAYS", "WEEKLY", "EVERY2WEEKS", "MONTHLY"],
  ADVANCED: [
    "DAILY",
    "EVERY2DAYS",
    "EVERY4DAYS",
    "WEEKLY",
    "EVERY2WEEKS",
    "MONTHLY",
    "EVERY2MONTHS",
  ],
}
