import { Text, RingProgress, Center } from "@mantine/core"

interface ProgressProps {
  percent: number
  color: string
  text?: string
  size: number
  textSize?: "sm" | "md" | "lg" | "xl"
  thickness?: number
}

export function Progress({ percent, color, text, size, textSize, thickness }: ProgressProps) {
  return (
    <RingProgress
      size={size}
      roundCaps
      thickness={thickness || 8}
      sections={[
        {
          value: percent,
          color: color,
        },
      ]}
      m="0 auto"
      label={
        <Center>
          <Text fw={700} size={textSize}>
            {text}
          </Text>
        </Center>
      }
    />
  )
}
