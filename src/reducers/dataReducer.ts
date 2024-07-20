import type { CommonInput } from "@/schemas/CommonInput"
import type { FilterType } from "@/types/FilterType"
import type { PayloadMap } from "@/types/PayloadMap"
import type { SortType } from "@/types/SortType"
import type { z } from "zod"

export const initialState = {
  filter: "all",
}

export const actionTypes = {
  search: "SEARCH",
  sort: "SORT",
  filter: "FILTER",
} as const

type DataPayload = {
  [actionTypes.search]: {
    query: string | undefined
  }
  [actionTypes.filter]: {
    filter: FilterType
  }
  [actionTypes.sort]: {
    sort: SortType | undefined
  }
}

type DataReducerAction = PayloadMap<DataPayload>[keyof PayloadMap<DataPayload>]

// @TOFIX: fix state type
export function dataReducer(state: any, action: DataReducerAction) {
  const { type, payload } = action

  switch (type) {
    case actionTypes.search: {
      return {
        ...state,
        filter: "all",
        query: payload.query,
      }
    }
    case actionTypes.filter: {
      return {
        ...state,
        filter: payload.filter,
      }
    }
    case actionTypes.sort: {
      return {
        ...state,
        sort: payload.sort,
      }
    }

    default: {
      throw new Error(`Unhandled type: ${type}`)
    }
  }
}
