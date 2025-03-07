import { Table, Text } from "@mantine/core"

export const EmptyDataRow = ({ children = "No catalogs available" }: React.PropsWithChildren) => (
  <Table.Tr>
    <Table.Td colSpan={6} align="center">
      <Text c="dimmed" py="xl">
        {children}
      </Text>
    </Table.Td>
  </Table.Tr>
)
