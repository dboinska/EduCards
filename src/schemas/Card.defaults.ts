import type { CardSchema } from "./Card.schema"

export const cardDefaults: Omit<CardSchema, "cardId" | "catalogId"> = {
  term: "",
  description: "",
  termTranslated: "",
  descriptionTranslated: "",
  imageURL: "",
}

export const storedCardDefaults: CardSchema = {
  ...cardDefaults,
  catalogId: "",
  cardId: "",
}
