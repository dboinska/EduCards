import { clsx } from "clsx"
import { Paper, Group, Text } from "@mantine/core"

import classes from "@/styles/Stats.module.css"

export interface StatProps {
  title: string
  value: number | string
  className?: string
}

export const Stat = ({ title, value, className }: StatProps) => (
  <Paper withBorder p="md" radius="md" className={clsx(className)}>
    <Group justify="space-between">
      <Text size="sm" className={classes.title}>
        {title}
      </Text>
    </Group>

    <Group align="flex-end" gap="xs" mt="sm">
      <Text className={classes.value}>{value}</Text>
    </Group>
  </Paper>
)
