import type { FrequencyDictionary } from "@/utils/frequency"
import { Routes } from "@blitzjs/next"
import { Badge, Flex } from "@mantine/core"
import Link from "next/link"

import styles from "src/styles/Catalogs.module.css"

interface DrawerCardProps {
  id: string
  header: string
  frequency: FrequencyDictionary
  color: string
  numberOfCards?: number
  percentCompleted?: number
}

export const DrawerCard = ({
  id,
  header,
  frequency,
  color,
  numberOfCards,
  percentCompleted,
}: DrawerCardProps) => {
  return (
    <Flex
      align="center"
      h="100%"
      p="var(--mantine-spacing-xs)"
      className={`${styles.drawer}`}
      style={{
        border: `2px solid var(--mantine-color-gray-2)`,
      }}
    >
      <Link href={Routes.Drawer({ id })} style={{ height: "100%", minHeight: "100px" }}>
        <Flex direction="column" justify="space-between" h="100%" maw="110px">
          <div className={styles.headerContainer}>
            <h2
              style={{
                color,
              }}
            >
              {header}
            </h2>
          </div>
          <h3
            style={{
              color: "var(--mantine-color-gray-7)",
              fontSize: "var(--mantine-font-size-sm)",
              whiteSpace: "pre-wrap",
              width: "100%",
              minHeight: "44px",
            }}
          >
            {frequency}
          </h3>
          <Badge variant="outline" color={color} m="0 auto">
            {numberOfCards || 0} cards
          </Badge>
          {percentCompleted && (
            <p style={{ margin: 0, color: "var(--mantine-color-gray-8)", whiteSpace: "pre-line" }}>
              <span style={{ color, fontWeight: 700 }}>{percentCompleted}% </span> completed
            </p>
          )}
        </Flex>
      </Link>
    </Flex>
  )
}
