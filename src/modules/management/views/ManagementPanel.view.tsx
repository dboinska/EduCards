import { Button, Flex, SimpleGrid, Group, Text, Title } from "@mantine/core"
import { IconCirclePlus } from "@tabler/icons-react"

// Components
import { UsersAppShell } from "@/components/management/UsersAppShell"
import { CatalogTable } from "@/components/management/CatalogTable"
import { StatsCard } from "@/components/management/StatsCard"
import type { Catalog } from "@/modules/management/types/CatalogTables"
import { useCatalogManagement } from "@/hooks/useCatalogManagement"
import { DeleteCatalogModal } from "@/components/management/DeleteCatalogModal"
import { CreateCatalogModal } from "@/components/management/CreateCatalogModal"

interface CatalogManagementProps {
  catalogs: Catalog[]
  classes: Record<string, string>
  deleteCatalog: (params: { catalogId: string }) => Promise<void>
  router: any
  userPaths: any
}

export const CatalogManagement = ({
  catalogs = [],
  classes,
  deleteCatalog,
  router,
  userPaths,
}: CatalogManagementProps) => {
  const {
    activeFilter,
    setActiveFilter,
    setCatalogToShowStatistics,
    deleteModalOpen,
    setDeleteModalOpen,
    statisticModalOpen,
    setStatisticModalOpen,
    createCatalogModalOpen,
    setCreateCatalogModalOpen,
    catalogToDelete,
    handleDeleteCatalog,
    filters,
    filteredCatalogs,
    openDeleteModal,
    openEditModal,
    handleCreateCatalog,
  } = useCatalogManagement({
    catalogs,
    deleteCatalog,
    router,
    classes,
  })

  return (
    <UsersAppShell userPaths={[]} title="Catalog Management">
      {/* Header section */}
      <Flex my="md" justify="space-between">
        <Title order={2}>Catalogs overview</Title>
        <Button onClick={() => setCreateCatalogModalOpen(true)}>
          <IconCirclePlus style={{ marginRight: "8px" }} />
          Add New Catalog
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

      {/* Table header */}
      <Group justify="space-between" mb="xl">
        <Title order={2} mt="16px">
          {filters.find((f) => f.id === activeFilter)?.label || "All Catalogs"}
        </Title>
        <Text c="dimmed">
          Showing: <b>{filteredCatalogs.length}</b> catalogs
        </Text>
      </Group>

      {/* Catalog table */}
      <CatalogTable
        catalogs={filteredCatalogs}
        onShowStatistics={(catalogId) => {
          setCatalogToShowStatistics(catalogId)
          setStatisticModalOpen(true)
        }}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
      />

      {/* Modals */}
      <DeleteCatalogModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        catalog={catalogToDelete}
        onConfirm={handleDeleteCatalog}
      />

      <CreateCatalogModal
        isOpen={createCatalogModalOpen}
        onClose={() => setCreateCatalogModalOpen(false)}
        onSubmit={handleCreateCatalog}
        classes={classes}
      />
    </UsersAppShell>
  )
}
