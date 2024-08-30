import { Avatar, Flex, ActionIcon, Button, rem } from "@mantine/core"
import styles from "src/styles/Catalogs.module.css"
import classes from "src/styles/Notifications.module.css"
import { IconX, IconHeart, IconHeartFilled, IconSettings } from "@tabler/icons-react"
import { clsx } from "clsx"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"
import { useMutation } from "@blitzjs/rpc"
import deleteCard from "@/pages/catalogs/mutations/deleteCard"
import { RouteUrlObject } from "blitz"
import { notifications } from "@mantine/notifications"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"

type Setting = {
  label: string
  path: RouteUrlObject
  id: string
}
interface CatalogCardProps {
  imageUrl?: string | null
  term: string
  description?: string | null
  owner: {
    id: string
    email: string
    imageUrl: string | null
    name: string | null
  }
  cardId: string
  catalogId: string
  onDelete: (cardId: string) => void
}

export const CatalogCard = ({
  imageUrl,
  term,
  description,
  owner,
  cardId,
  catalogId,
  onDelete,
}: CatalogCardProps) => {
  const currentUser = useCurrentUser()

  const { push } = useRouter()

  const isFavorite = false

  const [deleteCardMutation] = useMutation(deleteCard)

  const favCard = currentUser ? (
    <ActionIcon variant="subtle" radius="md" size={22}>
      {isFavorite ? (
        <IconHeartFilled className={styles.favorite} stroke={2} />
      ) : (
        <IconHeart className={styles.favorite} stroke={2} />
      )}
    </ActionIcon>
  ) : null

  const removeCard = async (event: React.MouseEvent) => {
    event.stopPropagation()

    try {
      await deleteCardMutation(cardId)

      notifications.show({
        title: "Card Deleted",
        message: `The card "${term}" has been successfully deleted.`,
        position: "top-right",
        color: "green",
        classNames: classes,
        autoClose: 5000,
      })
      onDelete(cardId)
    } catch (error: any) {
      console.error("Error deleting card:", error)
      notifications.show({
        title: "Error",
        message: `Failed to delete card "${term}". Please try again.`,
        color: "red",
        position: "top-right",
        classNames: classes,
        autoclose: 5000,
      })
    }
  }

  async function handleEdit(cardId: string) {
    await push(Routes.EditCard({ id: cardId, catalogId: catalogId }))
  }

  return (
    <div
      className={clsx(styles.body, imageUrl && styles.withOverlay)}
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className={clsx(imageUrl && styles.overlay)}></div>
      <div className={styles.cardContent}>
        <div className={styles.headerContainer}>
          <h2>{term}</h2>
          <Button
            variant="outline"
            color="red"
            className={styles.deleteButton}
            onClick={removeCard}
            p=" var(--mantine-spacing-md) auto"
          >
            <IconX />
          </Button>
        </div>
        <h3>{description}</h3>
      </div>
      <div className={styles.inline}>
        <div className={styles.author}>
          <Avatar src={owner.imageUrl} alt={owner.name || "Owner"} radius="xl" size="sm" />
          <span>{owner.name || "Owner"}</span>
        </div>
        <Flex className={styles.controls}>
          <Button
            p="0 var(--mantine-spacing-sm)"
            radius="sm"
            onClick={() => handleEdit(cardId)}
            className={styles.iconSettings}
            variant="transparent"
            color="black"
          >
            <IconSettings />
          </Button>
          {favCard}
        </Flex>
      </div>
    </div>
  )
}
