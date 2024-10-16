import { frequencySchema, FrequencySchema } from "@/utils/frequency"
import { Frequency } from "db"

function findFrequency(frequency: Frequency, level: keyof FrequencySchema): number {
  const index = frequencySchema[level].indexOf(frequency)

  return index !== -1 ? index : 0
}

export default findFrequency
