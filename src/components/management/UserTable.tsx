import { Table, Box } from "@mantine/core"
import UserTableRow from "./UserTableRow"

type User = {
  id: string
  name: string
  email: string
  imageUrl?: string
  isActive: boolean
  role: string
  createdAt: string
  ownerId?: string
  isPublic?: boolean
  avatar?: string
}

interface UserTableProps {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (userId: string) => void
  onShowStatistics: (userId: string) => void
}

export const UserTable = ({ users, onEdit, onDelete, onShowStatistics }: UserTableProps) => {
  return (
    <Box
      style={{
        height: "calc(100% - 240px)",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Table stickyHeader stickyHeaderOffset={0}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>User</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Created At</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              onEdit={() => onEdit(user)}
              onDelete={() => onDelete(user.id)}
              onShowStatistics={() => onShowStatistics(user.ownerId || "")}
            />
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  )
}
