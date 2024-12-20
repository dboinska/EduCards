import { Avatar, Flex, Text } from "@mantine/core"

type MultiSelectOptionProps = {
  image: string
  label: string
  email: string
}

export const MultiSelectOption = ({ image, label, email }: MultiSelectOptionProps) => (
  <Flex gap="md">
    <Avatar src={image} size={24} radius="xl" />
    <div>
      <Text size="sm">{label}</Text>
      <Text size="xs" color="dimmed">
        {email}
      </Text>
    </div>
  </Flex>
)
