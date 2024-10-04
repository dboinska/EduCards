import { Radio, Group, SimpleGrid, useMantineTheme } from "@mantine/core"
import { motion } from "framer-motion"

interface RadioButtonsProps {
  options: { id: string; label: string }[]
  value: string | null
  onChange: (value: string) => void
}

export function RadioButtons({ options, value, onChange }: RadioButtonsProps) {
  const theme = useMantineTheme()
  // const values = options.map((option) => (
  //   <Radio
  //     className="border"
  //     p="var(--mantine-spacing-sm)"
  //     key={option.id}
  //     value={option.id}
  //     label={option.label}
  //   />
  // ))
  return (
    <Radio.Group
      name="quizOptions"
      label="Select the definition of this term:"
      withAsterisk
      value={value}
      onChange={(value) => {
        console.log("Selected value in RadioButtons:", value)
        onChange(value)
      }}
    >
      <Group mt="xs">
        <SimpleGrid w="100%" cols={{ base: 1, md: 2 }}>
          {options.map((option) => {
            const isSelected = value === option.id
            return (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ display: "flex", alignItems: "center", width: "100% " }}
              >
                <Radio
                  key={option.id}
                  value={option.id}
                  label={option.label}
                  w="100%"
                  p="var(--mantine-spacing-sm)"
                  styles={{
                    root: {
                      display: "block",
                      border: `2px solid ${
                        isSelected ? theme.colors.blue[6] : theme.colors.gray[3]
                      }`,
                      borderRadius: theme.radius.md,
                      padding: theme.spacing.sm,
                      transition: "border-color 0.2s, transform 0.2s",
                      "&:hover": {
                        borderColor: theme.colors.blue[6],
                      },
                    },
                    labelWrapper: { width: "100%" },
                    label: { width: "100%" },
                    radio: {
                      cursor: "pointer",
                    },
                  }}
                />
              </motion.div>
            )
          })}
        </SimpleGrid>
      </Group>
    </Radio.Group>
  )
}
