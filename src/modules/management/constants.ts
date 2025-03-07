import { Routes } from "@blitzjs/next"

import type { RouteUrlObject } from "blitz"

export type NavPathType = {
  label: string
  icon: any
  link: string | RouteUrlObject
}

export const MODERATOR_NAV_PATHS: NavPathType[] = [
  {
    label: "Catalogs",
    icon: "books",
    link: Routes.CatalogsManagementPage(),
  },
]

export const ADMIN_NAV_PATHS: NavPathType[] = [
  {
    label: "Users",
    icon: "users",
    link: Routes.UsersManagementPage(),
  },
  {
    label: "Catalogs",
    icon: "books",
    link: Routes.CatalogsManagementPage(),
  },
  {
    label: "Privacy Policy",
    icon: "shield-lock",
    link: "/privacy",
  },
]
