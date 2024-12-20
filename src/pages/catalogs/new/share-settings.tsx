import { gSSP } from "@/blitz-server"

import { CreateCatalogLayout } from "@/layouts/CreateCatalogLayout"
import getSharedProfiles from "@/modules/user/queries/getSharedProfiles"
import { ShareSettingsView } from "@/modules/catalog/view/ShareSettings.view"

import type { InferGetServerSidePropsType } from "next"
import { type BlitzPage } from "@blitzjs/next"

const NewCatalogShareSettingsPage: BlitzPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ userProfiles }) => <ShareSettingsView userProfiles={userProfiles} />

export const getServerSideProps = gSSP(async ({ params, ctx }) => {
  // const users = await getUsers({}, ctx)
  const publicProfiles = await getSharedProfiles({}, ctx)

  const userProfiles = publicProfiles.map(({ name, id, imageUrl }) => ({
    label: name,
    value: id,
    image:
      imageUrl ||
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
  }))
  const sharedProfiles = await getSharedProfiles({}, ctx)

  console.log({ sharedProfiles })

  return { props: { sharedProfiles, userProfiles } }
})

NewCatalogShareSettingsPage.getLayout = function getLayout(page) {
  return <CreateCatalogLayout>{page}</CreateCatalogLayout>
}

export default NewCatalogShareSettingsPage
