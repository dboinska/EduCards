import { Dialog, Button, Group, Text } from "@mantine/core"
import { useState } from "react"

export function ConfirmationDialog({
  opened,
  close,
  item,
  onDelete,
  confirmationMessage,
  confirmButtonText,
}) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      await onDelete()
      close()
    } catch (error) {
      console.error("Failed to delete", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      opened={opened}
      onClose={close}
      size="md"
      radius="md"
      zIndex="9999"
      position={{ top: "50%", left: 50 }}
    >
      <Text size="sm" mb="xs" fw={500}>
        {confirmationMessage}
      </Text>
      <Group justify="right">
        <Button variant="outline" color="black" onClick={close} disabled={loading}>
          Dismiss
        </Button>
        <Button color="red" onClick={handleDelete} disabled={loading}>
          {confirmButtonText}
        </Button>
      </Group>
    </Dialog>
  )
}
