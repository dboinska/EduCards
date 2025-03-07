import { useState } from "react"
import { notifications } from "@mantine/notifications"
import { Catalog, CatalogFilter } from "@/modules/management/types/CatalogTables"

interface UseCatalogManagementProps {
  catalogs: Catalog[]
  deleteCatalog: (params: { catalogId: string }) => Promise<void>
  router: any
  classes?: Record<string, string>
}

export const useCatalogManagement = ({
  catalogs = [],
  deleteCatalog,
  router,
  classes,
}: UseCatalogManagementProps) => {
  // State
  const [activeFilter, setActiveFilter] = useState<CatalogFilter>("all")
  const [catalogToShowStatistics, setCatalogToShowStatistics] = useState<string | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [statisticModalOpen, setStatisticModalOpen] = useState(false)
  const [createCatalogModalOpen, setCreateCatalogModalOpen] = useState(false)
  const [catalogToDelete, setCatalogToDelete] = useState<Catalog | null>(null)
  const [catalogToEdit, setCatalogToEdit] = useState<Catalog | null>(null)
  const [editModalOpen, setEditModalOpen] = useState(false)

  // Filtered catalogs
  const publicCatalogs = catalogs.filter((catalog) => catalog.type.toLowerCase() === "public")
  const privateCatalogs = catalogs.filter((catalog) => catalog.type.toLowerCase() === "private")
  const newCatalogs = catalogs.filter((catalog) => {
    const createdAt = new Date(catalog.createdAt)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    return createdAt >= thirtyDaysAgo
  })

  const filters = [
    {
      id: "all" as CatalogFilter,
      label: "All Catalogs",
      count: catalogs.length,
    },
    {
      id: "public" as CatalogFilter,
      label: "Public",
      count: publicCatalogs.length,
    },
    {
      id: "private" as CatalogFilter,
      label: "Private",
      count: privateCatalogs.length,
    },
    {
      id: "new" as CatalogFilter,
      label: "New",
      count: newCatalogs.length,
    },
  ]

  // Handlers
  const getFilteredCatalogs = () => {
    switch (activeFilter) {
      case "public":
        return publicCatalogs
      case "private":
        return privateCatalogs
      case "new":
        return newCatalogs
      default:
        return catalogs
    }
  }

  const handleDeleteCatalog = async () => {
    if (!catalogToDelete || !catalogToDelete.id) return

    try {
      await deleteCatalog({ catalogId: catalogToDelete.id })
      notifications.show({
        title: "Catalog deleted successfully",
        message: "",
        color: "green",
        position: "top-right",
        classNames: classes,
        autoClose: 5000,
      })
      setDeleteModalOpen(false)
      setCatalogToDelete(null)
      router.reload()
    } catch (error) {
      notifications.show({
        title: "Failed to delete catalog",
        message: "Try again",
        color: "red",
        position: "top-right",
        classNames: classes,
        autoClose: 5000,
      })
      console.error("Failed to delete catalog:", error)
    }
  }

  const openDeleteModal = (catalogId: string) => {
    const catalog = catalogs.find((c) => c.id === catalogId)
    if (catalog) {
      setCatalogToDelete(catalog)
      setDeleteModalOpen(true)
    }
  }

  const openEditModal = (catalog: Catalog) => {
    setCatalogToEdit(catalog)
    setEditModalOpen(true)
  }

  const handleCreateCatalog = () => {
    setCreateCatalogModalOpen(false)
    notifications.show({
      title: "Catalog created successfully",
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
    catalogToShowStatistics,
    setCatalogToShowStatistics,
    deleteModalOpen,
    setDeleteModalOpen,
    statisticModalOpen,
    setStatisticModalOpen,
    createCatalogModalOpen,
    setCreateCatalogModalOpen,
    catalogToDelete,
    catalogToEdit,
    editModalOpen,
    setEditModalOpen,

    // Data
    filters,
    filteredCatalogs: getFilteredCatalogs(),

    // Actions
    openDeleteModal,
    openEditModal,
    handleDeleteCatalog,
    handleCreateCatalog,
  }
}
