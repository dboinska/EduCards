import type { CardSchema } from "./Card.schema"

export const cardDefaults: Omit<CardSchema, "cardId" | "catalogId"> = {
  term: "",
  description: "",
  termTranslated: "",
  descriptionTranslated: "",
  imageUrl: "",
}

export const storedCardDefaults: CardSchema = {
  ...cardDefaults,
  catalogId: "",
  cardId: "",
}
