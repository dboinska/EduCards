export const sortTypes = {
  ASC: "asc",
  DESC: "desc",
  ALFA_ASC: "alfa_asc",
  ALFA_DESC: "alfa_desc",
} as const

export type SortType = (typeof sortTypes)[keyof typeof sortTypes]
