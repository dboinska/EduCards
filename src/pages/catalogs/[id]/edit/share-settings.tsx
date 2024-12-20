import { gSSP } from "@/blitz-server"
import { Routes } from "@blitzjs/next"

import { CreateCatalogLayout } from "@/layouts/CreateCatalogLayout"

import getUsers from "@/modules/user/queries/getUsers"
import getSharedProfiles from "@/modules/user/queries/getSharedProfiles"
import getCatalog from "@/modules/catalog/queries/getCatalog"
import getCatalogViewers from "@/modules/catalog/queries/getCatalogViewers"
import { CatalogSchema } from "@/modules/catalog/schemas/Catalog.schema"

import { EditShareSettingsView } from "@/modules/catalog/view/EditShareSettings.view"

import type { InferGetServerSidePropsType } from "next"
import type { BlitzPage } from "@blitzjs/next"

const CatalogEditShareSettingsPage: BlitzPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ catalog, sharedProfiles, userProfiles }) => (
  <EditShareSettingsView
    catalog={catalog}
    sharedProfiles={sharedProfiles}
    userProfiles={userProfiles}
  />
)

CatalogEditShareSettingsPage.getLayout = function getLayout(page) {
  return <CreateCatalogLayout>{page}</CreateCatalogLayout>
}

export const getServerSideProps = gSSP(async ({ params, ctx }) => {
  const id = (params as CatalogSchema).id
  const catalog = await getCatalog({ id }, ctx)
  const users = await getUsers({}, ctx)
  const publicProfiles = await getSharedProfiles({}, ctx)
  const viewers = await getCatalogViewers({ id }, ctx)

  for (const viewerId of viewers) {
    const viewer = publicProfiles.find((profile) => profile.id === viewerId)

    if (!viewer) {
      const privateProfile = users.find((user) => user.id === viewerId)

      if (privateProfile) {
        publicProfiles.push(privateProfile)
      }
    }
  }

  const userProfiles = publicProfiles.map(({ name, id, imageUrl }) => ({
    label: name,
    value: id,
    image:
      imageUrl ||
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
  }))

  if (catalog?.ownerId !== ctx.session.userId) {
    return {
      redirect: {
        destination: Routes.Home(),
        permanent: false,
      },
    }
  }

  const sharedProfiles = await getSharedProfiles({}, ctx)

  console.log({ sharedProfiles })

  return { props: { catalog: { ...catalog }, sharedProfiles, userProfiles } }
})

export default CatalogEditShareSettingsPage
