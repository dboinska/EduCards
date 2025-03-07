import React from "react"
import { Paper, Group, Text } from "@mantine/core"

export interface FilterItem {
  id: string
  label: string
  count: number
}

interface StatsCardProps {
  filter: FilterItem
  isActive: boolean
  onClick: () => void
}

export const StatsCard = ({ filter, isActive, onClick }: StatsCardProps) => {
  return (
    <Paper
      component="button"
      onClick={onClick}
      withBorder
      p="md"
      radius="md"
      style={{
        width: "100%",
        cursor: "pointer",
        backgroundColor: isActive ? "#f1f3f5" : "white",
        border: "2px solid var(--mantine-color-gray-2)",
        boxShadow: isActive ? "0 0 0 2px #228be6" : undefined,
        transition: "all 0.2s ease",
      }}
    >
      <Group justify="space-between">
        <div>
          <Text size="sm" c="dimmed">
            {filter.label}
          </Text>
          <Text fw={700} size="xl">
            {filter.count}
          </Text>
        </div>
      </Group>
    </Paper>
  )
}
