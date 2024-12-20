import type { BlitzPage } from "@blitzjs/next"

import { CreateCatalogLayout } from "@/layouts/CreateCatalogLayout"

import { AddCardsView } from "@/modules/catalog/view/AddCards.view"

const NewCatalogAddCards: BlitzPage = () => <AddCardsView />

NewCatalogAddCards.getLayout = function getLayout(page) {
  return <CreateCatalogLayout>{page}</CreateCatalogLayout>
}

export default NewCatalogAddCards
