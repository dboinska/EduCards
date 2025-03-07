import { useState } from "react"
import { useForm } from "react-hook-form"
import { notifications } from "@mantine/notifications"

import type { User } from "@/modules/management/types/UserTables"

type UserFilter = "all" | "active" | "inactive" | "new"

interface UseUserManagementProps {
  users: User[]
  deleteUser: (params: { userId: string }) => Promise<void>
  router: any
  classes?: Record<string, string>
}

export const useUserManagement = ({
  users = [],
  deleteUser,
  router,
  classes,
}: UseUserManagementProps) => {
  // State
  const [activeFilter, setActiveFilter] = useState<UserFilter>("all")
  const [userToShowStatistics, setUserToShowStatistics] = useState<string | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [statisticModalOpen, setStatisticModalOpen] = useState(false)
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [userToEdit, setUserToEdit] = useState<User | null>(null)
  const [editModalOpen, setEditModalOpen] = useState(false)

  // Filtered users
  const activeUsers = users.filter((user) => user.isActive)
  const inactiveUsers = users.filter((user) => !user.isActive)
  const newUsers = users.filter((user) => {
    const createdAt = new Date(user.createdAt)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    return createdAt >= thirtyDaysAgo
  })

  const filters = [
    {
      id: "all" as UserFilter,
      label: "All Users",
      count: users.length,
    },
    {
      id: "active" as UserFilter,
      label: "Active",
      count: activeUsers.length,
    },
    {
      id: "inactive" as UserFilter,
      label: "Inactive",
      count: inactiveUsers.length,
    },
    {
      id: "new" as UserFilter,
      label: "New",
      count: newUsers.length,
    },
  ]

  // Handlers
  const getFilteredUsers = () => {
    switch (activeFilter) {
      case "active":
        return activeUsers
      case "inactive":
        return inactiveUsers
      case "new":
        return newUsers
      default:
        return users
    }
  }

  const handleDeleteAccount = async () => {
    if (!userToDelete) return

    try {
      await deleteUser({ userId: userToDelete.id })
      notifications.show({
        title: "Account deleted successfully",
        message: "",
        color: "green",
        position: "top-right",
        classNames: classes,
        autoClose: 5000,
      })
      setDeleteModalOpen(false)
      setUserToDelete(null)
      router.reload()
    } catch (error) {
      notifications.show({
        title: "Failed to delete account",
        message: "Try again",
        color: "red",
        position: "top-right",
        classNames: classes,
        autoClose: 5000,
      })
      console.error("Failed to delete account:", error)
    }
  }

  const openDeleteModal = (userId: string) => {
    const user = users.find((u) => u.id === userId)
    if (user) {
      setUserToDelete(user)
      setDeleteModalOpen(true)
    }
  }

  const openEditModal = (user: User) => {
    setUserToEdit(user)
    form.reset({
      username: user.name || "",
      email: user.email || "",
      isPublic: user.isPublic || false,
      avatar: user.avatar || "",
      role: user.role || "",
      isActive: user.isActive || false,
    })
    setEditModalOpen(true)
  }

  // Form handling
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      isPublic: false,
      avatar: "",
      cover: "",
      currentPassword: "",
      newPassword: "",
      newPasswordConfirmation: "",
      apiKey: "",
      role: "",
      isActive: true,
    },
    // @TODO: resolver z type checkiem dla maila
    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    // },
  })

  const handleCreateUser = () => {
    setCreateUserModalOpen(false)
    notifications.show({
      title: "User created successfully",
      message: "",
      color: "green",
      position: "top-right",
      classNames: classes,
      autoClose: 3000,
    })
  }

  return {
    // State
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
    userToEdit,
    editModalOpen,
    setEditModalOpen,

    // Data
    filters,
    filteredUsers: getFilteredUsers(),

    // Actions
    openDeleteModal,
    openEditModal,
    handleDeleteAccount,
    handleCreateUser,

    // Form
    form,
  }
}

export default useUserManagement
