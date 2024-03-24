import { useState } from "react"
import { UnstyledButton, Checkbox, Text } from "@mantine/core"
import classes from "src/styles/CheckboxCard.module.css"

export function CheckboxCard({ header, desc }) {
  const [value, onChange] = useState(true)

  return (
    <UnstyledButton onClick={() => onChange(!value)} className={classes.button}>
      <Checkbox
        checked={value}
        onChange={() => {}}
        tabIndex={-1}
        size="md"
        mr="xl"
        styles={{ input: { cursor: "pointer" } }}
        aria-hidden
      />

      <div>
        <Text fw={500} mb={7} lh={1}>
          {header}
        </Text>
        <Text fz="sm" c="dimmed">
          {desc}
        </Text>
      </div>
    </UnstyledButton>
  )
}
