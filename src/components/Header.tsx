import { useDisclosure } from "@mantine/hooks"
import classes from "../styles/Header.module.css"
import Link from "next/link"

import { Group, Box, Container, Flex } from "@mantine/core"
import { useNavigationLinks } from "@/hooks/useNavigationLinks"
import { HeaderUserAccount } from "./HeaderUserAccount"

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false)

  const { menuLinks, authLinks, isCurrentPath, currentUser } = useNavigationLinks()

  const menu = menuLinks.map((link) => (
    <Link
      key={link.alias}
      className={`${classes.link} ${link.className ? classes[link.className] : ""}`}
      data-active={isCurrentPath(link)}
      onClick={() => {
        closeDrawer()
      }}
      href={link.path}
    >
      {link.alias}
    </Link>
  ))

  const auth = authLinks.map((link) => (
    <Link
      key={link.alias}
      className={`${classes.link} ${link.className ? classes[link.className] : ""}`}
      data-active={isCurrentPath(link)}
      onClick={() => {
        closeDrawer()
      }}
      href={link.path}
    >
      {link.alias}
    </Link>
  ))

  return (
    <Box>
      <Flex justify="space-between">
        <header className={classes.header}>
          <Container size="md" className={classes.inner}>
            <Link
              key={"Home"}
              onClick={() => {
                closeDrawer()
              }}
              href={"/"}
            >
              {"EduCards"}
            </Link>
            <Flex>
              <Group gap={5} visibleFrom="md">
                {menu}
              </Group>
            </Flex>
            <Flex>
              <Group gap={5}>{!currentUser && auth}</Group>
              <Group>{currentUser && <HeaderUserAccount auth={auth} />}</Group>
            </Flex>
          </Container>
        </header>
      </Flex>
    </Box>
  )
}
