import { BlitzPage } from "@blitzjs/next"
import { InferGetServerSidePropsType } from "next"
import { gSSP } from "@/blitz-server"
import getUsers from "@/modules/user/queries/getUsers"
import getCatalogs from "@/modules/catalog/queries/getCatalogs"
import { UsersManagement } from "@/modules/management/views/UsersManagement.view"
import { AuthenticationError } from "blitz"
import type { User } from "@/modules/management/types/UserTables"

export type NavPathType = {
  label: string
  iconName: "books" | "users" | "shield-lock"
  id: string
  path: string
}

export const MODERATOR_NAV_PATHS: NavPathType[] = [
  {
    label: "Catalogs",
    iconName: "books",
    id: "catalogs",
    path: "catalogs",
  },
]

export const ADMIN_NAV_PATHS: NavPathType[] = [
  {
    label: "Users",
    iconName: "users",
    id: "users",
    path: "users",
  },
  {
    label: "Catalogs",
    iconName: "books",
    id: "catalogs",
    path: "catalogs",
  },
  {
    label: "Privacy Policy",
    iconName: "shield-lock",
    id: "privacy",
    path: "privacy",
  },
]

const UsersManagementPage: BlitzPage = ({
  users,
  catalogs,
  userPaths,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      {/* <NavButton userPaths={userPaths} /> */}
      <UsersManagement users={users} catalogs={catalogs} userPaths={userPaths} />
    </>
  )
}

export const getServerSideProps = gSSP(async ({ params, query, ctx }) => {
  const session = ctx.session.$authorize()

  const userRole = ctx.session.$publicData.role

  if (!userRole || !["ADMIN", "MODERATOR"].includes(userRole)) {
    throw new AuthenticationError("Access denied. Insufficient permissions.")
  }

  const users = (await getUsers({}, ctx)) as unknown as User[]
  const catalogs = await getCatalogs({}, ctx)
  console.log({ users })

  const userPaths = userRole === "ADMIN" ? ADMIN_NAV_PATHS : MODERATOR_NAV_PATHS

  return {
    props: { users, catalogs, userPaths },
  }
})

export default UsersManagementPage
