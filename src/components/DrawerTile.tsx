import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { Avatar, Flex, Badge } from "@mantine/core"
import { clsx } from "clsx"

import styles from "src/styles/DrawerTile.module.css"

interface DrawerTileProps {
  id: string
  term: string
  description?: string | null
  imageURL?: string | null
  userName?: string | null
}

export const DrawerTile = ({
  imageURL,
  id,
  term,
  description,
  userName = "Owner",
}: DrawerTileProps) => (
  <div
    className={clsx(imageURL && styles.withOverlay, styles.root)}
    style={{
      backgroundImage: `url(${imageURL})`,
    }}
  >
    <div className={clsx(imageURL && styles.overlay)}></div>
    <Link href={Routes.CardPage({ id })} className={styles.cardContent}>
      <div className={styles.headerContainer}>
        <h2>{term}</h2>
      </div>
      <h3>{description}</h3>
    </Link>
    <div className={styles.inline}>
      <Flex align="center" gap="var(--mantine-spacing-sm)">
        <Avatar
          src={imageURL}
          color={imageURL ? "white" : "blue"}
          alt="Persona image"
          radius="xl"
          size="sm"
        />
        <Badge size="sm" variant="light" color={imageURL ? "white" : "var(--mantine-color-blue-5)"}>
          {userName}
        </Badge>
      </Flex>
    </div>
  </div>
)
