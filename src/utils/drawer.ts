import { frequencySchema } from "./frequency"

export const DRAWER_LEVEL = {
  3: frequencySchema.BEGINNER,
  5: frequencySchema.INTERMEDIATE,
  7: frequencySchema.ADVANCED,
} as const

export const DRAWER_LEVEL_NAME = {
  3: "BEGINNER",
  5: "INTERMEDIATE",
  7: "ADVANCED",
}
