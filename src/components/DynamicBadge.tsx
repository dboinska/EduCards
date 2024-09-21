import { Routes } from "@blitzjs/next"
import { Badge, Flex } from "@mantine/core"
import Link from "next/link"

import styles from "src/styles/Catalogs.module.css"

interface DynamicBadgeProps {
  data: any
  drawerProps?: any
  setDrawerProps?: any
}

export const DynamicBadge = ({ data, drawerProps, setDrawerProps }: DynamicBadgeProps) => {
  const items = data.map((data, index) => (
    <Flex
      key={index}
      align="center"
      h="100%"
      p="var(--mantine-spacing-xs)"
      className={`${styles.drawer}`}
      style={{
        border: `2px solid var(--mantine-color-gray-2)`,
      }}
    >
      <Link
        href={Routes.Drawer({ id: data.drawerId })}
        style={{ height: "100%", minHeight: "100px" }}
        onClick={() => {
          if (!data.header) {
            const level = `level ${Number(index + 1)}`
            setDrawerProps({
              header: `${level}`,
              label: data.frequency,
              color: data.color,
            })
            console.log(drawerProps)
          }
        }}
      >
        <Flex direction="column" justify="space-between" h="100%" maw="110px">
          <div className={styles.headerContainer}>
            <h2
              style={{
                color: data.color,
              }}
            >
              {data.header || `${index + 1} level`}
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
            {data.frequency}
          </h3>
          {data.all_cards >= 0 && (
            <Badge variant="outline" color={data.color} m="0 auto">
              {data.all_cards} cards
            </Badge>
          )}
          {data.percent >= 0 && (
            <p style={{ margin: 0, color: "var(--mantine-color-gray-8)", whiteSpace: "pre-line" }}>
              <span style={{ color: data.color, fontWeight: 700 }}>{data.percent}% </span> completed
            </p>
          )}
        </Flex>
      </Link>
    </Flex>
  ))
  return items
}
