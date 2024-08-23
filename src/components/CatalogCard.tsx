import { Avatar, Flex } from "@mantine/core"
import styles from "src/styles/Catalogs.module.css"
import { ToggleMenu } from "./ToggleMenu"
import Link from "next/link"
import { IconX } from "@tabler/icons-react"
import { Routes } from "@blitzjs/next"
import { RouteUrlObject } from "blitz"
import { clsx } from "clsx"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"
import { ActionIcon } from "@mantine/core"
import { IconHeart, IconHeartFilled } from "@tabler/icons-react"

type Setting = {
  label: string
  path: RouteUrlObject
  id: string
}

interface CatalogCardProps {
  imageUrl?: string | null
  term: string
  description?: string | null
  ownerId: string
  isOwner?: boolean
  settings?: Setting[]
  owner: {
    id: string
    email: string
    imageUrl: string | null
    name: string | null
  }
}

export const CatalogCard = ({
  imageUrl,
  term,
  description,
  ownerId,
  isOwner,
  settings,
  owner,
}: CatalogCardProps) => {
  const currentUser = useCurrentUser()

  const isFavorite = false

  const favCard = currentUser ? (
    <ActionIcon variant="subtle" radius="md" size={22}>
      {isFavorite ? (
        <IconHeartFilled className={styles.favorite} stroke={2} />
      ) : (
        <IconHeart className={styles.favorite} stroke={2} />
      )}
    </ActionIcon>
  ) : null

  return (
    <div
      className={`${styles.body} ${imageUrl && styles.withOverlay} `}
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className={clsx(imageUrl && styles.overlay)}></div>
      <Link href={Routes.Cards()} className={styles.cardContent}>
        <div className={styles.headerContainer}>
          <h2>{term}</h2>
          <IconX />
        </div>
        <h3>{description}</h3>
      </Link>
      <div className={styles.inline}>
        <div className={styles.author}>
          <Avatar src={owner.imageUrl} alt={owner.name || "Owner"} radius="xl" size="sm" />
          <span>{owner.name || "Owner"}</span>
        </div>
        <Flex className={styles.controls}>
          {isOwner && settings && <ToggleMenu item={"card"} settings={settings} />}

          {favCard}
        </Flex>
      </div>
    </div>
  )
}
