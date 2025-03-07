export type Catalog = {
  id?: string
  name: string
  type: "public" | "private"
  imageUrl?: string
  createdAt: string | Date
  owner?: {
    id: string
    email: string
    name: string
    imageUrl: string | null
  }
  isPublic?: boolean
  description?: string
  isActive?: boolean
  numberOfCards?: number
}

export type CatalogFilter = "all" | "public" | "private" | "new"

export const CATALOG_STATUS_COLOR: Record<string, string> = {
  public: "var(--mantine-color-blue-6)",
  private: "var(--mantine-color-violet-6)",
}

export const TABLE_STYLES = {
  cell: {
    status: { width: 120 },
    date: { width: 160 },
    actions: { width: 120 },
    owner: { minWidth: 180 },
    catalog: { width: 300 },
  },
}
