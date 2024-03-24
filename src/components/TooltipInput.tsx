import { TextInput, Tooltip, Center, Text, rem } from "@mantine/core"
import { IconCopy } from "@tabler/icons-react"

export function TooltipInput({ label, placeholder }) {
  const rightSection = (
    <Tooltip
      label={label}
      position="top-end"
      withArrow
      transitionProps={{ transition: "pop-bottom-right" }}
    >
      <Text component="div" c="dimmed" style={{ cursor: "help" }}>
        <Center>
          <IconCopy style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </Center>
      </Text>
    </Tooltip>
  )

  return <TextInput rightSection={rightSection} label={label} placeholder={placeholder} />
}
