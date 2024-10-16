import { randomId } from "@mantine/hooks"
import type {
  CreateCatalogBaseSchema,
  NewCatalogCardsSchema,
  NewCatalogShareSettingsSchema,
} from "./CreateCatalog.schema"

export const createCatalogBaseDefaults: CreateCatalogBaseSchema = {
  name: "",
  description: "",
  imageUrl: "",
  amountOfDrawers: "3",
}

export const createCatalogCardsDefaults: NewCatalogCardsSchema = {
  cards: [
    {
      term: "",
      description: "",
      termTranslated: "",
      descriptionTranslated: "",
      imageUrl: "",
      key: randomId(),
    },
  ],
}

export const createCatalogSharingDefaults: NewCatalogShareSettingsSchema = {
  isShared: false,
  sharedWith: [],
}
