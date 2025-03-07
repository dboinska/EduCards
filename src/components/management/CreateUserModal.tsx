import { Modal, TextInput, Box, Text, Flex, Group, Button } from "@mantine/core"
import { ImageUpload } from "@/components/ImageUpload"

interface CreateUserModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  classes?: Record<string, string>
}

export const CreateUserModal = ({ isOpen, onClose, onSubmit, classes }: CreateUserModalProps) => {
  return (
    <Modal opened={isOpen} onClose={onClose} title="Create New User" centered size="lg">
      <form
        name="createUser"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        <Flex direction="column" gap="md">
          <TextInput
            label="User name"
            placeholder="User name"
            style={{ width: "100%" }}
            size="sm"
            required
          />
          <TextInput
            label="Email"
            placeholder="Email"
            style={{ width: "100%" }}
            size="sm"
            required
          />
          <Box>
            <Text size="sm" fw={500} mb={4}>
              Role
            </Text>
            <select
              className="w-full p-2 border rounded"
              style={{
                height: "36px",
                fontSize: "14px",
                border: "1px solid #ced4da",
                borderRadius: "4px",
                backgroundColor: "white",
              }}
              required
            >
              <option value="" disabled selected>
                Select Role
              </option>
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
          </Box>
          <ImageUpload
            label="Avatar:"
            placeholder="Select user avatar"
            hidePreview
            onDrop={(files) => console.log(files)}
            onReject={(files) => console.log(files)}
            onRemove={() => console.log("removed")}
          />
          <TextInput
            label="Password"
            placeholder="Password"
            type="password"
            style={{ width: "100%" }}
            size="sm"
            required
          />
          <TextInput
            label="Confirm password"
            placeholder="Confirm password"
            type="password"
            style={{ width: "100%" }}
            size="sm"
            required
          />
          <Flex align="center" gap="sm" mt="xs">
            <input
              type="checkbox"
              id="isActive"
              defaultChecked={true}
              style={{ cursor: "pointer" }}
            />
            <label htmlFor="isActive" style={{ cursor: "pointer", fontSize: "14px" }}>
              Active Account
            </label>
          </Flex>

          <Group justify="flex-end" mt="xl">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" radius="md">
              Create User
            </Button>
          </Group>
        </Flex>
      </form>
    </Modal>
  )
}
