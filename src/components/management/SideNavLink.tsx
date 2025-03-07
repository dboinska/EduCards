import Link from "next/link"

import classes from "@/styles/SideNavLink.module.css"

import type { RouteUrlObject } from "blitz"

interface SideNavLinkProps {
  isActive?: boolean
  link: string | RouteUrlObject
  icon: any
}

export const SideNavLink = ({
  children,
  isActive,
  link,
  icon: Icon,
}: React.PropsWithChildren<SideNavLinkProps>) => {
  return (
    <Link className={classes.link} aria-current={isActive} href={link}>
      <Icon className={classes.linkIcon} stroke={1.5} />
      <span>{children}</span>
    </Link>
  )
}
