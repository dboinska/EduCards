import { useState } from "react"
import { useDisclosure } from "@mantine/hooks"
import classes from "../styles/Header.module.css"
import { usePathname } from "next/navigation"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import Link from "next/link"

import {
  Group,
  UnstyledButton,
  Text,
  Box,
  rem,
  useMantineTheme,
  Container,
  Menu,
  Avatar,
  Flex,
} from "@mantine/core"
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from "@tabler/icons-react"
import { useNavigationLinks } from "@/hooks/useNavigationLinks"

export function Header() {
  const [logoutMutation] = useMutation(logout)

  const [userMenuOpened, setUserMenuOpened] = useState(false)

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

  const UserAccount = () => {
    const theme = useMantineTheme()
    const user = {
      name: "Jane Spoonfighter",
      email: "janspoon@fighter.dev",
      image:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
    }

    return (
      <>
        <Menu
          width={260}
          position="bottom-end"
          transitionProps={{ transition: "pop-top-right" }}
          onClose={() => setUserMenuOpened(false)}
          onOpen={() => setUserMenuOpened(true)}
          withinPortal
        >
          <Menu.Target>
            <UnstyledButton className={classes.user}>
              <Group gap={7}>
                <Avatar
                  src={user.image}
                  alt={user.name}
                  className={classes.userImg}
                  radius="xl"
                  size={28}
                />
                <Text fw={500} size="sm" lh={1} mr={3}>
                  {user.name}
                </Text>
                <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={
                <IconHeart
                  style={{ width: rem(16), height: rem(16) }}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              }
            >
              Statistic
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconStar
                  style={{ width: rem(16), height: rem(16) }}
                  color={theme.colors.yellow[6]}
                  stroke={1.5}
                />
              }
            >
              Study plans
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconMessage
                  style={{ width: rem(16), height: rem(16) }}
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
              }
            >
              Your comments
            </Menu.Item>

            <Menu.Label>Settings</Menu.Label>
            <Menu.Item
              leftSection={
                <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
              }
            >
              Account settings
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconSwitchHorizontal style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
              }
            >
              Change account
            </Menu.Item>
            <Menu.Item
              onClick={async (event) => {
                event.preventDefault()
                await logoutMutation()
              }}
              leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            >
              Logout
            </Menu.Item>

            <Menu.Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item
              leftSection={
                <IconPlayerPause style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
              }
            >
              Pause subscription
            </Menu.Item>
            <Menu.Item
              color="red"
              leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            >
              Delete account
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </>
    )
  }

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
              <Group>{currentUser && <UserAccount />}</Group>
            </Flex>
          </Container>
        </header>
      </Flex>
    </Box>
  )
}
