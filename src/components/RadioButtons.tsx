import { Radio, Group, SimpleGrid } from "@mantine/core"

interface RadioButtonsProps {
  options: { id: string; value: string; label: string }[]
}

export function RadioButtons({ options }: RadioButtonsProps) {
  const values = options.map((option) => (
    <Radio
      className="border"
      p="var(--mantine-spacing-sm)"
      key={option.id}
      value={option.value}
      label={option.label}
    />
  ))
  return (
    <Radio.Group name="favoriteFramework" label="Select your answer" withAsterisk>
      <Group mt="xs">
        <SimpleGrid w="100%" cols={{ base: 1, md: 2 }}>
          {values}
        </SimpleGrid>
      </Group>
    </Radio.Group>
  )
}
