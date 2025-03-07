import { Table, Group, Avatar, Badge, Text } from "@mantine/core"
import type { Catalog } from "db"

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

const CATALOG_STATUS_COLOR: Record<string, string> = {
  public: "var(--mantine-color-blue-6)",
  private: "var(--mantine-color-violet-6)",
}

interface CatalogDataRowProps
  extends Pick<Catalog, "imageUrl" | "name" | "numberOfCards" | "createdAt"> {
  type: "public" | "private"
  actions?: React.ReactNode
  owner: string
}

export const CatalogDataRow = ({
  imageUrl,
  name,
  type,
  numberOfCards,
  owner,
  createdAt,
  actions,
}: CatalogDataRowProps) => (
  <Table.Tr>
    <Table.Td>
      <Group gap="sm">
        <Avatar size={32} src={imageUrl} radius={32} />
        <Text size="sm" fw={500}>
          {name}
        </Text>
      </Group>
    </Table.Td>
    <Table.Td>
      <Badge
        color={CATALOG_STATUS_COLOR[type.toLowerCase()] || CATALOG_STATUS_COLOR["public"]}
        variant="light"
      >
        {type}
      </Badge>
    </Table.Td>
    <Table.Td>{numberOfCards}</Table.Td>
    <Table.Td>{owner || "-"}</Table.Td>
    <Table.Td>{formatDateTime(createdAt)}</Table.Td>
    <Table.Td>{actions}</Table.Td>
  </Table.Tr>
)
