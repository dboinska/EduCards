import { createContext, useContext } from "react"

import type { Dispatch, SetStateAction } from "react"
import type { CreateCatalogSchema } from "@/schemas/CreateCatalog.schema"

export type CreateCatalogContextProps = {
  formState: CreateCatalogSchema | null
  setFormState: Dispatch<SetStateAction<CreateCatalogSchema>>
}

export const CreateCatalogContext = createContext<CreateCatalogContextProps | null>(null)

export const useCatalogContext = () => useContext(CreateCatalogContext)
