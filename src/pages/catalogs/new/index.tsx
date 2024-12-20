import type { BlitzPage } from "@blitzjs/next"

import { CreateCatalogLayout } from "@/layouts/CreateCatalogLayout"

import { NewCatalogView } from "@/modules/catalog/view/NewCatalog.view"

const NewCatalog: BlitzPage = () => <NewCatalogView />

NewCatalog.getLayout = function getLayout(page) {
  return <CreateCatalogLayout>{page}</CreateCatalogLayout>
}

export default NewCatalog
