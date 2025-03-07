import { Table } from "@mantine/core"

interface DataTableProps<C> {
  columns: C[]
  children: React.ReactNode
}

export const DataTable = <C extends string>({ columns, children }: DataTableProps<C>) => (
  <Table miw={800} verticalSpacing="sm" highlightOnHover>
    <Table.Thead>
      <Table.Tr>
        {columns.map((column) => (
          <Table.Th key={column}>{column}</Table.Th>
        ))}
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>{children}</Table.Tbody>
  </Table>
)
