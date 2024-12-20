import { randomId } from "@mantine/hooks"
import { CreateCardSchema } from "./CreateCard.schema"

export const createCardDefaults = (catalogId: string): CreateCardSchema => ({
  cards: [
    {
      term: "",
      description: "",
      termTranslated: "",
      descriptionTranslated: "",
      imageUrl: "",
      key: randomId(),
      catalogId,
    },
  ],
})
