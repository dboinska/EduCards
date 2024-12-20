import { faker } from "@faker-js/faker"

import { getRandomDrawerAmount } from "../utils/getRandomDrawerAmount"

import type { Catalog, Card, Drawer } from "../index"
import type { Dictionary, Term } from "../dictionaries/types"
import { DRAWER_LEVEL, DRAWER_LEVEL_NAME } from "@/utils/drawer"

type CreatedCatalog = Omit<Catalog, "catalogId" | "createdAt" | "updatedAt">
type CreateCatalog = (name: string, ownerId: string, numberOfCards?: number) => CreatedCatalog

const createCatalog: CreateCatalog = (name, ownerId, numberOfCards) => ({
  name,
  ownerId,
  numberOfCards: numberOfCards || 0,
  type: "Language",
  description: faker.lorem.sentence(),
  isShared: faker.datatype.boolean(),
  amountOfDrawers: getRandomDrawerAmount(), // FIXME: use `faker.helpers.arrayElement(["3", "5", "7"])` when faker gets fixed
  imageUrl: faker.image.urlPicsumPhotos(),
})

const createCatalogList = (
  { language, categories }: Dictionary,
  ownerId: string
): CreatedCatalog[] =>
  categories.map((category) =>
    createCatalog(`${language}: ${category.category}`, ownerId, category.data.length)
  )

type CreateCardParams = Pick<Card, "term" | "termTranslated" | "catalogId" | "ownerId">
type CreatedCard = Omit<Card, "cardId" | "createdAt" | "updatedAt">
type CreateCard = (params: CreateCardParams) => CreatedCard

const createCard: CreateCard = ({ term, termTranslated, catalogId, ownerId }) => {
  const description = faker.lorem.sentence()
  const descriptionTranslated = faker.lorem.sentence()
  const imageUrl = faker.image.urlPicsumPhotos()

  return {
    term,
    termTranslated,
    description,
    descriptionTranslated,
    imageUrl,
    catalogId,
    ownerId,
  }
}

const createCardList = (catalogId: string, ownerId: string, cards: Term[]): CreatedCard[] =>
  cards.map((card) => createCard({ ...card, catalogId, ownerId }))

type CreatedDrawer = Omit<Drawer, "drawerId" | "createdAt" | "updatedAt">
type CreateDrawer = (
  catalogId: string,
  amountOfDrawers: number,
  numberOfCards: number
) => CreatedDrawer[]

const createDrawerList: CreateDrawer = (catalogId, amountOfDrawers, numberOfCards) => {
  const freq = DRAWER_LEVEL[amountOfDrawers]

  return freq.map((frequency, index) => ({
    catalogId,
    frequency,
    levelName: DRAWER_LEVEL_NAME[amountOfDrawers],
    level: amountOfDrawers,
    numberOfCards: index > 0 ? 0 : numberOfCards,
  }))
}

export { createCatalogList, createCardList, createDrawerList }
