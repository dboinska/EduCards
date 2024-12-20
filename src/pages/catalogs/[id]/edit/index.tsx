import { Routes } from "@blitzjs/next"
import { gSSP } from "@/blitz-server"
import { randomId } from "@mantine/hooks"

import { CreateCatalogLayout } from "@/layouts/CreateCatalogLayout"

import getCatalog from "@/modules/catalog/queries/getCatalog"
import { CatalogSchema } from "@/modules/catalog/schemas/Catalog.schema"

import { EditCatalogView } from "@/modules/catalog/view/EditCatalog.view"

import type { BlitzPage } from "@blitzjs/next"
import type { InferGetServerSidePropsType } from "next"

const EditCatalog: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  catalog,
}) => <EditCatalogView catalog={catalog} />

EditCatalog.getLayout = function getLayout(page) {
  return <CreateCatalogLayout>{page}</CreateCatalogLayout>
}

export const getServerSideProps = gSSP(async ({ params, ctx }) => {
  const id = (params as CatalogSchema).id
  const catalog = await getCatalog({ id }, ctx)

  if (catalog?.owner.id !== ctx.session.userId) {
    return {
      redirect: {
        destination: Routes.Home(),
        permanent: false,
      },
    }
  }

  const cards = catalog?.cards.map((card) => {
    const definedCard = {
      description: card.description || "",
      descriptionTranslated: card.descriptionTranslated || "",
      imageUrl: card.imageUrl || "",
      term: card.term || "",
      termTranslated: card.termTranslated || "",
      key: randomId(),

      ...(card.cardId && { cardId: card.cardId }),
    }

    return definedCard
  })

  const sharedWith = catalog?.sharedCatalog.map((sc) => sc.userId) || []

  return { props: { catalog: { ...catalog, cards: cards || [], sharedWith } } }
})

export default EditCatalog

/*
  @TODO: Ograniczenia uploadu tylko do plików max 5 MB i plików graicznych
  @TODO: Dostęp do widoku tylko dla zalogowanych userów
  @TODO: Upload covera bezpośrednio do katalogu usera

  ## Szufladki
  Number of drawers - podczas zapisu do bazy danych pole będzie wskazywać ile rekordów w tabeli drawers powinno zostać utworzonych dla poszczególnego katalogu. Pole wirtualne, obowiązkowe, default 3.
 */
