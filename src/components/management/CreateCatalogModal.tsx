import { Modal, TextInput, Box, Text, Flex, Group, Button, Switch } from "@mantine/core"
import { ImageUpload } from "@/components/ImageUpload"

interface CreateCatalogModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  classes?: Record<string, string>
}

export const CreateCatalogModal = ({
  isOpen,
  onClose,
  onSubmit,
  classes,
}: CreateCatalogModalProps) => {
  return (
    <Modal opened={isOpen} onClose={onClose} title="Create New Catalog" centered size="lg">
      <form
        name="createCatalog"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        <Flex direction="column" gap="md">
          <TextInput
            label="Catalog Name"
            placeholder="Enter catalog name"
            style={{ width: "100%" }}
            size="sm"
            required
          />

          <Box>
            <Text size="sm" fw={500} mb={4}>
              Catalog Type
            </Text>
            <Switch
              label="Public catalog"
              description="Public catalogs are visible to all users"
              defaultChecked={true}
            />
          </Box>

          <ImageUpload
            label="Catalog Cover:"
            placeholder="Select catalog cover image"
            hidePreview
            onDrop={(files) => console.log(files)}
            onReject={(files) => console.log(files)}
            onRemove={() => console.log("removed")}
          />

          <TextInput
            label="Description"
            placeholder="Catalog description"
            style={{ width: "100%" }}
            size="sm"
          />

          <Group justify="flex-end" mt="xl">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" radius="md">
              Create Catalog
            </Button>
          </Group>
        </Flex>
      </form>
    </Modal>
  )
}
