import { Routes } from "@blitzjs/next"
import { Button, Flex } from "@mantine/core"
import { IconCirclePlus, IconCards } from "@tabler/icons-react"
import { RouteUrlObject } from "blitz"
import Link from "next/link"

import styles from "src/styles/CatalogHeader.module.css"

interface CatalogHeaderProps {
  header: string
  link: RouteUrlObject
  learningMode?: boolean
}

export function CatalogHeader({ header, link, learningMode }: CatalogHeaderProps) {
  return (
    <div className={styles.header}>
      <h1>{header}</h1>
      <Flex gap="8px" className={styles.links}>
        {learningMode && (
          <Link href={Routes.Cards()} passHref>
            <Button component="a" variant="filled" color="var(--mantine-color-lime-6)" radius="md">
              <IconCards /> Let's learn
            </Button>
          </Link>
        )}
        <Link href={link} passHref>
          <Button component="a" variant="filled" color="var(--mantine-color-blue-6)" radius="md">
            <IconCirclePlus /> Add new
          </Button>
        </Link>
      </Flex>
    </div>
  )
}
