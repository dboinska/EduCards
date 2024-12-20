import { Routes } from "@blitzjs/next"
import { gSSP } from "@/blitz-server"

import { EditProfileView } from "@/modules/user/views/editProfile.view"
import getUser from "@/modules/user/queries/getUser"

import type { InferGetServerSidePropsType } from "next"
import type { BlitzPage } from "@blitzjs/next"

const EditProfile: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  user,
}) => <EditProfileView user={user} />

export const getServerSideProps = gSSP(async ({ query, ctx }) => {
  if (!ctx.session.userId) {
    return {
      redirect: {
        destination: Routes.Home(),
        permanent: false,
      },
    }
  }
  const user = await getUser(ctx)

  return { props: { user, query } }
})

export default EditProfile
