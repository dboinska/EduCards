import { Avatar, Flex, ActionIcon, Button, Image, Badge, Group, Dialog, Text } from "@mantine/core"
import styles from "src/styles/Catalogs.module.css"
import classes from "src/styles/Notifications.module.css"
import { IconX, IconHeart, IconHeartFilled, IconSettings } from "@tabler/icons-react"
import { clsx } from "clsx"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"
import { useMutation } from "@blitzjs/rpc"
import deleteCard from "@/pages/catalogs/mutations/deleteCard"
import { notifications } from "@mantine/notifications"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useDisclosure } from "@mantine/hooks"
import { useState } from "react"

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
  const [opened, { open, close }] = useDisclosure(false)
  const [loading, setLoading] = useState(false)

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
      setLoading(true)
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
      close()
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
    } finally {
      setLoading(false)
    }
  }

  async function handleEdit(cardId: string) {
    await push(Routes.EditCard({ id: cardId, catalogId: catalogId }))
  }

  async function handleClick() {
    await push(Routes.CardPage({ id: cardId }))
  }

  return (
    <div className={clsx(styles.body, imageUrl && styles.withOverlay)}>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="background image"
          w="100%"
          h="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      )}
      <div className={clsx(imageUrl && styles.overlay)}></div>
      <div className={styles.cardContent}>
        <div className={styles.headerContainer}>
          <h2 onClick={handleClick}>{term}</h2>
          <Button
            variant="outline"
            color="red"
            className={styles.deleteButton}
            onClick={() => {
              open()
            }}
            p="var(--mantine-spacing-md) auto"
          >
            <IconX />
          </Button>
        </div>
        <h3>{description}</h3>
      </div>
      <div className={styles.inline}>
        <Flex align="center" gap="var(--mantine-spacing-sm)">
          <Avatar
            src={owner.imageUrl}
            color={imageUrl ? "white" : "blue"}
            alt={owner.name || "Owner"}
            radius="xl"
            size="sm"
          />
          <Badge
            size="sm"
            variant={imageUrl ? "white" : "light"}
            color="var(--mantine-color-blue-5)"
          >
            {owner.name || "Owner"}
          </Badge>
        </Flex>
        <Flex className={styles.controls}>
          <Button
            p="0 2px"
            w="24"
            h="24"
            radius="xl"
            onClick={() => handleEdit(cardId)}
            className={styles.iconSettings}
            variant="transparent"
            color="var(--mantine-color-gray-8)"
          >
            <IconSettings />
          </Button>
          {favCard}
        </Flex>
      </div>
      <Dialog
        opened={opened}
        onClose={close}
        size="md"
        radius="md"
        zIndex="9999"
        styles={{
          root: {
            position: "fixed",
            top: "50%",
            left: "40%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          },
        }}
      >
        <Text size="sm" mb="xs" fw={500}>
          Do you want to remove card: {term}?
        </Text>
        <Group justify="right">
          <Button variant="outline" color="black" onClick={close} disabled={loading}>
            Dismiss
          </Button>
          <Button color="red" onClick={removeCard} disabled={loading}>
            Delete
          </Button>
        </Group>
      </Dialog>
    </div>
  )
}
