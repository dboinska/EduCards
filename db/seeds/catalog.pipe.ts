import db from "../index"
import { pipe } from "../utils/pipe"
import { createCatalogList, createCardList, createDrawerList } from "./catalog.seed"

import type { Catalog, Card, Drawer, DrawerCard } from "../index"
import type { Dictionary } from "../dictionaries/types"

type PipelineData = {
  dictionary: Dictionary
  ownerId: string
  catalogs?: ReturnType<typeof createCatalogList>
  savedCatalogs?: Catalog[]
  cards?: ReturnType<typeof createCardList>
  savedCards?: Card[]
  drawers?: ReturnType<typeof createDrawerList>
  savedDrawers?: Drawer[]
  cardDrawerRelation?: Pick<DrawerCard, "cardId" | "drawerId">[]
  savedDrawerCardRelation?: DrawerCard[]
  result?: { catalog: Catalog; cards: Card[] }[]
}

const prepareCatalogs = async (data: PipelineData): Promise<PipelineData> => ({
  ...data,
  catalogs: createCatalogList(data.dictionary, data.ownerId!),
})

const commitCatalogs = async (data: PipelineData): Promise<PipelineData> => ({
  ...data,
  savedCatalogs: await db.catalog.createManyAndReturn({ data: data.catalogs! }),
})

const prepareCards = async (data: PipelineData): Promise<PipelineData> => {
  const { dictionary, savedCatalogs } = data
  const cards = savedCatalogs!.flatMap((catalog) => {
    const [_, categoryName] = catalog.name.split(": ")

    const category = dictionary.categories.find((cat) => cat.category === categoryName)

    return createCardList(catalog.catalogId, catalog.ownerId, category!.data)
  })

  return {
    ...data,
    cards,
  }
}

const commitCards = async (data: PipelineData): Promise<PipelineData> => ({
  ...data,
  savedCards: await db.card.createManyAndReturn({ data: data.cards! }),
})

const prepareDrawers = async (data: PipelineData): Promise<PipelineData> => ({
  ...data,
  drawers: data.savedCatalogs!.flatMap((catalog) =>
    createDrawerList(catalog.catalogId, Number(catalog.amountOfDrawers), catalog.numberOfCards)
  ),
})

const commitDrawers = async (data: PipelineData): Promise<PipelineData> => ({
  ...data,
  savedDrawers: await db.drawer.createManyAndReturn({ data: data.drawers! }),
})

const prepareCardDrawerRelation = async (data: PipelineData): Promise<PipelineData> => {
  const firstLevelDrawers = data.savedDrawers?.filter((drawer) => drawer.frequency === "DAILY")

  if (!firstLevelDrawers || firstLevelDrawers.length <= 0 || !data.savedCards) {
    throw new Error("First level drawer or saved cards are not defined")
  }

  const drawerRelation = data.savedCards.map(({ cardId, catalogId }) => ({
    drawerId: firstLevelDrawers.find((drawer) => drawer.catalogId === catalogId)!.drawerId,
    cardId,
  }))

  return {
    ...data,
    cardDrawerRelation: drawerRelation,
  }
}

const commitCardDrawerRelation = async (data: PipelineData): Promise<PipelineData> => {
  if (!data.cardDrawerRelation || data.cardDrawerRelation.length <= 0) {
    throw new Error("Card drawer relation is not defined")
  }

  return {
    ...data,
    savedDrawerCardRelation: await db.drawerCard.createManyAndReturn({
      data: data.cardDrawerRelation,
    }),
  }
}

const prepareResult = async (data: PipelineData): Promise<PipelineData> => ({
  ...data,
  result: data.savedCatalogs!.map((catalog) => ({
    catalog,
    cards: data.savedCards!.filter((card) => card.catalogId === catalog.catalogId),
  })),
})

export const createCatalogs = (dictionary: Dictionary, ownerId: string) =>
  pipe(
    prepareCatalogs,
    commitCatalogs,
    prepareCards,
    commitCards,
    prepareDrawers,
    commitDrawers,
    prepareCardDrawerRelation,
    commitCardDrawerRelation,
    prepareResult
  )({ dictionary, ownerId })
