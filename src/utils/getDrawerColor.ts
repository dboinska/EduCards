import { frequencyColorMap } from "@/utils/frequency"

function getDrawerColor(frequency: keyof typeof frequencyColorMap | undefined): string {
  if (!frequency) {
    console.log("Invalid frequency")
    return "black"
  }
  return frequencyColorMap[frequency]
}

export default getDrawerColor
