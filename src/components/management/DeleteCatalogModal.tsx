import { Catalog } from "@/modules/management/types/CatalogTables"
import { Modal, Text, Group, Button } from "@mantine/core"

interface DeleteCatalogModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  catalog: Catalog | null
}

export const DeleteCatalogModal = ({
  isOpen,
  onClose,
  onConfirm,
  catalog,
}: DeleteCatalogModalProps) => {
  return (
    <Modal opened={isOpen} onClose={onClose} title="Confirm Catalog Deletion" centered>
      <Text mb="xl">
        Are you sure you want to delete the catalog <strong>{catalog?.name}</strong>? This action
        will delete all associated cards and learning history. This action cannot be undone.
      </Text>
      <Group justify="flex-end" mt="md">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button color="red" onClick={onConfirm}>
          Delete Catalog
        </Button>
      </Group>
    </Modal>
  )
}
