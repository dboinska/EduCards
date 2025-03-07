import { type NavPathType } from "@/pages/management/users"
import { Group, UnstyledButton, Text, ThemeIcon, rem } from "@mantine/core"
import { IconBooks, IconUsers, IconShieldLock, type Icon } from "@tabler/icons-react"
import { useRouter } from "next/router"
import { memo } from "react"

interface NavButtonProps {
  active?: boolean
  userPaths: NavPathType[]
}

const iconComponents: Record<NavPathType["iconName"], Icon> = {
  books: IconBooks,
  users: IconUsers,
  "shield-lock": IconShieldLock,
} as const

export const NavButton = memo(({ active, userPaths }: NavButtonProps) => {
  const router = useRouter()

  return (
    <>
      {userPaths.map((path) => {
        const IconComponent = iconComponents[path.iconName]

        const handleClick = async () => {
          try {
            await router.push(`/management/${path.path}`)
          } catch (error) {
            console.error(
              "Navigation failed:",
              error instanceof Error ? error.message : String(error)
            )
          }
        }

        return (
          <UnstyledButton
            key={path.id}
            onClick={handleClick}
            className={`w-full p-3 hover:bg-gray-100 rounded-md transition-colors ${
              active ? "bg-blue-50" : ""
            }`}
          >
            <Group>
              <ThemeIcon
                variant={active ? "filled" : "light"}
                size="lg"
                className="flex items-center justify-center"
              >
                <IconComponent style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
              </ThemeIcon>
              <Text fw={500} className="truncate">
                {path.label}
              </Text>
            </Group>
          </UnstyledButton>
        )
      })}
    </>
  )
})

NavButton.displayName = "NavButton"
