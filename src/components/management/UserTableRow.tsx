import { Avatar, Group, Text, Badge, Anchor, ActionIcon, Table } from "@mantine/core"
import { IconChartDots, IconPencil, IconTrash } from "@tabler/icons-react"
import { ROLE_COLOR, STATUS_COLOR, TABLE_STYLES, User } from "@/modules/management/types/UserTables"

// Helper functions
const formatDateTime = (date: string) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(date))
}

interface UserTableRowProps {
  user: User
  onEdit: () => void
  onDelete: () => void
  onShowStatistics: () => void
}

const UserTableRow = ({ user, onEdit, onDelete, onShowStatistics }: UserTableRowProps) => {
  return (
    <Table.Tr key={user.id}>
      <Table.Td style={TABLE_STYLES.cell.user}>
        <Group gap="sm">
          <Avatar size={30} src={user.imageUrl} radius={30} />
          <Text
            fz="sm"
            fw={500}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "calc(100% - 40px)",
            }}
          >
            {user.name}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td style={TABLE_STYLES.cell.status}>
        <Badge color={STATUS_COLOR[user.isActive ? "active" : "inactive"]} variant="light">
          {user.isActive ? "Active" : "Inactive"}
        </Badge>
      </Table.Td>
      <Table.Td style={TABLE_STYLES.cell.role}>
        <Badge color={ROLE_COLOR[user.role.toLowerCase()]} variant="light">
          {user.role}
        </Badge>
      </Table.Td>
      <Table.Td style={TABLE_STYLES.cell.email}>
        <Anchor component="button" size="sm">
          {user.email}
        </Anchor>
      </Table.Td>
      <Table.Td style={TABLE_STYLES.cell.date}>
        <Text fz="sm">{formatDateTime(user.createdAt)}</Text>
      </Table.Td>
      <Table.Td style={TABLE_STYLES.cell.actions}>
        <Group gap={0} justify="flex-end">
          <ActionIcon variant="subtle" color="green" onClick={onShowStatistics}>
            <IconChartDots size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray" onClick={onEdit}>
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" onClick={onDelete}>
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  )
}

export default UserTableRow
