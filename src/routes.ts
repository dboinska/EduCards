import type { RouteUrlObject } from "blitz"
import { Routes } from "@blitzjs/next"

type Route = {
  path: RouteUrlObject
  alias: string
  className?: string
  protected?: boolean
}

export const authRoutes: Route[] = [
  { path: Routes.SignupPage(), alias: "Sign up", className: "linkLimeColor" },
  { path: Routes.LoginPage(), alias: "Login", className: "linkLimeLight" },
]

export const routes: Route[] = [
  {
    path: Routes.Home(),
    alias: "Private catalogues",
    className: "linkCatalouges",
    protected: true,
  },
  {
    path: Routes.PublicCatalouges(),
    alias: "Public catalogues",
    className: "linkCatalouges",
  },
  { path: Routes.Home(), alias: "Quiz", className: "link" },
  { path: Routes.Home(), alias: "Conversation", className: "link" },
]
