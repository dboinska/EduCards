import db from "../index"
import { pipe } from "../utils/pipe"
import { createCatalogList, createCardList, createDrawerList } from "./catalog.seed"

import type { Catalog, Card, Drawer } from "../index"
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

const commitFirstLevelDrawerCards = async (data: PipelineData): Promise<PipelineData> => {
  const firstLevelDrawer = data.savedDrawers?.find((drawer) => drawer.frequency === "DAILY")

  if (!firstLevelDrawer?.drawerId || !data.savedCards) {
    throw new Error("First level drawer or saved cards are not defined")
  }

  const drawerRelation = data.savedCards.map(({ cardId }) => ({
    drawerId: firstLevelDrawer.drawerId,
    cardId,
  }))

  await Promise.all(
    drawerRelation.map(async (relation) => {
      return await db.drawerCard.create({
        data: relation,
      })
    })
  )

  return data
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
    commitFirstLevelDrawerCards,
    prepareResult
  )({ dictionary, ownerId })
