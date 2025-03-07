import { useCurrentUser } from "src/modules/user/hooks/useCurrentUser"
import { routes, authRoutes, type Route } from "@/routes"
import { usePathname } from "next/navigation"

export const useNavigationLinks = () => {
  const currentUser = useCurrentUser()
  const pathname = usePathname()

  const menuLinks = !currentUser ? routes.filter((route) => !route.protected) : routes
  const authLinks = !currentUser ? authRoutes : []

  const isCurrentPath = (link: Omit<Route, "icon">) => pathname === link.path.pathname || undefined

  return { menuLinks, authLinks, isCurrentPath, currentUser }
}
