import { IconMessage, IconHeart } from "@tabler/icons-react"
import Icon from "@mdi/react"
import { mdiFolderOutline, mdiFolderAccountOutline } from "@mdi/js"
import classes from "../styles/BottomBar.module.css"
import { Flex } from "@mantine/core"
import Link from "next/link"
import { useNavigationLinks } from "@/hooks/useNavigationLinks"

export function BottomBar() {
  const { menuLinks, isCurrentPath, currentUser } = useNavigationLinks()

  const menu = menuLinks.map((link) => (
    <Link
      key={link.alias}
      className={classes.link}
      data-active={isCurrentPath(link)}
      href={link.path}
    >
      <Flex align="center">
        <Icon path={link.icon!} size={1} />
        <span className={classes.linkAlias}>{link.alias}</span>
      </Flex>
    </Link>
  ))

  return (
    <Flex align="center" hiddenFrom="md" className={classes.container}>
      <Flex justify="space-between" className={classes.bottomBar}>
        {menu}
      </Flex>
    </Flex>
  )
}
