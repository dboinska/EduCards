import { createUsers } from "./seeds/user.pipe"
import { createCatalogs } from "./seeds/catalog.pipe"

import englishDictionary from "./dictionaries/english.dict"
import spanishDictionary from "./dictionaries/spanish.dict"
import japaneseDictionary from "./dictionaries/japanese.dict"
import hawaiianDictionary from "./dictionaries/hawaiian.dict"
// catalog,
// cards
// drawers
// study plan

const seed = async () => {
  const ownerId = (await createUsers()).savedUsers?.[0]?.id

  if (!ownerId) {
    throw new Error("Owner ID is not defined")
  }

  await createCatalogs(japaneseDictionary, ownerId)
  await createCatalogs(englishDictionary, ownerId)
  await createCatalogs(spanishDictionary, ownerId)
  await createCatalogs(hawaiianDictionary, ownerId)
}

export default seed
