import { sortTypes } from "@/types/SortType"

import type { PayloadMap } from "@/types/PayloadMap"
import type { SortType } from "@/types/SortType"
import type { Card } from "db"

interface State {
  data: Card[]
  filteredData: Card[]
  query?: string
  sort: SortType
}

export const initialState: State = {
  data: [],
  filteredData: [],
  query: "",
  sort: "asc",
}

export const actionTypes = {
  search: "SEARCH",
  sort: "SORT",
  filter: "FILTER",
  setData: "SET_DATA",
  removeCard: "REMOVE_CARD",
} as const

type DataPayload = {
  [actionTypes.search]: {
    query: string | undefined
  }
  [actionTypes.sort]: {
    sort: SortType
  }
  [actionTypes.setData]: {
    data: any[]
  }
  [actionTypes.removeCard]: {
    cardId: string
  }
}

type DataReducerAction = PayloadMap<DataPayload>[keyof PayloadMap<DataPayload>]

export function catalogReducer(state: State, action: DataReducerAction): State {
  const { type, payload } = action

  switch (type) {
    case actionTypes.search: {
      return {
        ...state,
        query: payload.query,
        filteredData: applySearch(state.data, payload.query),
      }
    }

    case actionTypes.sort: {
      if (Object.values(sortTypes).includes(payload.sort)) {
        return { ...state }
      }

      return {
        ...state,
        sort: payload.sort,
        filteredData: applySort(state.filteredData, payload.sort),
      }
    }

    case actionTypes.setData: {
      return {
        ...state,
        data: payload.data,
        filteredData: applySearch(payload.data, state.query),
      }
    }

    case actionTypes.removeCard: {
      return {
        ...state,
        data: applyRemoveCard(state.data, payload.cardId),
        filteredData: applyRemoveCard(state.filteredData, payload.cardId),
      }
    }

    default: {
      throw new Error(`Unhandled type: ${type}`)
    }
  }
}

// SEARCH
const applySearch = (data: Card[], query?: string) => {
  if (!query) {
    return [...data]
  }

  return data.filter(
    (card) =>
      card.term.toLowerCase().includes(query.toLowerCase()) ||
      card.termTranslated.toLowerCase().includes(query.toLowerCase())
  )
}

// SORT
type FieldMap = {
  field: string
  direction: "asc" | "desc"
}

type SortFieldToMap = Record<SortType, FieldMap>

const sortToFieldMap: SortFieldToMap = {
  asc: {
    field: "createdAt",
    direction: "asc",
  },
  desc: {
    field: "createdAt",
    direction: "desc",
  },
  alfa_asc: {
    field: "term",
    direction: "asc",
  },
  alfa_desc: {
    field: "term",
    direction: "desc",
  },
}

const applySort = (data: Card[], sort: SortType) => {
  const { field, direction } = sortToFieldMap[sort]
  return data.toSorted((a, b) => {
    if (direction === "asc") {
      return a[field].localeCompare(b[field])
    } else {
      return b[field].localeCompare(a[field])
    }
  })
}

// APPLY REMOVE CARD
const applyRemoveCard = (data: Card[], cardId: string) => {
  return data.filter((card) => card.cardId !== cardId)
}
