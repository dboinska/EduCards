import { Flex, ColorSwatch, SimpleGrid, useMantineTheme } from "@mantine/core"
import { useEffect, useState } from "react"

interface ColorSelectionProps {
  value: string
  onChange: (color: string) => void
}

export function ColorSelection({ value, onChange }: ColorSelectionProps) {
  const theme = useMantineTheme()
  const colors = Object.keys(theme.colors).map((color) => theme.colors[color][6])

  const [checked, setChecked] = useState(value)

  useEffect(() => {
    console.log("Current selected color (value):", value)
  }, [value])

  const handleColorClick = (color: string) => {
    setChecked(color)
    onChange(color)
  }

  return (
    <Flex w="100%" direction="column" m="var(--mantine-spacing-md)">
      <label style={{ display: "block", marginBottom: 10 }}>Select main color:</label>
      <SimpleGrid cols={15} spacing="sm" style={{ display: "flex", flexWrap: "wrap" }}>
        {colors.map((color) => (
          <ColorSwatch
            key={color}
            color={color}
            onClick={() => handleColorClick(color)}
            style={{
              cursor: "pointer",
              border:
                color === checked
                  ? "2px solid var(--mantine-color-blue-6)"
                  : "1px solid rgba(0, 0, 0, 0.1)",
              transform: color === checked ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.2s, border 0.2s",
            }}
          />
        ))}
      </SimpleGrid>
    </Flex>
  )
}
