import type { CatalogWithOwner } from "../types/CatalogWithOwner"

export const FILTERS = {
  ALL: "all",
  PUBLIC: "public",
  PRIVATE: "private",
  NEW: "new",
} as const

export type Filter = (typeof FILTERS)[keyof typeof FILTERS]

export interface State {
  catalogs: CatalogWithOwner[]
  filteredCatalogs: CatalogWithOwner[]
  activeFilter: Filter
}

export type Action = { type: "SET_FILTER"; payload: Filter }

export const filterCatalogs = (
  catalogs: CatalogWithOwner[],
  filter: Filter
): CatalogWithOwner[] => {
  const now = new Date()
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  switch (filter) {
    case FILTERS.ALL:
      return catalogs
    case FILTERS.PUBLIC:
      return catalogs.filter((catalog) => catalog.type.toLowerCase() === "public")
    case FILTERS.PRIVATE:
      return catalogs.filter((catalog) => catalog.type.toLowerCase() === "private")
    case FILTERS.NEW:
      return catalogs.filter((catalog) => new Date(catalog.createdAt) >= twentyFourHoursAgo)
    default:
      return catalogs
  }
}

export const catalogReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        activeFilter: action.payload,
        filteredCatalogs: filterCatalogs(state.catalogs, action.payload),
      }
    default:
      return state
  }
}
