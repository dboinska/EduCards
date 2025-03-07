import { useState } from "react"
import classes from "../styles/Header.module.css"
import logout from "@/modules/auth/mutations/logout"
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
  IconStar,
  IconMessage,
  IconSettings,
  IconChevronDown,
  IconChartDots,
} from "@tabler/icons-react"
import { useNavigationLinks } from "@/hooks/useNavigationLinks"
import { Routes } from "@blitzjs/next"
import { useCurrentUser } from "@/modules/user/hooks/useCurrentUser"
import router from "next/router"

export function HeaderUserAccount(auth) {
  const [logoutMutation] = useMutation(logout, {
    onSuccess: async () => {
      console.log("success")
      await router.push(Routes.Home())
    },
  })

  const [userMenuOpened, setUserMenuOpened] = useState(false)

  const loggedUser = useCurrentUser()

  const { menuLinks, authLinks, isCurrentPath, currentUser } = useNavigationLinks()

  const menu = menuLinks.map((link) => (
    <Link
      key={link.alias}
      className={`${classes.link} ${link.className ? classes[link.className] : ""}`}
      data-active={isCurrentPath(link)}
      onClick={() => {
        // closeDrawer()
      }}
      href={link.path}
    >
      {link.alias}
    </Link>
  ))

  const UserAccount = () => {
    const theme = useMantineTheme()
    const user = {
      name: loggedUser?.name,
      email: loggedUser?.email,
      image: loggedUser?.imageUrl,
    }

    const handleLogout = async () => {
      await logoutMutation()
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
                  alt={user.name || "User name"}
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
            <Link href={Routes.Statistics()}>
              <Menu.Item
                leftSection={
                  <IconChartDots
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                }
              >
                Statistics
              </Menu.Item>
            </Link>
            <Link href={Routes.StudyPlans()}>
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
            </Link>
            <Link href={Routes.Suggestions()}>
              <Menu.Item
                leftSection={
                  <IconMessage
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                }
              >
                Recommended words
              </Menu.Item>
            </Link>
            {(loggedUser?.role === "ADMIN" || loggedUser?.role === "MODERATOR") && (
              <>
                <Menu.Label>Management Panel</Menu.Label>
                <Link href={Routes.UsersManagementPage()}>
                  <Menu.Item
                    leftSection={
                      <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                  >
                    User Management
                  </Menu.Item>
                </Link>
                <Link href={Routes.CatalogsManagementPage()}>
                  <Menu.Item
                    leftSection={
                      <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                  >
                    Catalog Management
                  </Menu.Item>
                </Link>
              </>
            )}
            <Menu.Label>Settings</Menu.Label>
            <Link href={Routes.UserPage()}>
              <Menu.Item
                leftSection={
                  <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
              >
                Account settings
              </Menu.Item>
            </Link>
            <Menu.Item
              color="red"
              onClick={handleLogout}
              leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </>
    )
  }

  // function closeDrawer() {
  //   throw new Error("Function not implemented.")
  // }

  return (
    <Box>
      <Flex justify="space-between">
        <header className={classes.header}>
          <Container size="md" className={classes.inner}>
            <Link
              key={"Home"}
              onClick={() => {
                // closeDrawer()
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
