import { Flex, ColorSwatch, SimpleGrid, useMantineTheme } from "@mantine/core"
import { useState } from "react"

export function ColorSelection() {
  const theme = useMantineTheme()
  const colors = Object.keys(theme.colors).map((color) => theme.colors[color][6])

  const [selectedColor, setSelectedColor] = useState(colors[0])

  const CustomColorSwatch = ({ color }) => (
    <ColorSwatch
      color={color}
      style={{
        cursor: "pointer",
        border: color === selectedColor ? "2px solid #000" : "1px solid rgba(0, 0, 0, 0.1)",
        transform: color === selectedColor ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.1s, border 0.1s",
      }}
      onClick={() => setSelectedColor(color)}
    />
  )

  return (
    <Flex w="100%" direction="column" m="var(--mantine-spacing-md)">
      <label style={{ display: "block", marginBottom: 10 }}>Select main color:</label>
      <SimpleGrid cols={15} spacing="sm" style={{ display: "flex", flexWrap: "wrap" }}>
        {colors.map((color) => (
          <CustomColorSwatch key={color} color={color} />
        ))}
      </SimpleGrid>
    </Flex>
  )
}
