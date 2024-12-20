import { useMemo, useState } from "react"

import { CreateCatalogSchema } from "@/modules/catalog/schemas/CreateCatalog.schema"
import { CreateCatalogContext } from "@/modules/catalog/contexts/CreateCatalog.context"

export const CreateCatalogLayout = ({ children }) => {
  const [formState, setFormState] = useState<CreateCatalogSchema | null>(null)

  const value = useMemo(() => ({ formState, setFormState }), [formState])

  return <CreateCatalogContext.Provider value={value}>{children}</CreateCatalogContext.Provider>
}
