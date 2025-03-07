import {
  Catalog,
  CATALOG_STATUS_COLOR,
  TABLE_STYLES,
} from "@/modules/management/types/CatalogTables"
import { Box, Table, Group, Avatar, Text, Badge, ActionIcon } from "@mantine/core"
import { IconPencil, IconTrash } from "@tabler/icons-react"

const formatDateTime = (date: Date | string) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(date))
}

interface CatalogTableProps {
  catalogs: Catalog[]
  onEdit: (catalog: Catalog) => void
  onDelete: (catalogId: string) => void
  onShowStatistics: (catalogId: string) => void
}

// @TODO: onShowStatistics gdzie zaimplementować?

export const CatalogTable = ({ catalogs = [], onEdit, onDelete }: CatalogTableProps) => {
  const catalogRows = catalogs.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td style={TABLE_STYLES.cell.catalog}>
        <Group gap="sm">
          <Avatar size={30} src={item.imageUrl} radius={30} />
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
            {item.name}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td style={TABLE_STYLES.cell.status}>
        <Badge color={CATALOG_STATUS_COLOR[item.type.toLowerCase()] || "blue"} variant="light">
          {item.type}
        </Badge>
      </Table.Td>
      <Table.Td style={TABLE_STYLES.cell.status}>
        <Text fz="sm">{item?.numberOfCards}</Text>
      </Table.Td>
      <Table.Td style={TABLE_STYLES.cell.owner}>
        <Text fz="sm">{item.owner?.name || "—"}</Text>
      </Table.Td>
      <Table.Td style={TABLE_STYLES.cell.date}>
        <Text fz="sm">{formatDateTime(item.createdAt)}</Text>
      </Table.Td>
      <Table.Td style={TABLE_STYLES.cell.actions}>
        <Group gap={0} justify="flex-end">
          <ActionIcon variant="subtle" color="gray" onClick={() => onEdit(item)}>
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" onClick={() => item.id && onDelete(item.id)}>
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <Box style={{ flex: 1, overflow: "auto" }}>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Catalog name</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Cards</Table.Th>
              <Table.Th>Owner</Table.Th>
              <Table.Th>Created</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {catalogs && catalogs.length > 0 ? (
              catalogRows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={6} align="center">
                  <Text c="dimmed" py="xl">
                    No catalogs available
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Box>
  )
}
