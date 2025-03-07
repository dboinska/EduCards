import { Button, Flex, SimpleGrid, Group, Text, Title } from "@mantine/core"
import { IconCirclePlus } from "@tabler/icons-react"
import { UserTable } from "@/components/management/UserTable"
import { StatsCard } from "@/components/management/StatsCard"
import useUserManagement from "@/hooks/useUserManagement"
import type { User } from "@/modules/management/types/UserTables"

import { UsersAppShell } from "@/components/management/UsersAppShell"
import { DeleteUserModal } from "@/components/management/DeleteUserModal"
import { CreateUserModal } from "@/components/management/CreateUserModal"
import { UserStatisticsModal } from "@/components/management/UserStatisticsModal"

interface UsersManagementProps {
  users: User[]
  catalogs?: any[]
  hasAdminAccess?: boolean
  hasModeratorAccess?: boolean
  classes?: Record<string, string>
  deleteUser?: (params: { userId: string }) => Promise<void>
  router?: any
  userPaths: any
}

export const UsersManagement = ({
  users = [],
  classes,
  deleteUser,
  router,
  userPaths,
}: UsersManagementProps) => {
  const {
    activeFilter,
    setActiveFilter,
    userToShowStatistics,
    setUserToShowStatistics,
    deleteModalOpen,
    setDeleteModalOpen,
    statisticModalOpen,
    setStatisticModalOpen,
    createUserModalOpen,
    setCreateUserModalOpen,
    userToDelete,
    handleDeleteAccount,
    filters,
    filteredUsers,
    openDeleteModal,
    openEditModal,
    handleCreateUser,
  } = useUserManagement({
    users,
    deleteUser: async (userId) => {},
    router,
    classes,
  })

  return (
    <UsersAppShell userPaths={userPaths} title="User Management Panel">
      <Flex my="md" justify="space-between">
        <Title order={2}>Users overview</Title>
        <Button onClick={() => setCreateUserModalOpen(true)}>
          <IconCirclePlus style={{ marginRight: "8px" }} />
          Add New User
        </Button>
      </Flex>

      <SimpleGrid cols={4}>
        {filters.map((filter) => (
          <StatsCard
            key={filter.id}
            filter={filter}
            isActive={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          />
        ))}
      </SimpleGrid>

      <Group justify="space-between" mb="xl">
        <Title order={2} mt="16px">
          {filters.find((f) => f.id === activeFilter)?.label || "All Users"}
        </Title>
        <Text c="dimmed">
          Showing: <b>{filteredUsers.length}</b> users
        </Text>
      </Group>

      <UserTable
        users={filteredUsers}
        onShowStatistics={(userId) => {
          setUserToShowStatistics(userId)
          setStatisticModalOpen(true)
        }}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
      />

      <DeleteUserModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        user={userToDelete}
        onConfirm={handleDeleteAccount}
      />

      <UserStatisticsModal
        key={userToShowStatistics || "no-user"}
        isOpen={statisticModalOpen}
        onClose={() => setStatisticModalOpen(false)}
        userId={userToShowStatistics || ""}
      />

      <CreateUserModal
        isOpen={createUserModalOpen}
        onClose={() => setCreateUserModalOpen(false)}
        onSubmit={handleCreateUser}
        classes={classes}
      />
    </UsersAppShell>
  )
}

export default UsersManagement
