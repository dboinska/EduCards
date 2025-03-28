import type { RouteUrlObject } from "blitz"
import { Routes } from "@blitzjs/next"
import { mdiFolderOutline, mdiHeartOutline, mdiMessageTextOutline, mdiPuzzle } from "@mdi/js"

export type Route = {
  path: RouteUrlObject
  alias: string
  icon: string
  className?: string
  protected?: boolean
}

export const authRoutes: Omit<Route, "icon">[] = [
  { path: Routes.SignupPage(), alias: "Sign up", className: "linkLimeColor" },
  { path: Routes.LoginPage(), alias: "Login", className: "linkLimeLight" },
]

export const routes: Route[] = [
  {
    path: Routes.Catalogs(),
    alias: "Catalogs",
    icon: mdiFolderOutline,
    className: "linkCatalogs",
  },
  // {
  //   path: Routes.Favorites(),
  //   alias: "Favorites",
  //   icon: mdiHeartOutline,
  //   className: "link",
  //   protected: true,
  // },
  {
    path: Routes.Quiz(),
    alias: "Quiz",
    icon: mdiPuzzle,
    className: "link",
    protected: true,
  },
  {
    path: Routes.Chat(),
    alias: "Chat",
    icon: mdiMessageTextOutline,
    className: "link",
  },
]
