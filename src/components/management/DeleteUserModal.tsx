import { Modal, Text, Group, Button } from "@mantine/core"
import { User } from "@/modules/management/types/UserTables"

interface DeleteUserModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  user: User | null
}

export const DeleteUserModal = ({ isOpen, onClose, onConfirm, user }: DeleteUserModalProps) => {
  return (
    <Modal opened={isOpen} onClose={onClose} title="Confirm Account Deletion" centered>
      <Text mb="xl">
        Are you sure you want to delete the account for <strong>{user?.name}</strong> ({user?.email}
        )? This action will delete all associated data including catalogs, cards, and learning
        history. This action cannot be undone.
      </Text>
      <Group justify="flex-end" mt="md">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button color="red" onClick={onConfirm}>
          Delete Account
        </Button>
      </Group>
    </Modal>
  )
}
