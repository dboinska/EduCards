export const SortOrder = {
  ASC: "ASC",
  DESC: "DESC",
} as const

export type SortOrderType = (typeof SortOrder)[keyof typeof SortOrder]
