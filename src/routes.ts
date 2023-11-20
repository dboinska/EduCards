import type { RouteUrlObject } from "blitz"
import { Routes } from "@blitzjs/next"
import {
  mdiFolderOutline,
  mdiFolderAccountOutline,
  mdiHeartOutline,
  mdiMessageTextOutline,
  mdiPuzzle,
} from "@mdi/js"

export type Route = {
  path: RouteUrlObject
  alias: string
  icon?: string
  className?: string
  protected?: boolean
}

export const authRoutes: Route[] = [
  { path: Routes.SignupPage(), alias: "Sign up", className: "linkLimeColor" },
  { path: Routes.LoginPage(), alias: "Login", className: "linkLimeLight" },
]

export const routes: Route[] = [
  {
    path: Routes.PublicCatalouges(),
    alias: "Public",
    icon: mdiFolderOutline,
    className: "linkCatalouges",
  },
  {
    path: Routes.Home(),
    alias: "Private ",
    icon: mdiFolderAccountOutline,
    className: "linkCatalouges",
    protected: true,
  },
  {
    path: Routes.Home(),
    alias: "Favourite",
    icon: mdiHeartOutline,
    className: "link",
    protected: true,
  },
  { path: Routes.Home(), alias: "Quiz", icon: mdiPuzzle, className: "link" },
  {
    path: Routes.Home(),
    alias: "Conversation",
    icon: mdiMessageTextOutline,
    className: "link",
  },
]
