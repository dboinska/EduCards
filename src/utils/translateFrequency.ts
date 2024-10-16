import { frequencyDictionary } from "@/utils/frequency"

const translateFrequency = (frequency: keyof typeof frequencyDictionary | undefined) => {
  if (!frequency) {
    return "Daily"
  }

  return frequencyDictionary[frequency]
}

export default translateFrequency
