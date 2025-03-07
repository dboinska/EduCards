export type User = {
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

export type UserFilter = "all" | "active" | "inactive" | "new"

export const STATUS_COLOR: Record<string, string> = {
  active: "var(--mantine-color-green-6)",
  inactive: "var(--mantine-color-red-6)",
}

export const ROLE_COLOR: Record<string, string> = {
  admin: "var(--mantine-color-pink-6)",
  moderator: "var(--mantine-color-violet-6)",
  user: "var(--mantine-color-blue-6)",
}

export const TABLE_STYLES = {
  cell: {
    status: { width: 120 },
    role: { width: 100 },
    date: { width: 160 },
    actions: { width: 120 },
    email: { minWidth: 180 },
    user: { width: 300 },
  },
}
